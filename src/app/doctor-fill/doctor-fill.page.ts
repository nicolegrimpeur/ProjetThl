import {Component, OnInit} from '@angular/core';
import {Display} from '../shared/class/display';
import {lastValueFrom} from 'rxjs';
import {HttpService} from '../core/http.service';

@Component({
  selector: 'app-doctor-fill',
  templateUrl: './doctor-fill.page.html',
  styleUrls: ['./doctor-fill.page.scss'],
})
export class DoctorFillPage implements OnInit {
  public fill = '';//UX
  public date = '';//Graphique
  public mail = '';
  public isMailValid = false;
  /*Data*/
  public vaccineData = {
    lab: '',
    date: ''
  };
  public testData = {
    type: '',
    date: '',
    result: '',
    variant: ''
  };

  constructor(public display: Display, private httpService: HttpService) {
  }

  ngOnInit() {
  }

  myFormatDate(dateForm) {
    const tmp = new Date(dateForm);
    this.date = new Intl.DateTimeFormat('fr-FR', {day: 'numeric', month: 'long', year: 'numeric'}).format(tmp);
  }

  uploadTestData() {
    console.log(this.testData.date, this.testData.variant, this.testData.result === 'Positif');
    lastValueFrom(this.httpService.addTest({
      mail: this.mail,
      variant: this.testData.variant,
      date: this.testData.date,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      type_test: this.testData.type,
      positif: this.testData.result === 'Positif'
    }))
      .then(res => {
        console.log('res:', res);
        this.isMailValid= false;
        this.fill = '';
        this.testData.date='';
        this.testData.result='';
        this.testData.variant='';
        this.testData.type='';
      })
      .catch(err => {
        console.log('err:', err);
      });
    //Graphiques
    this.makeToast();
  }

  makeToast() {
    this.display.display({code: 'Données saisies', color: 'success'});
  }

  uploadVaccineData() {
    lastValueFrom(this.httpService.addVaccine({
      mail: this.mail,
      lab: this.vaccineData.lab,
      date: this.vaccineData.date
    }))
      .then(res => {
        console.log('res:', res);
        this.makeToast();
        this.isMailValid= false;
        this.fill = '';
        this.vaccineData.date ='';
        this.vaccineData.lab ='';
      })
      .catch(err => {
        console.log('err:', err);
      });
  }

  checkMail() {
    console.log(this.fill);
    const validateEmail = (email) => String(email)
      .toLowerCase()
      .match(
        // eslint-disable-next-line max-len
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    if (validateEmail(this.mail)) {
      this.isMailValid = true;
    } else {
      this.display.display('Ce mail est invalide');
    }
  }

  checkFill() {
    console.log(document.getElementById('checkBoxVaccin').ariaChecked);
    if (document.getElementById('checkBoxVaccin').ariaChecked.toString() === 'true') {
      this.checkLaboratoire();
    } else if (document.getElementById('checkBoxTest').ariaChecked.toString() === 'true') {
      this.checkTestType();
    }
  }

  checkLaboratoire() {
    // eslint-disable-next-line max-len
    if (document.getElementById('checkBoxPfizer').ariaChecked.toString() === 'true' || document.getElementById('checkBoxModerna').ariaChecked.toString() === 'true'
      // eslint-disable-next-line max-len
      || document.getElementById('checkBoxAstrazeneca').ariaChecked.toString() === 'true' || document.getElementById('checkBoxJohnson').ariaChecked.toString() === 'true') {
      this.uploadVaccineData();
    } else {
      this.display.display('veuillez selectionner un laboratoire');
    }
  }

  checkTestType() {
    // eslint-disable-next-line max-len
    if (document.getElementById('checkBoxPCR').ariaChecked.toString() === 'true' || document.getElementById('checkBoxAntigenique').ariaChecked.toString() === 'true') {
      this.checkTestResult();
    } else {
      this.display.display('veuillez selectionner un type');
    }
  }

  checkTestResult() {
    // eslint-disable-next-line max-len
    if (document.getElementById('checkBoxNegatif').ariaChecked.toString() === 'true') {
      this.uploadTestData();
    } else if (document.getElementById('checkBoxPositif').ariaChecked.toString() === 'true'){
      this.checkVariant();
    }else {
      this.display.display('veuillez selectionner un resultat');
    }
  }

  checkVariant(){
    // eslint-disable-next-line max-len
    if (document.getElementById('checkBoxOmicron').ariaChecked.toString() === 'true' || document.getElementById('checkBoxDelta').ariaChecked.toString() === 'true'
      || document.getElementById('checkBoxClassique').ariaChecked.toString() === 'true'){
      this.uploadTestData();
    }else {
      this.display.display('veuillez selectionner un variant');
    }
  }

  checkDate() {
    const currentDate = new Date();
    const birthDate = this.date.split('/');
    console.log(birthDate);
    // eslint-disable-next-line max-len
    if (currentDate.getDate() < parseInt(birthDate[0], 10) && currentDate.getMonth() <= parseInt(birthDate[1], 10) && currentDate.getFullYear() <= parseInt(birthDate[2], 10)) {
      this.display.display('Vous êtes un petit malin :) mais veuillez rentrer une date conforme');
    } else if (currentDate.getMonth() < parseInt(birthDate[1], 10) && currentDate.getFullYear() < parseInt(birthDate[2], 10)) {
      this.display.display('Vous êtes un petit malin :) mais veuillez rentrer une date conforme');
    } else if (currentDate.getFullYear() < parseInt(birthDate[2], 10)) {
      this.display.display('Vous êtes un petit malin :) mais veuillez rentrer une date conforme');
    } else if (this.date === '') {
      this.display.display('vous avez oublié de rentrer la date');
    } else {
      this.checkFill();
    }
  }
}

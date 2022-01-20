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
    console.log(this.fill);
    if (this.fill === 'Vaccin') {
      this.checkLaboratoire();
    } else if (this.fill === 'Test') {
      this.checkTestType();
    }
  }

  checkLaboratoire() {
    // eslint-disable-next-line max-len
    if (this.vaccineData.lab !== '') {
      this.uploadVaccineData();
    } else {
      this.display.display('Veuillez sélectionner un laboratoire').then();
    }
  }

  checkTestType() {
    if (this.testData.type !== '') {
      this.checkTestResult();
    } else {
      this.display.display('Veuillez sélectionner un type').then();
    }
  }

  checkTestResult() {
    if (this.testData.result === 'Négatif') {
      this.uploadTestData();
    } else if (this.testData.result === 'Positif'){
      this.checkVariant();
    }else {
      this.display.display('veuillez selectionner un resultat').then();
    }
  }

  checkVariant(){
    if (this.testData.variant !== ''){
      this.uploadTestData();
    }else {
      this.display.display('Veuillez selectionner un variant').then();
    }
  }

  checkDate() {
    if (new Date(this.date) > new Date()) {
      this.display.display('Merci de rentrer une date conforme').then();
    } else {
      this.checkMail();
    }
  }
}

import {Component, OnInit} from '@angular/core';
import {Display} from '../shared/class/display';
import {lastValueFrom} from 'rxjs';
import {HttpService} from '../core/http.service';
import {CertificateType, ICertificate} from '../shared/model/certificates';

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
  public vaccineData: Partial<ICertificate>= {
    type: CertificateType.VACCINE,
    email: this.mail,
  };
  public testData: Partial<ICertificate>={
    type: CertificateType.TEST,
    email:this.mail,
};

  constructor(public display: Display, private httpService: HttpService) {
  }

  ngOnInit() {
  }

  myFormatDate(dateForm) {
    const tmp = new Date(dateForm);
    this.date = new Intl.DateTimeFormat('fr-FR', {day: 'numeric', month: 'long', year: 'numeric'}).format(tmp);
  }

  uploadTestData(testData: Partial<ICertificate>) {
    lastValueFrom(this.httpService.addTest(testData))
      .then(res => {
        console.log('res:', res);
        this.isMailValid= false;
        this.fill = '';
        this.testData.date='';
        this.testData.metadata={};
        this.testData.type=-1;
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

  uploadVaccineData(vaccineData: Partial<ICertificate>) {
    lastValueFrom(this.httpService.addVaccine(vaccineData))
      .then(res => {
        console.log('res:', res);
        this.makeToast();
        this.isMailValid= false;
        this.fill = '';
        this.vaccineData.date ='';
        this.vaccineData.metadata ={};
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
    console.log(this.fill);
    if (this.fill === 'Vaccin') {
      this.checkLaboratoire();
    } else if (this.fill === 'Test') {
      this.checkTestType();
    }
  }

  checkLaboratoire() {
    // eslint-disable-next-line max-len
    if (document.getElementById('checkBoxPfizer').ariaChecked.toString() === 'true' || document.getElementById('checkBoxModerna').ariaChecked.toString() === 'true'
      // eslint-disable-next-line max-len
      || document.getElementById('checkBoxAstrazeneca').ariaChecked.toString() === 'true' || document.getElementById('checkBoxJohnson').ariaChecked.toString() === 'true') {
      this.uploadVaccineData(this.vaccineData);
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
      this.uploadTestData(this.testData);
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
      this.uploadTestData(this.testData);
    }else {
      this.display.display('veuillez selectionner un variant');
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

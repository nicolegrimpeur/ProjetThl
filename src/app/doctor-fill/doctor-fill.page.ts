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
  public vaccineData: Partial<ICertificate> = {
    type: CertificateType.VACCINE,
    email: this.mail,
    metadata: {'LAB': ''},
  };
  public testData: Partial<ICertificate> = {
    type: CertificateType.TEST,
    email: this.mail,
    metadata: {'TEST_TYPE': '', 'RESULT': '', 'VARIANT': ''},

  };

  constructor(public display: Display, private httpService: HttpService) {
  }

  ngOnInit() {
  }

  myFormatDate(dateForm) {
    const tmp = new Date(dateForm);
    this.date = new Intl.DateTimeFormat('fr-FR', {day: 'numeric', month: 'long', year: 'numeric'}).format(tmp);
    this.vaccineData.date = new Date(tmp).toISOString();
    this.testData.date = new Date(tmp).toISOString();

    this.vaccineData.date = new Date(tmp).toISOString();
    this.testData.date = new Date(tmp).toISOString();
  }

  uploadTestData(testData: Partial<ICertificate>) {
    lastValueFrom(this.httpService.addTest(testData))
      .then(res => {
        this.isMailValid = false;
        this.fill = '';
        this.testData.date = '';
        this.testData.metadata = {};
        this.testData.type =0;
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
        this.makeToast();
        this.isMailValid = false;
        this.fill = '';
        this.vaccineData.date = '';
        this.vaccineData.metadata = {};
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
      this.testData.email =this.mail;
      this.vaccineData.email= this.mail;
      this.checkFill();
    } else {
      this.display.display('Ce mail est invalide');
    }
  }

  checkFill() {
    if (this.fill === 'Vaccin') {
      this.checkLaboratoire();
    } else if (this.fill === 'Test') {
      this.testData.type= CertificateType.TEST;
      this.checkTestType();
    }
  }

  checkLaboratoire() {
    // eslint-disable-next-line max-len
    if (this.vaccineData.metadata['LAB'] !== '') {
      this.uploadVaccineData(this.vaccineData);
    } else {
      this.display.display('veuillez sélectionner un laboratoire').then();
    }
  }

  checkTestType() {
    // eslint-disable-next-line max-len
    if (this.testData.metadata['TEST_TYPE'] !== '') {
      this.checkTestResult();
    } else {
      this.display.display('veuillez selectionner un type');
    }
  }

  checkTestResult() {
    // eslint-disable-next-line max-len
    if (this.testData.metadata['RESULT'] === 'Négatif') {
      this.testData.metadata['RESULT']= 'negative';
      this.uploadTestData(this.testData);
    } else if (this.testData.metadata['RESULT'] === 'Positif') {
      this.testData.metadata['RESULT']= 'positive';
      this.checkVariant();
    } else {
      this.display.display('veuillez selectionner un resultat');
    }
  }

  checkVariant() {
    // eslint-disable-next-line max-len
    if (this.testData.metadata['VARIANT'] !== '') {
      this.uploadTestData(this.testData);
    } else {
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

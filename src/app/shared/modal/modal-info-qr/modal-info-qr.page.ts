import {Component, Input} from '@angular/core';
import {InfosQrModel} from '../../model/infosQrModel';
import {CertificateType} from '../../model/certificates';

@Component({
  selector: 'app-modal-info-qr',
  templateUrl: './modal-info-qr.page.html',
  styleUrls: ['./modal-info-qr.page.scss'],
})
export class ModalInfoQrPage {
  @Input() user: InfosQrModel;
  public dDN = '';

  constructor() {
  }

  ionViewWillEnter() {
    const tmp = new Date(this.user.user.birthdate);
    this.dDN = new Intl.DateTimeFormat('fr-FR', {day: 'numeric', month: 'long', year: 'numeric'}).format(tmp);
  }

  isValidate() {
    const vaccineArray = this.user.certificates.filter(item => item.type === CertificateType.VACCINE);
    const lastVaccine = vaccineArray[vaccineArray.length-1];
    const testArray = this.user.certificates.filter(item => item.type === CertificateType.TEST);
    const lastTest = testArray[testArray.length-1];
    const today = new Date();
    const vaccineDate = new Date(lastVaccine.date);
    const testDate = new Date(lastTest.date);
    let isValidate = true;

    // on vérifie qu'il y a au moins deux vaccins
    if (!isValidate) {
      isValidate = vaccineArray.length >= 2;
    }

    let diffTemps = today.getTime() - vaccineDate.getTime();
    let diffJours = diffTemps / (1000 * 3600 * 24);

    // on vérifie qu'il y a moins de 5 mois
    if (isValidate) {
      isValidate = !(diffJours > 3 * 50);
    }

    diffTemps = today.getTime() - testDate.getTime();
    diffJours = diffTemps / (1000 * 3600 * 24);

    // on vérifie que le dernier test a eu lieu il y a moins de 2 jours
    if (!isValidate) {
      isValidate = !(diffJours > 2);
    }

    return isValidate;
  }
}

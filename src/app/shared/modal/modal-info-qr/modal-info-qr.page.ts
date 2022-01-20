import {Component, Input} from '@angular/core';
import {InfosQrModel} from '../../model/infosQrModel';

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
    const tmp = new Date(this.user.birthday);
    this.dDN = new Intl.DateTimeFormat('fr-FR', {day: 'numeric', month: 'long', year: 'numeric'}).format(tmp);
  }

  isValidate() {
    const lastVaccine = this.user.vaccine[this.user.vaccine.length - 1];
    const lastTest = this.user.tests_results[this.user.tests_results.length - 1];
    const today = new Date();
    let isValidate = true;

    // on vérifie qu'il y a au moins deux vaccins
    if (!isValidate) {
      isValidate = this.user.vaccine.length >= 2;
    }

    let diffTemps = today.getTime() - lastVaccine.date.getTime();
    let diffJours = diffTemps / (1000 * 3600 * 24);

    // on vérifie qu'il y a moins de 5 mois
    if (isValidate) {
      isValidate = !(diffJours > 3 * 50);
    }

    diffTemps = today.getTime() - lastVaccine.date.getTime();
    diffJours = diffTemps / (1000 * 3600 * 24);

    // on vérifie que le dernier test a eu lieu il y a moins de 2 jours
    if (!isValidate) {
      isValidate = !(diffJours > 2);
    }

    return isValidate;
  }
}

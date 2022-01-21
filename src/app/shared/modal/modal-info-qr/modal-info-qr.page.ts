import {Component, Input} from '@angular/core';
import {DateTime} from 'luxon';

@Component({
  selector: 'app-modal-info-qr',
  templateUrl: './modal-info-qr.page.html',
  styleUrls: ['./modal-info-qr.page.scss'],
})
export class ModalInfoQrPage {
  @Input() response: any;
  public dDN = '';

  constructor() {
  }

  ionViewWillEnter() {
    if (this.response.user.birthdate) {
      this.dDN = DateTime.fromISO(this.response.user.birthdate).toLocaleString(DateTime.DATE_MED);
    } else {
      this.dDN = 'Validation hors ligne';
    }
  }
}

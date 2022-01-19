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
    this.dDN = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric'}).format(tmp);
  }
}

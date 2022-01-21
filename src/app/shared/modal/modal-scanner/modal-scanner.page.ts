import {Component} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Display} from '../../class/display';

@Component({
  selector: 'app-modal-scanner',
  templateUrl: './modal-scanner.page.html',
  styleUrls: ['./modal-scanner.page.scss'],
})
export class ModalScannerPage {
  public enableScan = true;

  constructor(
    public modalController: ModalController,
    private display: Display
  ) {
  }

  ionViewWillEnter() {
    // active le scan à l'ouverture du modal
    this.enableScan = true;
  }

  scanSuccessHandler(res) {
    console.log(res);
    // désactive le scan
    this.enableScan = false;
    // ferme le modal
    this.modalController.dismiss(res).then();
  }

  ionViewDidLeave() {
    // désactive le scan
    this.enableScan = false;
  }
}

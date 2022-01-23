import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {ModalController} from '@ionic/angular';

import {ModalScannerPage} from '../shared/modal/modal-scanner/modal-scanner.page';
import {ModalLinkPage} from '../shared/modal/modal-link/modal-link.page';
import {ModalSharePage} from '../shared/modal/modal-share/modal-share.page';
import {ModalAboutPage} from '../shared/modal/modal-about/modal-about.page';

import {Display} from '../shared/class/display';
import {lastValueFrom} from 'rxjs';
import {HttpService} from '../core/http.service';
import {ModalInfoQrPage} from '../shared/modal/modal-info-qr/modal-info-qr.page';

import {sign} from 'tweetnacl';
import {decodeBase64, encodeUTF8} from 'tweetnacl-util';

const PUBLIC_KEY_DATA = new Uint8Array([
  46, 63, 250, 151, 66, 69, 187, 21,
  157, 26, 19, 46, 82, 246, 24, 7,
  89, 84, 159, 4, 13, 75, 35, 76,
  108, 126, 18, 207, 243, 23, 226, 254
]);

@Component({
  selector: 'app-identification',
  templateUrl: './identification.page.html',
  styleUrls: ['./identification.page.scss'],
})
export class IdentificationPage implements OnInit {
  constructor(
    public router: Router,
    private modalController: ModalController,
    private display: Display,
    private httpService: HttpService
  ) {
  }

  ngOnInit() {
  }

  connectToAccount() {
    this.router.navigateByUrl('login').then();
  }

  createAccount() {
    this.router.navigateByUrl('register').then();
  }

  async openScan() {
    //Wait Creation
    const modal = await this.modalController.create({
      component: ModalScannerPage,
      breakpoints: [0, 0.5, 0.75, 1],
      initialBreakpoint: 0.5
    });

    await modal.present();//Wait Display
    await modal.onDidDismiss().then(data => {
      if (data !== undefined) {

        const decodedData = JSON.parse(data.data);
        //Graphiques
        if (data.data !== undefined) {
          this.getScanData(decodedData);
        }
      } else {
        this.display.display('Scan arrêté').then();
      }
    });//Wait dismiss
  }

  // récupère l'utilisateur correspondant au token récupéré
  getScanData(data: any) {
    lastValueFrom(this.httpService.getUserQr(data._id))
      .then(res => {
          this.display.display({code: 'Scan réussi', color: 'success'}).then();
          this.openResult(res).then();
        }
      )
      .catch(err => {
        const {passToken} = data;
        const message = decodeBase64(passToken);
        const signedData = sign.open(message, PUBLIC_KEY_DATA);
        const signedDataObj = JSON.parse(encodeUTF8(signedData));
        this.display.display({code: 'Validation error, switching to offline validation', color: 'danger'});
        this.openResult({
          hasPass: signedDataObj.hasPass,
          user: {
            name: data.name,
            surname: data.surname,
          }
        });
      });
  }

  async openResult(response) {
    //Wait Creation
    const modal = await this.modalController.create({
      component: ModalInfoQrPage,
      breakpoints: [0, 0.2, 0.5, 0.75, 1],
      initialBreakpoint: 0.75,
      componentProps: {
        response: response
      }
    });

    await modal.present();//Wait Display
    await modal.onDidDismiss().then();//Wait dismiss
  }

  async openLinkModal() {
    const modal = await this.modalController.create({
      component: ModalLinkPage
    });
    await modal.present();
    await modal.onDidDismiss();
  }

  async openShareModal() {
    const modal = await this.modalController.create({
      component: ModalSharePage
    });
    await modal.present();
    await modal.onDidDismiss();
  }

  async openAboutModal() {
    const modal = await this.modalController.create({
      component: ModalAboutPage
    });
    await modal.present();
    await modal.onDidDismiss();
  }
}

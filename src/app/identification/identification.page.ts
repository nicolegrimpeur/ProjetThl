import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {ModalController} from '@ionic/angular';

import {ModalScannerPage} from '../shared/modal/modal-scanner/modal-scanner.page';
import {ModalLinkPage} from '../shared/modal/modal-link/modal-link.page';
import {ModalSharePage} from '../shared/modal/modal-share/modal-share.page';
import {ModalAboutPage} from '../shared/modal/modal-about/modal-about.page';

import {Display} from '../shared/class/display';
import {lastValueFrom} from "rxjs";
import {HttpService} from "../core/http.service";
import {ModalInfoQrPage} from "../shared/modal/modal-info-qr/modal-info-qr.page";

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
        console.log(data);
        //Graphiques
        if (data.data !== undefined) {
          this.getScanData(data.data);
        }
      } else {
        this.display.display('Scan arrêté').then();
      }
    });//Wait dismiss
  }

  // récupère l'utilisateur correspondant au token récupéré
  getScanData(data) {
    lastValueFrom(this.httpService.getUserQr(data))
      .then(res => {
          console.log(res);
          this.display.display({code: 'Scan réussi', color: 'success'}).then();
          this.openResult(res).then();
        }
      )
      .catch(err => {
        this.display.display(err.error.message).then();
      });
  }

  async openResult(userData) {
    //Wait Creation
    const modal = await this.modalController.create({
      component: ModalInfoQrPage,
      breakpoints: [0, 0.2, 0.5, 0.75, 1],
      initialBreakpoint: 0.75,
      componentProps: {
        user: userData
      }
    });

    await modal.present();//Wait Display
    await modal.onDidDismiss().then();//Wait dismiss
  }

  async openLinkModal() {
    let modal = await this.modalController.create({
      component: ModalLinkPage
    });
    await modal.present();
    await modal.onDidDismiss();
  }

  async openShareModal() {
    let modal = await this.modalController.create({
      component: ModalSharePage
    });
    await modal.present();
    await modal.onDidDismiss();
  }

  async openAboutModal() {
    let modal = await this.modalController.create({
      component: ModalAboutPage
    });
    await modal.present();
    await modal.onDidDismiss();
  }
}

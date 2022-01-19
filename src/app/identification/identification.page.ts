import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { ModalController } from '@ionic/angular';

import { ModalScannerPage } from '../shared/modal/modal-scanner/modal-scanner.page';
import { ModalLinkPage } from '../shared/modal/modal-link/modal-link.page';
import { ModalSharePage } from '../shared/modal/modal-share/modal-share.page';
import { ModalConfidentialityPage } from '../shared/modal/modal-confidentiality/modal-confidentiality.page';
import { ModalAboutPage } from '../shared/modal/modal-about/modal-about.page';

import { Display } from '../shared/class/display';

@Component({
  selector: 'app-identification',
  templateUrl: './identification.page.html',
  styleUrls: ['./identification.page.scss'],
})
export class IdentificationPage implements OnInit {

  constructor(public router: Router, private modalController: ModalController, private display: Display) { }

  ngOnInit() {
  }
  connectToAccount(){
    this.router.navigateByUrl('login').then();
  }
  createAccount(){
    this.router.navigateByUrl('register').then();
  }
  async openCardModal() {
    //Wait Creattion
    const modal = await this.modalController.create({
      component: ModalScannerPage,
      breakpoints: [0, 0.2, 0.5, 0.75, 1],
      initialBreakpoint: 0.5
    });

    await modal.present();//Wait Display
    await modal.onDidDismiss();//Wait dismiss
    //Graphiques
    this.display.display({code:"Scanner fermé", color:"success"});
  }
  async openLinkModal() {
    let modal = await this.modalController.create({
      component: ModalLinkPage, 
      breakpoints: [0, 0.2, 0.5, 0.75, 1], 
      initialBreakpoint: 0.5
    });  
    await modal.present();
    await modal.onDidDismiss();
  }
  async openShareModal() {
    let modal = await this.modalController.create({
      component: ModalSharePage, 
      breakpoints: [0, 0.2, 0.5, 0.75, 1], 
      initialBreakpoint: 0.5
    });  
    await modal.present();
    await modal.onDidDismiss();
  }
  async openConfidentialityModal() {
    let modal = await this.modalController.create({
      component: ModalConfidentialityPage, 
      breakpoints: [0, 0.2, 0.5, 0.75, 1], 
      initialBreakpoint: 0.5
    });  
    await modal.present();
    await modal.onDidDismiss();
  }
  async openAboutModal() {
    let modal = await this.modalController.create({
      component: ModalAboutPage, 
      breakpoints: [0, 0.2, 0.5, 0.75, 1], 
      initialBreakpoint: 0.5
    });  
    await modal.present();
    await modal.onDidDismiss();
  }
}

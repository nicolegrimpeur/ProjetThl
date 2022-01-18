import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {ModalScannerPage} from '../shared/modal/modal-scanner/modal-scanner.page';
import {Display} from '../shared/class/display';
import {InfosQrModel} from '../shared/model/infosQrModel';
import {lastValueFrom} from "rxjs";
import {HttpService} from "../core/http.service";

@Component({
  selector: 'app-identification',
  templateUrl: './identification.page.html',
  styleUrls: ['./identification.page.scss'],
})
export class IdentificationPage implements OnInit {
  public userData = new InfosQrModel();

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

  async openCardModal() {
    //Wait Creation
    const modal = await this.modalController.create({
      component: ModalScannerPage,
      breakpoints: [0, 0.2, 0.5, 0.75, 1],
      initialBreakpoint: 0.5
    });

    await modal.present();//Wait Display
    await modal.onDidDismiss().then(data => {
      if (data !== undefined) {
        //Graphiques
        this.display.display({code: 'Scan réussi', color: 'success'}).then();
        this.getScanData(data.data);
      } else {
        this.display.display('Scan arrêté').then();
      }
    });//Wait dismiss
  }

  // récupère l'utilisateur correspondant au token récupéré
  getScanData(data) {
    lastValueFrom(this.httpService.getUserQr(data))
      .then(res => {
        this.userData = res;
      })
      .catch(err => {
        this.display.display(err.status).then();
      });
  }
}

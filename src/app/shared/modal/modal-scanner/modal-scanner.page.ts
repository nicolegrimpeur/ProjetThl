import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-scanner',
  templateUrl: './modal-scanner.page.html',
  styleUrls: ['./modal-scanner.page.scss'],
})
export class ModalScannerPage implements OnInit {

  constructor(
    public modalController: ModalController
  ) { }

  ngOnInit() {
  }

  scanSuccessHandler(res:any) {
    //(Back)
    console.log(res);
    //Graphiques
    this.modalController.dismiss().then();
  }

}

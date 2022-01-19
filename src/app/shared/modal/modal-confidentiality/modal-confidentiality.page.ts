import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-confidentiality',
  templateUrl: './modal-confidentiality.page.html',
  styleUrls: ['./modal-confidentiality.page.scss'],
})
export class ModalConfidentialityPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

}

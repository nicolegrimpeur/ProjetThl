import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-about',
  templateUrl: './modal-about.page.html',
  styleUrls: ['./modal-about.page.scss'],
})
export class ModalAboutPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-share',
  templateUrl: './modal-share.page.html',
  styleUrls: ['./modal-share.page.scss'],
})
export class ModalSharePage implements OnInit {

  constructor(public modalController:ModalController) { }

  ngOnInit() {
  }

}

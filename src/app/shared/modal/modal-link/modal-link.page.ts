import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-link',
  templateUrl: './modal-link.page.html',
  styleUrls: ['./modal-link.page.scss'],
})
export class ModalLinkPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

}

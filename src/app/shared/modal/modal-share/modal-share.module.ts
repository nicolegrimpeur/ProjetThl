import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalSharePageRoutingModule } from './modal-share-routing.module';

import { ModalSharePage } from './modal-share.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalSharePageRoutingModule
  ],
  declarations: [ModalSharePage]
})
export class ModalSharePageModule {}

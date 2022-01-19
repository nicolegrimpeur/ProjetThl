import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalAboutPageRoutingModule } from './modal-about-routing.module';

import { ModalAboutPage } from './modal-about.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalAboutPageRoutingModule
  ],
  declarations: [ModalAboutPage]
})
export class ModalAboutPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalLinkPageRoutingModule } from './modal-link-routing.module';

import { ModalLinkPage } from './modal-link.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalLinkPageRoutingModule
  ],
  declarations: [ModalLinkPage]
})
export class ModalLinkPageModule {}

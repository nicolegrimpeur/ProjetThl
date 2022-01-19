import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalConfidentialityPageRoutingModule } from './modal-confidentiality-routing.module';

import { ModalConfidentialityPage } from './modal-confidentiality.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalConfidentialityPageRoutingModule
  ],
  declarations: [ModalConfidentialityPage]
})
export class ModalConfidentialityPageModule {}

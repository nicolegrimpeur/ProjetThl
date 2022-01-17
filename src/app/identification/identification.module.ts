import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IdentificationPageRoutingModule } from './identification-routing.module';

import { IdentificationPage } from './identification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IdentificationPageRoutingModule
  ],
  declarations: [IdentificationPage]
})
export class IdentificationPageModule {}

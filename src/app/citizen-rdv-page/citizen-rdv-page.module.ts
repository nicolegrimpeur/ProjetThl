import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CitizenRdvPagePageRoutingModule } from './citizen-rdv-page-routing.module';

import { CitizenRdvPagePage } from './citizen-rdv-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CitizenRdvPagePageRoutingModule
  ],
  declarations: [CitizenRdvPagePage]
})
export class CitizenRdvPagePageModule {}

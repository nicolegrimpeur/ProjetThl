import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorRdvPageRoutingModule } from './doctor-rdv-routing.module';

import { DoctorRdvPage } from './doctor-rdv.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorRdvPageRoutingModule
  ],
  declarations: [DoctorRdvPage]
})
export class DoctorRdvPageModule {}

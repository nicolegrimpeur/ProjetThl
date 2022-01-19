import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorFillPageRoutingModule } from './doctor-fill-routing.module';

import { DoctorFillPage } from './doctor-fill.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorFillPageRoutingModule
  ],
  declarations: [DoctorFillPage]
})
export class DoctorFillPageModule {}

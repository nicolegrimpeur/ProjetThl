import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorTabPageRoutingModule } from './doctor-tab-routing.module';

import { DoctorTabPage } from './doctor-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorTabPageRoutingModule
  ],
  declarations: [DoctorTabPage]
})
export class DoctorTabPageModule {}

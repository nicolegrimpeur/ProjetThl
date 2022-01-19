import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CitizenTabPageRoutingModule } from './citizen-tab-routing.module';

import { CitizenTabPage } from './citizen-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CitizenTabPageRoutingModule,
  ],
  declarations: [CitizenTabPage]
})
export class CitizenTabPageModule {}

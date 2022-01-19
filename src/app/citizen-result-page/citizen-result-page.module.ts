import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CitizenResultPagePageRoutingModule } from './citizen-result-page-routing.module';

import { CitizenResultPagePage } from './citizen-result-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CitizenResultPagePageRoutingModule
  ],
  declarations: [CitizenResultPagePage]
})
export class CitizenResultPagePageModule {}

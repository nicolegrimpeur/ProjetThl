import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PassPageRoutingModule } from './pass-routing.module';

import { PassPage } from './pass.page';

import {NgxQRCodeModule} from '@techiediaries/ngx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PassPageRoutingModule,
    NgxQRCodeModule
  ],
  declarations: [PassPage]
})
export class PassPageModule {}

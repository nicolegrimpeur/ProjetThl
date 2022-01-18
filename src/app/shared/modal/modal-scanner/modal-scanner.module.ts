import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalScannerPageRoutingModule } from './modal-scanner-routing.module';

import { ModalScannerPage } from './modal-scanner.page';

import {ZXingScannerModule} from '@zxing/ngx-scanner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalScannerPageRoutingModule,
    ZXingScannerModule
  ],
  declarations: [ModalScannerPage]
})
export class ModalScannerPageModule {}

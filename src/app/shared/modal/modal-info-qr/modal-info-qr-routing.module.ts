import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalInfoQrPage } from './modal-info-qr.page';

const routes: Routes = [
  {
    path: '',
    component: ModalInfoQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalInfoQrPageRoutingModule {}

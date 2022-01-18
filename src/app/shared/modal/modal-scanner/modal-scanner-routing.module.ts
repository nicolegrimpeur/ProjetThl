import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalScannerPage } from './modal-scanner.page';

const routes: Routes = [
  {
    path: '',
    component: ModalScannerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalScannerPageRoutingModule {}

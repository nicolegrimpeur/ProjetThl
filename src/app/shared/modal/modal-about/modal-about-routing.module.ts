import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalAboutPage } from './modal-about.page';

const routes: Routes = [
  {
    path: '',
    component: ModalAboutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalAboutPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalLinkPage } from './modal-link.page';

const routes: Routes = [
  {
    path: '',
    component: ModalLinkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalLinkPageRoutingModule {}

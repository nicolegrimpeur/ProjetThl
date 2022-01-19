import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalConfidentialityPage } from './modal-confidentiality.page';

const routes: Routes = [
  {
    path: '',
    component: ModalConfidentialityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalConfidentialityPageRoutingModule {}

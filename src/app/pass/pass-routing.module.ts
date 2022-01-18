import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PassPage } from './pass.page';

const routes: Routes = [
  {
    path: '',
    component: PassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PassPageRoutingModule {}

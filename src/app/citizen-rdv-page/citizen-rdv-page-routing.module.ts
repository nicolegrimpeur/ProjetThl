import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CitizenRdvPagePage } from './citizen-rdv-page.page';

const routes: Routes = [
  {
    path: '',
    component: CitizenRdvPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitizenRdvPagePageRoutingModule {}

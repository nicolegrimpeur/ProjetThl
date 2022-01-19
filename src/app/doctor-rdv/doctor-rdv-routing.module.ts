import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorRdvPage } from './doctor-rdv.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorRdvPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorRdvPageRoutingModule {}

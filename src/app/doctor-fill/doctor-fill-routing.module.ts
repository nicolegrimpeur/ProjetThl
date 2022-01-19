import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorFillPage } from './doctor-fill.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorFillPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorFillPageRoutingModule {}

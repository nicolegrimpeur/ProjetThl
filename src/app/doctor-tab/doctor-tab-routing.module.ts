import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorTabPage } from './doctor-tab.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorTabPage,
    children: [
      {
        path: 'doctor-fill',
        loadChildren: () => import('../doctor-fill/doctor-fill.module').then(m => m.DoctorFillPageModule)
      },
      {
        path: 'doctor-rdv',
        loadChildren: () => import('../doctor-rdv/doctor-rdv.module').then(m => m.DoctorRdvPageModule)
      },
      {
        path: '',
        redirectTo: 'identification',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorTabPageRoutingModule {}

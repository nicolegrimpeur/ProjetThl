import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CitizenTabPage } from './citizen-tab.page';

const routes: Routes = [
  {
    path: '',
    component: CitizenTabPage,
    children: [
      {
        path: 'citizen-rdv-page',
        loadChildren: () => import('../citizen-rdv-page/citizen-rdv-page.module').then(m => m.CitizenRdvPagePageModule)
      },
      {
        path: 'citizen-declaration-page',
        loadChildren: () => import('../citizen-declaration-page/citizen-declaration-page.module').then(m => m.CitizenDeclarationPagePageModule)
      },
      {
        path: 'citizen-result-page',
        loadChildren: () => import('../citizen-result-page/citizen-result-page.module').then(m => m.CitizenResultPagePageModule)
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
export class CitizenTabPageRoutingModule {}

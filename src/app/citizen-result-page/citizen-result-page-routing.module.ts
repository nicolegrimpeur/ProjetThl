import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CitizenResultPagePage } from './citizen-result-page.page';

const routes: Routes = [
  {
    path: '',
    component: CitizenResultPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitizenResultPagePageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CitizenDeclarationPagePage } from './citizen-declaration-page.page';

const routes: Routes = [
  {
    path: '',
    component: CitizenDeclarationPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitizenDeclarationPagePageRoutingModule {}

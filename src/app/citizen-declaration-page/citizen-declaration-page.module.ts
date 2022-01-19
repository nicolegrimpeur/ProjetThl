import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CitizenDeclarationPagePageRoutingModule } from './citizen-declaration-page-routing.module';

import { CitizenDeclarationPagePage } from './citizen-declaration-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CitizenDeclarationPagePageRoutingModule
  ],
  declarations: [CitizenDeclarationPagePage]
})
export class CitizenDeclarationPagePageModule {}

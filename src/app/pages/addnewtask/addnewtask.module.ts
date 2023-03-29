import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddnewtaskPageRoutingModule } from './addnewtask-routing.module';

import { AddnewtaskPage } from './addnewtask.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddnewtaskPageRoutingModule
  ],
  declarations: [AddnewtaskPage]
})
export class AddnewtaskPageModule {}

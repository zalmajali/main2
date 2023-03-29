import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddnewtaskorderPageRoutingModule } from './addnewtaskorder-routing.module';

import { AddnewtaskorderPage } from './addnewtaskorder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddnewtaskorderPageRoutingModule
  ],
  declarations: [AddnewtaskorderPage]
})
export class AddnewtaskorderPageModule {}

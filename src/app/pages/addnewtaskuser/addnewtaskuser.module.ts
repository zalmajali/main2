import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddnewtaskuserPageRoutingModule } from './addnewtaskuser-routing.module';

import { AddnewtaskuserPage } from './addnewtaskuser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddnewtaskuserPageRoutingModule
  ],
  declarations: [AddnewtaskuserPage]
})
export class AddnewtaskuserPageModule {}

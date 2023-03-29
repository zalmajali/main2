import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotpassswordPageRoutingModule } from './forgotpasssword-routing.module';

import { ForgotpassswordPage } from './forgotpasssword.page';
import {AboutComponent} from "../about/about.component";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotpassswordPageRoutingModule
  ],
  declarations: [ForgotpassswordPage,AboutComponent],
  entryComponents:[AboutComponent]
})
export class ForgotpassswordPageModule {}

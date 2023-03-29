import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncomingrepliesPageRoutingModule } from './incomingreplies-routing.module';

import { IncomingrepliesPage } from './incomingreplies.page';
import {SeemessageComponent} from "../seemessage/seemessage.component";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncomingrepliesPageRoutingModule
  ],
  declarations: [IncomingrepliesPage,SeemessageComponent],
  entryComponents:[SeemessageComponent]
})
export class IncomingrepliesPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendpointuserPageRoutingModule } from './sendpointuser-routing.module';

import { SendpointuserPage } from './sendpointuser.page';
import {AlertdataComponent} from "../alertdata/alertdata.component";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendpointuserPageRoutingModule
  ],
  declarations: [SendpointuserPage,AlertdataComponent],
  entryComponents:[AlertdataComponent]
})
export class SendpointuserPageModule {}

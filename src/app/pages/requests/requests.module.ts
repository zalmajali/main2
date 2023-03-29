import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestsPageRoutingModule } from './requests-routing.module';

import { RequestsPage } from './requests.page';
import {RequestsfilterComponent} from "../requestsfilter/requestsfilter.component";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestsPageRoutingModule
  ],
  declarations: [RequestsPage,RequestsfilterComponent],
  entryComponents:[RequestsfilterComponent]
})
export class RequestsPageModule {}

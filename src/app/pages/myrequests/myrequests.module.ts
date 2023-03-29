import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyrequestsPageRoutingModule } from './myrequests-routing.module';

import { MyrequestsPage } from './myrequests.page';
import {RequestsfilterComponent} from "../requestsfilter/requestsfilter.component";
import {CancelledreasonComponent} from "../cancelledreason/cancelledreason.component";
import {OperationsComponent} from "../operations/operations.component";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyrequestsPageRoutingModule
  ],
  declarations: [MyrequestsPage,RequestsfilterComponent,CancelledreasonComponent,OperationsComponent],
  entryComponents:[RequestsfilterComponent,CancelledreasonComponent,OperationsComponent]
})
export class MyrequestsPageModule {}

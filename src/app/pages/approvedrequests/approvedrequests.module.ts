import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApprovedrequestsPageRoutingModule } from './approvedrequests-routing.module';

import { ApprovedrequestsPage } from './approvedrequests.page';
import {RequestsfilterComponent} from "../requestsfilter/requestsfilter.component";
import {CancelledreasonComponent} from "../cancelledreason/cancelledreason.component";
import {OperationsComponent} from "../operations/operations.component";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApprovedrequestsPageRoutingModule
  ],
  declarations: [ApprovedrequestsPage,RequestsfilterComponent,CancelledreasonComponent,OperationsComponent],
  entryComponents:[RequestsfilterComponent,CancelledreasonComponent,OperationsComponent]
})
export class ApprovedrequestsPageModule {}

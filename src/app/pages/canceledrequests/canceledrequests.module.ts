import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CanceledrequestsPageRoutingModule } from './canceledrequests-routing.module';

import { CanceledrequestsPage } from './canceledrequests.page';
import {RequestsfilterComponent} from "../requestsfilter/requestsfilter.component";
import {CancelledreasonComponent} from "../cancelledreason/cancelledreason.component";
import {OperationsComponent} from "../operations/operations.component";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CanceledrequestsPageRoutingModule
  ],
  declarations: [CanceledrequestsPage,RequestsfilterComponent,CancelledreasonComponent,OperationsComponent],
  entryComponents:[RequestsfilterComponent,CancelledreasonComponent,OperationsComponent]
})
export class CanceledrequestsPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProcessingrequestsPageRoutingModule } from './processingrequests-routing.module';

import { ProcessingrequestsPage } from './processingrequests.page';
import {RequestsfilterComponent} from "../requestsfilter/requestsfilter.component";
import {CancelledreasonComponent} from "../cancelledreason/cancelledreason.component";
import {OperationsComponent} from "../operations/operations.component";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProcessingrequestsPageRoutingModule
  ],
  declarations: [ProcessingrequestsPage,RequestsfilterComponent,CancelledreasonComponent,OperationsComponent],
  entryComponents:[RequestsfilterComponent,CancelledreasonComponent,OperationsComponent]
})
export class ProcessingrequestsPageModule {}

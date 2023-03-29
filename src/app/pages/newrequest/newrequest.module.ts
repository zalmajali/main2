import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewrequestPageRoutingModule } from './newrequest-routing.module';

import { NewrequestPage } from './newrequest.page';
import {RequestsfilterComponent} from "../requestsfilter/requestsfilter.component";
import {CancelledreasonComponent} from "../cancelledreason/cancelledreason.component";
import {OperationsComponent} from "../operations/operations.component";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewrequestPageRoutingModule
  ],
  declarations: [NewrequestPage,RequestsfilterComponent,CancelledreasonComponent,OperationsComponent],
  entryComponents:[RequestsfilterComponent,CancelledreasonComponent,OperationsComponent]
})
export class NewrequestPageModule {}

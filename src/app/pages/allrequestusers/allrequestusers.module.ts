import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllrequestusersPageRoutingModule } from './allrequestusers-routing.module';

import { AllrequestusersPage } from './allrequestusers.page';
import {RequestsfilteruserComponent} from "../requestsfilteruser/requestsfilteruser.component";
import {CancelledreasonComponent} from "../cancelledreason/cancelledreason.component";
import {OperationsComponent} from "../operations/operations.component";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllrequestusersPageRoutingModule
  ],
  declarations: [AllrequestusersPage,RequestsfilteruserComponent,CancelledreasonComponent,OperationsComponent],
  entryComponents:[RequestsfilteruserComponent,CancelledreasonComponent,OperationsComponent]
})
export class AllrequestusersPageModule {}

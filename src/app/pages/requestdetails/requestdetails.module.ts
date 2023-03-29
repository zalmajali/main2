import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestdetailsPageRoutingModule } from './requestdetails-routing.module';

import { RequestdetailsPage } from './requestdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestdetailsPageRoutingModule
  ],
  declarations: [RequestdetailsPage]
})
export class RequestdetailsPageModule {}

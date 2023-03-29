import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestsfinishedPageRoutingModule } from './requestsfinished-routing.module';

import { RequestsfinishedPage } from './requestsfinished.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestsfinishedPageRoutingModule
  ],
  declarations: [RequestsfinishedPage]
})
export class RequestsfinishedPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnerequestPageRoutingModule } from './onerequest-routing.module';

import { OnerequestPage } from './onerequest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnerequestPageRoutingModule
  ],
  declarations: [OnerequestPage]
})
export class OnerequestPageModule {}

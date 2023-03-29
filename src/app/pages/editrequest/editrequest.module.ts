import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditrequestPageRoutingModule } from './editrequest-routing.module';

import { EditrequestPage } from './editrequest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditrequestPageRoutingModule
  ],
  declarations: [EditrequestPage]
})
export class EditrequestPageModule {}

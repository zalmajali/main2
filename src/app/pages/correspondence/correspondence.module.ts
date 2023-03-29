import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CorrespondencePageRoutingModule } from './correspondence-routing.module';

import { CorrespondencePage } from './correspondence.page';
import {CorrespondenceaddComponent} from "../correspondenceadd/correspondenceadd.component";
import {SeemessageComponent} from "../seemessage/seemessage.component";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CorrespondencePageRoutingModule
  ],
  declarations: [CorrespondencePage,CorrespondenceaddComponent,SeemessageComponent],
  entryComponents:[CorrespondenceaddComponent,SeemessageComponent]
})
export class CorrespondencePageModule {}

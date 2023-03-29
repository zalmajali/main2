import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CorrespondencetasksPageRoutingModule } from './correspondencetasks-routing.module';

import { CorrespondencetasksPage } from './correspondencetasks.page';
import {CorrespondenceaddtaskComponent} from "../correspondenceaddtask/correspondenceaddtask.component";
import {SeemessageComponent} from "../seemessage/seemessage.component";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CorrespondencetasksPageRoutingModule
  ],
  declarations: [CorrespondencetasksPage,CorrespondenceaddtaskComponent,SeemessageComponent],
  entryComponents:[CorrespondenceaddtaskComponent,SeemessageComponent]
})
export class CorrespondencetasksPageModule {}

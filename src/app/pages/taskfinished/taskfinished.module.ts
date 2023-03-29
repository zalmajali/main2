import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskfinishedPageRoutingModule } from './taskfinished-routing.module';

import { TaskfinishedPage } from './taskfinished.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskfinishedPageRoutingModule
  ],
  declarations: [TaskfinishedPage]
})
export class TaskfinishedPageModule {}

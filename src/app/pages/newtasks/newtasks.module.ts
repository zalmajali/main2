import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewtasksPageRoutingModule } from './newtasks-routing.module';

import { NewtasksPage } from './newtasks.page';
import {TasksfilterComponent} from "../tasksfilter/tasksfilter.component";
import {TasksoperationsComponent} from "../tasksoperations/tasksoperations.component";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewtasksPageRoutingModule
  ],
  declarations: [NewtasksPage,TasksfilterComponent,TasksoperationsComponent],
  entryComponents:[TasksfilterComponent,TasksoperationsComponent]
})
export class NewtasksPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlltasksPageRoutingModule } from './alltasks-routing.module';

import { AlltasksPage } from './alltasks.page';
import {TasksfilterComponent} from "../tasksfilter/tasksfilter.component";
import {TasksoperationsComponent} from "../tasksoperations/tasksoperations.component";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlltasksPageRoutingModule
  ],
  declarations: [AlltasksPage,TasksfilterComponent,TasksoperationsComponent],
  entryComponents:[TasksfilterComponent,TasksoperationsComponent]
})
export class AlltasksPageModule {}

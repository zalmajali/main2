import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgresstasksPageRoutingModule } from './progresstasks-routing.module';

import { ProgresstasksPage } from './progresstasks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgresstasksPageRoutingModule
  ],
  declarations: [ProgresstasksPage]
})
export class ProgresstasksPageModule {}

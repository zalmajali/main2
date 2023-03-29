import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinishedtasksPageRoutingModule } from './finishedtasks-routing.module';

import { FinishedtasksPage } from './finishedtasks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinishedtasksPageRoutingModule
  ],
  declarations: [FinishedtasksPage]
})
export class FinishedtasksPageModule {}

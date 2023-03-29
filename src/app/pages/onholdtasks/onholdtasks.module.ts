import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnholdtasksPageRoutingModule } from './onholdtasks-routing.module';

import { OnholdtasksPage } from './onholdtasks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnholdtasksPageRoutingModule
  ],
  declarations: [OnholdtasksPage]
})
export class OnholdtasksPageModule {}

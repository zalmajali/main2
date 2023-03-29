import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobsdetailsPageRoutingModule } from './jobsdetails-routing.module';

import { JobsdetailsPage } from './jobsdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobsdetailsPageRoutingModule
  ],
  declarations: [JobsdetailsPage]
})
export class JobsdetailsPageModule {}

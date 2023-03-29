import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcessingrequestsPage } from './processingrequests.page';

const routes: Routes = [
  {
    path: '',
    component: ProcessingrequestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcessingrequestsPageRoutingModule {}

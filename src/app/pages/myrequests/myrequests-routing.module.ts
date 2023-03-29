import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyrequestsPage } from './myrequests.page';

const routes: Routes = [
  {
    path: '',
    component: MyrequestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyrequestsPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApprovedrequestsPage } from './approvedrequests.page';

const routes: Routes = [
  {
    path: '',
    component: ApprovedrequestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApprovedrequestsPageRoutingModule {}

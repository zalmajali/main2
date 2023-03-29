import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanceledrequestsPage } from './canceledrequests.page';

const routes: Routes = [
  {
    path: '',
    component: CanceledrequestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CanceledrequestsPageRoutingModule {}

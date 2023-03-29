import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestsfinishedPage } from './requestsfinished.page';

const routes: Routes = [
  {
    path: '',
    component: RequestsfinishedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestsfinishedPageRoutingModule {}

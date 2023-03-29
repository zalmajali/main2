import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestdetailsPage } from './requestdetails.page';

const routes: Routes = [
  {
    path: '',
    component: RequestdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestdetailsPageRoutingModule {}

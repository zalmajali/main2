import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllrequestPage } from './allrequest.page';

const routes: Routes = [
  {
    path: '',
    component: AllrequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllrequestPageRoutingModule {}

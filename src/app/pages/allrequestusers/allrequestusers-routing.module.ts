import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllrequestusersPage } from './allrequestusers.page';

const routes: Routes = [
  {
    path: '',
    component: AllrequestusersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllrequestusersPageRoutingModule {}

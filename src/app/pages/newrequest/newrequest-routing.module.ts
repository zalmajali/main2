import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewrequestPage } from './newrequest.page';

const routes: Routes = [
  {
    path: '',
    component: NewrequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewrequestPageRoutingModule {}

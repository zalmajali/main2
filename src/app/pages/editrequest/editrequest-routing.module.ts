import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditrequestPage } from './editrequest.page';

const routes: Routes = [
  {
    path: '',
    component: EditrequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditrequestPageRoutingModule {}

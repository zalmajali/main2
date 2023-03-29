import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnerequestPage } from './onerequest.page';

const routes: Routes = [
  {
    path: '',
    component: OnerequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnerequestPageRoutingModule {}

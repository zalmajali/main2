import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddnewtaskuserPage } from './addnewtaskuser.page';

const routes: Routes = [
  {
    path: '',
    component: AddnewtaskuserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddnewtaskuserPageRoutingModule {}

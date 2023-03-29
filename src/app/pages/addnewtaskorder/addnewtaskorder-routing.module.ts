import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddnewtaskorderPage } from './addnewtaskorder.page';

const routes: Routes = [
  {
    path: '',
    component: AddnewtaskorderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddnewtaskorderPageRoutingModule {}

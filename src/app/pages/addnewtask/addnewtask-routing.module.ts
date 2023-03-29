import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddnewtaskPage } from './addnewtask.page';

const routes: Routes = [
  {
    path: '',
    component: AddnewtaskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddnewtaskPageRoutingModule {}

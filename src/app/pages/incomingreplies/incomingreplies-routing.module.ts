import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncomingrepliesPage } from './incomingreplies.page';

const routes: Routes = [
  {
    path: '',
    component: IncomingrepliesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncomingrepliesPageRoutingModule {}

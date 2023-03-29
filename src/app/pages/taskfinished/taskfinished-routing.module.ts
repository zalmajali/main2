import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskfinishedPage } from './taskfinished.page';

const routes: Routes = [
  {
    path: '',
    component: TaskfinishedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskfinishedPageRoutingModule {}

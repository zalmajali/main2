import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgresstasksPage } from './progresstasks.page';

const routes: Routes = [
  {
    path: '',
    component: ProgresstasksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgresstasksPageRoutingModule {}

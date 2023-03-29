import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinishedtasksPage } from './finishedtasks.page';

const routes: Routes = [
  {
    path: '',
    component: FinishedtasksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinishedtasksPageRoutingModule {}

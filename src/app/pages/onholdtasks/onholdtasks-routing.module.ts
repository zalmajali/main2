import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnholdtasksPage } from './onholdtasks.page';

const routes: Routes = [
  {
    path: '',
    component: OnholdtasksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnholdtasksPageRoutingModule {}

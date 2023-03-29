import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewtasksPage } from './newtasks.page';

const routes: Routes = [
  {
    path: '',
    component: NewtasksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewtasksPageRoutingModule {}

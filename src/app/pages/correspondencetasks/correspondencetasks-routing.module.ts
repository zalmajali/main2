import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CorrespondencetasksPage } from './correspondencetasks.page';

const routes: Routes = [
  {
    path: '',
    component: CorrespondencetasksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorrespondencetasksPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlltasksPage } from './alltasks.page';

const routes: Routes = [
  {
    path: '',
    component: AlltasksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlltasksPageRoutingModule {}

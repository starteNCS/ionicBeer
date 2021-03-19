import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateBeerPage } from './create-beer.page';

const routes: Routes = [
  {
    path: '',
    component: CreateBeerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateBeerPageRoutingModule {}

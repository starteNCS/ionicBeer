import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeerInfoPage } from './beer-info.page';

const routes: Routes = [
  {
    path: '',
    component: BeerInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeerInfoPageRoutingModule {}

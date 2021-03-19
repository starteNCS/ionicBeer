import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeersPage } from './beers.page';

const routes: Routes = [
  {
    path: '',
    component: BeersPage
  },
  {
    path: 'create-beer',
    loadChildren: () => import('./subpages/create-beer/create-beer.module').then( m => m.CreateBeerPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeersPageRoutingModule {}

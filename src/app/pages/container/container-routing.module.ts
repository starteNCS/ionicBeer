import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContainerPage } from './container.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'beers'
  },
  {
    path: '',
    component: ContainerPage,
    children: [
      {
        path: 'statistics',
        loadChildren: () => import('./statistics/statistics.module').then( m => m.StatisticsPageModule)
      },
      {
        path: 'beers',
        loadChildren: () => import('./beers/beers.module').then( m => m.BeersPageModule)
      },
      {
        path: 'groups',
        loadChildren: () => import('./groups/groups.module').then( m => m.GroupsPageModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContainerPageRoutingModule {}

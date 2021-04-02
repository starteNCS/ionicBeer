import { FavouritesComponent } from './favourites/favourites.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatisticsPageRoutingModule } from './statistics-routing.module';

import { StatisticsPage } from './statistics.page';
import { TypesComponent } from './types/types.component';
import { ChartsModule } from 'ng2-charts';
import { FavouriteTypesComponent } from './favourite-types/favourite-types.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatisticsPageRoutingModule,
    ChartsModule
  ],
  declarations: [
    StatisticsPage,
    TypesComponent,
    FavouritesComponent,
    FavouriteTypesComponent
  ]
})
export class StatisticsPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeersPageRoutingModule } from './beers-routing.module';

import { BeersPage } from './beers.page';
import { BeerCardComponent } from './components/beer-card/beer-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeersPageRoutingModule
  ],
  declarations: [
    BeersPage,
    BeerCardComponent
  ]
})
export class BeersPageModule {}

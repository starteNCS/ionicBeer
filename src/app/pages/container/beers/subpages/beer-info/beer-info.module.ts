import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeerInfoPageRoutingModule } from './beer-info-routing.module';

import { BeerInfoPage } from './beer-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeerInfoPageRoutingModule
  ],
  declarations: [BeerInfoPage]
})
export class BeerInfoPageModule {}

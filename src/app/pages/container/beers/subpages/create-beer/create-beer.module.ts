import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateBeerPageRoutingModule } from './create-beer-routing.module';

import { CreateBeerPage } from './create-beer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateBeerPageRoutingModule
  ],
  declarations: [CreateBeerPage]
})
export class CreateBeerPageModule {}

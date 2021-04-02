import { FavouriteTypeModel } from './../models/favourite-type.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-favourite-types',
  templateUrl: './favourite-types.component.html',
  styleUrls: ['./favourite-types.component.scss'],
})
export class FavouriteTypesComponent {

  @Input() favourites: FavouriteTypeModel[];

}

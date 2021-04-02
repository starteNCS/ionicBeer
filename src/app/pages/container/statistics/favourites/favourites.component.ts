import { RatingModel } from './../../../../utils/models/beer/rating.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent {

  @Input() ratings: RatingModel[];

}

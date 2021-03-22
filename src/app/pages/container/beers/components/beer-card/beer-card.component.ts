import firebase from 'firebase';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-beer-card',
  templateUrl: './beer-card.component.html',
  styleUrls: ['./beer-card.component.scss'],
})
export class BeerCardComponent implements OnInit {

  @Input() manufacturer: string;
  @Input() name: string;
  @Input() type: number;
  @Input() hasOwnRating: boolean;
  @Input() rating: number;
  @Input() average: number;

  public typeString: string;

  constructor() { }

  async ngOnInit() {
    const type = await firebase.database().ref(`beers/types/${this.type}`).get();
    this.typeString = type.val() as string;
  }

}

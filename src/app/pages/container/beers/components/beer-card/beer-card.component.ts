import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-beer-card',
  templateUrl: './beer-card.component.html',
  styleUrls: ['./beer-card.component.scss'],
})
export class BeerCardComponent implements OnInit {

  @Input() manufacturer: string;
  @Input() name: string;
  @Input() type: string;
  @Input() hasOwnRating: string;
  @Input() rating: number;
  @Input() average: number;


  constructor() { }

  ngOnInit() {}

}

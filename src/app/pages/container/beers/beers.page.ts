import { BeerModel } from './../../../utils/models/beer/beer.model';
import firebase from 'firebase';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.page.html',
  styleUrls: ['./beers.page.scss'],
})
export class BeersPage implements OnInit {

  public loading: boolean = false;
  public availableBeers: BeerModel[] = [];

  constructor() { }

  async ngOnInit() {
    await this.loadData();
  }

  async loadData(): Promise<void> {
    this.loading = true;
    const beers = (await firebase.database().ref('beers/products').get()).val();
    for (let key in beers) {
      this.availableBeers.push(beers[key]);
    }
    console.log(this.availableBeers)
    this.loading = false;
  }

}

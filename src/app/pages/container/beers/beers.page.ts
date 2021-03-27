import { Subject } from 'rxjs';
import { BeerModel } from './../../../utils/models/beer/beer.model';
import { Component, OnInit } from '@angular/core';
import { debounceTime, switchMap } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.page.html',
  styleUrls: ['./beers.page.scss'],
})
export class BeersPage implements OnInit {

  private searchTextSubject = new Subject<string>();

  public loading: boolean = false;
  public availableBeers: BeerModel[] = [];

  constructor(private readonly fireDatabase: AngularFireDatabase) { }

  async ngOnInit() {
    await this.loadData("");

    this.searchTextSubject
      .pipe(debounceTime(150), switchMap(async (text: string) => {
        await this.loadData(text);
      })).subscribe();
  }

  async loadData(searchText: string): Promise<void> {
    this.loading = true;
    this.availableBeers = [];
    const beers = (await this.fireDatabase.database.ref('beers/products').get()).val();
    for (let key in beers) {
      const beer = beers[key] as BeerModel;
      if(searchText === ""){
        this.availableBeers.push(beer);
        continue;
      }
      if(beer.name.toLowerCase().includes(searchText.toLowerCase()) ||
          beer.manufacturer.toLowerCase().includes(searchText.toLowerCase()) ){
        this.availableBeers.push(beers[key]);
      }
    }
    this.loading = false;
  }

  searchTextChange(text: string): void {
    this.searchTextSubject.next(text);
  }

}

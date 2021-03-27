import { BeerEntity } from './../../../utils/entities/beer.entity';
import { AngularFirestore, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.page.html',
  styleUrls: ['./beers.page.scss'],
})
export class BeersPage implements OnInit {

  private searchTextSubject = new Subject<string>();

  public loading: boolean = false;
  public availableBeers: QueryDocumentSnapshot<BeerEntity>[] = [];

  constructor(
    private readonly firestore: AngularFirestore) { }

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

    this.firestore.collection<BeerEntity>('beers').get().subscribe(beers => {
      if (searchText === '') {
        this.availableBeers = beers.docs;
        return;
      }

      this.availableBeers = beers.docs.filter(x => this.checkIfSearchTextIsEqual(x.data().name, searchText) || this.checkIfSearchTextIsEqual(x.data().manufracturer, searchText));
    });
    this.loading = false;
  }

  searchTextChange(text: string): void {
    this.searchTextSubject.next(text);
  }

  private checkIfSearchTextIsEqual(given: string, search: string): boolean {
    return given.toLowerCase().includes(search.toLowerCase());
  }
}

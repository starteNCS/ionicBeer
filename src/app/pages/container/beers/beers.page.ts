import { BeerModel } from './../../../utils/models/beer/beer.model';
import { BeerEntity } from './../../../utils/entities/beer.entity';
import { AngularFirestore, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { debounceTime, switchMap } from 'rxjs/operators';
import { RatingEntity } from 'src/app/utils/entities/rating.entity';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.page.html',
  styleUrls: ['./beers.page.scss'],
})
export class BeersPage implements OnInit {

  private searchTextSubject = new Subject<string>();

  public loading: boolean = false;
  public availableBeers: BeerModel[] = [];
  public userRatings: QueryDocumentSnapshot<RatingEntity>[] = [];

  constructor(
    private readonly firestore: AngularFirestore,
    private readonly fireAuth: AngularFireAuth) { }

  async ngOnInit() {
    await this.synchronizeRatings();
    this.loadData("");

    this.searchTextSubject
      .pipe(debounceTime(150))
      .subscribe((text: string) => {
        this.loadData(text);
      });
  }

  loadData(searchText: string): void {
    this.loading = true;
    this.availableBeers = [];

    this.firestore.collection<BeerEntity>('beers').get().pipe(switchMap(async beers => {
      let result = beers.docs;
      if (searchText !== '') {
        result = beers.docs.
          filter(x => this.checkIfSearchTextIsEqual(x.data().name, searchText) || this.checkIfSearchTextIsEqual(x.data().manufracturer, searchText));
        return;
      }

      result.forEach(async beer => {
        debugger;
        this.availableBeers.push(new BeerModel(
          beer.id,
          beer.data().type.id,
          beer.data().manufracturer,
          beer.data().name,
          this.userRatings.find(x => x.data().beer.id === beer.id)?.data().rating,
          await this.calculateAverage(beer.id)
        ));
      });
    })).subscribe();
    this.loading = false;
  }

  async synchronizeRatings(): Promise<void> {
    const user = await this.fireAuth.currentUser;
    this.firestore.collection<RatingEntity>('ratings', ref => ref.where('user', '==', user.uid)).get().subscribe(ratings => {
      this.userRatings = ratings.docs;
    });
  }

  calculateAverage(beerId: string): number {
    let sum = 0;
    let ratingsSize = 0;
    const ratingsForBeer = this.firestore.collection<RatingEntity>('ratings', ref => ref.where('beer', '==', beerId)).get();
    ratingsForBeer.subscribe(ratings => {
      ratingsSize = ratings.size;
      ratings.forEach(rating => {
        sum += rating.data().rating;
      });
    });
    return sum / ratingsSize;
  }

  searchTextChange(text: Event): void {
    this.searchTextSubject.next((text.target as HTMLInputElement).value);
  }

  clearInput(): void {
    this.searchTextSubject.next('');
  }

  private checkIfSearchTextIsEqual(given: string, search: string): boolean {
    return given.toLowerCase().includes(search.toLowerCase());
  }
}

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
      debugger;
      let result = beers.docs;
      if (searchText !== '') {
        result = beers.docs.
          filter(x => this.checkIfSearchTextIsEqual(x.data().name, searchText) || this.checkIfSearchTextIsEqual(x.data().manufracturer, searchText));
      }

      result.forEach(async beer => {
        this.availableBeers.push(new BeerModel(
          beer.id,
          beer.data().type.id,
          beer.data().manufracturer,
          beer.data().name,
          +this.userRatings.find(x => x.data().beer.id === beer.id)?.data().rating,
          await this.calculateAverage(beer.id)
        ));
      });
      this.loading = false;
    })).subscribe();
  }

  async synchronizeRatings(): Promise<void> {
    const user = await this.fireAuth.currentUser;
    this.firestore.collection<RatingEntity>('ratings', ref => ref.where('user', '==', user.uid)).get().subscribe(ratings => {
      this.userRatings = ratings.docs;
    });
  }

  async calculateAverage(beerId: string): Promise<number> {
    let sum = 0;
    let ratingsSize = 0;
    let beerReference = this.firestore.collection('beers').doc(beerId);
    const ratingsForBeer = await this.firestore
      .collection<RatingEntity>('ratings', ref => ref.where('beer', '==', beerReference.ref))
      .get()
      .toPromise();
    ratingsSize = ratingsForBeer.size;
    ratingsForBeer.forEach(rating => {
      sum += +rating.data().rating;
    });
    const average = sum / ratingsSize;
    return Number.isNaN(average) ? -1 : average;
  }

  searchTextChange(text: Event): void {
    this.searchTextSubject.next((text.target as HTMLInputElement).value);
  }

  clearInput(): void {
    this.searchTextSubject.next('');
  }

  isNaN(test: number): boolean {
    return Number.isNaN(test);
  }

  private checkIfSearchTextIsEqual(given: string, search: string): boolean {
    return given.toLowerCase().includes(search.toLowerCase());
  }
}

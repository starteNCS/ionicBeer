import { RatingModel } from './../../../utils/models/beer/rating.model';
import { RatingEntity } from './../../../utils/entities/rating.entity';
import { BeerEntity } from './../../../utils/entities/beer.entity';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {

  private allRatedBeers: RatingModel[] = [];

  loading: boolean;
  favourites: RatingModel[];


  constructor(
    private readonly fireStore: AngularFirestore,
    private readonly fireAuth: AngularFireAuth) { }

  async ngOnInit() {
    this.loadAllRatedBeers().then(data => {
      this.allRatedBeers = data;
      this.calculateFavourite();
    }).catch(err => {
      debugger;
    })
  }

  private calculateFavourite(): void {
    const copy = this.allRatedBeers;
    copy.sort((a, b) => b.rating - a.rating);
    this.favourites = copy.slice(0, 3);
  }

  private async loadAllRatedBeers(): Promise<RatingModel[]> {
    this.loading = true;
    const user = await this.fireAuth.currentUser;
    const ratings = await this.fireStore
      .collection<RatingEntity>('ratings', ref => ref.where('user', '==', user.uid))
      .get()
      .toPromise();

    const ratingsModels: RatingModel[] = [];
    for await (let rating of ratings.docs) {
      ratingsModels.push({
        rating: rating.data().rating,
        ratedAt: rating.data().ratedAt,
        beer: (await rating.data().beer.get()).data()
      });
    }

    this.loading = false;
    return ratingsModels;
  }

}

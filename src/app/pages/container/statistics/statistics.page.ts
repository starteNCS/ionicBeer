import { Label, SingleDataSet, Color } from 'ng2-charts';
import { TypeEntity } from './../../../utils/entities/type.entity';
import { BeerStatModel } from './../../../utils/models/beer/beer-stat.model';
import { RatingModel } from './../../../utils/models/beer/rating.model';
import { RatingEntity } from './../../../utils/entities/rating.entity';
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

  typePieChartLabels: Label[] = [];
  typePieChartValues: SingleDataSet = [];
  typePieChartColors: Color[] = [];

  constructor(
    private readonly fireStore: AngularFirestore,
    private readonly fireAuth: AngularFireAuth) { }

  async ngOnInit() {
    this.loadAllRatedBeers().then(data => {
      this.allRatedBeers = data;
      this.calculateTypePieChart();
      this.calculateFavourite();
    }).catch(err => {
      console.log(err);
    })
  }

  async calculateTypePieChart(): Promise<void> {
    const types = await this.fireStore.collection<TypeEntity>('types').get().toPromise();

    types.forEach(type => {
      const countForCurrentType = this.allRatedBeers.filter(x => x.beer.type.id == type.id).length;
      if(countForCurrentType === 0) {
        return;
      }
      this.typePieChartLabels.push(type.data().name);
      this.typePieChartValues.push(countForCurrentType);
    });
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
      const beerEntity = await rating.data().beer.get();
      const typeEntity = (await beerEntity.data().type.get());
      const beerModel: BeerStatModel = {
        manufracturer: beerEntity.data().manufracturer,
        name: beerEntity.data().name,
        type: {
          id: typeEntity.id,
          name: typeEntity.data().name
        } 
      }
      ratingsModels.push({
        rating: rating.data().rating,
        ratedAt: rating.data().ratedAt,
        beer: beerModel
      });
    }

    this.loading = false;
    return ratingsModels;
  }

}

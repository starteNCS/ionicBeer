import { TypeModel } from './../../../utils/models/beer/type.model';
import { Label, SingleDataSet, Color } from 'ng2-charts';
import { TypeEntity } from './../../../utils/entities/type.entity';
import { BeerStatModel } from './../../../utils/models/beer/beer-stat.model';
import { RatingModel } from './../../../utils/models/beer/rating.model';
import { RatingEntity } from './../../../utils/entities/rating.entity';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FavouriteTypeModel } from './models/favourite-type.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {

  private allRatedBeers: RatingModel[] = [];

  loading: boolean;

  favourites: RatingModel[];

  favouriteTypes: FavouriteTypeModel[] = [];

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
      this.calculateFavouriteTypes();
    }).catch(err => {
      console.log(err);
    })
  }

  async calculateFavouriteTypes(): Promise<void> {
    const types = await this.fireStore.collection<TypeEntity>('types').get().toPromise();
    
    types.forEach(type => {
      const ratedTypes = this.allRatedBeers.filter(item => item.beer.type.id === type.id);
      const size = ratedTypes.length;
      if(size === 0){return;}
      let sum = 0;
      ratedTypes.forEach((x) => sum += +x.rating);
      this.favouriteTypes.push({
        name: type.data().name,
        rating: sum / size,
        count: size
      });
    });

    this.favouriteTypes.sort((a, b) => b.rating - a.rating);
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
    this.typePieChartLabels = this.typePieChartLabels.slice(0, 6);
    this.typePieChartValues = this.typePieChartValues.slice(0, 6);
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

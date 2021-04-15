import { UserEntity } from './../../../../../utils/entities/user.entity';
import { BeerRatingViewModel } from './../../models/beer-rating.view-model';
import { RatingEntity } from './../../../../../utils/entities/rating.entity';
import { BeerEntity } from './../../../../../utils/entities/beer.entity';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-beer-info',
  templateUrl: './beer-info.page.html',
  styleUrls: ['./beer-info.page.scss'],
})
export class BeerInfoPage implements OnInit {

  Math = Math;

  beerId: string;
  beer: BeerEntity;
  ratings: BeerRatingViewModel[] = [];
  ownRating: RatingEntity;
  ownRatingId: string;
  average: number;
  ratingDiff: number;
  user: firebase.default.User;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly firestore: AngularFirestore,
    private readonly fireAuth: AngularFireAuth,
    private readonly alertController: AlertController
  ) { }

  async ngOnInit() {
    this.beerId = this.route.snapshot.paramMap.get('id');
    this.user = await this.fireAuth.currentUser;

    await this.loadInfo();
  }

  async rate(): Promise<void> {
    const alert = await this.alertController.create({
      header: `${this.beer.manufracturer} ${this.beer.name} bewerten`,
      message: 'Mit einer Zahl zwischen 0 und 10 bewerten',
      backdropDismiss: true,
      inputs: [
        {
          name: 'rating',
          type: 'number',
          min: 0,
          max: 10,
          placeholder: 'Bewertung',
          value: this.ownRating.rating
        }
      ],
      buttons: [
        {
          text: 'Speichern',
          handler: async (alertData) => {
            await this.editRating(alertData.rating)
          }
        }
      ]
    });

    await alert.present();
  }

  async editRating(rating: number): Promise<void> {
    this.firestore.collection<RatingEntity>('ratings').doc(this.ownRatingId).update({
        rating,
        ratedAt: new Date()
      }).then(async () => await this.loadInfo());
  }

  async loadInfo(): Promise<void> {
    this.ratings = [];
    const beerRef = this.firestore.collection<BeerEntity>('beers').doc(this.beerId);
    const beerSnapshot = await beerRef.get().toPromise();
    this.beer = beerSnapshot.data();

    const ratingsSnapshot = await this.firestore
      .collection<RatingEntity>('ratings', ref => ref.where('beer', '==', beerRef.ref))
      .get().toPromise();

    let ratingSum: number = 0;
    let users: string[] = [];
    ratingsSnapshot.forEach(rating => {
      const data = rating.data();
      this.ratings.push({
        name: data.user,
        rating: data.rating
      });
      users.push(data.user);
      if (data.user == this.user.uid) {
        this.ownRating = data;
        this.ownRatingId = rating.id;
      }
      ratingSum += +data.rating;
    });

    const usersSnapshot = await this.firestore
      .collection<UserEntity>('users', ref => ref.where('__name__', 'in', users))
      .get().toPromise();

    usersSnapshot.forEach(user => {
      this.ratings.find(rating => rating.name == user.id).name = user.data().name;
    });

    this.average = ratingSum / ratingsSnapshot.size;
    if (this.ownRating) {
      this.ratingDiff = this.ownRating.rating - this.average;
    }
  }

}

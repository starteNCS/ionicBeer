import { RatingEntity } from './../utils/entities/rating.entity';
import { TypeEntity } from './../utils/entities/type.entity';
import { BeerEntity } from './../utils/entities/beer.entity';
import { AngularFirestore } from '@angular/fire/firestore';
import { BeerStateModel } from './models/beer-state.model';
import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Router } from '@angular/router';
import { Beer } from './actions/beer.actions';
import { AngularFireAuth } from '@angular/fire/auth';

@State<BeerStateModel>({
    name: 'BeerState',
    defaults: {
        loadingOperations: 0,
    }
})
@Injectable()
export class BeerState {

    @Selector()
    static loading(state: BeerStateModel): boolean {
        return state.loadingOperations > 0;
    }

    constructor(
        private readonly router: Router,
        private readonly firestore: AngularFirestore,
        private readonly fireAuth: AngularFireAuth) { }

    @Action(Beer.Create)
    async createBeer(context: StateContext<BeerStateModel>, action: Beer.Create): Promise<void> {
        this.patchLoadingOperations(context, +1);

        const beer: BeerEntity = {
            type: this.firestore.doc<TypeEntity>(`types/${action.type}`).ref,
            manufracturer: action.manufractuer,
            name: action.name
        };

        this.firestore.collection('beers').add(beer)
            .then(() => context.dispatch(new Beer.CreateSuccess()))
            .catch((reason) => context.dispatch(new Beer.CreateFail(reason)))
            .finally(() => this.patchLoadingOperations(context, -1));
    }

    @Action(Beer.CreateSuccess)
    createBeerSuccess(context: StateContext<BeerStateModel>): void {
        this.router.navigateByUrl('/');
    }

    @Action(Beer.Rate)
    async rateBeer(context: StateContext<BeerStateModel>, action: Beer.Rate): Promise<void> {
        this.patchLoadingOperations(context, +1);

        if(!action.rating || action.rating < 0 || action.rating > 10){
            context.dispatch(new Beer.RateFail('Bitte bewerte das Bier mit einem Wert zwischen 0 und 10'));
            return;
        }

        const rating: RatingEntity = {
            beer: this.firestore.doc<BeerEntity>(`beers/${action.beerId}`).ref,
            ratedAt: new Date(),
            rating: action.rating,
            user: (await this.fireAuth.currentUser).uid
        };

        this.firestore.collection('ratings').add(rating)
            .then(() => context.dispatch(new Beer.RateSuccess()))
            .catch((reason) => context.dispatch(new Beer.RateFail(reason)))
            .finally(() => this.patchLoadingOperations(context, -1));
    }

    private patchLoadingOperations(context: StateContext<BeerStateModel>, by: number): void {
        context.patchState({ loadingOperations: context.getState().loadingOperations + by });
    }

}
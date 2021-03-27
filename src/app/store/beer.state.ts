import { BeerStateModel } from './models/beer-state.model';
import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Router } from '@angular/router';
import { Beer } from './actions/beer.actions';
import { BeerModel } from '../utils/models/beer/beer.model';
import { AngularFireDatabase } from '@angular/fire/database';

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
        private readonly fireDatabase: AngularFireDatabase) { }

    @Action(Beer.Create)
    async createBeer(context: StateContext<BeerStateModel>, action: Beer.Create): Promise<void> {
        this.patchLoadingOperations(context, +1);

        const beer: BeerModel = {
            type: action.type,
            manufacturer: action.manufractuer,
            name: action.name
        };

        this.fireDatabase.database.ref('beers/products').push(
            beer,
            (error?) => {
                this.patchLoadingOperations(context, -1);
                if (error) {
                    context.dispatch(new Beer.CreateFail(error.message));
                    return;
                }
                context.dispatch(new Beer.CreateSuccess());
            });
    }

    @Action(Beer.CreateSuccess)
    createBeerSuccess(context: StateContext<BeerStateModel>): void {
        this.router.navigateByUrl('/');
    }

    @Action(Beer.Rate)
    async rateBeer(context: StateContext<BeerStateModel>, action: Beer.Rate): Promise<void> {
        this.patchLoadingOperations(context, +1);

        
    }

    private patchLoadingOperations(context: StateContext<BeerStateModel>, by: number): void {
        context.patchState({ loadingOperations: context.getState().loadingOperations + by });
    }

}
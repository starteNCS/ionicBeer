import firebase from 'firebase';
import { UserStateModel } from './models/user-state.model';
import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { User } from './actions/user.actions';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@State<UserStateModel>({
    name: 'UserState',
    defaults: {
        loadingOperations: 0,
        currentUser: null,
    }
})
@Injectable()
export class UserState {

    @Selector()
    static loading(state: UserStateModel): boolean {
        return state.loadingOperations > 0;
    }

    constructor(
        private readonly router: Router,
        private readonly firebaseAuth: AngularFireAuth
    ) { }

    @Action(User.Create)
    async createUser(context: StateContext<UserStateModel>, action: User.Create): Promise<void> {
        this.patchLoadingOperations(context, +1);

        await this.firebaseAuth
            .createUserWithEmailAndPassword(action.email, action.password)
            .then((response: firebase.auth.UserCredential) => {
                firebase.auth().currentUser.updateProfile({
                    displayName: action.createUserModel.name
                });
                this.router.navigateByUrl('/');
            }, (error) => {
                context.dispatch(new User.RegisterFail("Beim Erstellen deines Kontos ist ein Fehler aufgetreten: " + error.message));
                return;
            }).finally(() => this.patchLoadingOperations(context, -1))
        
    }

    private patchLoadingOperations(context: StateContext<UserStateModel>, by: number): void {
        context.patchState({ loadingOperations: context.getState().loadingOperations + by });
    }

}
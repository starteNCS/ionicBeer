import { UserService } from './../utils/services/user.service';
import { ResponseService } from './../utils/services/response.service';
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
        private readonly responseService: ResponseService,
        private readonly userService: UserService,
        private readonly router: Router,
        private readonly firebaseAuth: AngularFireAuth
    ) { }

    @Action(User.Create)
    async createUser(context: StateContext<UserStateModel>, action: User.Create): Promise<void> {
        this.patchLoadingOperations(context, +1);

        await this.firebaseAuth
            .createUserWithEmailAndPassword(action.email, action.password)
            .then((response: firebase.default.auth.UserCredential) => {
                const createdUser = response.user;
                this.responseService.handleStoreRequest(
                    this.userService.createUser(createdUser.uid, action.createUserModel),
                    () => new User.CreateSuccess(action.createUserModel.name),
                    (errors) => new User.CreateFail("Du wurdest erfolgreich registriert, allerdings trat beim Speichern deines Namens ein Fehler auf. Bitte trage diesen nach.")
                );
                this.router.navigateByUrl('/');
            }, (error) => {
                context.dispatch(new User.RegisterFail("Beim Erstellen deines Kontos ist ein Fehler aufgetreten: " + error.message));
                return;
            }).finally(() => this.patchLoadingOperations(context, -1))
        
    }

    @Action(User.CreateSuccess)
    createUserSuccess(context: StateContext<UserStateModel>, action: User.CreateSuccess): void {
        context.patchState({currentUser: {
            name: action.name
        }});
    }

    private patchLoadingOperations(context: StateContext<UserStateModel>, by: number): void {
        context.patchState({ loadingOperations: context.getState().loadingOperations + by });
    }

}
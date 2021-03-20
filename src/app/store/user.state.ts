import { UserStateModel } from './models/user-state.model';
import { Injectable } from "@angular/core";
import { State } from "@ngxs/store";

@State<UserStateModel>({
    name: 'UserState',
    defaults: {
        loadingOperations: 0
    }
})
@Injectable()
export class UserState {

}
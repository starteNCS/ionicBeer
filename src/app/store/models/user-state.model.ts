import { UserModel } from './../../utils/models/user/user.model';
export interface UserStateModel {
    loadingOperations: number;
    currentUser: UserModel;
}
import { CreateUserModel } from './../../pages/auth/models/create-user.model';
import { FailToastAction } from './../../utils/actions/fail-toast.action';

export namespace User {

    export class RegisterFail extends FailToastAction {
        static readonly type = '[User] RegisterFail';
        constructor(error: unknown){
            super(error);
        }
    }

    export class LoginFail extends FailToastAction {
        static readonly type = '[User] LoginFail';
        constructor(error: unknown){
            super(error);
        }
    }

    export class Create {
        static readonly type = '[User] Create';
        constructor(public email: string, public password: string, public createUserModel: CreateUserModel){}
    }

    export class CreateSuccess {
        static readonly type = '[User] Create';
        constructor(public name: string){}
    }

    export class CreateFail extends FailToastAction {
        static readonly type = '[User] Create';
        constructor(errors: unknown){
            super(errors);
        }
    }

}
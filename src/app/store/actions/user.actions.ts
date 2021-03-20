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

}
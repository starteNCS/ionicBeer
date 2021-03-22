import { FailToastAction } from './../../utils/actions/fail-toast.action';
export namespace Beer {

    export class Create {
        static readonly type = '[Beer] Create';
        constructor(public type: number, public manufractuer: string, public name: string) {}
    }

    export class CreateSuccess {
        static readonly type = '[Beer] CreateSuccess';
    }

    export class CreateFail extends FailToastAction {
        static readonly type = '[Beer] CreateFail';
        constructor(errors: unknown){
            super(errors);
        }
    }

}
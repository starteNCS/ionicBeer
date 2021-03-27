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

    export class Rate {
        static readonly type = '[Beer] Rate';
        constructor(public beerId: string, public rating: number) {}
    }

    export class RateSuccess {
        static readonly type = '[Beer] RateSuccess';
    }

    export class RateFail extends FailToastAction {
        static readonly type = '[Beer] RateFail';
        constructor(errors: unknown) {
            super(errors);
        }
    }
}
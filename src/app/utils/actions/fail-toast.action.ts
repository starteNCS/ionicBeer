import { HttpErrorResponse } from '@angular/common/http';
import { ToastModel } from '../models/toast.model';
import { IToastAction } from './toast-action.interface';

export class FailToastAction implements IToastAction {

    constructor(private errors: unknown) { }

    getToastData(): ToastModel {
        const baseMessage: ToastModel = {
            title: 'Es ist ein Fehler aufgetreten',
            message: ''
        };

        if(typeof this.errors === 'string'){
            baseMessage.message = this.errors;
            return baseMessage;
        }

        const httpError = this.errors as HttpErrorResponse;
        if (httpError.error && httpError.error.errors instanceof Array) {
            baseMessage.message = httpError.error.errors.map(x => x.errorMessage).join(', ');
            return baseMessage;
        }

        baseMessage.message = `${httpError.status}: ${httpError.message.substr(0, 30)}...`;
        return baseMessage;
    }
}

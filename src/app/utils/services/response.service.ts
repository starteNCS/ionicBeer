import { FailToastAction } from './../actions/fail-toast.action';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { asapScheduler, Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
    providedIn: 'root'
})
export class ResponseService {

    constructor(private readonly store: Store) { }

    async handleApiResponse<DataType, ErrorMessageType extends FailToastAction>(
        action: Observable<ApiResponse<DataType>>,
        onSuccess: (data: DataType) => void | Promise<void>,
        getErrorAction: (error: string[] | unknown) => ErrorMessageType,
        onOperationEnded?: () => void): Promise<void> {

        try {
            const response: ApiResponse<DataType> = await action.toPromise();

            if (response.success) {
                await onSuccess(response.data);
            } else {
                this.handleError(getErrorAction, response.errors);
            }
        } catch (error) {
            this.handleError(getErrorAction, error);
        } finally {
            if (onOperationEnded) {
                onOperationEnded();
            }
        }
    }

    async handleStoreRequest<DataType, SuccessMessageType, ErrorMessageType extends FailToastAction>(
        request: Observable<ApiResponse<DataType>>,
        getSuccessAction: (data: DataType) => SuccessMessageType,
        getErrorAction: (error: string[] | unknown) => ErrorMessageType,
        onOperationEnded?: () => void): Promise<void> {

        try {
            const response: ApiResponse<DataType> = await request.toPromise();

            if (response.success) {
                const action: SuccessMessageType = getSuccessAction(response.data);
                asapScheduler.schedule(() => this.store.dispatch(action));
            } else {
                this.handleError(getErrorAction, response.errors);
            }
        } catch (error) {
            this.handleError(getErrorAction, error);
        } finally {
            if (onOperationEnded) {
                onOperationEnded();
            }
        }
    }

    private handleError<ErrorMessageType extends FailToastAction>(
        getErrorAction: (error: string[] | unknown) => ErrorMessageType,
        errors: string[] | unknown): void {

        if (!getErrorAction) {
            return;
        }

        const notification: ErrorMessageType = getErrorAction(errors);

        if (!notification) {
            return;
        }

        asapScheduler.schedule(() => this.store.dispatch(notification));
    }

}
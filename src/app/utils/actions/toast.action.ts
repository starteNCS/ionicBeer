import { ToastModel } from "../models/toast.model";
import { IToastAction } from "./toast-action.interface";

export class ToastAction implements IToastAction {

    constructor(public toastrModel: ToastModel) {

    }

    getToastData(): ToastModel {
        return this.toastrModel;
    }

}

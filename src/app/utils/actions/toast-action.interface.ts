import { ToastModel } from "../models/toast.model";

export interface IToastAction {
    getToastData(): ToastModel;
}

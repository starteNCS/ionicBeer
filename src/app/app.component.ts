import { IToastAction } from './utils/actions/toast-action.interface';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Actions } from '@ngxs/store';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private readonly actions$: Actions,
    private readonly toastController: ToastController) {}

  ngOnInit(): void {

    this.actions$.subscribe((action: { status: string, action: IToastAction }) => {
      this.showToast(action);
    });
  }

  async showToast(action: { status: string, action: IToastAction }): Promise<void> {
    if (action.status !== 'SUCCESSFUL') {
      return;
    }

    if (!action.action || !action.action.getToastData) {
      return;
    }

    const toastData = action.action.getToastData();
    if (!toastData) {
      if (!environment.production) {
        console.log('No Toastinformation found');
      }
      return;
    }

    const toast = await this.toastController.create({
      header: toastData.title,
      animated: true,
      duration: 5000,
      position: "top",
      message: toastData.message,
      translucent: true
    });
    toast.present();
  }
}

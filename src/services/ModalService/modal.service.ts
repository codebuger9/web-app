import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private modalController: ModalController) {}

  async presentModal(
    component: any,
    params?: any,
    onDismissHandler?: any,
    cssClass?: string
  ) {
    const modal = await this.modalController.create({
      component: component,
      componentProps: params,
      cssClass: cssClass
    });

    modal.onDidDismiss().then((data: any) => {
      if (onDismissHandler) {
        onDismissHandler(data);
      }
    });

    return await modal.present();
  }

  dismiss(data?: any) {
    this.modalController.dismiss(data);
  }
}

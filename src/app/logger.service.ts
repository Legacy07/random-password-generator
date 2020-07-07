import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class LoggerService {
  constructor(private toastController: ToastController) {}

  public async success(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: "success",
    });
    toast.present();
  }

  public async error(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: "danger",
    });
    toast.present();
  }
}

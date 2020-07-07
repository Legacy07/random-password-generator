import { Component } from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";
import { SelectCategoryComponent } from '../select-category/select-category.component';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  public selectedCategories: Array<string>;
  public generated: boolean;

  constructor(
    private alertController: AlertController,
    private modalController: ModalController
  ) {
    this.selectedCategories = ["Science", "Technology", "Nature"];
  }

  async showCategoryInfoAlert() {
    const alert = await this.alertController.create({
      header: "Selecting Categories",
      message:
        "Select categories that you think would resonate with your profession/hobby. This will increase the likelihood of remembering the words.",
      buttons: ["Informed!"],
    });

    await alert.present();
  }

  async openSelectCategoryModal() {
    const modal = await this.modalController.create({
      component: SelectCategoryComponent,
      componentProps: {
      }
    });
    return await modal.present();
  }
}

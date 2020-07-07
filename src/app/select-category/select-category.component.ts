import { Component, OnInit } from "@angular/core";
import {
  ModalController,
  ToastController,
  AlertController,
} from "@ionic/angular";
import { LoggerService } from "../logger.service";

@Component({
  selector: "app-select-category",
  templateUrl: "./select-category.component.html",
  styleUrls: ["./select-category.component.scss"],
})
export class SelectCategoryComponent implements OnInit {
  public categories: Array<string>;
  public selectedCategories: Array<string>;

  public numberOfCategories = 4;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController
  ) {
    this.categories = new Array<string>();
    this.selectedCategories = new Array<string>();

    this.categories = [
      "Technology",
      "Science",
      "Nature",
      "Art",
      "Music",
      "Automotive",
      "Celebrities",
      "Space",
      "Food",
      "Finance",
      "Business",
      "Animals",
      "Movies",
      "Games",
      "Sport",
      "Brand",
      "Countries",
      "Body Parts",
      "Currencies",
      "Materials",
      "Places",
      "Books",
    ];
  }

  ngOnInit() {}

  public isSelectedCategory(category: string): boolean {
    return this.selectedCategories.includes(category);
  }

  public addToSelectedCategories(category: string) {
    if (this.selectedCategories.includes(category)) {
      this.removeFromSelectedCategories(category);
    } else if (this.selectedCategories.length < this.numberOfCategories) {
      this.selectedCategories.push(category);
    }
  }

  public removeFromSelectedCategories(category: string) {
    this.selectedCategories = this.selectedCategories.filter(
      (c) => c !== category
    );
  }

  public closeModal(): void {
    if (this.selectedAllCategories()) {
      this.dismissModal();
    } else {
      this.alertForBackingOut();
    }
  }

  public dismissModal(): void {
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  public selectedAllCategories(): boolean {
    return this.selectedCategories.length === this.numberOfCategories;
  }

  async alertForBackingOut() {
    const alert = await this.alertController.create({
      header: "Backing out",
      message:
        "You havent picked all your categories, are you sure you want to go back?",
      buttons: [
        {
          text: "Yes",
          handler: () => {
            this.dismissModal();
          },
        },
        {
          text: "Cancel",
          role: "cancel",
        },
      ],
    });

    await alert.present();
  }
}

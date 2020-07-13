import { Component, OnInit, Input } from "@angular/core";
import { ModalController, AlertController } from "@ionic/angular";
import { GeneratePasswordService } from '../generate-password.service';

@Component({
  selector: "app-select-category",
  templateUrl: "./select-category.component.html",
  styleUrls: ["./select-category.component.scss"],
})
export class SelectCategoryComponent implements OnInit {
  public categories: Array<string>;
  @Input() selectedCategories: Array<string>;
  @Input() numberOfCategories: number;

  public currentSelectedCategories: Array<string>;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
  ) {
  }

  ngOnInit() {
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

    this.currentSelectedCategories = JSON.parse(JSON.stringify(this.selectedCategories));
  }

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
      selectedCategories: this.selectedCategories
    });
  }

  public selectedAllCategories(): boolean {
    return this.selectedCategories.length == this.numberOfCategories;
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
            this.selectedCategories = this.currentSelectedCategories;
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

import { Component } from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";
import { SelectCategoryComponent } from "../select-category/select-category.component";
import { GeneratePasswordService } from "../generate-password.service";
import { Clipboard } from "@ionic-native/clipboard/ngx";
import { LoggerService } from "../logger.service";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  public selectedCategories: Array<string>;
  public selectedNumberOfWords: any;
  public generated: boolean;

  public generatedPassword = "";
  public chosenWords: {};

  constructor(
    private alertController: AlertController,
    private modalController: ModalController,
    private generatePasswordService: GeneratePasswordService,
    private clipboard: Clipboard,
    private loggerService: LoggerService,
    private socialSharing: SocialSharing
  ) {}

  ngOnInit(): void {
    this.selectedCategories = new Array<string>();
    this.selectedNumberOfWords = "4";
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
        selectedCategories: this.selectedCategories,
        numberOfCategories: this.selectedNumberOfWords,
      },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    this.selectedCategories = data["selectedCategories"];
  }

  public generatePassword() {
    this.generatedPassword = "";

    this.chosenWords = this.generatePasswordService.generateRandomPasswordByChosenCategories(
      this.selectedCategories
    );

    this.generated = true;

    for (var key of Object.keys(this.chosenWords)) {
      this.generatedPassword =
        this.makePassword(this.chosenWords[key]) + this.generatedPassword;
    }
  }

  public refreshWord(category: string, word: string) {
    var chosenWord = this.generatePasswordService.generateRandomPasswordByChosenCategories(
      [category]
    );
    var replaceWord = chosenWord[category];
    var replacePassword = this.makePassword(replaceWord);

    this.generatedPassword = this.generatedPassword.replace(
      this.makePassword(word),
      replacePassword
    );

    for (var key of Object.keys(this.chosenWords)) {
      if (key === category) {
        this.chosenWords[key] = replaceWord;
      }
    }
  }

  private makePassword(word: string): string {
    return word.toLowerCase().replace(/ /g, "");
  }

  public async copyToClipboard() {
    this.clipboard.copy(this.generatedPassword).then(() => {
      this.loggerService.info("Copied password to clipboard!");
    }).catch(() => {
      this.loggerService.error("Unable to copy to clipboard!")
    });
  }

  public async shareEmail() {
    // create encrypted txt file that can be opened by the generated password
    this.socialSharing.canShareViaEmail().then(() => {
      this.socialSharing
        .shareViaEmail("", "Random Generated Password", ["recipient@example.org"])
        .then(() => {
          this.loggerService.success("Sent email!");
        })
        .catch(() => {
          this.loggerService.error("Unable to share");
        });
    });
  }
}

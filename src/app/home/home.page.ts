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
  public chosenWords: Map<any, any>;

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
    this.selectedCategories = this.selectedCategories.sort();
  }

  public generatePassword() {
    this.generatedPassword = "";

    this.chosenWords = this.generatePasswordService.generateRandomPasswordByChosenCategories(
      this.selectedCategories
    );

    this.generated = true;

    for (var word of this.chosenWords) {
      this.generatedPassword =
        this.generatedPassword + this.makePassword(word[1]);
    }
  }

  public refreshWord(category: string, word: string) {
    var chosenWord: Map<
      any,
      any
    > = this.generatePasswordService.generateRandomPasswordByChosenCategories([
      category,
    ]);
    var replaceWord = chosenWord.get(category);
    var replacePassword = this.makePassword(replaceWord);

    this.generatedPassword = this.generatedPassword.replace(
      this.makePassword(word),
      replacePassword
    );

    for (var w of this.chosenWords.entries()) {
      if (w[0] === category) {
        this.chosenWords.delete(category);
        this.chosenWords.set(category, replaceWord);
        break;
      }
    }
  }

  private makePassword(word: string): string {
    return word.toLowerCase().replace(/ /g, "");
  }

  public async copyToClipboard() {
    this.clipboard
      .copy(this.generatedPassword)
      .then(() => {
        this.loggerService.info("Copied password to clipboard!");
      })
      .catch((res) => {
        this.loggerService.error("Unable to copy to clipboard!");
      });
  }

  public async shareEmail() {
    // create encrypted txt file that can be opened by the generated password
    this.socialSharing.canShareViaEmail().then(() => {
      this.socialSharing
        .shareViaEmail("", "Random Generated Password", [
          "recipient@example.org",
        ])
        .then(() => {
          this.loggerService.success("Sent email!");
        })
        .catch((res) => {
          this.loggerService.error("Unable to share: " + res);
        });
    });
  }
}

import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class GeneratePasswordService {

  constructor(private databaseService: DatabaseService) { }

  public generateRandomPasswordByChosenCategories(chosenCategories: Array<string>) : {} {
    var words = [];

    chosenCategories.forEach(category => {
      var categoryLength = this.databaseService.getCategoryLength(category);
      var randomIndex = this.randomNumber(0, categoryLength - 1);

      var chosenWord = this.getWordByIndex(randomIndex, category);
      words[category] = chosenWord;
    });

    return words;
  }

  private randomNumber(min: number, max: number) : number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private getWordByIndex(randomIndex: number, category: string) : string {
    return this.databaseService.getCategoryWord(randomIndex, category);
  }
}

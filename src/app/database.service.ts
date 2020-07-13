import { Injectable } from "@angular/core";
import localDb from "../assets/db.json";

@Injectable({
  providedIn: "root",
})
export class DatabaseService {
  private categoryWords;

  constructor() {
    let jsonDb = JSON.stringify(localDb);
    var parsedJson = JSON.parse(jsonDb);

    this.categoryWords = {};
    for (var key of Object.keys(parsedJson)) {
      var category = parsedJson[key];
      this.categoryWords[key] = category;
    }
  }

  getCategoryLength(category: string): number {
    var foundCategory = this.findCategory(category);
    return Object.keys(foundCategory).length;
  }

  getCategoryWord(randomIndex: number, category: string): string {
    var foundCategory = this.findCategory(category);
    return foundCategory[randomIndex];
  }

  findCategory(category: string): any {
    for (var key of Object.keys(this.categoryWords)) {
      if (category === key) {
        return this.categoryWords[key][0];
      }
    }
  }
}

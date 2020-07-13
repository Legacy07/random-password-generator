export interface ICategoryWords {
  CategoryToWords: Record<string, Array<string>>;
}

export class CategoryWords implements ICategoryWords {
  constructor(public CategoryToWords: Record<string, Array<string>>) {}

  public static defaultInstance(): CategoryWords {
    return new CategoryWords(undefined);
  }
}

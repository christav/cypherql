// Support code for managing the data for the categories query
// The core json database isn't set up for this, so we need
// to rearrange stuff to do it ourselves

import { Ability } from '../csrd';

// Representation of a category itself
export class JsonCategory {
  name: string;
  low: Ability[];
  mid: Ability[];
  high: Ability[];

  constructor(name: string) {
    this.name = name;
    this.low = [];
    this.mid = [];
    this.high = [];
  }
}

// And a collection of categories
export class JsonCategories {
  // categories collection
  categories: {
    [categoryName: string]: JsonCategory;
  }

  constructor(abilities: Ability[]) {
    this.categories = {};
    abilities.forEach((a) => this.addAbility(a));
  }

  getCategory(name: string): JsonCategory {
    if (!this.categories[name]) {
      this.categories[name] = new JsonCategory(name);
    }
    return this.categories[name];
  }

  addAbility(ability: Ability): JsonCategories {
    ability.category.forEach((categoryName) => {
      const category = this.getCategory(categoryName);
      switch (ability.tier) {
        case 'Low':
          category.low.push(ability);
          break;
        case 'Mid':
          category.mid.push(ability);
          break;
        case 'High':
          category.high.push(ability);
          break;
      }
    });
    return this;
  }

  entries() {
    return Object.values(this.categories);
  }
}

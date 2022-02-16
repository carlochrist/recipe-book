import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     // 1,
  //     'A tasty Schnitzel',
  //     'Just awesome!',
  //     'https://upload.wikimedia.org/wikipedia/commons/3/37/Schnitzel-Mit-Pommes.jpg',
  //     [new Ingredient('Meat', 1), new Ingredient('French fries', 20)]
  //   ),
  //   new Recipe(
  //     // 2,
  //     'Big fat burger',
  //     "You won't believe how tasty it is!",
  //     'https://img.chefkoch-cdn.de/rezepte/1287261234164379/bilder/917534/crop-960x640/wuerzige-hamburger.jpg',
  //     [
  //       new Ingredient('Buns', 1),
  //       new Ingredient('Meat', 1),
  //       new Ingredient('Tomato', 2),
  //       new Ingredient('Salad', 1),
  //     ]
  //   ),
  // ];
  private recipes: Recipe[] = [];

  constructor(private store: Store<fromShoppingList.AppState>) {}

  getRecipes() {
    // only get a copy of recipes with slice
    return this.recipes.slice();
  }

  // getRecipe(id: number) {
  //   return this.recipes.find((recipe) => recipe.id === id);
  // }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    // this.shoppingListService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(newRecipes: Recipe[]) {
    this.recipes = newRecipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}

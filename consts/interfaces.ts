export type Recipe = {
  title: string;
  ingredients: string;
  steps: string;
  prepTime: number;
  cookingTime: number;
  servings: number;
  imageUrl: string;
  calories: number;
  isVegetarian: string | boolean;
  creatorId: number;
};

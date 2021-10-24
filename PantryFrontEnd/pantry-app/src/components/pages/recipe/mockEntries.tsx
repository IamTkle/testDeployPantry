export interface ingredient_id {
  name: string;
  id: number;
}

export type Recipe = {
  rid: number;
  name: string;
  ingredients: ingredient_id[];
  availIngredients?: string[];
  img: string;
};

// export const browseRecipes: Recipe[] = [
//   {
//     rid: 123457,
//     name: "wappy spagettee",
//     ingredients: ["Breat", "meed", "beeph", "shugir", "bols", "potatos"],
//     availIngredients: ["Breat", "meed", "beeph", "shugir", "bols"],
//     img: "https://spoonacular.com/recipeImages/73420-312x231.jpg",
//   },
// ];

// export const likedRecipes: Recipe[] = [
//   {
//     rid: 123457,
//     name: "wappy spagettee",
//     ingredients: ["Breat", "meed", "beeph", "shugir", "bols", "potatos"],
//     availIngredients: ["Breat", "meed", "beeph", "shugir", "bols"],
//     img: "https://spoonacular.com/recipeImages/73420-312x231.jpg",
//   },
// ];

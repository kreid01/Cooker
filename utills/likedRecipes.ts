import * as SecureStore from "expo-secure-store";

export const likeRecipe = async (id: number) => {
  try {
    const value = await SecureStore.getItemAsync("recipes");
    if (value) {
      const recipes = JSON.parse(value);
      alert(recipes);
      await SecureStore.setItemAsync(
        "recipes",
        JSON.stringify([...recipes, id])
      );
    }
  } catch (error) {
    return null;
  }
};

export const unlikeRecipe = async (id: number) => {
  try {
    const value = await SecureStore.getItemAsync("recipes");
    if (value) {
      const recipes = value.split(",");
      const index = recipes.indexOf(id.toString());
      const splicedRecipes = recipes.splice(index, 1);
      await SecureStore.setItemAsync("recipes", JSON.stringify(splicedRecipes));
    }
  } catch (error) {
    return null;
  }
};

export const getLikedRecipes = async () => {
  try {
    const value = await SecureStore.getItemAsync("recipes");
    if (value) {
      return await JSON.parse(value);
    }
  } catch (error) {
    return null;
  }
};

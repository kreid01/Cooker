import * as SecureStore from "expo-secure-store";

export const setLikedRecipe = async (values: any) => {
  alert(values);
  await SecureStore.setItemAsync("recipes", JSON.stringify(values));
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

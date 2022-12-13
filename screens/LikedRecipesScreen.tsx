import React from "react";
import { useQuery } from "react-query";
import { getLikedRecipes } from "../utills/likedRecipes";
import { Recipe } from "../consts/interfaces";
import { RecipeComponent } from "../components/RecipeComponent";
import { FlatList, View } from "native-base";

const getRecipes = async () => {
  const recipes = await getLikedRecipes();
  return recipes.toString();
};

export const LikedRecipesScreen = ({ navigation }: any) => {
  const { data } = useQuery(["recipes"], getRecipes);
  return (
    <View className="relative z-10 mt-5">
      <FlatList
        numColumns={2}
        renderItem={({ item }: { item: string }) => (
          <RecipeComponent id={item.toString()} navigation={navigation} />
        )}
        data={data}
      ></FlatList>
    </View>
  );
};

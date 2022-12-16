import React from "react";
import { useQuery } from "react-query";
import { getLikedRecipes } from "../utills/likedRecipes";
import { RecipeComponent } from "../components/RecipeComponent";
import { FlatList, View, Text, Spinner, Image } from "native-base";
import { useRefreshOnFocus } from "../hooks/useRefreshonFocus";
import { StyleSheet } from "react-native";
import { Header } from "../components/Header";

const getRecipes = async () => {
  const recipes = await getLikedRecipes();
  const list = await recipes
    .trim()
    .split(",")
    .filter((r: any) => r !== "");
  return await list;
};

export const LikedRecipesScreen = ({ navigation }: any) => {
  const { data, isSuccess, refetch } = useQuery(["recipes"], getRecipes);
  useRefreshOnFocus(refetch);

  return isSuccess && typeof data === "object" ? (
    <View className="relative z-10">
      <Header />
      <FlatList
        numColumns={2}
        renderItem={({ item, index }: { item: string; index: number }) => {
          return (
            <RecipeComponent
              key={index}
              id={item.toString()}
              navigation={navigation}
            />
          );
        }}
        data={data}
      ></FlatList>
    </View>
  ) : (
    <Spinner color="indigo.500" size="lg" className="mx-auto mt-10" />
  );
};

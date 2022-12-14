import { FlatList, View, Text, Button } from "native-base";
import React from "react";
import { useQuery } from "react-query";
import { getLikedRecipes } from "../utills/likedRecipes";
import { CalendarRecipe } from "./CalendarRecipe";
import { useState } from "react";
import { useRefreshOnFocus } from "../hooks/useRefreshonFocus";

const getRecipes = async () => {
  const recipes = await getLikedRecipes();
  const list = await recipes
    .trim()
    .split(",")
    .filter((r: any) => r !== "");
  return await list;
};

export const CalendarScreen = ({ navigation }: any) => {
  const { data, isSuccess, refetch } = useQuery(["recipes"], getRecipes);
  const [randomized, setRandomized] = useState(data);

  useRefreshOnFocus(refetch);

  const randomize = () => {
    const newArr = randomized
      .sort(() => Math.random() - Math.random())
      .slice(0, 7);
    alert(newArr);
    setRandomized(newArr);
  };

  return isSuccess && typeof data === "object" ? (
    <View className="relative z-10">
      <Button bgColor="#9D14FF" className="" onPress={() => randomize()}>
        Randomize
      </Button>
      <FlatList
        numColumns={3}
        renderItem={({ item, index }: { item: string; index: number }) => {
          return (
            <CalendarRecipe
              key={index}
              index={index}
              id={item.toString()}
              navigation={navigation}
            />
          );
        }}
        data={randomized}
      ></FlatList>
    </View>
  ) : (
    <Text>Loading...</Text>
  );
};

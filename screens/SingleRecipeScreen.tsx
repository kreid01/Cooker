import axios from "axios";
import { View, Text } from "native-base";
import { useQuery } from "react-query";
import React from "react";
//@ts-ignore
import ExpoFastImage from "expo-fast-image";

const getRecipe = async ({ queryKey }: any) => {
  const { data } = await axios.get(
    `http://192.168.0.73:4000/recipes/${parseInt(queryKey[1])}`
  );
  return data;
};

export const SingleRecipeScreen = ({ route, navigation }: any) => {
  const { id } = route.params;
  const { data, status } = useQuery(["recipes", id], getRecipe);

  if (status === "success") {
    const ingredients = data.ingredients.split(",").map((i: string) => {
      return <Text key={i}> - {i}</Text>;
    });

    return (
      <View>
        <ExpoFastImage
          cacheKey={data.id}
          className="mx-auto h-[60%] w-[100%]  object-scale-down"
          source={{
            uri: data.imageUrl,
          }}
        />

        <Text className="ml-5 font-bold text-3xl mt-5">{data.title}</Text>
        <View className="ml-5">
          <Text>Preparation Time: {data.prepTime} minutes</Text>
          <Text>Cooking Time: {data.cookingTime} minutes</Text>
          <Text>Servings: {data.servings}</Text>
          <Text>Calories {data.calories} kcals</Text>
          <View>
            <Text>Ingredients: </Text>
            {ingredients}
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
};

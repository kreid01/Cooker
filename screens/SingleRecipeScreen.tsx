import axios from "axios";
import { View, Text } from "native-base";
import { useQuery } from "react-query";
import React from "react";
//@ts-ignore
import ExpoFastImage from "expo-fast-image";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCutlery,
  faKitchenSet,
  faPlateWheat,
} from "@fortawesome/free-solid-svg-icons";

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

    const steps = data.steps.split(",").map((s: string, i: number) => {
      return (
        <Text key={i}>
          {" "}
          {i + 1}. {s}
        </Text>
      );
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
        <View className="mx-5 mt-5 p-5 bg-gray-200 ">
          <View className="flex flex-row justify-between">
            <Text fontSize="lg">
              <FontAwesomeIcon size={20} icon={faPlateWheat} /> Prep:{" "}
              {data.prepTime} minutes
            </Text>
            <Text fontSize="lg">
              <FontAwesomeIcon size={20} icon={faKitchenSet} />
              Cook: {data.cookingTime} minutes
            </Text>
          </View>
          <Text fontSize="lg" className="mx-auto mt-2">
            <FontAwesomeIcon size={20} icon={faCutlery} />
            <Text>
              {" "}
              {data.servings} {data.servings === 1 ? "serving" : "servings"}
            </Text>
          </Text>
          <View>
            <Text>Ingredients: </Text>
            {ingredients}
          </View>

          <View>
            <Text>Steps: </Text>
            {steps}
          </View>
          <Text>Calories {data.calories} kcals</Text>
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

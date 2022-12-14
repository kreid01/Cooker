import {
  faCutlery,
  faHeart,
  faKitchenSet,
  faPlateWheat,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import axios from "axios";
import { Button, ScrollView, Text, View } from "native-base";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
//@ts-ignore
import ExpoFastImage from "expo-fast-image";
import { getLikedRecipes, setLikedRecipe } from "../utills/likedRecipes";
import React from "react";

const getLikes = async () => {
  const recipes = await getLikedRecipes();
  return recipes.toString();
};
const getRecipe = async ({ queryKey }: any) => {
  const { data } = await axios.get(
    `http://ec2-44-203-24-124.compute-1.amazonaws.com/recipes/${parseInt(
      queryKey[1]
    )}`
  );
  return data;
};

const setRecipes = async (values: string) => {
  await setLikedRecipe(values);
};

export const SingleRecipeScreen = ({ route }: any) => {
  const { id } = route.params;
  const { data, status } = useQuery(["recipes", id], getRecipe);
  const { data: likedRecipes, isSuccess } = useQuery(["recipes"], getLikes);
  const [isLiked, setIsLiked] = useState(false);
  const { mutate } = useMutation(setRecipes);

  useEffect(() => {
    setIsLiked(likedRecipes.includes(id));
  }, [likedRecipes]);

  if (status === "success" && isSuccess) {
    const ingredients = data.ingredients
      .split(",")
      .map((ingredient: string, i: number) => {
        if (ingredient.length > 3) {
          return <Text key={i}> - {ingredient}</Text>;
        }
      });

    const steps = data.steps.split("@").map((s: string, i: number) => {
      return (
        <Text key={i}>
          {" "}
          {i + 1}. {s}
        </Text>
      );
    });

    const handleLiked = () => {
      setIsLiked(true);
      const newLikedRecipes = `${likedRecipes}${id},`;
      mutate(newLikedRecipes);
    };

    const handleUnlike = () => {
      setIsLiked(false);
      const newLikedRecipes = likedRecipes.replace(`${id},`, "");
      mutate(newLikedRecipes);
    };

    return (
      <ScrollView>
        <ExpoFastImage
          cacheKey={data.id}
          className="mx-auto h-[50vh] w-[100%]  object-scale-down"
          source={{
            uri: data.imageUrl,
          }}
        />
        <View className="flex flex-row">
          <Text className="ml-5 font-bold text-3xl mt-5 w-[70%]">
            {data.title}
          </Text>
          {isLiked ? (
            <Button
              onPress={() => handleUnlike()}
              className="bg-gray-300 rounded-full text-red-500 w-10 h-10 ml-auto mr-6 mt-2 self-center"
            >
              <FontAwesomeIcon color="red" size={20} icon={faHeart} />
            </Button>
          ) : (
            <Button
              onPress={() => handleLiked()}
              className="bg-gray-300 rounded-full w-10 h-10 ml-auto mr-6 mt-2 self-center"
            >
              <FontAwesomeIcon size={20} icon={faHeart} />
            </Button>
          )}
        </View>

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
            <Text className="font-bold">Ingredients: </Text>
            {ingredients}
          </View>

          <View>
            <Text className="font-bold">Steps: </Text>
            {steps}
          </View>
          <Text className="font-bold mt-5">
            Calories {data.calories} kcals per serving
          </Text>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
};

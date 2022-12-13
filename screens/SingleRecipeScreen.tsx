import axios from "axios";
import { View, Text, Button } from "native-base";
import { useMutation, useQuery } from "react-query";
import React, { useState } from "react";
//@ts-ignore
import ExpoFastImage from "expo-fast-image";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCutlery,
  faHeart,
  faKitchenSet,
  faPlateWheat,
} from "@fortawesome/free-solid-svg-icons";
import {
  getLikedRecipes,
  likeRecipe,
  unlikeRecipe,
} from "../utills/likedRecipes";

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

export const SingleRecipeScreen = ({ route }: any) => {
  const { id } = route.params;
  const { data, status } = useQuery(["recipes", id], getRecipe);
  const { data: likedRecipes, isSuccess } = useQuery(["recipes"], getLikes);

  if (status === "success" && isSuccess) {
    const ingredients = data.ingredients.split(",").map((i: string) => {
      return <Text key={i}> - {i}</Text>;
    });

    const [isLiked, setIsLiked] = useState(likedRecipes.includes(id));
    const steps = data.steps.split(",").map((s: string, i: number) => {
      return (
        <Text key={i}>
          {" "}
          {i + 1}. {s}
        </Text>
      );
    });

    const handleLiked = () => {
      setIsLiked(true);
      likeRecipe(id);
    };

    const handleUnlike = () => {
      setIsLiked(false);
      unlikeRecipe(id);
    };

    return (
      <View>
        <ExpoFastImage
          cacheKey={data.id}
          className="mx-auto h-[60%] w-[100%]  object-scale-down"
          source={{
            uri: data.imageUrl,
          }}
        />
        <View className="flex flex-row">
          <Text className="ml-5 font-bold text-3xl mt-5">{data.title}</Text>
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

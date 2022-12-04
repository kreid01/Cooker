import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Button, Image, Text, View } from "native-base";

const getRecipe = async () => {
  const { data } = await axios.get("http://192.168.0.73:4000/recipes?search=");
  return data;
};

export const HomeScreen = ({ navigation }: any) => {
  const { data, isSuccess } = useQuery("recipes", getRecipe);

  const recipes = isSuccess
    ? data.map((recipe: any) => {
        return (
          <View
            key={recipe.id}
            className="w-[48vw] rounded-md bg-gray-300 h-[27vh] m-1 p-2"
          >
            <Image source={{ uri: recipe.imageUrl }} className="h-48" alt="" />
            <Text className="text-lg font-bold  text-slate-700">
              {recipe.title}
            </Text>
          </View>
        );
      })
    : null;

  return (
    <View>
      <View className="flex flex-row">
        <Button onPress={() => navigation.navigate("Add Recipe")}>
          Add Recipe
        </Button>

        <Button onPress={() => navigation.navigate("Registration")}>
          Register
        </Button>
        <Button onPress={() => navigation.navigate("Login")}>Login</Button>
      </View>
      <View className="flex flex-row mt-2">{recipes}</View>
    </View>
  );
};

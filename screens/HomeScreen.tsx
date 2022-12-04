import React, { useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Image, Text, View } from "native-base";
import { Nav } from "../components/Nav";
import { getAccessToken } from "../utills/accessToken";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";
import { useRefreshOnFocus } from "../hooks/useRefreshonFocus";
import { useSetUser } from "../hooks/useSetUser";

const getRecipe = async () => {
  const { data } = await axios.get("http://192.168.0.73:4000/recipes?search=");
  return data;
};

export const HomeScreen = ({ navigation }: any) => {
  const { data, status } = useQuery("recipes", getRecipe);
  useSetUser();
  const recipes =
    status === "success"
      ? data.map((recipe: any) => {
          return (
            <View
              key={recipe.id}
              className="w-[48vw] rounded-md bg-gray-300 h-[27vh] m-1 p-2"
            >
              <Image
                source={{ uri: recipe.imageUrl }}
                className="h-44"
                alt=""
              />
              <Text className="text-lg font-bold  text-slate-700">
                {recipe.title}
              </Text>
            </View>
          );
        })
      : null;
  return (
    <View>
      <Nav navigation={navigation} />
      <View className="flex flex-row mt-2">{recipes}</View>
    </View>
  );
};

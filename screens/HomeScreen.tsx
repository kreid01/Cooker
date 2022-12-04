import React, { useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Image, StatusBar, Text, View } from "native-base";
import { Nav } from "../components/Nav";
import { useSetUser } from "../hooks/useSetUser";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const getRecipe = async () => {
  const { data } = await axios.get("http://192.168.0.73:4000/recipes?search=");
  return data;
};
const MyStatusBar = ({ ...props }) => (
  <View style={{ backgroundColor: "red" }}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={"red"} {...props} />
    </SafeAreaView>
  </View>
);

export const HomeScreen = ({ navigation }: any) => {
  const { data, status } = useQuery("recipes", getRecipe);
  useSetUser();
  const recipes =
    status === "success"
      ? data.map((recipe: any) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("Recipe", { id: recipe.id })}
              key={recipe.id}
              className="w-[46vw] rounded-md bg-gray-300 h-[27vh]  m-2"
            >
              <Image
                source={{ uri: recipe.imageUrl }}
                className="h-44 rounded-t-md"
                alt=""
              />
              <Text className="text-lg font-bold ml-1  text-slate-700">
                {recipe.title}
              </Text>
            </TouchableOpacity>
          );
        })
      : null;
  return (
    <View className="relative z-10">
      <Nav navigation={navigation} />
      <View className="flex flex-row flex-wrap">{recipes}</View>
    </View>
  );
};

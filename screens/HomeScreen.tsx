import React, { useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { FlatList, Image, StatusBar, Text, View } from "native-base";
import { RefreshControl } from "react-native";
import { Nav } from "../components/Nav";
import { TouchableOpacity } from "react-native";
import { useRefreshOnFocus } from "../hooks/useRefreshonFocus";
import { getAccessToken } from "../utills/accessToken";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";
import { Recipe } from "../consts/interfaces";
import { useIsFocused } from "@react-navigation/native";

const getRecipe = async () => {
  const { data } = await axios.get("http://192.168.0.73:4000/recipes?search=");
  return data;
};

const getUser = async () => {
  const token = await getAccessToken();
  const { data } = await axios.get("http://192.168.0.73:4000/users/auth", {
    headers: {
      authorization: "Bearer " + token,
    },
  });
  return await data;
};

export const HomeScreen = ({ navigation }: any) => {
  const { data, refetch, isFetching } = useQuery("recipes", getRecipe);
  const dispatch = useDispatch();
  const { data: user } = useQuery(["user"], getUser);

  useEffect(() => {
    dispatch(setUser(user));
  }, [user]);

  return (
    <View className="relative z-10">
      <Nav navigation={navigation} />
      <FlatList
        numColumns={2}
        renderItem={({ item, index }: { item: Recipe; index: number }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Recipe", { id: item.id })}
            key={item.id}
            className="w-[46vw] rounded-sm bg-gray-200 h-[27vh]  m-2"
          >
            <Image
              source={{ uri: item.imageUrl }}
              className="h-44 rounded-t-md"
              alt=""
            />
            <Text className="text-lg font-bold ml-1  text-slate-700">
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
        data={data}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
      ></FlatList>
    </View>
  );
};

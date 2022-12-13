import React, { useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { FlatList, Image, Text, View } from "native-base";
import { RefreshControl, TouchableOpacity } from "react-native";
import { getAccessToken } from "../utills/accessToken";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";
import { Recipe } from "../consts/interfaces";

const getRecipe = async () => {
  const { data } = await axios.get(
    "http://ec2-44-203-24-124.compute-1.amazonaws.com/recipes?search="
  );
  return data;
};

const getUser = async () => {
  const token = await getAccessToken();
  const { data } = await axios.get(
    "http://ec2-44-203-24-124.compute-1.amazonaws.com/users/auth",
    {
      headers: {
        authorization: "Bearer " + token,
      },
    }
  );
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
    <View className="relative z-10 mt-5">
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

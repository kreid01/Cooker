import axios from "axios";
import { FlatList, Input, View, Text } from "native-base";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Recipe } from "../consts/interfaces";
import { TouchableOpacity } from "react-native";
//@ts-ignore
import ExpoFastImage from "expo-fast-image";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faKitchenSet, faPlateWheat } from "@fortawesome/free-solid-svg-icons";

const searchRecipes = async ({ queryKey }: any) => {
  const { data } = await axios.get(
    `http://192.168.0.73:4000/recipes?search=${queryKey[1]}`
  );
  return data;
};

export const SearchScreen = ({ navigation }: any) => {
  const [search, setSearch] = useState("");
  const { data } = useQuery(["recipes", search], searchRecipes);

  return (
    <View className="mt-6">
      <View bgColor="#D6C9FF" h="12">
        <Input
          my="auto"
          mx={3}
          bg="white"
          className="focus:bg-white"
          onChangeText={(e) => setSearch(e)}
          placeholder={`Search`}
        ></Input>
      </View>
      <FlatList
        data={data}
        renderItem={({ item, index }: { item: Recipe; index: number }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Recipe", { id: item.id })}
            key={item.id}
            className="w-[95vw] flex flex-row rounded-md bg-gray-200 h-[10vh]  m-2"
          >
            <ExpoFastImage
              cacheKey={item.id}
              className=" h-[100%] w-[40%]  rounded-l-md object-scale-down"
              source={{
                uri: item.imageUrl,
              }}
            />
            <View>
              <Text className="text-lg font-bold ml-1 text-slate-800">
                {item.title}
              </Text>

              <View className="mt-auto mb-1 ml-1 flex justify-between">
                <Text fontSize="md" className="text-slate-800">
                  <FontAwesomeIcon size={15} icon={faPlateWheat} /> Prep:{" "}
                  {item.prepTime} minutes
                </Text>
                <Text fontSize="md">
                  <FontAwesomeIcon size={15} icon={faKitchenSet} />
                  Cook: {item.cookingTime} minutes
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

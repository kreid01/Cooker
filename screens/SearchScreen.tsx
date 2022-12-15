import { faKitchenSet, faPlateWheat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import axios from "axios";
import { FlatList, Input, Text, View } from "native-base";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { useQuery } from "react-query";
import { Recipe } from "../consts/interfaces";
import { useDebounce } from "../hooks/useDebounce";
import React from "react";
// @ts-ignore
import ExpoFastImage from "expo-fast-image";

const searchRecipes = async ({ queryKey }: any) => {
  if (queryKey[1] && queryKey[1].length > 0) {
    const { data } = await axios.get(
      `http://ec2-44-203-24-124.compute-1.amazonaws.com/recipes?search=${queryKey[1]}`
    );
    return data;
  }
};

export const SearchScreen = ({ navigation }: any) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const { data } = useQuery(["recipes", debouncedSearch], searchRecipes);

  return (
    <View>
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
            className="w-[95vw] flex flex-row rounded-md bg-gray-200 h-[12vh]  m-2"
          >
            <ExpoFastImage
              cacheKey={item.id}
              className=" h-[100%] w-[40%]  rounded-l-md object-scale-down"
              source={{
                uri: item.imageUrl,
              }}
            />
            <View>
              <Text className="text-lg font-bold ml-1 w-[70%] text-slate-800">
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

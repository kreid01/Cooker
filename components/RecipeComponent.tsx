import React from "react";
import axios from "axios";
import { Image, Text, Spinner } from "native-base";
import { useQuery } from "react-query";
import { TouchableOpacity } from "react-native";
//@ts-ignore
import ExpoFastImage from "expo-fast-image";

const getRecipe = async ({ queryKey }: any) => {
  const { data } = await axios.get(
    `http://ec2-44-203-24-124.compute-1.amazonaws.com/recipes/${parseInt(
      queryKey[1]
    )}`
  );
  return data;
};

interface Props {
  id: string;
  navigation: any;
}

export const RecipeComponent: React.FC<Props> = ({ navigation, id }: any) => {
  const { data: item, isSuccess } = useQuery(["recipes", id], getRecipe);

  return isSuccess ? (
    <TouchableOpacity
      onPress={() => navigation.navigate("Recipe", { id: item.id })}
      key={item.id}
      className="w-[46vw] rounded-sm bg-gray-200 h-[27vh] m-2"
    >
      <ExpoFastImage
        source={{
          uri: item.imageUrl,
        }}
        className="w-fit rounded-t-md h-44"
      />
      <Text className="text-lg font-bold ml-1  text-slate-700">
        {item.title}
      </Text>
    </TouchableOpacity>
  ) : (
    <Spinner color="indigo.500" size="lg" className="mx-auto mt-10" />
  );
};

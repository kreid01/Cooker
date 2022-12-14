import React from "react";
import axios from "axios";
import { Image, Text } from "native-base";
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
  index: number;
  navigation: any;
}

export const CalendarRecipe: React.FC<Props> = ({
  navigation,
  id,
  index,
}: any) => {
  const { data: item, isSuccess } = useQuery(["recipes", id], getRecipe);
  const dayOfWeek =
    index === 0
      ? "MONDAY"
      : index === 1
      ? "TUESDAY"
      : index === 2
      ? "WEDNESDAY"
      : index === 3
      ? "THRUSDAY"
      : index === 4
      ? "FRIDAY"
      : index === 5
      ? "SATURDAY"
      : "SUNDAY";

  return isSuccess ? (
    <TouchableOpacity
      onPress={() => navigation.navigate("Recipe", { id: item.id })}
      key={item.id}
      className="w-[29vw] rounded-sm bg-gray-200 h-[20vh] m-2"
    >
      <ExpoFastImage
        source={{
          uri: item.imageUrl,
        }}
        className="w-fit rounded-t-md h-24"
      />
      <Text className="font-bold ml-1  text-slate-700">{item.title}</Text>
      <Text className="text-slate-700 my-auto mx-auto font-bold text-lg">
        {dayOfWeek}
      </Text>
    </TouchableOpacity>
  ) : (
    <Text>Loading...</Text>
  );
};

import { FlatList, View, Image, Button, Spinner } from "native-base";
import React from "react";
import { useQuery } from "react-query";
import { getLikedRecipes } from "../utills/likedRecipes";
import { CalendarRecipe } from "../components/CalendarRecipe";
import { useRefreshOnFocus } from "../hooks/useRefreshonFocus";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";
import { Header } from "../components/Header";

const getRecipes = async () => {
  const recipes = await getLikedRecipes();
  const list = await recipes
    .trim()
    .split(",")
    .filter((r: any) => r !== "")
    .sort(() => Math.random() - Math.random())
    .slice(0, 7);
  return await list;
};

export const CalendarScreen = ({ navigation }: any) => {
  const { data, isSuccess, refetch } = useQuery(["recipes"], getRecipes);
  const dispatch = useDispatch();

  useRefreshOnFocus(refetch);

  return isSuccess && typeof data === "object" ? (
    <View className="relative">
      <Header />
      <Image
        source={{
          uri: "https://t4.ftcdn.net/jpg/01/06/84/75/360_F_106847582_7JcRyHVy0xsp9qIDvuccmdl5oz3jorbm.jpg",
        }}
        blurRadius={80}
        alt=""
      />
      <Button
        bgColor="#9D14FF"
        className="rounded-none"
        onPress={() => refetch()}
      >
        Randomize
      </Button>
      <Button
        colorScheme="indigo"
        onPress={() => dispatch(setUser(null))}
        className="ml-auto w-[20vw] h-10"
        variant="ghost"
      >
        Logout
      </Button>
      <FlatList
        numColumns={3}
        renderItem={({ item, index }: { item: string; index: number }) => {
          return (
            <CalendarRecipe
              key={index}
              index={index}
              id={item.toString()}
              navigation={navigation}
            />
          );
        }}
        data={data}
      ></FlatList>
    </View>
  ) : (
    <Spinner color="indigo.500" size="lg" className="mx-auto mt-10" />
  );
};

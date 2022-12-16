import axios from "axios";
import { Image, Spinner, StatusBar, Text, View } from "native-base";
import { useEffect } from "react";
import { RefreshControl, StyleSheet, TouchableOpacity } from "react-native";
import { useInfiniteQuery, useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { Recipe } from "../consts/interfaces";
import { setUser } from "../slices/userSlice";
import { getAccessToken } from "../utills/accessToken";
import React, { useRef } from "react";
import { useRefreshOnFocus } from "../hooks/useRefreshonFocus";
import Animated from "react-native-reanimated";
import { Header } from "../components/Header";

const getRecipe = async (pageParam: number) => {
  const { data } = await axios.get(
    `http://ec2-44-203-24-124.compute-1.amazonaws.com/recipes?search=&pageNumber=${pageParam}&limit=10`
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
  const dispatch = useDispatch();
  const { data: user } = useQuery(["user"], getUser);
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  const { data, fetchNextPage, hasNextPage, isFetching, refetch, isSuccess } =
    useInfiniteQuery({
      queryKey: ["recipes"],
      queryFn: ({ pageParam = 1 }) => getRecipe(pageParam),
      getNextPageParam: (lastPage) => {
        if (lastPage.length < 10) return undefined;
        return lastPage.nextPage;
      },
    });

  useRefreshOnFocus(refetch);

  const loadNext = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    dispatch(setUser(user));
  }, [user]);

  const scrollY = useRef(new Animated.Value(0)).current;
  const itemSize = 176;

  return (
    <View className="relative min-h-100vh">
      <Header />
      <Image
        source={{
          uri: "https://t4.ftcdn.net/jpg/01/06/84/75/360_F_106847582_7JcRyHVy0xsp9qIDvuccmdl5oz3jorbm.jpg",
        }}
        blurRadius={80}
        alt=""
      />
      {data && data.pages ? (
        <Animated.FlatList
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          numColumns={2}
          renderItem={({ item, index }: { item: Recipe; index: number }) => {
            const inputRange = [
              -1,
              0,
              itemSize * index,
              itemSize * (index + 2),
            ];
            const scale = scrollY.interpolate({
              inputRange,
              outputRange: [1, 1, 1, 0],
            });

            const opacityInputRange = [
              -1,
              0,
              itemSize * index,
              itemSize * (index + 1),
            ];

            const opacity = scrollY.interpolate({
              inputRange: opacityInputRange,
              outputRange: [1, 1, 1, 0],
            });

            return (
              <AnimatedTouchable
                style={{ transform: [{ scale }], opacity }}
                onPress={() => navigation.navigate("Recipe", { id: item.id })}
                key={item.id}
                className="w-[46vw] rounded-sm bg-gray-200 shadow-md h-[27vh]  m-2"
              >
                <Image
                  source={{ uri: item.imageUrl }}
                  className="h-44 rounded-t-md"
                  alt=""
                />
                <Text className="text-lg font-bold ml-1  text-black">
                  {item.title}
                </Text>
              </AnimatedTouchable>
            );
          }}
          data={data?.pages.flat()}
          onEndReached={loadNext}
          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={refetch} />
          }
        ></Animated.FlatList>
      ) : (
        <Spinner color="indigo.500" size="lg" className="mx-auto mt-10" />
      )}
    </View>
  );
};

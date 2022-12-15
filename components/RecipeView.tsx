import { Image, Spinner, Text, View } from "native-base";
import React, { useRef } from "react";
import { Recipe } from "../consts/interfaces";
import { RefreshControl, StyleSheet, TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";

interface Props {
  data: any;
  loadNext: any;
  isFetching: any;
  refetch: any;
  navigation: any;
}

export const RecipeView: React.FC<Props> = ({
  data,
  loadNext,
  isFetching,
  refetch,
  navigation,
}) => {
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  const scrollY = useRef(new Animated.Value(0)).current;
  const itemSize = 176;

  return (
    <View className="relative z-10 pt-2">
      <Image
        source={{
          uri: "https://t4.ftcdn.net/jpg/01/06/84/75/360_F_106847582_7JcRyHVy0xsp9qIDvuccmdl5oz3jorbm.jpg",
        }}
        style={StyleSheet.absoluteFillObject}
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
                <Text className="text-lg font-bold ml-1  text-slate-700">
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

import { View, Image } from "native-base";
import React from "react";

export const Header = () => {
  return (
    <View className="bg-[#D6C9FF] min-h-[10vh] z-10 -ml-3 pt-5 relative">
      <Image
        source={{
          uri: "https://elephant.art/wp-content/uploads/2020/02/wp4154552.png",
        }}
        alt=""
        className="  h-[10vh]"
      />
    </View>
  );
};

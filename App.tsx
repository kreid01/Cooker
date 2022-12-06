import React, { useEffect, useState, useRef } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./screens/HomeScreen";
import { AddRecipeScreen } from "./screens/AddRecipeScreen";
import { Image, NativeBaseProvider, StatusBar, View } from "native-base";
import { RegisterScreen } from "./screens/RegisterScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { setAccessToken } from "./utills/accessToken";
import { Provider } from "react-redux";
import store from "./store/store";
import { Text } from "native-base";
import { SingleRecipeScreen } from "./screens/SingleRecipeScreen";
import { SafeAreaView } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faSearch,
  faHome,
  faUserAlt,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function App() {
  const Stack = createNativeStackNavigator();
  const client = new QueryClient();

  const [loading, setLoading] = useState(true);

  const LogoTitle = ({ props }: any) => {
    return (
      <View className="bg-[#D6C9FF] h-[10vh] -mt-20 z-2 -ml-20 relative">
        <Image
          source={{
            uri: "https://elephant.art/wp-content/uploads/2020/02/wp4154552.png",
          }}
          alt=""
          className="w-[1000vw]  h-[10vh] mt-12 ml-8 "
        />
      </View>
    );
  };

  useEffect(() => {
    fetch("http://localhost:4000/refresh_token", {
      method: "POST",
      credentials: "include",
      headers: {
        "x-forwarded-proto": "https",
      },
    })
      .then(async (x) => {
        const { accessToken } = await x.json();
        setAccessToken(accessToken);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (!loading) {
    return (
      <QueryClientProvider client={client}>
        <Provider store={store}>
          <NativeBaseProvider>
            <NavigationContainer>
              <SafeAreaView style={{ flex: 0, backgroundColor: "#D6C9FF" }} />

              <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                  name="Home"
                  options={{
                    headerTitle: (props) => <LogoTitle {...props} />,
                  }}
                  component={HomeScreen}
                ></Stack.Screen>
                <Stack.Screen
                  options={{
                    headerStyle: {
                      backgroundColor: "#D6C9FF",
                    },
                    headerTintColor: "white",
                    headerTitleStyle: {
                      fontWeight: "bold",
                    },
                  }}
                  name="Add Recipe"
                  component={AddRecipeScreen}
                ></Stack.Screen>

                <Stack.Screen
                  name="Registration"
                  options={{
                    headerStyle: {
                      backgroundColor: "#D6C9FF",
                    },
                    headerTintColor: "white",
                    headerTitleStyle: {
                      fontWeight: "bold",
                    },
                  }}
                  component={RegisterScreen}
                ></Stack.Screen>

                <Stack.Screen
                  options={{
                    headerStyle: {
                      backgroundColor: "#D6C9FF",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                      fontWeight: "bold",
                    },
                  }}
                  name="Login"
                  component={LoginScreen}
                ></Stack.Screen>

                <Stack.Screen
                  options={{
                    headerStyle: {
                      backgroundColor: "#D6C9FF",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                      fontWeight: "bold",
                    },
                  }}
                  name="Recipe"
                  component={SingleRecipeScreen}
                ></Stack.Screen>
              </Stack.Navigator>
            </NavigationContainer>
          </NativeBaseProvider>
        </Provider>
      </QueryClientProvider>
    );
  } else {
    return (
      <NativeBaseProvider>
        <Text>Loading...</Text>
      </NativeBaseProvider>
    );
  }
}

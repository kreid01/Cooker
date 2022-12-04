import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./screens/HomeScreen";
import { AddRecipeScreen } from "./screens/AddRecipeScreen";
import { NativeBaseProvider } from "native-base";
import { RegisterScreen } from "./screens/RegisterScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { setAccessToken } from "./utills/accessToken";
import { Provider } from "react-redux";
import store from "./store/store";
import { Text } from "native-base";

export default function App() {
  const Stack = createNativeStackNavigator();
  const client = new QueryClient();

  const [loading, setLoading] = useState(true);

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
              <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
                <Stack.Screen
                  name="Add Recipe"
                  component={AddRecipeScreen}
                ></Stack.Screen>

                <Stack.Screen
                  name="Registration"
                  component={RegisterScreen}
                ></Stack.Screen>

                <Stack.Screen
                  name="Login"
                  component={LoginScreen}
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

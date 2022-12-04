import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./screens/HomeScreen";
import { AddRecipeScreen } from "./screens/AddRecipeScreen";
import { NativeBaseProvider } from "native-base";
import { RegisterScreen } from "./screens/RegisterScreen";
import { LoginScreen } from "./screens/LoginScreen";

export default function App() {
  const Stack = createNativeStackNavigator();

  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
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

            <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}

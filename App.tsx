import React, { useEffect, useState, useRef } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { NavigationContainer } from "@react-navigation/native";
import { HomeScreen } from "./screens/HomeScreen";
import { AddRecipeScreen } from "./screens/AddRecipeScreen";
import { NativeBaseProvider, View, Text } from "native-base";
import { RegisterScreen } from "./screens/RegisterScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "./screens/LoginScreen";
import { setAccessToken } from "./utills/accessToken";
import { Provider } from "react-redux";
import store from "./store/store";
import { SingleRecipeScreen } from "./screens/SingleRecipeScreen";
import { TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { Icons } from "./components/Icons";
import { navStyles } from "./styles/BottomNavStyles";
import { SearchScreen } from "./screens/SearchScreen";
import { LikedRecipesScreen } from "./screens/LikedRecipesScreen";

export default function App() {
  const client = new QueryClient();
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  const [loading, setLoading] = useState(true);

  const TabArr = [
    {
      route: "Home",
      label: "Home",
      type: Icons.Feather,
      icon: "home",
      component: HomeScreen,
    },
    {
      route: "Search",
      label: "Search",
      type: Icons.Feather,
      icon: "search",
      component: SearchScreen,
    },
    {
      route: "Add",
      label: "Add",
      type: Icons.Feather,
      icon: "plus-square",
      component: AddRecipeScreen,
    },
    {
      route: "Like",
      label: "Like",
      type: Icons.Feather,
      icon: "heart",
      component: LikedRecipesScreen,
    },
    {
      route: "Account",
      label: "Account",
      type: Icons.FontAwesome,
      icon: "user-circle-o",
      component: LoginScreen,
    },
  ];

  useEffect(() => {
    fetch("http://ec2-44-203-24-124.compute-1.amazonaws.com/refresh_token", {
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

  const animate1 = {
    0: { scale: 0.5, translateY: 8 },
    0.92: { translateY: -20 },
    1: { scale: 1.2, translateY: -12 },
  };
  const animate2 = {
    0: { scale: 1.2, translateY: -24 },
    1: { scale: 1, translateY: 7 },
  };

  const circle1 = {
    0: { scale: 0 },
    1: { scale: 1 },
  };

  const Icon = ({ type, name, color, size = 24, style }: any) => {
    const fontSize = 24;
    const Tag = type;
    return (
      <>
        {type && name && (
          <Tag
            name={name}
            size={size || fontSize}
            color={color}
            style={style}
          />
        )}
      </>
    );
  };

  const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } };

  const TabButton = (props: any) => {
    const { item, onPress, accessibilityState } = props;
    const focused = accessibilityState.selected;
    const viewRef = useRef<any>(null);
    const circleRef = useRef<any>(null);
    const textRef = useRef<any>(null);

    useEffect(() => {
      if (focused) {
        viewRef.current.animate(animate1);
        circleRef.current.animate(circle1);
        textRef.current.transitionTo({ scale: 1 });
      } else {
        viewRef.current.animate(animate2);
        circleRef.current.animate(circle2);
        textRef.current.transitionTo({ scale: 0 });
      }
    }, [focused]);

    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={1}
        style={navStyles.container}
      >
        <Animatable.View
          ref={viewRef}
          duration={400}
          style={navStyles.container}
        >
          <View style={navStyles.btn}>
            <Animatable.View
              duration={400}
              ref={circleRef}
              style={navStyles.circle}
            />
            <Icon
              type={item.type}
              name={item.icon}
              color={focused ? "white" : "#D6C9FF"}
            />
          </View>
          <Animatable.Text ref={textRef} style={navStyles.text}>
            {item.label}
          </Animatable.Text>
        </Animatable.View>
      </TouchableOpacity>
    );
  };

  const Root = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: navStyles.tabBar,
        }}
        initialRouteName="Home"
      >
        {TabArr.map((item, index) => {
          return (
            <Tab.Screen
              key={index}
              name={item.route}
              component={item.component}
              options={{
                tabBarShowLabel: false,
                tabBarButton: (props) => <TabButton {...props} item={item} />,
              }}
            />
          );
        })}
      </Tab.Navigator>
    );
  };

  if (!loading) {
    return (
      <QueryClientProvider client={client}>
        <Provider store={store}>
          <NativeBaseProvider>
            <NavigationContainer>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Back" component={Root} />
                <Stack.Screen
                  name="Recipe"
                  component={SingleRecipeScreen}
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
                  name="Registration"
                  component={RegisterScreen}
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

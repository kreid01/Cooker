import React, { useEffect, useState, useRef } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { NavigationContainer } from "@react-navigation/native";
import { HomeScreen } from "./screens/HomeScreen";
import { AddRecipeScreen } from "./screens/AddRecipeScreen";
import { Image, NativeBaseProvider, View, Text } from "native-base";
import { RegisterScreen } from "./screens/RegisterScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "./screens/LoginScreen";
import { setAccessToken } from "./utills/accessToken";
import { Provider } from "react-redux";
import store from "./store/store";
import { SingleRecipeScreen } from "./screens/SingleRecipeScreen";
import { SafeAreaView, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { Icons } from "./components/Icons";
import { navStyles } from "./styles/BottomNavStyles";
import { SearchScreen } from "./screens/SearchScreen";

export const LogoTitle = () => {
  return (
    <View className="bg-[#D6C9FF] h-[5vh] z-2 -ml-5 mb-10 relative">
      <Image
        source={{
          uri: "https://elephant.art/wp-content/uploads/2020/02/wp4154552.png",
        }}
        alt=""
        className="w-[200vw]  h-[8vh]"
      />
    </View>
  );
};

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
      component: RegisterScreen,
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

  const animate1 = {
    0: { scale: 0.5, translateY: 8 },
    0.92: { translateY: -34 },
    1: { scale: 1.2, translateY: -24 },
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
            <Animatable.View ref={circleRef} style={navStyles.circle} />
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
              <SafeAreaView style={{ flex: 0, backgroundColor: "#D6C9FF" }} />
              <Stack.Navigator>
                <Stack.Screen
                  options={{
                    headerTitle: (props) => <LogoTitle />,
                  }}
                  name="Root"
                  component={Root}
                />
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

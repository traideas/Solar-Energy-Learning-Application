import React from "react";
import { Easing, Animated, Dimensions } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//screens
import Onboarding from "../screens/Onboarding";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";
import SlideContent from "../screens/SlideContent";
import VideoContent from "../screens/VideoContent";
import Quiz from "../screens/Quiz";

//header for screens
import { Icon, Header } from "../components";
import { argonTheme, tabs } from "../constants";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();

const isUserLoggedIn = true;

function AuthStack(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "MyRel",
        }}
      />
      <Stack.Screen
        name="SlideContent"
        component={SlideContent}
        options={{
          title: "Lecture Slide Contents",
        }}
      />
      <Stack.Screen
        name="VideoContent"
        component={VideoContent}
        options={{
          title: "Video Contents",
        }}
      />
      <Stack.Screen name="Quiz" component={Quiz} />
    </Stack.Navigator>
  );
}

export default function OnBoardingStack(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        initialRouteName="Onboarding"
        name="Onboarding"
        component={Onboarding}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AuthRoute"
        component={AuthStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeRoute"
        component={HomeStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

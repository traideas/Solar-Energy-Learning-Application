import React, { useEffect } from "react";
import { Easing, Animated, Dimensions, Alert, AsyncStorage } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//screens
import Onboarding from "../screens/Onboarding";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";
import SlideContent from "../screens/SlideContent";
import VideoContent from "../screens/VideoContent";
import Quiz from "../screens/Quiz";
import QuizDetails from "../screens/QuizDetails";
import DiscussionContainer from "../screens/DiscussionContainer";
import Discussion from "../screens/Discussion";
import VideoDetails from "../screens/VideoDetail";
import SlideDetails from "../screens/SlideDetails";
import ArticleContent from "../screens/ArticleContent";
import CreateDiscussion from "../screens/CreateDiscussion";
import ArticleDetails from "../screens/ArticleDetails";

//header for screens
import { Icon, Header } from "../components";
import { argonTheme, tabs } from "../constants";
import Profile from "../screens/Profile";
import IconExtra from "../components/Icon";

//Import Auth
import AuthService from "../services/auth.service";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function TabNavigation(props) {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="DiscussionContainer" component={DiscussionStack} />
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Quiz" component={QuizStack} />
    </Tab.Navigator>
  );
}

function DrawerStack() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Logout" onPress={() => {
              AsyncStorage.removeItem('user_id')
              props.navigation.navigate(Onboarding)
            }} />
          </DrawerContentScrollView>
        );
      }}
    >
      <Drawer.Screen name="Home" component={TabNavigation} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}

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
      <Stack.Screen name="Video" component={VideoStack} />
      <Stack.Screen name="Article" component={ArticleStack} />
      <Stack.Screen name="Slide" component={SlideStack} />
      <Stack.Screen
        name="Quiz"
        component={QuizStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Discussion"
        component={DiscussionStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function VideoStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="VideoContent"
        component={VideoContent}
        options={{
          title: "Video Contents",
        }}
      />
      <Stack.Screen
        name="VideoDetails"
        component={VideoDetails}
        options={{
          title: "Watch Video",
        }}
      />
    </Stack.Navigator>
  );
}

function ArticleStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="ArticleContent"
        component={ArticleContent}
        options={{
          title: "Additional Articles",
        }}
      />
      <Stack.Screen
        name="ArticleDetails"
        component={ArticleDetails}
        options={{
          title: "Read Detailed Article",
        }}
      />
    </Stack.Navigator>
  );
}

function SlideStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="SlideContent"
        component={SlideContent}
        options={{
          title: "All Lecture Slides",
        }}
      />
      <Stack.Screen
        name="SlideDetails"
        component={SlideDetails}
        options={{
          title: "Read Slide Contents",
        }}
      />
    </Stack.Navigator>
  );
}

function QuizStack() {
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
        name="Quiz"
        component={Quiz}
        options={{
          title: "All Quiz",
        }}
      />
      <Stack.Screen
        name="QuizDetails"
        component={QuizDetails}
        options={{
          title: "Take Quiz",
        }}
      />
    </Stack.Navigator>
  );
}

function DiscussionStack() {
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
        name="DiscussionContainer"
        options={{
          title: "All Discussions",
        }}
        component={DiscussionContainer}
      />
      <Stack.Screen
        name="Discussion"
        component={Discussion}
        options={{
          title: "View Discussion",
        }}
      />
      <Stack.Screen name="CreateDiscussion" component={CreateDiscussion} />
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
      {/* Change HomeStack to AuthStack, it is for Mobile Purpose */}
      <Stack.Screen
        name="AuthRoute"
        component={AuthStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeRoute"
        component={DrawerStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

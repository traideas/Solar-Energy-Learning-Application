import "react-native-gesture-handler";
import React from "react";

import { StyleSheet, View, Text } from "react-native";
import { Block, GalioProvider } from "galio-framework";

import Home from "./screens/Home";
import Login from "./screens/Login";
import VideoContent from "./screens/VideoContent";
import SlideContent from "./screens/SlideContent";
import Register from "./screens/Register";

// Before Rendering any navigation stack
import { enableScreens } from "react-native-screens";
enableScreens();

import Screens from "./navigation/Screens";

//theme
import { argonTheme } from "./constants";

import { NavigationContainer } from "@react-navigation/native";
//import { createStackNavigator } from '@react-navigation/stack';

//const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <GalioProvider theme={argonTheme}>
        <Block flex>
          <Screens />
        </Block>
        {/* <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ title: 'MyREL', headerLeft: null }}/>
          <Stack.Screen name="VideoContent" component={VideoContent} options={{ title: 'Video Contents' }}/>
          <Stack.Screen name="SlideContent" component={SlideContent} options={{ title: 'Slide Contents' }}/>
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
        </Stack.Navigator> */}
      </GalioProvider>
    </NavigationContainer>
  );
}

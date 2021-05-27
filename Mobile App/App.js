import "react-native-gesture-handler";
import React, { useEffect } from "react";
import * as Font from 'expo-font';

//import { StyleSheet, View, Text } from "react-native";
import { Block, GalioProvider } from "galio-framework";

// Before Rendering any navigation stack
import { enableScreens } from "react-native-screens";
enableScreens();

import Screens from "./navigation/Screens";

//theme
import { argonTheme } from "./constants";

import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  useEffect(() => {
    Font.loadAsync({
      "open-sans-regular": require("./assets/font/OpenSans-Regular.ttf"),
      "open-sans-light": require("./assets/font/OpenSans-Light.ttf"),
      "open-sans-bold": require("./assets/font/OpenSans-Bold.ttf"),
    });
  });
  return (
    <NavigationContainer>
      <GalioProvider theme={argonTheme}>
        <Block flex>
          <Screens />
        </Block>
      </GalioProvider>
    </NavigationContainer>
  );
}

import 'react-native-gesture-handler'
import React from 'react'

import { StyleSheet, View, Text } from 'react-native'
import { Block, GalioProvider } from 'galio-framework'

import Home from './screens/Home'
import Login from './screens/Login'
import SlideContent from './screens/SlideContent'

//theme
import { argonTheme } from './constants'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <GalioProvider theme={argonTheme}>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ title: 'MyREL', headerLeft: null }}/>
        </Stack.Navigator>
      </GalioProvider>
    </NavigationContainer>
  )
}

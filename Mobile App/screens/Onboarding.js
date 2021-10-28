import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height, width } = Dimensions.get("screen");

import argonTheme from "../constants/Theme";
import Images from "../constants/Images";
import { HeaderHeight } from "../constants/utils";

export default Onboarding = ({ navigation }) => {
  const handlePress = () => {
    AsyncStorage.getItem('user_id')
      .then((value) => {
        navigation.replace(
          value === null ? 'AuthRoute' : 'HomeRoute'
        )
      })
  }
  return (
    <Block flex style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Block flex>
        <ImageBackground
          source={Images.Pro}
          style={{ flex: 1, height: height, width, zIndex: 1 }}
        />
        <Block style={styles.padded}>
          <Block>
            <Button
              shadowless
              style={styles.button}
              color={argonTheme.COLORS.INFO}
              onPress={handlePress}
            >
              <Text style={{ fontSize: 18 }} color={theme.COLORS.WHITE}>
                Start Learning
                </Text>
            </Button>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK,
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    bottom: theme.SIZES.BASE,
    zIndex: 2,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  logo: {
    width: 200,
    height: 60,
    zIndex: 2,
    position: "relative",
    marginTop: "-50%",
  },
  title: {
    marginTop: "-5%",
  },
  subTitle: {
    marginTop: 20,
  },
  pro: {
    backgroundColor: argonTheme.COLORS.INFO,
    paddingHorizontal: 8,
    marginLeft: 3,
    borderRadius: 0,
    height: 25,
    marginTop: 15,
  },
});

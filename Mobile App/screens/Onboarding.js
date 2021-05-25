import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  SafeAreaView,
  AsyncStorage,
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";

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
          <Block space="between" style={styles.padded}>
            <Block>
              <Block>
                <Image
                  source={Images.ArgonLogo}
                  style={{ marginBottom: theme.SIZES.BASE * 1.5 }}
                />
              </Block>
              <Block>
                <Block>
                  <Text color="white" size={60}>
                    Argon
                  </Text>
                </Block>
                <Block>
                  <Text color="white" size={60}>
                    Design
                  </Text>
                </Block>
                <Block row>
                  <Text color="white" size={60}>
                    System
                  </Text>
                  <Block middle style={styles.pro}>
                    <Text size={16} color="white">
                      PRO
                    </Text>
                  </Block>
                </Block>
              </Block>
              <Text
                size={16}
                color="rgba(255,255,255,0.6)"
                style={{ marginTop: 35 }}
              >
                Take advantage of all the features and screens made upon Galio
                Design System, coded on React Native for both.
              </Text>
              <Block
                row
                style={{
                  marginTop: theme.SIZES.BASE * 1.5,
                  marginBottom: theme.SIZES.BASE * 4
                }}
              >
                <Image
                  source={Images.iOSLogo}
                  style={{
                    height: 38,
                    width: 82,
                    marginRight: theme.SIZES.BASE * 1.5
                  }}
                />
                <Image
                  source={Images.androidLogo}
                  style={{ height: 38, width: 140 }}
                />
              </Block>
              <Button
                shadowless
                style={styles.button}
                color={argonTheme.COLORS.INFO}
                onPress={handlePress}
              >
                <Text style={{ fontSize: 14 }} color={theme.COLORS.WHITE}>
                  GET STARTED
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
    borderRadius: 4,
    height: 22,
    marginTop: 15,
  },
});

import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import { Block, Text, theme, Card } from "galio-framework";

import Images from "../constants/Images";
import Icon from "../components/Icon";
import argonTheme from '../constants/Theme'

const { width } = Dimensions.get("screen");

export default Home = ({ navigation, back, scene }) => {
  const handleLeftPress = () => {
    return back
      ? navigation.dispatch(CommonActions.goBack())
      : navigation.openDrawer();
  };
  const [count, setCount] = React.useState(0);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Icon
          name={back ? "chevron-left" : "menu"}
          family="entypo"
          // name={back ? 'nav-left' : "menu-8"} family="ArgonExtra"
          size={back ? 20 : 20}
          onPress={handleLeftPress}
          color={argonTheme.COLORS.WHITE}
          style={{ marginTop: 2, marginHorizontal: 15 }}
        />
      ),
    });
  }, [navigation]);
  return (
    <ScrollView>
      <Block flex style={styles.home}>
        <TouchableOpacity onPress={() => navigation.navigate("Video")}>
          <Block flex card style={[styles.category, styles.shadow]}>
            <ImageBackground
              source={Images.Solar1}
              style={[
                styles.imageBlock,
                { width: width - theme.SIZES.BASE * 2, height: 180 },
              ]}
              imageStyle={{
                width: width - theme.SIZES.BASE * 2,
                height: 180,
              }}
            >
              <Block style={styles.categoryTitle}>
                <Text
                  style={{ fontFamily: "open-sans-bold" }}
                  size={22}
                  color={theme.COLORS.WHITE}
                >
                  Watch Videos
                </Text>
              </Block>
            </ImageBackground>
          </Block>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Article")}>
          <Block flex card style={[styles.category, styles.shadow]}>
            <ImageBackground
              source={Images.Solar2}
              style={[
                styles.imageBlock,
                { width: width - theme.SIZES.BASE * 2, height: 180 },
              ]}
              imageStyle={{
                width: width - theme.SIZES.BASE * 2,
                height: 180,
              }}
            >
              <Block style={styles.categoryTitle}>
                <Text
                  style={{ fontFamily: "open-sans-bold" }}
                  size={22}
                  color={theme.COLORS.WHITE}
                >
                  Read Articles
                </Text>
              </Block>
            </ImageBackground>
          </Block>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Slide")}>
          <Block flex card style={[styles.category, styles.shadow]}>
            <ImageBackground
              source={Images.Solar3}
              style={[
                styles.imageBlock,
                { width: width - theme.SIZES.BASE * 2, height: 180 },
              ]}
              imageStyle={{
                width: width - theme.SIZES.BASE * 2,
                height: 180,
              }}
            >
              <Block style={styles.categoryTitle}>
                <Text
                  style={{ fontFamily: "open-sans-bold" }}
                  size={22}
                  color={theme.COLORS.WHITE}
                >
                  View Slides
                </Text>
              </Block>
            </ImageBackground>
          </Block>
        </TouchableOpacity>
      </Block>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  card: {
    width: width * 0.9,

    backgroundColor: "#F4F5F7",
    borderRadius: 4,
  },
  categories: {
    width,
  },
  categoryList: {
    justifyContent: "center",
    paddingTop: theme.SIZES.BASE * 1.5,
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginHorizontal: theme.SIZES.BASE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0,
  },
  categoryTitle: {
    height: "100%",
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  imageBlock: {
    overflow: "hidden",
    borderRadius: 4,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});

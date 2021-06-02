import React from "react";
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity, ImageBackground } from "react-native";

import { Block, Text, theme, Card } from "galio-framework";

import Images from "../constants/Images";

const { width } = Dimensions.get("screen");


export default Home = ({ navigation }) => {
  return (
    <ScrollView>
      <Block flex style={styles.home}>

        <TouchableOpacity onPress={() => navigation.navigate("Video")}>
          <Block flex card style={[styles.category, styles.shadow]}>
            <ImageBackground
              source={Images.Pro}
              style={[
                styles.imageBlock,
                { width: width - theme.SIZES.BASE * 2, height: 180 }
              ]}
              imageStyle={{
                width: width - theme.SIZES.BASE * 2,
                height: 252
              }}
            >
              <Block style={styles.categoryTitle}>
                <Text style={{ fontFamily: 'open-sans-bold' }} size={18} color={theme.COLORS.WHITE}>
                  Videos
                </Text>
              </Block>
            </ImageBackground>
          </Block>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Article")}>
          <Block flex card style={[styles.category, styles.shadow]}>
            <ImageBackground
              source={Images.Pro}
              style={[
                styles.imageBlock,
                { width: width - theme.SIZES.BASE * 2, height: 180 }
              ]}
              imageStyle={{
                width: width - theme.SIZES.BASE * 2,
                height: 252
              }}
            >
              <Block style={styles.categoryTitle}>
                <Text style={{ fontFamily: 'open-sans-bold' }} size={18} color={theme.COLORS.WHITE}>
                  Articles
                </Text>
              </Block>
            </ImageBackground>
          </Block>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Slide")}>
          <Block flex card style={[styles.category, styles.shadow]}>
            <ImageBackground
              source={Images.Pro}
              style={[
                styles.imageBlock,
                { width: width - theme.SIZES.BASE * 2, height: 180 }
              ]}
              imageStyle={{
                width: width - theme.SIZES.BASE * 2,
                height: 252
              }}
            >
              <Block style={styles.categoryTitle}>
                <Text style={{ fontFamily: 'open-sans-bold' }} size={18} color={theme.COLORS.WHITE}>
                  Slides
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
    width
  },
  categoryList: {
    justifyContent: "center",
    paddingTop: theme.SIZES.BASE * 1.5
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginHorizontal: theme.SIZES.BASE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0
  },
  categoryTitle: {
    height: "100%",
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  imageBlock: {
    overflow: "hidden",
    borderRadius: 4
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 0.1,
    elevation: 2
  }
});

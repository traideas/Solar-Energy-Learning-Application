import React from "react";
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { Block, Text, Card } from "galio-framework";

const { width } = Dimensions.get("screen");

export default Home = ({ navigation }) => {
  return (
    <ScrollView>
      <Block flex style={styles.home}>

        <TouchableOpacity onPress={() => navigation.navigate("Video")}>
          <Card middle style={styles.card} title="Watch Videos" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Article")}>
          <Card style={styles.card} title="Read Articles" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Slide")}>
          <Card title="View Slides" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Quiz")}>
          <Card title="Quizes" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Discussion")}>
          <Card title="Discussions" />
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
});

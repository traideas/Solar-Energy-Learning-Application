import React from "react";
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { Block, Text, Card } from "galio-framework";

const { width } = Dimensions.get("screen");

export default Home = ({ navigation }) => {
  return (
    <ScrollView>
      <Block flex style={styles.home}>
      <Block center style={{padding: 20}}>
        <Text>This is Home</Text>
      </Block>
        <TouchableOpacity onPress={() => navigation.navigate("Video")}>
            <Card title="Watch Videos" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Article")}>
            <Card title="Read Articles" />
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
  card: {},
});

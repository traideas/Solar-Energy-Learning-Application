import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Block, Card } from "galio-framework";

const DATA = [
  {
    title: "Solar 101",
    description: "Fundamentals of Solar Energy",
    teacher: 2,
    photo: null,
    total_marks: 30,
    id: 1,
  },
  {
    title: "Solar 102",
    description: "Intermediate Solar Quiz",
    teacher: 3,
    photo:
      "http://127.0.0.1:8000/media/WhatsApp_Image_2021-03-16_at_1.52.20_PM.jpeg",
    total_marks: 20,
    id: 2,
  },
];

const QuizItem = ({ item, onPress }) => {
  const { title, description, photo } = item;
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Card title={title} caption={description} avatar={photo} />
    </TouchableOpacity>
  );
};

const Quiz = ({ navigation }) => {
  const handlePress = (item) => {
    navigation.navigate("TakeQuize", item)
  }
  const renderQuizeItem = ({ item }) => {
    return <QuizItem item={item} onPress={() => handlePress(item)} />;
  };
  return (
    <Block style={styles.container}>
      <SafeAreaView>
        <FlatList
          data={DATA}
          renderItem={renderQuizeItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </SafeAreaView>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  item: {
    flex: 1,
    marginTop: 20,
  },
});

export default Quiz;

import React from "react";
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  FlatList,
  StatusBar,
} from "react-native";
import { Block, theme, Text, Card } from "galio-framework";

const DATA = [
    {
        "title": "Solar 101",
        "description": "Fundamentals of Solar Energy",
        "teacher": 2,
        "photo": null,
        "total_marks": 30,
        "id": 1
    },
    {
        "title": "Solar 102",
        "description": "Intermediate Solar Quiz",
        "teacher": 3,
        "photo": "http://127.0.0.1:8000/media/WhatsApp_Image_2021-03-16_at_1.52.20_PM.jpeg",
        "total_marks": 20,
        "id": 1
    },
  ];

const QuizItem = ({ title }) => (
    <Block>
        <Card title={title} />
    </Block>
)

const Quiz = () => {
    const renderQuizeItem = ({ item }) => (
        <QuizItem title={item.title}/>
    )
  return (
    <SafeAreaView>
        <FlatList
            data={DATA}
            renderItem={renderQuizeItem}
            keyExtractor={item => item.id}
        />
    </SafeAreaView>
  );
};

export default Quiz;

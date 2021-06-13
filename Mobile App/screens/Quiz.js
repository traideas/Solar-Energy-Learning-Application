import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Block, Card } from "galio-framework";
import axios from 'axios'
import configData from '../services/configData.json'

const QuizItem = ({ item, onPress }) => {
  const { title, description, photo } = item;
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Card title={title} caption={description.substring(0, 80) + "....."} avatar={"https://i.imgur.com/UqMV65B.png"} />
    </TouchableOpacity>
  );
};

const Quiz = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [DATA, setDATA] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      axios
        .get(configData.SERVER_URL + "quiz/")
        .then(({ data }) => {
          setDATA(data);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    });
    return unsubscribe
  }, [navigation]);

  const handlePress = (item) => {
    navigation.navigate("QuizDetails", item);
  };
  const renderQuizeItem = ({ item }) => {
    return <QuizItem item={item} onPress={() => handlePress(item)} />;
  };
  return (
    <Block style={styles.container}>

      {
        isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={DATA}
            renderItem={renderQuizeItem}
            keyExtractor={(item) => item.id.toString()}
          />
        )
      }
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  item: {
    flex: 1,
    marginBottom: 10,
  },
});

export default Quiz;

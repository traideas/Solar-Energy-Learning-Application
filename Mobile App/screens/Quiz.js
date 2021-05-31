import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Block, Card, Text } from "galio-framework";
import axios from 'axios'

const QuizItem = ({ item, onPress }) => {
  const { title, description, photo } = item;
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Card title={title} caption={description} avatar={photo} />
    </TouchableOpacity>
  );
};

const Quiz = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [DATA, setDATA] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      axios
        .get("http://127.0.0.1:8000/quiz/")
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
    <Text h5>Quizes</Text>
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

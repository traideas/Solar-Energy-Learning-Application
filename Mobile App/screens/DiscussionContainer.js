import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Block, Card, Button } from "galio-framework";
import { FlatList } from "react-native-gesture-handler";
import axios from "axios";
import configData from '../services/configData.json'
import useAxios from "../hooks/useAxios";


const Discussion = ({ item, onPress }) => {
  const { title, description, created_by } = item;
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Card title={title} caption={description.substring(0, 80) + "....."} avatar={(created_by.photo == configData.SERVER_URL + "media/" ? "https://i.imgur.com/36HNnQ2.png" : created_by.photo)} />

    </TouchableOpacity>
  );
};

const config = {
  headers: {
    Authorization: `Token 0699bb9409e56fb69eaec6229e6ffea8ff5e6ac8`,
  },
};

export default function DiscussionContainer({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  //const [DATA] = useAxios("discussion/")
  const [DATA, setDATA] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      axios
        .get(configData.SERVER_URL + "discussion/", config)
        .then(({ data }) => {
          setDATA(data);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    });
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => {
    const handlePress = (item) => {
      navigation.push("Discussion", item);
    };
    return <Discussion item={item} onPress={() => handlePress(item)} />;
  };

  return (
    <Block style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Block>
          <Block style={styles.btn}>
            <Button onPress={() => navigation.navigate("CreateDiscussion")} style={{ width: "100%", borderRadius: 5 }}>
              Create a Discussion
            </Button>
          </Block>

          <FlatList
            data={DATA}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </Block>
      )}
    </Block>
  );
}

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
  btn: {
    alignItems: "center",
  }
});

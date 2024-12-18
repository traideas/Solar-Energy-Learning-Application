import React, { useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { Block, Card, Text } from "galio-framework";
import { FlatList } from "react-native-gesture-handler";
import axios from "axios";
import configData from '../services/configData.json'
import useAxios from "../hooks/useAxios";

const SlideCard = ({ item, onPress }) => {
  const { title, description, photo, created_by } = item;
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Card
        title={title} image={photo} avatar={(created_by.photo == configData.SERVER_URL + "media/" ? "https://i.imgur.com/36HNnQ2.png" : created_by.photo)} caption={description.substring(0, 80) + "....."}
      />
    </TouchableOpacity>
  );
};

export default SlideContent = ({ navigation }) => {
  const [isLoading, setLoading] = useState(false);
  const [DATA] = useAxios("pptx_public/")
  const renderItem = ({ item }) => {
    const handlePress = (item) => {
      navigation.push("SlideDetails", item);
    };
    return <SlideCard item={item} onPress={() => handlePress(item)} />;
  };
  return (
    <Block style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      )}
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

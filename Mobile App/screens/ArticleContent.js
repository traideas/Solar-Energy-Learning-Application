import React, { useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { Block, Card, Text } from "galio-framework";
import { FlatList } from "react-native-gesture-handler";
import axios from "axios";

const SlideCard = ({ item, onPress }) => {
  const { title, upload_date, photo } = item;
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Card title={title} avatar="http://i.pravatar.cc/100?id=skater" caption={upload_date} />
    </TouchableOpacity>
  );
};

export default ArticleContent = ({ navigation }) => {
  const [isLoading, setLoading] = useState(false);
  const [DATA, setDATA] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/document/")
      .then(({ data }) => {
        setDATA(data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const renderItem = ({ item }) => {
    const handlePress = (item) => {
      navigation.navigate("ArticleDetails", item);
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
    marginTop: 20,
    marginBottom: 20,
  },
});

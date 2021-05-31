import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Block, Text } from "galio-framework";

export default ArticleDetails = ({ route }) => {
  const { title, description } = route.params;
  /* // console.log(file);
  const [videoUrl, setVideoUrl] = useState("")
  useEffect(() => {
      setVideoUrl(file)
  }, []) */
  const { width } = Dimensions.get("window");
  return (
    <Block style={styles.container}>
      <Text h4>{title}</Text>
      <Text italic style={{ marginBottom: 10 }}>
        {description}
      </Text>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

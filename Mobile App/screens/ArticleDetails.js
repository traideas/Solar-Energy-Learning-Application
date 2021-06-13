import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Block, Text } from "galio-framework";



export default ArticleDetails = ({ route }) => {
  const { title, description, file } = route.params;
  const [pdfUrl, setPdfUrl] = useState("");
  useEffect(() => {
    setPdfUrl(file);
  }, []);
  const { width } = Dimensions.get("window");
  return (
    /* <Block style={styles.container}>
      <Block>
        <Text>{title}</Text>
        <Text>{description}</Text>
      </Block>
      <WebView
        scalesPageToFit={true}
        bounces={false}
        javaScriptEnabled
        source={{ uri: pdfUrl }}
        style={{ height: 300, width: 300 }}
      />
    </Block> */

    <Block style={styles.container}>
      <Text style={{ marginBottom: 10 }} p>{title}</Text>
      <Text style={{ marginBottom: 10 }}>
        {description}
      </Text>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

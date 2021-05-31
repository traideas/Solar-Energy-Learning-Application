import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, WebView } from "react-native";
import { Block, Text } from "galio-framework";
//import { WebView } from "react-native-webview";

export default ArticleDetails = ({ route }) => {
  const { title, description } = route.params;
  // console.log(file);
  const [pdfUrl, setPdfUrl] = useState("");
  useEffect(() => {
    setPdfUrl(file);
  }, []);
  const { width } = Dimensions.get("window");
  return (
    <Block style={styles.container}>
      <WebView source={{ uri: 'https://github.com/facebook/react-native' }} />
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

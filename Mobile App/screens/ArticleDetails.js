import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Block, Text } from "galio-framework";
import { WebView } from "react-native-webview";


export default ArticleDetails = ({ route }) => {
  const { title, description, file } = route.params;
  //console.log(file);
  const [pdfUrl, setPdfUrl] = useState("");
  useEffect(() => {
    setPdfUrl(file);
  }, []);
  const { width } = Dimensions.get("window");
  return (
    <Block style={styles.container}>
      <Block>
        <Text>{title}</Text>
        <Text>{description}</Text>
      </Block>
      {/*  <WebView
        scalesPageToFit={true}
        bounces={false}
        javaScriptEnabled
        source={{ pdfUrl }}
        style={{ height: 500, width: 300 }}
      /> */}
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

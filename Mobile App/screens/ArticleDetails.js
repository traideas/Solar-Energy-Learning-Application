import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Block, Text } from "galio-framework";
import { WebView } from "react-native-webview";

export default ArticleDetails = ({ route }) => {
  /* const { title, description } = route.params;
  // console.log(file);
  const [pdfUrl, setPdfUrl] = useState("");
  useEffect(() => {
    setPdfUrl(file);
  }, []); */
  const { width } = Dimensions.get("window");
  return (
    <Block style={styles.container}>
      <Text>Aeticle setails</Text>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20, 
    flexDirection:'column'
  },
});

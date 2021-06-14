import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Block, Text, Button } from "galio-framework";
import { WebView } from "react-native-webview";
// import { Constants, FileSystem } from "expo";
// import * as FileSystem from "expo-file-system";

export default ArticleDetails = ({ route }) => {
  const [isLoading, setLoading] = useState(false);
  const { title, description, file } = route.params;
  const [pdfUrl, setPdfUrl] = useState("");
  const [url, seturl] = useState();
  const { width } = Dimensions.get("window");


 /*  useEffect(() => {
    FileSystem.downloadAsync(
      "http://www.africau.edu/images/default/sample.pdf",
      FileSystem.documentDirectory + "small.pdf"
    )
      .then(({ uri }) => {
        seturl(uri);
        console.log("Finished downloading to ", uri);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); */
 /*  const downloadhandler = () => {
    FileSystem.downloadAsync(
      "http://www.africau.edu/images/default/sample.pdf",
      FileSystem.documentDirectory + "small.pdf"
    )
      .then(({ uri }) => {
        console.log("Finished downloading to ", uri);
        seturl(uri);
      })
      .catch((error) => {
        console.error(error);
      });
  }; */
  return (
    <ScrollView>
      <Block style={styles.container}>
        <Block>
          <Text h3>{title}</Text>
          <Text p>Your file will be downloaded shortly</Text>
        </Block>
        <WebView
          originWhitelist={['*']}
          source={{ uri: file }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          useWebKit={true}
          startInLoadingState={true}
        />
      </Block>
    </ScrollView>
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

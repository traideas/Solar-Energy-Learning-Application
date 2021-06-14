import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, ScrollView, View } from "react-native";
import { Block, Text, Button } from "galio-framework";
import { WebView } from "react-native-webview";
import PDFReader from "rn-pdf-reader-js"
// import { Constants, FileSystem } from "expo";
// import * as FileSystem from "expo-file-system";

export default ArticleDetails = ({ route }) => {
  const { title, description, file } = route.params;

  return (
    <View style={styles.container}>
      <PDFReader
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height
        }}
        source={{
          uri: file,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

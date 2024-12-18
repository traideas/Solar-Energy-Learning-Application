import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, ScrollView, View } from "react-native";
import { Block, Text } from "galio-framework";
import { WebView } from "react-native-webview";
import PDFReader from "rn-pdf-reader-js";

export default VideoDetail = ({ route }) => {
  const { title, description, file, photo, upload_date, created_by } =
    route.params;
  const { width } = Dimensions.get("window");
  return (
    <View style={styles.container}>
      <Block>
        <Text h3>{title}</Text>
        <Text p>Your file will be downloaded shortly</Text>
      </Block>
      <WebView source={{ uri: file }} />
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

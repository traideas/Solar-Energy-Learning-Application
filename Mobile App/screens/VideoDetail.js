import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Block, Text } from "galio-framework";
import { Video } from "expo-av";

export default function VideoDetails({ route }) {
  const { title, description, file } = route.params;
  console.log(file);
  return (
    <Block style={styles.container}>
      <Text h4>{title}</Text>
      <Text italic>{description}</Text>
      <Block>
        <Video
          source={{
            uri: "file",
          }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={{ width: 300, height: 300 }}
        />
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

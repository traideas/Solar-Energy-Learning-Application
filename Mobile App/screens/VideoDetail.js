import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Dimensions, Button } from "react-native";
import { Block, Text } from "galio-framework";
import { Video, AVPlaybackStatus } from "expo-av";

export default VideoDetail = ({ route }) => {
  const { title, description, file } = route.params;
  const [videoUrl, setVideoUrl] = useState("");
  const video = useRef(null);

  useEffect(() => {
    setVideoUrl(file);
  }, []);
  const { width } = Dimensions.get("window");
  return (
    <Block style={styles.container}>
      <Text h4>{title}</Text>
      <Block>
        <Video
          ref={video}
          source={{
            uri: videoUrl,
          }}
          shouldPlay
          resizeMode="cover"
          style={{ height: 300 }}
          useNativeControls
          resizeMode="contain"
          isLooping
        />
        <Text italic style={{ marginBottom: 10 }}>
          {description}
        </Text>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  controlBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

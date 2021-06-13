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
      <Text style={{ marginBottom: 10 }} p>{title}</Text>

      <Video
        ref={video}
        source={{
          uri: videoUrl,
        }}
        shouldPlay
        resizeMode="cover"

        useNativeControls
        resizeMode="contain"
        isLooping
        style={styles.backgroundVideo}
      />


      <Text style={{ marginBottom: 10, marginTop: 10 }}>
        {description}
      </Text>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  backgroundVideo: {
    borderRadius: 5,
    borderWidth: 1,
    height: 300,
    borderColor: "lightgray",
    backgroundColor: "white",
    padding: 5
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

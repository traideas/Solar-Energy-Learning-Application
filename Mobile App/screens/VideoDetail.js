import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Block, Text } from "galio-framework";
import { Video } from "expo-av";

export default VideoDetail = ({ route }) => {
  const { title, description, file } = route.params;
  // console.log(file);
  const [videoUrl, setVideoUrl] = useState("")
  useEffect(() => {
      setVideoUrl(file)
  }, [])
  const { width } = Dimensions.get('window');
  return (
    <Block style={styles.container}>
      <Text h4>{title}</Text>
      <Text italic style={{marginBottom: 10}}>{description}</Text>
      
      <Block>
        <Video
          source={{
            uri: videoUrl,
          }}
          shouldPlay
          resizeMode="cover"
          style={{ width: 350, height: 300 }}
        />
        <Block style={styles.controlBar}></Block>
      </Block>
    </Block>
  );
}

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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  }
});

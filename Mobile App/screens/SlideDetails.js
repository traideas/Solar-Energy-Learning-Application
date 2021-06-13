import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Block, Text } from "galio-framework";

export default VideoDetail = ({ route }) => {
  const [details, setDetails] = useState({
    created_by: {
      name: "",
      photo: ""
    },
    description: "",
    file: "",
    id: "",
    material_type: "",
    photo: "",
    status: true,
    title: "",
    upload_date: ""
  })
  const { title, description, file, photo, upload_date, created_by } = route.params;
  /* // console.log(file);
  const [videoUrl, setVideoUrl] = useState("")
  useEffect(() => {
      setVideoUrl(file)
  }, []) */
  const { width } = Dimensions.get("window");
  return (
    <Block style={styles.container}>
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

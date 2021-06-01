import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Block, Card, Text, Button } from "galio-framework";
import axios from "axios";
import Input from "../components/Input";
import { useForm } from "react-hook-form";

export default CreateDiscussion = ({ navigation }) => {
  const { control, handleSubmit } = useForm();
  const onSubmit = ({ title, description }) => {
    axios.post("http://127.0.0.1:8000/discussion/", {
      "title": title,
      "description": description,
      "created_by": 1,
    })
      .then(res => {
        console.log("Discussion Created Successfully")
        navigation.goBack()
      })
      .catch(err => {
        console.log("Failed to Create Discussion")
      })
  }
  return (
    <Block style={styles.container}>
      <Input name="title" control={control} />
      <Input name="description" control={control} />
      <Button onPress={handleSubmit(onSubmit)}>Post Discussion</Button>
    </Block>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  item: {
    flex: 1,
    marginTop: 20,
  },
});
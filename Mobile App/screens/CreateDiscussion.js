import React from "react";
import {
  StyleSheet,
  AsyncStorage,
  TextInput
} from "react-native";
import { Block, Button } from "galio-framework";
import axios from "axios";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import configData from '../services/configData.json'
export default CreateDiscussion = ({ navigation }) => {
  const { control, handleSubmit } = useForm();
  const onSubmit = ({ title, description }) => {
    // console.log(AsyncStorage.getItem('user_id'))
    axios.post(configData.SERVER_URL + "discussion/", {
      "title": title,
      "description": description,
      "created_by": AsyncStorage.getItem('user_id'),
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
      <Input
        name="title"

        placeholder="  Discussion title"
        control={control} />
      <Input
        name="description"
        placeholder="  Details of your discussion"
        control={control} />
      <Button style={{ marginLeft: 0 }} onPress={handleSubmit(onSubmit)}>Post Discussion</Button>
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
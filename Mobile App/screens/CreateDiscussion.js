import React, { useState } from "react";
import { StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Block, Button } from "galio-framework";
import axios from "axios";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import configData from "../services/configData.json";
import AuthService from "../services/auth.service";
import useConfig from "../hooks/useConfig";

export default CreateDiscussion = ({ navigation }) => {
  const [config] = useConfig()
  const { control, handleSubmit } = useForm();
  const [userID, setUserID] = useState();
  AuthService.displayData().then((val) => setUserID(val));
  const onSubmit = ({ title, description }) => {
    axios
      .post(
        configData.SERVER_URL + "discussion/",
        {
          title: title,
          description: description,
          created_by: userID,
        },
        config
      )
      .then((res) => {
        Alert.alert("Great", "Discussion Created Successfully!");
        navigation.goBack();
      })
      .catch((err) => {
        Alert.alert("Failed!", "Please Try Again.");
      });
  };
  return (
    <Block style={styles.container}>
      <Input name="title" placeholder="  Discussion title" control={control} />
      <Input
        name="description"
        placeholder="  Details of your discussion"
        control={control}
      />
      <Button style={{ marginLeft: 0 }} onPress={handleSubmit(onSubmit)}>
        Post Discussion
      </Button>
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

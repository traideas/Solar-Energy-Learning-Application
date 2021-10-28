import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  TouchableHighlight,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Block, Text } from "galio-framework";

import Button from "../components/Button";
import Input from "../components/Input";
import Icon from "../components/Icon";
import { Images, argonTheme } from "../constants";
import axios from "axios";
import configData from "../services/configData.json";
const { width, height } = Dimensions.get("screen");

export default Login = ({ navigation }) => {
  const { control, handleSubmit } = useForm();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState("");

  const onSubmit = (e) => {
    setLoading(true);
    axios
      .post(configData.SERVER_URL + "api/auth/", e)
      .then(({ data }) => {
        AsyncStorage.setItem("user_id", JSON.stringify(data.user_id));
        AsyncStorage.setItem("token", JSON.stringify(data.token));
        navigation.replace("HomeRoute");
      })
      .catch((err) => {
        Alert.alert("Login Failed!", "Please Try Again.");
        console.log(err);
      });
  };
  const onPressRegister = () => {
    navigation.push("Register");
  };
  return (
    <Block flex middle>
      <ImageBackground
        source={Images.RegisterBackground}
        style={{ width, height, zIndex: 1 }}
      >
        <Block safe flex middle>
          <Block style={styles.registerContainer}>
            <Block flex>
              <Block
                flex={0.17}
                middle
                style={{ marginTop: 15, marginBottom: 15 }}
              >
                <Text bold color="#8898AA" size={20}>
                  Login to MyREL
                </Text>
              </Block>
              <Block flex center>
                <KeyboardAvoidingView
                  style={{ flex: 1 }}
                  behavior="padding"
                  enabled
                >
                  <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                    <Input
                      borderless
                      placeholder="Username"
                      iconContent={
                        <Icon
                          size={16}
                          color={argonTheme.COLORS.ICON}
                          name="fingerprint"
                          family="entypo"
                          style={styles.inputIcons}
                        />
                      }
                      name="username"
                      control={control}
                    />
                  </Block>
                  <Block width={width * 0.8}>
                    <Input
                      password
                      borderless
                      placeholder="Password"
                      iconContent={
                        <Icon
                          size={16}
                          color={argonTheme.COLORS.ICON}
                          name="padlock-unlocked"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      }
                      name="password"
                      control={control}
                    />
                  </Block>
                  <Block middle>
                    <Button
                      color="primary"
                      style={styles.createButton}
                      onPress={handleSubmit(onSubmit)}
                    >
                      <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                        Login
                      </Text>
                    </Button>
                  </Block>
                  <Block middle style={{ paddingTop: 20 }}>
                    <TouchableHighlight
                      onPress={onPressRegister}
                      underlayColor="transparent"
                    >
                      <Text color="#8898AA">
                        If you don't have an account,{" "}
                        <Text bold color="blue">
                          Register Here
                        </Text>
                      </Text>
                    </TouchableHighlight>
                  </Block>
                </KeyboardAvoidingView>
              </Block>
            </Block>
          </Block>
        </Block>
      </ImageBackground>
    </Block>
  );
};

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.48,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden",
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA",
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14,
  },
  inputIcons: {
    marginRight: 12,
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30,
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
  },
});

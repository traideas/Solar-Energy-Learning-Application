import React, { useState, createRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  TouchableHighlight,
  Alert,
  AsyncStorage,
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import Button from "../components/Button";
import Input from "../components/Input";
import Icon from "../components/Icon";
import { Images, argonTheme } from "../constants";
import axios from "axios";

const { width, height } = Dimensions.get("screen");

export default Login = ({ navigation }) => {
  const { control, handleSubmit } = useForm()
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const onSubmit = (e) => {
    setLoading(true)
    axios.post("http://127.0.0.1:8000/api/auth/", e)
      .then(({ data }) => {
        AsyncStorage.setItem('user_id', JSON.stringify(data.user_id))
        navigation.replace('HomeRoute')
      })
      .catch(err => {
        Alert.alert("Login Failed!")
        console.log(err)
      })
  };
  const onPressRegister = () => {
    navigation.push("Register");
    // Check if Stored in AsyncStorage
    /* AsyncStorage.getItem('user_id')
    .then(val => console.log(val)) */
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
              <Block flex={0.17} middle style={{ marginTop: 15, marginBottom: 15 }}>
                <Text color="#8898AA" size={30}>
                  Login
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
                          name="ic_mail_24px"
                          family="ArgonExtra"
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
                    <TouchableHighlight onPress={onPressRegister}>
                      <Text>Register If you dont Have an account</Text>
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
    height: height * 0.480,
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

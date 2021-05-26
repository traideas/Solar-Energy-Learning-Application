import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  Keyboard,
  Alert,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";

const { width, height } = Dimensions.get("screen");

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const Register = ({ navigation }) => {
  const { control, handleSubmit } = useForm();
  const onSubmit = ({
    username,
    password,
    school_name,
    school_roll,
    birth_date,
  }) => {
    axios
      .post("http://127.0.0.1:8000/student/", {
        user: {
          username,
          password,
        },
        school_section: {
          section: 1,
          school_name,
        },
        school_roll,
        birth_date,
      })
      .then((res) => Alert.alert("Registration Successful"))
      .catch((err) => console.log(err));
  };
  return (
    <DismissKeyboard>
      <Block flex middle>
        <ImageBackground
          source={Images.RegisterBackground}
          style={{ width, height, zIndex: 1 }}
        >
          <Block flex middle>
            <Block style={styles.registerContainer}>
              <Block flex space="between">
                <Block flex={0.8} middle space="between">
                  <Block flex={0.2} middle>
                    <Text
                      style={{
                        fontFamily: "open-sans-regular",
                        textAlign: "center",
                      }}
                      color="#8898AA"
                      size={12}
                    >
                      Sign Up For MyRel
                    </Text>
                  </Block>
                  <Block center flex={0.9}>
                    <Block flex space="between">
                      <Block>
                        <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                          <Input
                            borderless
                            placeholder="User Name"
                            iconContent={
                              <Icon
                                size={16}
                                color="#ADB5BD"
                                name="hat-3"
                                family="ArgonExtra"
                                style={styles.inputIcons}
                              />
                            }
                            name="username"
                            control={control}
                          />
                        </Block>
                        <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                          <Input
                            borderless
                            placeholder="Email"
                            iconContent={
                              <Icon
                                size={16}
                                color="#ADB5BD"
                                name="ic_mail_24px"
                                family="ArgonExtra"
                                style={styles.inputIcons}
                              />
                            }
                            name="email"
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
                                color="#ADB5BD"
                                name="padlock-unlocked"
                                family="ArgonExtra"
                                style={styles.inputIcons}
                              />
                            }
                            name="password"
                            control={control}
                          />
                        </Block>
                        <Block row width={width * 0.75}>
                          <Text
                            style={{
                              fontFamily: "open-sans-regular",
                              textAlign: "center",
                            }}
                            color="#8898AA"
                            size={12}
                          >
                            School Details
                          </Text>
                        </Block>
                        <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                          <Input
                            borderless
                            placeholder="School Name"
                            iconContent={
                              <Icon
                                size={16}
                                color="#ADB5BD"
                                name="ic_mail_24px"
                                family="ArgonExtra"
                                style={styles.inputIcons}
                              />
                            }
                            name="school_name"
                            control={control}
                          />
                        </Block>
                        <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                          <Input
                            borderless
                            placeholder="School Roll"
                            iconContent={
                              <Icon
                                size={16}
                                color="#ADB5BD"
                                name="ic_mail_24px"
                                family="ArgonExtra"
                                style={styles.inputIcons}
                              />
                            }
                            name="school_roll"
                            control={control}
                          />
                        </Block>
                      </Block>
                    </Block>
                    <Block flex={0.2} middle>
                      <Block center>
                        <Button
                          color="primary"
                          style={styles.createButton}
                          onPress={handleSubmit(onSubmit)}
                        >
                          <Text
                            style={{ fontFamily: "open-sans-bold" }}
                            size={14}
                            color={argonTheme.COLORS.WHITE}
                          >
                            CREATE ACCOUNT
                          </Text>
                        </Button>
                      </Block>
                    </Block>
                  </Block>
                  <Block middle style={{ paddingTop: 20 }}>
                    <TouchableHighlight
                      onPress={() => navigation.navigate("Login")}
                    >
                      <Text>Login If you already have an account</Text>
                    </TouchableHighlight>
                  </Block>
                </Block>
              </Block>
            </Block>
          </Block>
        </ImageBackground>
      </Block>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height < 812 ? height * 0.9 : height * 0.8,
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
    borderColor: "rgba(136, 152, 170, 0.3)",
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
    paddingLeft: 2,
    paddingTop: 6,
    paddingBottom: 15,
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 40,
  },
});

export default Register;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  KeyboardAwareScrollView,
  ScrollView,
  Alert,
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";

const { width, height } = Dimensions.get("screen");

const Register = () => {
  const { control, handleSubmit } = useForm();
  const onSubmit = ({ username, password, school_name, school_roll, birth_date }) => {
    axios.post("http://127.0.0.1:8000/student/", {
      user: {
        username,
        password
      },
      school_section: {
        section: 1,
        school_name
      },
      school_roll,
      birth_date
    })
    .then(res => Alert.alert("Registration Successful"))
    .catch(err => console.log(err))
  }
  return (
    <Block flex middle>
      <StatusBar hidden />
      <ImageBackground
        source={Images.RegisterBackground}
        style={{ width, height, zIndex: 1 }}
      >
        <Block safe flex middle>
          <Block style={styles.registerContainer}>
            <ScrollView>
              <Block flex>
                <Block flex={0.1} middle>
                  <Text color="#8898AA" size={12}>
                    Account Registration for MyRel
                  </Text>
                </Block>
                <Block flex center>
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
                  <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                    <Input
                      borderless
                      placeholder="Email (Optional)"
                      iconContent={
                        <Icon
                          size={16}
                          color={argonTheme.COLORS.ICON}
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
                  <Block flex={0.17} middle>
                    <Text color="#8898AA" size={12}>
                      School Details
                    </Text>
                  </Block>
                  <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                    <Input
                      borderless
                      placeholder="School Name"
                      iconContent={
                        <Icon
                          size={16}
                          color={argonTheme.COLORS.ICON}
                          name="ic_mail_24px"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      }
                      name="school_name"
                      control={control}
                    />
                  </Block>
                  <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                    <Input
                      borderless
                      placeholder="Section"
                      iconContent={
                        <Icon
                          size={16}
                          color={argonTheme.COLORS.ICON}
                          name="ic_mail_24px"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      }
                      name="section"
                      control={control}
                    />
                  </Block>
                  <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                    <Input
                      borderless
                      placeholder="Roll Number"
                      iconContent={
                        <Icon
                          size={16}
                          color={argonTheme.COLORS.ICON}
                          name="ic_mail_24px"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      }
                      name="school_roll"
                      control={control}
                    />
                  </Block>
                  <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                    <Input
                      borderless
                      placeholder="Birth Date"
                      iconContent={
                        <Icon
                          size={16}
                          color={argonTheme.COLORS.ICON}
                          name="ic_mail_24px"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      }
                      name="birth_date"
                      control={control}
                    />
                  </Block>
                  {/*<Block row width={width * 0.75}>
                      <Checkbox
                        checkboxStyle={{
                          borderWidth: 3,
                        }}
                        color={argonTheme.COLORS.PRIMARY}
                        label="I agree with the Privacy Policy"
                      />
                       <Button
                        style={{ width: 100 }}
                        color="transparent"
                        textStyle={{
                          color: argonTheme.COLORS.PRIMARY,
                          fontSize: 14,
                        }}
                      >
                        Privacy Policy
                      </Button> 
                    </Block> */}
                  <Block middle>
                    <Button
                      color="primary"
                      style={styles.createButton}
                      onPress={handleSubmit(onSubmit)}
                    >
                      <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                        CREATE ACCOUNT
                      </Text>
                    </Button>
                  </Block>
                </Block>
              </Block>
            </ScrollView>
          </Block>
        </Block>
      </ImageBackground>
    </Block>
  );
};

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.875,
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

export default Register;

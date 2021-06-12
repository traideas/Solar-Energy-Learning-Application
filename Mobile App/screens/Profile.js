import { Block, Text } from "galio-framework";
import React, { useEffect, useState, useLayoutEffect } from "react";

import axios from "axios";
import AuthService from "../services/auth.service";
import Icon from '../components/Icon'
import argonTheme from "../constants/Theme";

const Profile = ({ navigation, back, scene }) => {
  const [userID, setUserID] = useState();
  const [fname, setFname] = useState();

  AuthService.displayData().then((val) => setUserID(val));
  /*   useEffect(() => {
    AuthService.displayData().then((val) => {
      axios
        .get("http://127.0.0.1:8000/teacher/" + val + "/")
        .then(({ first_name }) => setFname(first_name));
    });
  }, []); */

  const handleLeftPress = () => {
    return back
      ? navigation.dispatch(CommonActions.goBack())
      : navigation.openDrawer();
  };
  const [count, setCount] = React.useState(0);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Icon
          name={back ? "chevron-left" : "menu"}
          family="entypo"
          // name={back ? 'nav-left' : "menu-8"} family="ArgonExtra"
          size={back ? 20 : 20}
          onPress={handleLeftPress}
          color={argonTheme.COLORS.WHITE}
          style={{ marginTop: 2, marginHorizontal: 15 }}
        />
      ),
    });
  }, [navigation]);
  return (
    <Block>
      <Text>This is USer Profile {userID}</Text>
      <Text>{fname}</Text>
    </Block>
  );
};

export default Profile;

import { Block, Text } from "galio-framework";
import React, { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import axios from "axios";

const Profile = () => {
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
  return (
    <Block>
      <Text>This is USer Profile {userID}</Text>
      <Text>{fname}</Text>
    </Block>
  );
};

export default Profile;

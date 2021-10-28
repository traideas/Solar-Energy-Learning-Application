import React, { useState } from "react";
import AuthService from "../services/auth.service";
const useConfig = () => {
  const [token, setToken] = useState();
  AuthService.getConfigToken().then((val) => setToken(JSON.parse(val)));
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };
  return [config];
};

export default useConfig;

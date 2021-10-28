import React, { useState, useEffect } from "react";
import axios from "axios";
import configData from "../services/configData.json";
import AuthService from "../services/auth.service";
import useConfig from "./useConfig";

const useAxios = (url) => {
  const [data, setData] = useState([]);
  const [config] = useConfig();

  useEffect(() => {
    if (config !== null) {
      axios
        .get(configData.SERVER_URL + url, config)
        .then(({ data }) => {
          setData(data);
        })
        .catch((err) => console.log(err));
    }
  }, [config]);

  return [data];
};

export default useAxios;

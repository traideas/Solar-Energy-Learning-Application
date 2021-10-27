import React, { useState, useEffect } from "react";
import axios from "axios";
import configData from "../services/configData.json";

/* const config = {
  headers: {
    Authorization: `Token ${accessToken}`,
  },
}; */

const config = {
  headers: {
    Authorization: `Token cacd713f5fd0c18ce15a6fc9bc9d9337663b2131`,
  },
};

const useAxios = (url) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(configData.SERVER_URL + url, config)
      .then(({ data }) => {
        setData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return [data];
};

export default useAxios;

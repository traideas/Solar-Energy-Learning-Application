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
    Authorization: `Token 0699bb9409e56fb69eaec6229e6ffea8ff5e6ac8`,
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

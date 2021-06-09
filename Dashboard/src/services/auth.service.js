import axios from "axios";
import configData from '../configData.json'
import { useAsync } from 'react-async';

const register = (
  first_name,
  last_name,
  username,
  email,
  password,
  institute_name
) => {
  return axios.post(configData.SERVER_URL + "teacher/", {
    user: {
      first_name,
      last_name,
      username,
      email,
      password,
    },
    institute_name,
  });
};

const login = (username, password) => {
  return axios
    .post(configData.SERVER_URL + "api/auth/", {
      username,
      password,
    })
    .then(async ({ data }) => {
      const result = await axios.get(configData.SERVER_URL + "teacher/" + data.user_id + "/")
      localStorage.setItem("teacherStatus", JSON.stringify(result.data.is_verified));
      localStorage.setItem("userToken", JSON.stringify(data.token));
      localStorage.setItem("userTypeStudent", JSON.stringify(data.is_student));
      localStorage.setItem("userTypeTeacher", JSON.stringify(data.is_teacher));
      localStorage.setItem("userTypeAdmin", JSON.stringify(data.is_admin));
      localStorage.setItem("userId", JSON.stringify(data.user_id));

    });
};

const logout = () => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("userTypeStudent");
  localStorage.removeItem("userTypeTeacher");
  localStorage.removeItem("userId");
  localStorage.removeItem("userTypeAdmin");
  localStorage.removeItem("teacherStatus");
};

const isLogedin = () => {

  if (hasToken() && isTeacher() && isValidTeacher()) {
    return true;
  }
  else {
    return false;
  }

};

const hasToken = () => {
  return JSON.parse(localStorage.getItem("userToken"));
};

const isStudent = () => {
  return JSON.parse(localStorage.getItem("userTypeStudent"));
};

const isTeacher = () => {
  return JSON.parse(localStorage.getItem("userTypeTeacher"));
};

const isValidTeacher = () => {
  return JSON.parse(localStorage.getItem("teacherStatus"))
};

const isAdmin = () => {
  return JSON.parse(localStorage.getItem("userTypeAdmin"));
};

const getUserId = () => {
  return JSON.parse(localStorage.getItem("userId"));
};

export default {
  register,
  login,
  logout,
  isLogedin,
  isStudent,
  isTeacher,
  getUserId,
  isAdmin,
  hasToken,
  isValidTeacher
};

import axios from "axios";
import configData from '../configData.json'

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

      if (data.is_teacher) {

        const result = await axios.get(configData.SERVER_URL + "teacher/" + data.user_id + "/", {
          headers: {
            'Authorization': `Token ${data.token}`
          }
        })
        if (result.data.is_verified == true) {
          localStorage.setItem("tusoKe36kie", JSON.stringify(data.token));
          localStorage.setItem("Teas7jkdb13sduiw", JSON.stringify(data.is_teacher));
          localStorage.setItem("s4u8i2sdyf", JSON.stringify(data.user_id));
        }
      }
      else if (data.is_admin) {
        localStorage.setItem("Admsienjoas2h3", JSON.stringify(data.is_admin));
        localStorage.setItem("tusoKe36kie", JSON.stringify(data.token));
        localStorage.setItem("s4u8i2sdyf", JSON.stringify(data.user_id));
      }
      else {
        localStorage.setItem("tusoKe36kie", JSON.stringify(data.token));
        localStorage.setItem("Stdhus21uu23wj", JSON.stringify(data.is_student));
        localStorage.setItem("s4u8i2sdyf", JSON.stringify(data.user_id));
      }

    });
};

const logout = () => {
  localStorage.removeItem("tusoKe36kie");
  localStorage.removeItem("Stdhus21uu23wj");
  localStorage.removeItem("Teas7jkdb13sduiw");
  localStorage.removeItem("s4u8i2sdyf");
  localStorage.removeItem("Admsienjoas2h3");

};

const isLogedin = () => {

  if (hasToken() && getUserId()) {
    return true;
  }
  else {
    return false;
  }

};

const hasToken = () => {
  return JSON.parse(localStorage.getItem("tusoKe36kie"));
};

const isStudent = () => {
  return JSON.parse(localStorage.getItem("Stdhus21uu23wj"));
};

const isTeacher = () => {
  return JSON.parse(localStorage.getItem("Teas7jkdb13sduiw"));
};

const isAdmin = () => {
  return JSON.parse(localStorage.getItem("Admsienjoas2h3"));
};

const getUserId = () => {
  return JSON.parse(localStorage.getItem("s4u8i2sdyf"));
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

};

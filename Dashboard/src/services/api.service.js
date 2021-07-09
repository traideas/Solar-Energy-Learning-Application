import axios from "axios";
import configData from '../configData.json'
import authService from "./auth.service";

const accessToken = JSON.parse(localStorage.getItem("tusoKe36kie"))



const config = {
  headers: {
    'Authorization': `Token ${accessToken}`
  }
}

const uploadVideoContent = (
  title,
  description,
  created_by,
  photo,
  file,
  status
) => {
  let formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("created_by", created_by);
  if (photo[0] != undefined) {
    formData.append("photo", photo[0]);
  }
  formData.append("file", file[0]);
  formData.append("status", status);
  return axios.post(configData.SERVER_URL + "video/", config, formData);
};


const uploadSlideContent = (
  title,
  description,
  created_by,
  photo,
  file,
  status
) => {
  let formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("created_by", created_by);
  if (photo[0] != undefined) {
    formData.append("photo", photo[0]);
  }
  formData.append("file", file[0]);
  formData.append("status", status);
  return axios.post(configData.SERVER_URL + "pptx/", config, formData);
};

const uploadArticleContent = (
  title,
  description,
  created_by,
  photo,
  file,
  status
) => {
  let formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("created_by", created_by);
  if (photo[0] != undefined) {
    formData.append("photo", photo[0]);
  }
  formData.append("file", file[0]);
  formData.append("status", status);
  return axios.post(configData.SERVER_URL + "document/", config, formData);
};

const uploadDiscussion = (
  title,
  description,
  created_by,
  status
) => {
  let formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("created_by", created_by);
  formData.append("status", status);
  return axios.post(configData.SERVER_URL + "discussion/", config, formData);
};

const uploadComment = (
  comment,
  discussion,
  created_by
) => {
  let formData = new FormData();
  formData.append("comment", comment);
  formData.append("discussion", discussion);
  formData.append("created_by", created_by);
  return axios.post(configData.SERVER_URL + "comment/", config, formData);
};

const getUserDetails = (id) => {
  if (authService.isAdmin) {
    return (
      axios.get(configData.SERVER_URL + "user_admin/" + id + "/", config)
    )
  }
  if (authService.isTeacher) {
    return (
      axios.get(configData.SERVER_URL + "teacher/" + id + "/", config)
    )
  }
  else {
    return (
      axios.get(configData.SERVER_URL + "student/" + id + "/", config)
    )
  }

};

const getArticleDetails = () => {

  return (
    axios.get(configData.SERVER_URL + "document/", config)
  )
};

const getSlideDetails = () => {
  return (
    axios.get(configData.SERVER_URL + "pptx/", config)
  )
};

const getVideoDetails = () => {

  return (
    axios.get(configData.SERVER_URL + "video/", config)
  )
};

const getQuizDetails = () => {
  return (
    axios.get(configData.SERVER_URL + "quiz/", config)
  )
};

const getDiscussionDetails = () => {
  return (
    axios.get(configData.SERVER_URL + "discussion/", config)
  )
};

const getDiscussionById = (id) => {
  return (
    axios.get(configData.SERVER_URL + "discussion/" + id + "/", config)
  )
};

const getTeacherList = () => {
  return (
    axios.get(configData.SERVER_URL + "teacherall/", config)
  )
};

const changeInstructorStatus = (
  id,
  first_name,
  last_name,
  username,
  email,
  is_verified,
  institute_name,
) => {
  let formData = new FormData()
  formData.append("user.id", id)
  formData.append("user.first_name", first_name)
  formData.append("user.last_name", last_name)
  formData.append("user.username", username)
  formData.append("user.email", email)
  formData.append("is_verified", is_verified)
  formData.append("institute_name", institute_name)
  return axios.put(configData.SERVER_URL + "teacher/" + id + "/", config, formData)
}

export default {
  uploadVideoContent,
  uploadSlideContent,
  uploadArticleContent,
  uploadDiscussion,
  uploadComment,
  getUserDetails,
  getDiscussionDetails,
  getDiscussionById,
  getArticleDetails,
  getSlideDetails,
  getVideoDetails,
  getQuizDetails,
  getTeacherList,
  changeInstructorStatus
};
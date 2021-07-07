import axios from "axios";
import configData from '../configData.json'
import AuthService from './auth.service'

const accessToken = AuthService.hasToken()

axios.interceptors.request.use(
  config => {
    config.headers.authorization = `Bearer ${accessToken}`;
    return config;
  },
  error => {
    return Promise.reject(error)
  }
)

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
  return axios.post(configData.SERVER_URL + "video/", formData);
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
  return axios.post(configData.SERVER_URL + "pptx/", formData);
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
  return axios.post(configData.SERVER_URL + "document/", formData);
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
  return axios.post(configData.SERVER_URL + "discussion/", formData);
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
  return axios.post(configData.SERVER_URL + "comment/", formData);
};

const getUserDetails = (id) => {
  return (
    axios.get(configData.SERVER_URL + "teacher/" + id + "/")
  )
};

const getArticleDetails = () => {
  return (
    axios.get(configData.SERVER_URL + "document/")
  )
};

const getSlideDetails = () => {
  return (
    axios.get(configData.SERVER_URL + "pptx/")
  )
};

const getVideoDetails = () => {
  return (
    axios.get(configData.SERVER_URL + "video/")
  )
};

const getQuizDetails = () => {
  return (
    axios.get(configData.SERVER_URL + "quiz/")
  )
};

const getDiscussionDetails = () => {
  return (
    axios.get(configData.SERVER_URL + "discussion/")
  )
};

const getDiscussionById = (id) => {
  return (
    axios.get(configData.SERVER_URL + "discussion/" + id + "/")
  )
};

const getTeacherList = () => {
  return (
    axios.get(configData.SERVER_URL + "teacherall/")
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
  return axios.put(configData.SERVER_URL + "teacher/" + id + "/", formData
  )
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
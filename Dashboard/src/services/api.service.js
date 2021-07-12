import axios from "axios";
import configData from "../configData.json";
import authService from "./auth.service";

const accessToken = JSON.parse(localStorage.getItem("tusoKe36kie"));

const config = {
  headers: {
    Authorization: `Token ${accessToken}`,
  },
};

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
  return axios.post(configData.SERVER_URL + "video/", formData, config);
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
  return axios.post(configData.SERVER_URL + "pptx/", formData, config);
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
  return axios.post(configData.SERVER_URL + "document/", formData, config);
};

const uploadDiscussion = (title, description, file, created_by, status) => {
  let formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  if (file[0] != undefined) {
    formData.append("file", file[0]);
  }
  formData.append("created_by", created_by);
  formData.append("status", status);
  return axios.post(configData.SERVER_URL + "discussion/", formData, config);
};

const uploadComment = (comment, discussion, created_by) => {
  let formData = new FormData();
  formData.append("comment", comment);
  formData.append("discussion", discussion);
  formData.append("created_by", created_by);
  return axios.post(configData.SERVER_URL + "comment/", formData, config);
};

const getUserDetails = (id) => {
  if (authService.isAdmin()) {
    return axios.get(configData.SERVER_URL + "user_admin/" + id + "/", config);
  }
  if (authService.isTeacher()) {
    return axios.get(configData.SERVER_URL + "teacher/" + id + "/", config);
  } else {
    return axios.get(configData.SERVER_URL + "student/" + id + "/", config);
  }
};

const getArticleDetails = () => {
  return axios.get(configData.SERVER_URL + "document/", config);
};

const getSlideDetails = () => {
  return axios.get(configData.SERVER_URL + "pptx/", config);
};

const getVideoDetails = () => {
  return axios.get(configData.SERVER_URL + "video/", config);
};

const getQuizDetails = () => {
  return axios.get(configData.SERVER_URL + "quiz/", config);
};

const getQuizById = (id) => {
  return axios.get(configData.SERVER_URL + "quiz/" + id + "/", config);
};

const setQuizScore = (
  student,
  quiz,
  totalQuestion,
  totalMArks,
  right,
  wrong,
  score
) => {
  const data = {
    student: student,
    quiz: quiz,
    totalQuestion: totalQuestion,
    totalMarks: totalMArks,
    right: right,
    wrong: wrong,
    score: score,
  };
  return axios.post(configData.SERVER_URL + "score/", data, config);
};

const getDiscussionDetails = () => {
  return axios.get(configData.SERVER_URL + "discussion/", config);
};

const getDiscussionById = (id) => {
  return axios.get(configData.SERVER_URL + "discussion/" + id + "/", config);
};

const getTeacherList = () => {
  return axios.get(configData.SERVER_URL + "teacherall/", config);
};

const getSchoolList = () => {
  return axios.get(configData.SERVER_URL + "school/");
};

const changeInstructorStatus = (
  id,
  first_name,
  last_name,
  username,
  email,
  is_verified,
  institute_name
) => {
  return axios.put(
    configData.SERVER_URL + "teacher/" + id + "/",
    {
      created_by: {
        id,
        first_name,
        last_name,
        username,
        email,
      },
      is_verified: is_verified,
      institute_name: institute_name,
    },
    config
  );
};

const deleteDiscussion = (id) => {
  return axios.delete(configData.SERVER_URL + "discussion/" + id + "/", config);
};

const deleteComment = (id) => {
  return axios.delete(configData.SERVER_URL + "comment/" + id + "/", config);
};

const deleteVideo = (id) => {
  return axios.delete(configData.SERVER_URL + "video/" + id + "/", config);
};

const deleteSlide = (id) => {
  return axios.delete(configData.SERVER_URL + "pptx/" + id + "/", config);
};

const deleteArticle = (id) => {
  return axios.delete(configData.SERVER_URL + "document/" + id + "/", config)
}

const deleteQuiz = (id) => {
  return axios.delete(configData.SERVER_URL + "quiz/" + id + "/", config)
}

const updateProfile = (formData, id) => {
  if (authService.isAdmin()) {
    return axios.put(configData.SERVER_URL + "user_admin/" + id + "/", formData, config);
  }
  if (authService.isTeacher()) {
    return axios.put(configData.SERVER_URL + "teacher/" + id + "/", formData, config);
  } else {
    return axios.put(configData.SERVER_URL + "student/" + id + "/", formData, config);
  }
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
  changeInstructorStatus,
  getSchoolList,
  deleteDiscussion,
  deleteComment,
  deleteVideo,
  deleteSlide,
  deleteArticle,
  deleteQuiz,
  getQuizById,
  setQuizScore,
  updateProfile
};


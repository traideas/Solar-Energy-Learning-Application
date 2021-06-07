import axios from "axios";

const uploadVideoContent = (
  title,
  description,
  created_by,
  photo,
  //meterial_type,
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
  //formData.append("meterial_type", meterial_type);
  formData.append("file", file[0]);
  formData.append("status", status);
  return axios.post("http://127.0.0.1:8000/video/", formData);
};


const uploadSlideContent = (
  title,
  description,
  created_by,
  photo,
  //meterial_type,
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
  //formData.append("meterial_type", meterial_type);
  formData.append("file", file[0]);
  formData.append("status", status);
  return axios.post("http://127.0.0.1:8000/pptx/", formData);
};

const uploadArticleContent = (
  title,
  description,
  created_by,
  photo,
  //meterial_type,
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

  //formData.append("meterial_type", meterial_type);
  formData.append("file", file[0]);
  formData.append("status", status);
  return axios.post("http://127.0.0.1:8000/document/", formData);
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
  return axios.post("http://127.0.0.1:8000/discussion/", formData);
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
  return axios.post("http://127.0.0.1:8000/comment/", formData);
};

const getUserDetails = (id) => {
  return (
    axios.get("http://127.0.0.1:8000/teacher/" + id + "/")
  )
}

export default {
  uploadVideoContent,
  uploadSlideContent,
  uploadArticleContent,
  uploadDiscussion,
  uploadComment,
  getUserDetails
};
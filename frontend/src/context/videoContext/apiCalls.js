import axios from "axios";
import {
  getVideosFailure,
  getVideosStart,
  getVideosSuccess,
  addVideoFailure,
  addVideoStart,
  addVideoSuccess,
  updateVideoFailure,
  updateVideoStart,
  updateVideoSuccess,
  deleteVideoFailure,
  deleteVideoStart,
  deleteVideoSuccess,
} from "./VideoActions";

export const getVideos = async (dispatch) => {
  dispatch(getVideosStart());
  try {
    const res = await axios.get(`https://cinesatchel-com-backend.vercel.app/api/videos/allvideos`, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getVideosSuccess(res.data));
  } catch (err) {
    dispatch(getVideosFailure());
  }
};

export const addVideo = async (video, dispatch) => {
  dispatch(addVideoStart());
  try {
    const res = await axios.post(`https://cinesatchel-com-backend.vercel.app/api/videos/`, video, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(addVideoSuccess(res.data));
  } catch (err) {
    dispatch(addVideoFailure());
  }
};

export const updateVideo = async (video, id, dispatch) => {
  dispatch(updateVideoStart());
  try {
    const res = await axios.put(`https://cinesatchel-com-backend.vercel.app/api/videos/${id}`, video, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(updateVideoSuccess(res.data));
  } catch (err) {
    dispatch(updateVideoFailure());
  }
};

export const deleteVideo = async (id, dispatch) => {
  dispatch(deleteVideoStart());
  try {
    await axios.delete(`https://cinesatchel-com-backend.vercel.app/api/videos/` + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteVideoSuccess(id));
  } catch (err) {
    dispatch(deleteVideoFailure());
  }
};
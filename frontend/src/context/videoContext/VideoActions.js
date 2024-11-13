export const getVideosStart = () => ({
    type: "GET_VIDEOS_START",
  });
  
  export const getVideosSuccess = (videos) => ({
    type: "GET_VIDEOS_SUCCESS",
    payload: videos,
  });
  
  export const getVideosFailure = () => ({
    type: "GET_VIDEOS_FAILURE",
  });
  
  export const addVideoStart = () => ({
    type: "ADD_VIDEO_START",
  });
  
  export const addVideoSuccess = (video) => ({
    type: "ADD_VIDEO_SUCCESS",
    payload: video,
  });
  
  export const addVideoFailure = () => ({
    type: "ADD_VIDEO_FAILURE",
  });
  
  export const updateVideoStart = () => ({
    type: "UPDATE_VIDEO_START",
  });
  
  export const updateVideoSuccess = (video) => ({
    type: "UPDATE_VIDEO_SUCCESS",
    payload: video,
  });
  
  export const updateVideoFailure = () => ({
    type: "UPDATE_VIDEO_FAILURE",
  });
  
  export const deleteVideoStart = () => ({
    type: "DELETE_VIDEO_START",
  });
  
  export const deleteVideoSuccess = (id) => ({
    type: "DELETE_VIDEO_SUCCESS",
    payload: id,
  });
  
  export const deleteVideoFailure = () => ({
    type: "DELETE_VIDEO_FAILURE",
  });
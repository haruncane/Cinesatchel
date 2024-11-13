import VideoReducer from "./VideoReducer";
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  videos: [],
  isFetching: false,
  error: false,
};

export const VideoContext = createContext(INITIAL_STATE);

export const VideoContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(VideoReducer, INITIAL_STATE);

  return (
    <VideoContext.Provider
      value={{
        videos: state.videos,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};
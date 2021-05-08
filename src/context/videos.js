import React, { createContext, useContext, useReducer } from "react";
import videosList from "../data";

const VideoContext = createContext();

export const useVideosContext = () => {
  return useContext(VideoContext);
};

const videoReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    default:
      return {
        ...state,
      };
  }
};

const videoProviderInitialState = {
  videosList: videosList,
};

export const VideoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(videoReducer, videoProviderInitialState);
  return (
    <VideoContext.Provider value={{ state, dispatch }}>
      {children}
    </VideoContext.Provider>
  );
};

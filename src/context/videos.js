import React, { createContext, useContext, useReducer } from 'react';

const VideoContext = createContext();

export const SET_VIDEOS = 'SET_VIDEOS';

export const useVideosContext = () => {
	return useContext(VideoContext);
};

const videoReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case SET_VIDEOS: {
			return {
				...state,
				videosList: payload.videosList
			};
		}

		default:
			return {
				...state
			};
	}
};

const videoProviderInitialState = {
	videosList: []
};

export const VideoProvider = ({ children }) => {
	const [state, dispatch] = useReducer(videoReducer, videoProviderInitialState);
	return (
		<VideoContext.Provider value={{ state, dispatch }}>
			{children}
		</VideoContext.Provider>
	);
};

import React, { createContext, useContext, useReducer } from 'react';
import faker from 'faker';
import { isVideoInPlaylist } from '../helper';

export const ADD_VIDEO_IN_PLAYLIST = 'ADD_VIDEO_IN_PLAYLIST';
export const REMOVE_VIDEO_FROM_PLAYLIST = 'REMOVE_VIDEO_FROM_PLAYLIST';
export const TOGGLE_LIKE_VIDEO = 'TOGGLE_LIKE_VIDEO';
export const ADD_PLAYLIST = 'ADD_PLAYLIST';
export const DELETE_PLAYLIST = 'DELETE_PLAYLIST';

const PlayListContext = createContext();

export const usePlaylistContext = () => {
	return useContext(PlayListContext);
};

const playListReducer = (state, action) => {
	const { type, payload } = action;
	const { playlists } = state;

	switch (type) {
		case ADD_PLAYLIST: {
			const { name, listOfVideos } = payload;
			const newPlaylist = {
				_id: faker.datatype.uuid(),
				name,
				listOfVideos
			};

			return {
				...state,
				playlists: [...playlists, { ...newPlaylist }]
			};
		}

		case DELETE_PLAYLIST: {
			const { playlistId } = payload;
			const updatedPlaylists = playlists.filter(
				(playlist) => playlist._id !== playlistId
			);

			return {
				...state,
				playlists: updatedPlaylists
			};
		}

		case ADD_VIDEO_IN_PLAYLIST: {
			const { video: videoDetails, playlistId } = payload;

			const updatedPlaylists = playlists.map((playlist) => {
				if (playlist._id != playlistId) {
					return playlist;
				}

				const updatedPlaylist = {
					...playlist,
					listOfVideos: [...playlist.listOfVideos, { ...videoDetails }]
				};
				return updatedPlaylist;
			});

			console.log({ ...state, playlists: [...updatedPlaylists] });

			return {
				...state,
				playlists: [...updatedPlaylists]
			};
		}

		case TOGGLE_LIKE_VIDEO: {
			const { video: videoToToggle, likeVideo } = payload;

			const updatedPlaylists = playlists.map((playlist) => {
				if (playlist.name.toLowerCase() != 'liked videos') {
					return playlist;
				}

				let updatedPlaylist;

				if (likeVideo) {
					updatedPlaylist = {
						...playlist,
						listOfVideos: [...playlist.listOfVideos, { ...videoToToggle }]
					};
				} else {
					updatedPlaylist = {
						...playlist,
						listOfVideos: playlist.listOfVideos.filter(
							(video) => video._id != videoToToggle._id
						)
					};
				}
				console.log({ videoToToggle });
				console.log({ updatedPlaylist });

				return updatedPlaylist;
			});

			return {
				...state,
				playlists: [...updatedPlaylists]
			};
		}

		case REMOVE_VIDEO_FROM_PLAYLIST: {
			const { video: videoDetails, playlistId } = payload;

			const updatedPlaylists = playlists.map((playlist) => {
				if (playlist._id != playlistId) {
					return playlist;
				}

				const updatedPlaylist = {
					...playlist,
					listOfVideos: playlist.listOfVideos.filter(
						(video) => video._id != videoDetails._id
					)
				};
				return updatedPlaylist;
			});

			return {
				...state,
				playlists: [...updatedPlaylists]
			};
		}

		default:
			return {
				...state
			};
	}
};

const playListProviderInitialState = {
	playlists: [
		{ _id: faker.datatype.uuid(), name: 'Liked videos', listOfVideos: [] },
		{ _id: faker.datatype.uuid(), name: 'Watch Later', listOfVideos: [] },
		{ _id: faker.datatype.uuid(), name: 'Action', listOfVideos: [] },
		{ _id: faker.datatype.uuid(), name: 'Comedy', listOfVideos: [] },
		{
			_id: faker.datatype.uuid(),
			name: 'Motivational Songs',
			listOfVideos: []
		},
		{ _id: faker.datatype.uuid(), name: 'Workout', listOfVideos: [] }
	]
};

export const PlayListProvider = ({ children }) => {
	const [state, dispatch] = useReducer(playListReducer, playListProviderInitialState);
	return (
		<PlayListContext.Provider value={{ state, dispatch }}>
			{children}
		</PlayListContext.Provider>
	);
};

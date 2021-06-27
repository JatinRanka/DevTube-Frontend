import {
	ADD_PLAYLIST,
	ADD_VIDEO_IN_PLAYLIST,
	DELETE_PLAYLIST,
	playListProviderInitialState,
	playListReducer,
	REMOVE_VIDEO_FROM_PLAYLIST,
	SET_PLAYLISTS
} from '../../context/playlist';

const playlists = [
	{
		listOfVideos: [],
		_id: '60bc949c8b790006eea7800c',
		name: 'liked videos',
		category: 'LIKED_VIDEOS',
		user: '60bc949c8b790006eea7800b',
		createdAt: '2021-06-06T09:25:48.184Z',
		updatedAt: '2021-06-24T11:18:36.792Z',
		__v: 0
	},
	{
		listOfVideos: [],
		_id: '60bc949c8b790006eea7800d',
		name: 'watch later',
		category: 'WATCH_LATER',
		user: '60bc949c8b790006eea7800b',
		createdAt: '2021-06-06T09:25:48.241Z',
		updatedAt: '2021-06-19T15:35:39.091Z',
		__v: 0
	}
];

const initialState = { playlists };

describe('Playlist context tests', () => {
	it('Should set playlists', () => {
		const action = {
			type: SET_PLAYLISTS,
			payload: { playlists }
		};

		let state = playListReducer(playListProviderInitialState, action);
		expect(state).toEqual({ playlists });
	});

	it('Should add and remove a playlist', () => {
		const playlist = { _id: '1213', name: 'new playlist', listOfVideos: [] };

		let action = { type: ADD_PLAYLIST, payload: { ...playlist } };
		let updatedState = playListReducer(initialState, action);

		expect(updatedState).toEqual({
			playlists: [...initialState.playlists, { ...playlist }]
		});

		action = { type: DELETE_PLAYLIST, payload: { playlistId: playlist._id } };
		updatedState = playListReducer(updatedState, action);

		expect(updatedState).toEqual(initialState);
	});

	it('Should add and remove a video in playlist', () => {
		const video = { _id: '1234' };
		let action = {
			type: ADD_VIDEO_IN_PLAYLIST,
			payload: { video, playlistId: initialState.playlists[0]._id }
		};

		let updatedState = playListReducer(initialState, action);

		expect(updatedState.playlists[0].listOfVideos).toEqual([video]);

		action = {
			type: REMOVE_VIDEO_FROM_PLAYLIST,
			payload: { video, playlistId: initialState.playlists[0]._id }
		};

		updatedState = playListReducer(updatedState, action);

		expect(updatedState.playlists[0].listOfVideos).toEqual([]);
	});
});

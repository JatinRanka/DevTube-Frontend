import * as axios from 'axios';
import { LIKED_VIDEOS, WATCH_LATER } from '../../constants';
import {
	doesVideoExistsInAnyPlaylist,
	getLikedVideosPlaylist,
	getWatchLaterPlaylist,
	isVideoInPlaylist
} from '../../helper';

jest.mock('axios');

const playlists = [
	{
		listOfVideos: [{ _id: '60bc949c8b790006eea7800b' }],
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

describe('Helper functions', () => {
	it('Check video exists in playlist', () => {
		const output = isVideoInPlaylist({
			videoId: playlists[0].listOfVideos[0]._id,
			playlist: playlists[0]
		});

		expect(output).toBeTruthy();
	});

	it('Check video does not exist in playlist', () => {
		const output = isVideoInPlaylist({
			videoId: 'invalid_video_id',
			playlist: playlists[0]
		});

		expect(output).toBeFalsy();
	});

	it('Get liked videos playlist', () => {
		const likedVideosPlaylist = getLikedVideosPlaylist({ playlists });

		expect(likedVideosPlaylist.category).toMatch(LIKED_VIDEOS);
	});

	it('Get watch later playlist', () => {
		const likedVideosPlaylist = getWatchLaterPlaylist({ playlists });

		expect(likedVideosPlaylist.category).toMatch(WATCH_LATER);
	});

	it('Check video exists in any playlist', () => {
		const output = doesVideoExistsInAnyPlaylist({
			videoId: playlists[0].listOfVideos[0]._id,
			playlists
		});

		expect(output).toBeTruthy();
	});

	it('Check video does not exist in any playlist', () => {
		const output = doesVideoExistsInAnyPlaylist({
			videoId: 'invalid_video_id',
			playlists
		});

		expect(output).toBeFalsy();
	});
});

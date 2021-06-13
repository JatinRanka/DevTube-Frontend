import { LIKED_VIDEOS, WATCH_LATER } from '../constants';
import { fetchApi } from './fetchApi';

export const isVideoInPlaylist = ({ videoId: videoIdToCheck, playlist }) => {
	const { listOfVideos } = playlist;
	return listOfVideos.find((video) => videoIdToCheck == video._id);
};

//	To check if a video is liked or not, pass all playlists,
//	Then find the LIKED_VIDEOS playlist from the list of playlists.
//	Then check if the video exists in LIKED_VIDEOS playlist or not.
export const checkIsVideoLiked = ({ videoId: videoIdToCheck, playlists = [] }) => {
	const playlist = playlists?.find((playlist) => playlist.category === LIKED_VIDEOS);

	if (!playlist) return false;

	const { listOfVideos } = playlist;
	return listOfVideos.find((video) => videoIdToCheck == video._id);
};

export const getLikedVideosPlaylist = ({ playlists }) => {
	return playlists?.find((playlist) => playlist.category === LIKED_VIDEOS);
};

export const getWatchLaterPlaylist = ({ playlists }) => {
	return playlists?.find((playlist) => playlist.category === WATCH_LATER);
};

export const checkIsVideoInWatchLater = ({ videoId: videoIdToCheck, playlists = [] }) => {
	const playlist = getWatchLaterPlaylist({ playlists });

	if (!playlist) return false;

	const { listOfVideos } = playlist;
	return listOfVideos.find((video) => videoIdToCheck == video._id);
};

export const doesVideoExistsInAnyPlaylist = ({
	videoId: videoIdToCheck,
	playlists = []
}) => {
	for (let index in playlists) {
		if (isVideoInPlaylist({ videoId: videoIdToCheck, playlist: playlists[index] }))
			return true;
	}
	return false;
};

// @desc: Add/removes video from playlist in backend
// @param: type - string : "ADD", "REMOVE"
export const updateVideoInPlaylist = async ({ playlistId, videoId, type }) => {
	await fetchApi({
		url: `/playlists/${playlistId}`,
		method: 'post',
		isProtected: true,
		data: { type, videoId }
	});
};

export const getYoutubeThumbnail = (youtubeId) =>
	`http://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`;

export const buildYoutubeVideoUrl = (youtubeId) =>
	`https://www.youtube.com/watch?v=${youtubeId}`;

export const redirectToHomePage = (history) => history.push('/');

export const isUserLoggedIn = () =>
	Boolean(localStorage.getItem('userId')) &&
	Boolean(localStorage.getItem('Authorization'));

export const fetchUserId = () => localStorage.getItem('userId');

export const fetchAuthorizationToken = () => localStorage.getItem('Authorization');

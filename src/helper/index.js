import { LIKED_VIDEOS } from '../constants';

export const isVideoInPlaylist = ({ videoId: videoIdToCheck, playlist }) => {
	const { listOfVideos } = playlist;
	return listOfVideos.find((video) => videoIdToCheck == video._id);
};

/*
	To check if a video is liked or not, pass all playlists,
	Then find the LIKED_VIDEOS playlist from the list of playlists.
	Then check if the video exists in LIKED_VIDEOS playlist or not.
*/
export const isVideoLiked = ({ videoId: videoIdToCheck, playlists }) => {
	const playlist = playlists.find((playlist) => playlist.category === LIKED_VIDEOS);
	const { listOfVideos } = playlist;
	return listOfVideos.find((video) => videoIdToCheck == video._id);
};

export const getLikedVideosPlaylist = ({ playlists }) => {
	return playlists.find((playlist) => playlist.category === LIKED_VIDEOS);
};

export const doesVideoExistsInAnyPlaylist = ({ videoId: videoIdToCheck, playlists }) => {
	for (let index in playlists) {
		if (isVideoInPlaylist({ videoId: videoIdToCheck, playlist: playlists[index] }))
			return true;
	}
	return false;
};

export const getYoutubeThumbnail = ({ url }) => {
	const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
	const match = url.match(regExp);
	const videoId = match && match[7].length == 11 ? match[7] : false;
	const thumbnailUrl = `http://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

	return thumbnailUrl;
};

export const isVideoInPlaylist = ({ videoId: videoIdToCheck, playlist }) => {
  const { listOfVideos } = playlist;
  return listOfVideos.find((video) => videoIdToCheck == video._id);
};

export const isVideoLiked = ({ videoId: videoIdToCheck, playlists }) => {
  const playlist = playlists.find(
    (playlist) => playlist.name.toLowerCase() === "liked videos"
  );
  const { listOfVideos } = playlist;
  return listOfVideos.find((video) => videoIdToCheck == video._id);
};

export const doesVideoExistsInAnyPlaylist = ({
  videoId: videoIdToCheck,
  playlists,
}) => {
  for (let index in playlists) {
    if (
      isVideoInPlaylist({ videoId: videoIdToCheck, playlist: playlists[index] })
    )
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

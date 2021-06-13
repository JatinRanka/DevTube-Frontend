import React from 'react';
import { useParams } from 'react-router';
import VideoPageComponent from '../../components/VideoPageComponent';
import { usePlaylistContext } from '../../context/playlist';
import empytPlaylistImage from '../../assets/images/empty-playlist.svg';
import './index.scss';

const renderEmptyPlaylistComponent = () => {
	return (
		<div className="empty-playlist-container">
			<img src={empytPlaylistImage} className="empty-playlist-img" />
			<p className="heading-4">Playlist is Empty.</p>
		</div>
	);
};

const PlayListsView = () => {
	const { playlistId } = useParams();
	const {
		state: { playlists }
	} = usePlaylistContext();

	const playlist = playlists.find((playlist) => playlist._id === playlistId);

	return (!playlist || playlist.listOfVideos.length) === 0 ? (
		renderEmptyPlaylistComponent()
	) : (
		<VideoPageComponent
			videoDetails={playlist.listOfVideos[0]}
			videosList={playlist.listOfVideos}
		/>
	);
};

export default PlayListsView;

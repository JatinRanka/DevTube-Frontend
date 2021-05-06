import React from 'react';
import { Link } from 'react-router-dom';
import { usePlaylistContext, DELETE_PLAYLIST } from '../../context/playlist';
import { useVideosContext } from '../../context/videos';
import { getYoutubeThumbnail } from '../../helper';
import './index.scss';

const THUMBNAIL_PLACEHOLDER = 'https://via.placeholder.com/1920x1080/eee?text=16:9';

const getPlaylistFirstVideoThumbnail = ({ playlist }) => {
	const url = playlist?.listOfVideos[0]?.url;
	if (!url) return null;

	const thumbnail = getYoutubeThumbnail({ url });

	return thumbnail;
};

const PlaylistsPage = () => {
	const {
		state: { playlists },
		dispatch: dispatchPlaylist
	} = usePlaylistContext();

	const {
		state: { videosList }
	} = useVideosContext();

	const handleDeletePlaylist = (event) => {
		event.preventDefault();

		console.log(event.target);
		const playlistId = event.target?.attributes?.getNamedItem('data-playlistId')
			?.value;

		console.log({ playlistId });
		dispatchPlaylist({
			type: DELETE_PLAYLIST,
			payload: {
				playlistId
			}
		});
	};

	return (
		<div className="playlists-page">
			<div className="playlists">
				{playlists.map((playlist) => {
					return (
						<Link
							to={`/playlists/${playlist._id}`}
							key={playlist._id}
							className="playlist"
						>
							<div className="thumbnail-container">
								<div className="play-icon-container">
									<span class="material-icons play-icon">
										play_arrow
									</span>
								</div>
								<img
									className="thumbnail-img"
									src={
										getPlaylistFirstVideoThumbnail({
											playlist
										}) || THUMBNAIL_PLACEHOLDER
									}
								/>
							</div>
							<div className="playlist-footer">
								<p className="heading-5">{playlist.name}</p>
								<button
									data-playlistId={playlist._id}
									onClick={handleDeletePlaylist}
									class="btn primary-btn icon-only-btn icon-only-btn-sm delete-btn"
								>
									<span class="icon material-icons">delete</span>
								</button>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default PlaylistsPage;

import React from 'react';
import { Link } from 'react-router-dom';
import { usePlaylistContext, DELETE_PLAYLIST } from '../../context/playlist';
import { canDeletePlaylist, getYoutubeThumbnail } from '../../helper';
import { fetchApi } from '../../helper/fetchApi';
import { toast } from '../../helper/toast';
import './index.scss';

const THUMBNAIL_PLACEHOLDER = 'https://via.placeholder.com/1920x1080/eee?text=16:9';

const getPlaylistFirstVideoThumbnail = ({ playlist }) => {
	const youtubeId = playlist?.listOfVideos[0]?.youtubeId;
	if (!youtubeId) return null;

	const thumbnail = getYoutubeThumbnail(youtubeId);

	return thumbnail;
};

const PlaylistsPage = () => {
	const {
		state: { playlists },
		dispatch: dispatchPlaylist
	} = usePlaylistContext();

	const handleDeletePlaylist = async (event) => {
		try {
			event.preventDefault();

			console.log(event.target);

			const playlistCategory = event.target?.attributes?.getNamedItem(
				'data-playlistCategory'
			)?.value;

			if (!canDeletePlaylist(playlistCategory))
				throw new Error('Cannot delete default playlists.');

			const playlistId = event.target?.attributes?.getNamedItem('data-playlistId')
				?.value;

			console.log({ playlistId });

			const { playlist, message } = await fetchApi({
				url: `/playlists/${playlistId}`,
				method: 'delete',
				isProtected: true
			});

			dispatchPlaylist({
				type: DELETE_PLAYLIST,
				payload: {
					playlistId: playlist._id
				}
			});

			toast({ type: 'success', message });
		} catch (error) {
			toast({ type: 'error', message: error.message });
		}
	};

	return (
		<div className="playlists-page">
			<div className="playlists">
				{playlists.map((playlist) => {
					return (
						<div className="thumbnail-outer-container">
							<Link
								to={`/playlists/${playlist._id}`}
								key={playlist._id}
								className="playlist"
							>
								<div className="thumbnail-inner-container">
									<div className="play-icon-container">
										<span className="material-icons play-icon">
											play_arrow
										</span>
									</div>
									<img
										className="thumbnail-img"
										alt={playlist.name}
										src={
											getPlaylistFirstVideoThumbnail({
												playlist
											}) || THUMBNAIL_PLACEHOLDER
										}
									/>
								</div>
							</Link>

							<div className="playlist-footer">
								<p className="heading-5">{playlist.name}</p>
								<button
									data-playlistId={playlist._id}
									data-playlistCategory={playlist.category}
									onClick={handleDeletePlaylist}
									className="btn primary-btn icon-only-btn icon-only-btn-sm delete-btn"
								>
									<span className="icon material-icons">delete</span>
								</button>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default PlaylistsPage;

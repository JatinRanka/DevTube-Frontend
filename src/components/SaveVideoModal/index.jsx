import React, { useState } from 'react';
import { isVideoInPlaylist, updateVideoInPlaylist } from '../../helper';
import Modal from '../Modal';
import {
	usePlaylistContext,
	ADD_PLAYLIST,
	ADD_VIDEO_IN_PLAYLIST,
	REMOVE_VIDEO_FROM_PLAYLIST
} from '../../context/playlist';
import './index.scss';
import { toast } from '../../helper/toast';
import { fetchApi } from '../../helper/fetchApi';
import Loader from 'react-loader-spinner';

const SavePlaylistModal = ({ showModal, handleCloseModal, videoDetails }) => {
	const [newPlaylistName, setNewPlaylistName] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const {
		state: { playlists },
		dispatch
	} = usePlaylistContext();

	const handleAddPlaylistAndSave = async () => {
		try {
			if (!newPlaylistName) throw new Error('Enter name for playlist.');

			setIsLoading(true);

			const { playlist: newPlaylist, message } = await fetchApi({
				url: '/playlists',
				method: 'post',
				isProtected: true,
				data: {
					name: newPlaylistName,
					listOfVideos: [videoDetails._id]
				}
			});

			toast({ type: 'success', message });

			dispatch({
				type: ADD_PLAYLIST,
				payload: {
					_id: newPlaylist._id,
					name: newPlaylist.name,
					listOfVideos: [{ ...videoDetails }]
				}
			});

			setNewPlaylistName('');
		} catch (error) {
			toast({ type: 'error', message: error.message });
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Modal showModal={showModal} handleCloseModal={handleCloseModal}>
			<div className={`video-page-modal ${isLoading ? 'disabled' : ''}`}>
				<p>Save To</p>
				<hr />
				<div className="playlists">
					{playlists.map((playlist) => {
						return (
							<div className="playlists-item" key={playlist._id}>
								<input
									type="checkbox"
									className="checkbox"
									checked={isVideoInPlaylist({
										videoId: videoDetails._id,
										playlist
									})}
									onClick={async (event) => {
										try {
											setIsLoading(true);
											const shouldAddVideo = event.target.checked;

											await updateVideoInPlaylist({
												videoId: videoDetails._id,
												playlistId: playlist._id,
												type: shouldAddVideo ? 'ADD' : 'REMOVE'
											});

											dispatch({
												type: shouldAddVideo
													? ADD_VIDEO_IN_PLAYLIST
													: REMOVE_VIDEO_FROM_PLAYLIST,
												payload: {
													video: { ...videoDetails },
													playlistId: playlist._id
												}
											});
										} catch (error) {
											toast({
												type: 'error',
												message: error.message
											});
										} finally {
											setIsLoading(false);
										}
									}}
								/>
								<label>{playlist.name}</label>
							</div>
						);
					})}
				</div>
				<hr />

				<div className="input-container">
					<input
						className="input-container__input-field"
						value={newPlaylistName}
						onChange={(event) => setNewPlaylistName(event.target.value)}
					/>
					<label
						className={`input-container__heading ${
							newPlaylistName ? ' input-container__heading-filled' : ''
						}`}
					>
						Playlist name
					</label>
				</div>

				<button
					className="btn primary-btn save-btn"
					onClick={handleAddPlaylistAndSave}
				>
					Save
				</button>
			</div>
		</Modal>
	);
};

export default SavePlaylistModal;

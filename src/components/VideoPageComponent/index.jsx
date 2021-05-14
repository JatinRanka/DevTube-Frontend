import React, { useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import VideoCard from '../VideoCard';
import SavePlaylistModal from '../SaveVideoModal';
import {
	doesVideoExistsInAnyPlaylist,
	getWatchLaterPlaylist,
	isVideoInWatchLater,
	isVideoLiked
} from '../../helper';
import {
	ADD_VIDEO_IN_PLAYLIST,
	REMOVE_VIDEO_FROM_PLAYLIST,
	TOGGLE_LIKE_VIDEO,
	usePlaylistContext
} from '../../context/playlist';

const MAX_VIDEOS_TO_DISPLAY_IN_LIST = 6;

const VideoPageComponent = ({ videoDetails, videosList }) => {
	const [showSavePlaylistsModal, setShowSavePlaylistsModal] = useState(false);

	const { title, channelName, description, url, _id: videoId } = videoDetails;

	const {
		state: { playlists },
		dispatch
	} = usePlaylistContext();

	const videoActionButtons = [
		{
			displayName: 'Like',
			iconName: 'recommend',
			active: isVideoLiked({ videoId, playlists }),
			onClick: () => {
				dispatch({
					type: TOGGLE_LIKE_VIDEO,
					payload: {
						video: { ...videoDetails },
						likeVideo: isVideoLiked({ videoId, playlists }) ? false : true
					}
				});
			}
		},
		{
			displayName: 'Watch Later',
			iconName: 'watch_later',
			active: isVideoInWatchLater({ videoId, playlists }),
			onClick: () => {
				dispatch({
					type: isVideoInWatchLater({ videoId, playlists })
						? REMOVE_VIDEO_FROM_PLAYLIST
						: ADD_VIDEO_IN_PLAYLIST,
					payload: {
						video: { ...videoDetails },
						playlistId: getWatchLaterPlaylist({ playlists })._id
					}
				});
			}
		},
		{ displayName: 'Share', iconName: 'share' },
		{
			displayName: 'Save',
			iconName: doesVideoExistsInAnyPlaylist({ videoId, playlists })
				? 'library_add_check'
				: 'library_add',
			active: doesVideoExistsInAnyPlaylist({ videoId, playlists }),
			onClick: () => {
				setShowSavePlaylistsModal(true);
			}
		}
	];

	return (
		<div className="video-page">
			<SavePlaylistModal
				videoDetails={videoDetails}
				showModal={showSavePlaylistsModal}
				handleCloseModal={() => {
					setShowSavePlaylistsModal(false);
				}}
			/>
			<div className="current-video-container">
				<div className="react-player-container">
					<ReactPlayer
						className="react-player"
						width="100%"
						height="100%"
						playing={true}
						controls={true}
						url={url}
					/>
				</div>

				<div className="content">
					<p className="title">{title}</p>
					<p className="views">302K Views</p>

					<div className="video-action-buttons">
						{videoActionButtons.map((videoActionButton) => {
							return (
								<div
									className="button"
									onClick={videoActionButton.onClick}
								>
									<span
										className={`material-icons icon ${
											videoActionButton.active
												? 'material-icons-filled'
												: 'material-icons-outlined'
										}   `}

										// {`material-icons material-icons-outlined icon ${videoActionButton.active ? " active ": ""}`}
									>
										{videoActionButton.iconName}
									</span>
									<p className="text">
										{videoActionButton.displayName}
									</p>
								</div>
							);
						})}
					</div>

					<hr />

					<div className="channel-details-container">
						<div className="left">
							<img
								className="channel-logo"
								src="https://yt3.ggpht.com/ytc/AAUvwnh53ZRIGnyzC28QrfuggCINb3cfNbNWo4Uc6qR9=s100-c-k-c0x00ffffff-no-rj"
							/>
							<div className="channel">
								<p className="channel-name">{channelName}</p>
								<p className="subscribers-text">12.5M subscribers</p>
							</div>
						</div>
						<div className="right">
							<button className="subscribe-btn bold">Subscribe</button>
						</div>
					</div>

					<hr />

					<div className="description">{description} </div>

					<hr />
				</div>
			</div>

			<div className="videos-list">
				<h3 className="w-100">Similar</h3>

				{videosList
					.slice(0, MAX_VIDEOS_TO_DISPLAY_IN_LIST)
					.map((videoDetails) => {
						return (
							<VideoCard
								key={videoDetails._id}
								videoDetails={videoDetails}
							/>
						);
					})}
			</div>
		</div>
	);
};

export default VideoPageComponent;

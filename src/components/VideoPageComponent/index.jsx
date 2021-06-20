import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import Loader from 'react-loader-spinner';
import VideoCard from '../VideoCard';
import SavePlaylistModal from '../SaveVideoModal';
import {
	updateVideoInPlaylist,
	buildYoutubeVideoUrl,
	doesVideoExistsInAnyPlaylist,
	getLikedVideosPlaylist,
	getWatchLaterPlaylist,
	checkIsVideoInWatchLater,
	checkIsVideoLiked,
	getTimeAgo
} from '../../helper';
import {
	ADD_VIDEO_IN_PLAYLIST,
	REMOVE_VIDEO_FROM_PLAYLIST,
	TOGGLE_LIKE_VIDEO,
	usePlaylistContext
} from '../../context/playlist';
import { fetchApi } from '../../helper/fetchApi';
import { useParams } from 'react-router';
import './index.scss';
import { toast } from '../../helper/toast';
import { useUserContext } from '../../context/user';

const CHANNEL_LOGO_PLACEHOLDER =
	'https://www.pngix.com/pngfile/big/270-2709413_default-avatar-profile-picture-placeholder-round-hd-png.png';
const MAX_VIDEOS_TO_DISPLAY_IN_LIST = 6;

const LoadingComponent = () => {
	return (
		<div className="loading-icon-container">
			<Loader type="Oval" color="#FFFFFF" height={60} width={60} />
		</div>
	);
};

const VideoPageComponent = ({ videosList }) => {
	const [showSavePlaylistsModal, setShowSavePlaylistsModal] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [isLikeButtonLoading, setIsLikeButtonLoading] = useState(false);
	const [isWatchLaterButtonLoading, setIsWatchLaterButtonLoading] = useState(false);
	const [videoDetails, setVideoDetails] = useState({});
	const { isUserLoggedIn } = useUserContext();
	const { videoId = videosList[0]._id } = useParams();

	const fetchVideo = async (videoId) => {
		try {
			setIsLoading(true);
			const { video } = await fetchApi({
				url: `/videos/${videoId}`,
				method: 'get'
			});
			setVideoDetails(video);
			setIsLoading(false);
		} catch (error) {
			toast({ type: 'error', message: error.message });
		}
	};

	useEffect(() => {
		fetchVideo(videoId);
	}, [videoId]);

	const { title, postedBy, description, youtubeId, createdAt } = videoDetails;
	const url = buildYoutubeVideoUrl(youtubeId);

	const {
		state: { playlists },
		dispatch
	} = usePlaylistContext();

	const videoActionButtons = [
		{
			displayName: 'Like',
			iconName: 'thumb_up',
			isLoading: isLikeButtonLoading,
			active: checkIsVideoLiked({ videoId, playlists }),
			onClick: async () => {
				try {
					if (!isUserLoggedIn) throw new Error('Please login to continue');

					setIsLikeButtonLoading(true);
					const { _id: playlistId } = getLikedVideosPlaylist({ playlists });
					const isVideoLiked = checkIsVideoLiked({ videoId, playlists });

					// For updating in backend
					await updateVideoInPlaylist({
						playlistId,
						videoId,
						type: isVideoLiked ? 'REMOVE' : 'ADD'
					});

					dispatch({
						type: TOGGLE_LIKE_VIDEO,
						payload: {
							video: { ...videoDetails },
							likeVideo: isVideoLiked ? false : true
						}
					});
				} catch (error) {
					toast({ type: 'error', message: error.message });
				} finally {
					setIsLikeButtonLoading(false);
				}
			}
		},
		{
			displayName: 'Watch Later',
			iconName: 'watch_later',
			isLoading: isWatchLaterButtonLoading,
			active: checkIsVideoInWatchLater({ videoId, playlists }),
			onClick: async () => {
				try {
					if (!isUserLoggedIn) throw new Error('Please login to continue');

					setIsWatchLaterButtonLoading(true);
					const { _id: playlistId } = getWatchLaterPlaylist({ playlists });
					const isVideoInWatchLater = checkIsVideoInWatchLater({
						videoId,
						playlists
					});

					// For updating in backend
					await updateVideoInPlaylist({
						playlistId,
						videoId,
						type: isVideoInWatchLater ? 'REMOVE' : 'ADD'
					});

					dispatch({
						type: isVideoInWatchLater
							? REMOVE_VIDEO_FROM_PLAYLIST
							: ADD_VIDEO_IN_PLAYLIST,
						payload: {
							video: { ...videoDetails },
							playlistId
						}
					});
				} catch (error) {
					toast({ type: 'error', message: error.message });
				} finally {
					setIsWatchLaterButtonLoading(false);
				}
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
				if (!isUserLoggedIn)
					return toast({ type: 'error', message: 'Please login to continue' });
				setShowSavePlaylistsModal(true);
			}
		}
	];

	return (
		<>
			{isLoading ? (
				<LoadingComponent />
			) : (
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
							<p className="views">{getTimeAgo(createdAt)}</p>

							<div className="video-action-buttons">
								{videoActionButtons.map((videoActionButton, index) => {
									return (
										<div
											className={`button ${
												videoActionButton.isLoading
													? 'disabled'
													: ''
											}`}
											key={index}
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
										alt={postedBy.name}
										src={postedBy.image || CHANNEL_LOGO_PLACEHOLDER}
									/>
									<div className="channel">
										<p className="channel-name">{postedBy.name}</p>
										<p className="subscribers-text">
											12.5M subscribers
										</p>
									</div>
								</div>
								<div className="right">
									<button className="subscribe-btn bold">
										Subscribe
									</button>
								</div>
							</div>

							<hr />

							<div className="description">{description} </div>

							<hr />
						</div>
					</div>

					{videosList.length > 0 && (
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
					)}
				</div>
			)}
		</>
	);
};

export default VideoPageComponent;

import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import Loader from "react-loader-spinner";
import VideoCard from '../VideoCard';
import SavePlaylistModal from '../SaveVideoModal';
import {
	buildYoutubeVideoUrl,
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
import { fetchApi } from '../../helper/fetchApi';
import { useParams } from 'react-router';
import './index.scss'

const MAX_VIDEOS_TO_DISPLAY_IN_LIST = 6;

const LoadingComponent = () => {
	return <div className="loading-icon-container"><Loader type="Oval" color="#FFFFFF" height={60} width={60} /></div>;
};

const VideoPageComponent = ({  videosList }) => {
	const [showSavePlaylistsModal, setShowSavePlaylistsModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [videoDetails, setVideoDetails] = useState({});

	const { videoId } = useParams();

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
			console.log(error);
		}
	};

	useEffect(() => {
		fetchVideo(videoId);
	}, [videoId]);

	const { title, channelName, description, youtubeId } = videoDetails;
	const url = buildYoutubeVideoUrl(youtubeId);

	const {
		state: { playlists },
		dispatch
	} = usePlaylistContext();

	const videoActionButtons = [
		{
			displayName: 'Like',
			iconName: 'thumb_up',
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
			)}
		</>
	);
};

export default VideoPageComponent;

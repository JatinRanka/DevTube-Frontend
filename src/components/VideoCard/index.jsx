import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import { Link } from 'react-router-dom';
import { buildYoutubeVideoUrl, getTimeAgo } from '../../helper';
import './index.scss';

const CHANNEL_LOGO_PLACEHOLDER =
	'https://www.pngix.com/pngfile/big/270-2709413_default-avatar-profile-picture-placeholder-round-hd-png.png';

const getCalculatedWidth = () => (window.innerWidth < 500 ? window.innerWidth : 300);
const getCalculatedHeight = (width) => width / 1.7;

const VideoCard = ({ videoDetails }) => {
	const initialWidth = window.innerWidth < 500 ? window.innerWidth : 300;

	const [dimensions, setDimensions] = React.useState({
		width: initialWidth,
		height: initialWidth / 1.8
	});

	const handleResize = () => {
		const newWidth = getCalculatedWidth();
		const newHeight = getCalculatedHeight(newWidth);

		setDimensions({
			width: newWidth,
			height: newHeight
		});
	};

	useEffect(() => {
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const { _id, title, youtubeId, postedBy, createdAt } = videoDetails;
	const url = buildYoutubeVideoUrl(youtubeId);

	const [isVideoPlaying, setIsVideoPlaying] = useState(false);

	const onMouseEnter = () => {
		setIsVideoPlaying(true);
	};

	const OnMouseLeave = () => {
		setIsVideoPlaying(false);
	};

	return (
		<Link to={`/videos/${_id}`} className="reset-link-styles">
			<div className="video-card" style={{ width: `${dimensions.width}px` }}>
				<ReactPlayer
					className="react-player"
					width={`${dimensions.width}px`}
					height={`${dimensions.height}px`}
					light={!isVideoPlaying} // To show thumbnail
					playing={isVideoPlaying}
					controls={false}
					muted={true}
					playIcon={<></>}
					onMouseEnter={onMouseEnter}
					onMouseLeave={OnMouseLeave}
					url={url}
				/>

				<div className="video-card__details">
					<div className="channel-logo">
						<img
							src={postedBy.image || CHANNEL_LOGO_PLACEHOLDER}
							alt={title}
						/>
					</div>

					<div className="description">
						<h3 className="video-card__description-title">{title}</h3>
						<span className="video-card__description-small-text">
							{postedBy.name} | 302K Views | {getTimeAgo(createdAt)}
						</span>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default VideoCard;

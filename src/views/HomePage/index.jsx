import React from 'react';
import VideoCard from '../../components/VideoCard';
import { useVideosContext } from '../../context/videos';
import './index.css';

const HomePage = () => {
	const { state } = useVideosContext();
	const { videosList } = state;

	return (
		<div className="videos-list">
			{videosList.map((videoDetails) => (
				<VideoCard key={videoDetails._id} videoDetails={videoDetails} />
			))}
		</div>
	);
};

export default HomePage;

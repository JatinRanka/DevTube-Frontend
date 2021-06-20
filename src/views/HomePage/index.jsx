import React, { useEffect, useState } from 'react';
import VideoCard from '../../components/VideoCard';
import { SET_VIDEOS, useVideosContext } from '../../context/videos';
import Loader from 'react-loader-spinner';
import { fetchApi } from '../../helper/fetchApi';
import './index.scss';
import { toast } from '../../helper/toast';

const HomePage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const { state, dispatch } = useVideosContext();
	const { videosList } = state;

	const fetchVideosList = async () => {
		try {
			setIsLoading(true);
			const { videosList } = await fetchApi({ url: '/videos', method: 'get' });

			dispatch({
				type: SET_VIDEOS,
				payload: {
					videosList
				}
			});
		} catch (error) {
			toast({ type: 'error', message: error.message });
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchVideosList();
	}, []);

	return (
		<>
			{isLoading ? (
				<div className="loading-icon-container">
					<Loader type="Oval" color="#FFFFFF" height={60} width={60} />
				</div>
			) : (
				<div className="videos-list">
					{videosList.map((videoDetails) => (
						<VideoCard key={videoDetails._id} videoDetails={videoDetails} />
					))}
				</div>
			)}
		</>
	);
};

export default HomePage;

import {
	SET_VIDEOS,
	videoProviderInitialState,
	videoReducer
} from '../../context/videos';

const videosList = [
	{ _id: '1001', name: 'Video 1' },
	{ _id: '1002', name: 'Video 2' }
];

describe('Videos context', () => {
	it('should set list of videos', () => {
		const action = { type: SET_VIDEOS, payload: { videosList } };
		const updatedState = videoReducer(videoProviderInitialState, action);

		expect(updatedState).toEqual({ videosList });
	});
});

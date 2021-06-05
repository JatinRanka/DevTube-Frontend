import axios from 'axios';
const API_BASE_ENDPOINT = 'http://localhost:5000/api';

export const fetchApi = async ({ url, method = 'get', data = null }) => {
	try {
		const response = await axios({
			method,
			url: API_BASE_ENDPOINT + url,
			data
		});
		return response.data;
	} catch (error) {
		const message =
			error?.response?.data?.message ||
			error?.message ||
			'Some error occurred. Try again after some time.';
		throw new Error(message);
	}
};

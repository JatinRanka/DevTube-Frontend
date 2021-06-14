import axios from 'axios';
import { fetchAuthorizationToken, isUserLoggedIn } from '.';
const API_BASE_ENDPOINT = 'https://devtube-backend.herokuapp.com/api';

const setAuthorizationToken = (response) => {
	const authorizationToken = response?.headers?.authorization;
	authorizationToken && localStorage.setItem('Authorization', authorizationToken);
};

export const fetchApi = async ({
	url,
	method = 'get',
	data = null,
	isProtected = false
}) => {
	try {
		if (isProtected && !isUserLoggedIn()) throw new Error('Login to continue');

		const response = await axios({
			method,
			url: API_BASE_ENDPOINT + url,
			data,
			...(isProtected && { headers: { Authorization: fetchAuthorizationToken() } })
		});

		setAuthorizationToken(response);

		return response.data;
	} catch (error) {
		const message =
			error?.response?.data?.message ||
			error?.message ||
			'Some error occurred. Try again after some time.';
		throw new Error(message);
	}
};

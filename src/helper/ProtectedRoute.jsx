import React from 'react';
import { Redirect } from 'react-router-dom';
import { useUserContext } from '../context/user';

export const ProtectedRoute = ({ component: Component, path, ...rest }) => {
	const { isUserLoggedIn } = useUserContext();

	return (
		<>
			{isUserLoggedIn ? (
				<Component />
			) : (
				<Redirect to={{ pathname: '/login', state: { from: path } }} />
			)}
		</>
	);
};

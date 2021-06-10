import React from 'react';
import { Redirect } from 'react-router-dom';
import { isUserLoggedIn } from './index';

export const ProtectedRoute = ({ component: Component, path, ...rest }) => {
	return (
		<>
			{isUserLoggedIn() ? (
				<Component />
			) : (
				<Redirect to={{ pathname: '/login', state: { from: path } }} />
			)}
		</>
	);
};

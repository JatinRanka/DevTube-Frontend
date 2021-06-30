import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUserContext = () => {
	return useContext(UserContext);
};

const checkIsUserLoggedIn = () => {
	return Boolean(localStorage.getItem('Authorization'));
};

export const UserProvider = ({ children }) => {
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(checkIsUserLoggedIn());

	return (
		<UserContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn }}>
			{children}
		</UserContext.Provider>
	);
};

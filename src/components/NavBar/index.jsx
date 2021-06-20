import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useUserContext } from '../../context/user';
import { handleLogoutUser, redirectToLoginPage } from '../../helper';
import SideMenu from '../SideMenu';
import './index.scss';

const NavBar = () => {
	const history = useHistory();
	const { isUserLoggedIn, setIsUserLoggedIn } = useUserContext();

	const [showSideMenu, setShowSideMenu] = useState(false);

	const handleShowSideMenu = () => {
		setShowSideMenu(true);
	};

	const handleCloseSideMenu = () => {
		setShowSideMenu(false);
	};

	const handleAccountContainerClick = () => {
		isUserLoggedIn
			? handleLogoutUser(history, setIsUserLoggedIn)
			: redirectToLoginPage(history);
	};

	return (
		<div className="navbar">
			<SideMenu
				showSideMenu={showSideMenu}
				handleCloseSideMenu={handleCloseSideMenu}
			/>
			<div className="navbar__left">
				<button className="menu-btn" onClick={handleShowSideMenu}>
					<span className="material-icons menu-icon">menu</span>
				</button>

				<Link to="/" className="reset-link-styles">
					<p className="heading-4 navbar__logo">DevTube</p>
				</Link>
			</div>

			<div className="navbar__right">
				<div
					onClick={handleAccountContainerClick}
					className="reset-link-styles account-container"
				>
					<p>{isUserLoggedIn ? 'Logout' : 'Login'} </p>

					<button className="btn account-btn primary-btn icon-only-btn">
						<span className="icon material-icons"> account_circle </span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default NavBar;

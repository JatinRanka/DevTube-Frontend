import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import SideMenu from '../SideMenu';
import './index.css';

const NavBar = () => {
	const [showSideMenu, setShowSideMenu] = useState(false);

	const handleShowSideMenu = () => {
		setShowSideMenu(true);
	};

	const handleCloseSideMenu = () => {
		setShowSideMenu(false);
	};

	return (
		<div className="navbar">
			<SideMenu
				showSideMenu={showSideMenu}
				handleCloseSideMenu={handleCloseSideMenu}
			/>
			<div className="navbar__left">
				<button className="menu-btn" onClick={handleShowSideMenu}>
					<span class="material-icons menu-icon">menu</span>
				</button>

				<Link to="/" className="reset-link-styles">
					<p className="heading-4 navbar__logo">DevTube</p>
				</Link>
			</div>

			<div className="navbar__right">
				{/* <div className="icon-with-badge">
					<span className="icon-with-badge__icon material-icons">
						favorite_border
					</span>
					<span className="badge secondary-badge">24</span>
				</div> */}
			</div>
		</div>
	);
};

export default NavBar;

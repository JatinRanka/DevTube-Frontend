import React from 'react';
import ReactDOM from 'react-dom';
import { Link, NavLink } from 'react-router-dom';
import './index.scss';

const sideMenuItems = [
	{ textName: 'home', iconName: 'home', to: '/' },
	{ textName: 'library', iconName: 'video_library', to: '/playlists' },
	{ textName: 'subscriptions', iconName: 'subscriptions', to: '/' }
];

const SideMenu = ({ showSideMenu, handleCloseSideMenu }) => {
	if (!showSideMenu) return null;

	return ReactDOM.createPortal(
		<div className="side-menu-container">
			<div className="side-menu-inner-container">
				<div className="side-menu-close" onClick={handleCloseSideMenu}>
					<span class="material-icons material-icons-round side-menu-item-icon">
						close
					</span>
				</div>

				{sideMenuItems.map((sideMenuItem) => {
					return (
						<NavLink
							to={sideMenuItem.to}
							className="side-menu-item"
							activeClassName="active"
							exact
						>
							<span class="material-icons material-icons-round side-menu-item-icon">
								{sideMenuItem.iconName}
							</span>
							<p className="side-menu-item-text">{sideMenuItem.textName}</p>
						</NavLink>
					);
				})}
			</div>
		</div>,
		document.getElementById('root')
	);
};

export default SideMenu;

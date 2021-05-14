import React from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';
import { usePlaylistContext } from '../../context/playlist';
import { getLikedVideosPlaylist } from '../../helper';
import './index.scss';

const SideMenu = ({ showSideMenu, handleCloseSideMenu }) => {
	const {
		state: { playlists }
	} = usePlaylistContext();
	const { _id: likedVideosPlaylistId } = getLikedVideosPlaylist({ playlists });

	const sideMenuItems = [
		{ displayName: 'home', iconName: 'home', to: '/' },
		{ displayName: 'library', iconName: 'video_library', to: '/playlists' },
		{
			displayName: 'Liked Videos',
			iconName: 'recommend',
			to: `/playlists/${likedVideosPlaylistId}`
		}
	];

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
							className="side-menu-item reset-link-styles"
							activeClassName="active"
							exact
						>
							<span class="material-icons side-menu-item-icon">
								{sideMenuItem.iconName}
							</span>
							<p className="side-menu-item-text">
								{sideMenuItem.displayName}
							</p>
						</NavLink>
					);
				})}
			</div>
		</div>,
		document.getElementById('root')
	);
};

export default SideMenu;

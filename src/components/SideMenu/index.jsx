import React from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';
import { usePlaylistContext } from '../../context/playlist';
import { getLikedVideosPlaylist, getWatchLaterPlaylist } from '../../helper';
import './index.scss';

const addItemToSideMenuItems = ({ itemToAdd, sideMenuItems }) =>
	sideMenuItems.push({ ...itemToAdd });

const addLikedPlaylistToSideMenuItem = ({ likedVideosPlaylistId, sideMenuItems }) => {
	const itemToAdd = {
		displayName: 'Liked Videos',
		iconName: 'thumb_up',
		to: `/playlists/${likedVideosPlaylistId}`
	};

	addItemToSideMenuItems({ itemToAdd, sideMenuItems });
};

const addWatchPlaylistToSideMenuItem = ({ watchLaterPlaylistId, sideMenuItems }) => {
	const itemToAdd = {
		displayName: 'Watch later',
		iconName: 'watch_later',
		to: `/playlists/${watchLaterPlaylistId}`
	};

	addItemToSideMenuItems({ itemToAdd, sideMenuItems });
};

const SideMenu = ({ showSideMenu, handleCloseSideMenu }) => {
	const {
		state: { playlists }
	} = usePlaylistContext();

	// adding '|| {}' bcz function can return null if playlist
	// doesn't exist and destructuring null will throw error
	const { _id: likedVideosPlaylistId } = getLikedVideosPlaylist({ playlists }) || {};
	const { _id: watchLaterPlaylistId } = getWatchLaterPlaylist({ playlists }) || {};

	const sideMenuItems = [
		{ displayName: 'home', iconName: 'home', to: '/' },
		{ displayName: 'library', iconName: 'video_library', to: '/playlists' }
	];

	if (likedVideosPlaylistId)
		addLikedPlaylistToSideMenuItem({ likedVideosPlaylistId, sideMenuItems });

	if (watchLaterPlaylistId)
		addWatchPlaylistToSideMenuItem({ watchLaterPlaylistId, sideMenuItems });

	if (!showSideMenu) return null;

	return ReactDOM.createPortal(
		<div className="side-menu-container">
			<div className="side-menu-inner-container">
				<div className="side-menu-close" onClick={handleCloseSideMenu}>
					<span className="material-icons material-icons-round side-menu-item-icon side-menu-close-icon">
						close
					</span>
				</div>

				{sideMenuItems.map((sideMenuItem, index) => {
					return (
						<NavLink
							to={sideMenuItem.to}
							className="side-menu-item reset-link-styles"
							activeClassName="active"
							key={index}
							exact
						>
							<span className="material-icons side-menu-item-icon">
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

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import {
	VideoPage,
	PlayListsView,
	PlaylistsPage,
	HomePage,
	Login,
	SignUp
} from './views';
import NavBar from './components/NavBar';
import './App.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { fetchUserId, isUserLoggedIn } from './helper';
import { fetchApi } from './helper/fetchApi';
import { toast } from './helper/toast';
import { SET_PLAYLISTS, usePlaylistContext } from './context/playlist';

function App() {
	const userId = fetchUserId();
	const { dispatch } = usePlaylistContext();

	const fetchPlaylists = async () => {
		try {
			const { playlists } = await fetchApi({
				url: '/playlists',
				isProtected: true
			});

			dispatch({
				type: SET_PLAYLISTS,
				payload: {
					playlists
				}
			});
		} catch (error) {
			toast({ type: 'error', message: error.message });
		}
	};

	useEffect(() => {
		if (userId && isUserLoggedIn()) fetchPlaylists();
	}, [userId]);

	return (
		<div className="App">
			<ToastContainer />

			<Router>
				<NavBar />
				<Switch>
					<Route path="/videos/:videoId" exact component={VideoPage} />
					<Route path="/playlists/:playlistId" component={PlayListsView} />
					<Route path="/playlists" component={PlaylistsPage} />
					<Route path="/signup" component={SignUp} />
					<Route path="/login" component={Login} />
					<Route path="/" exact component={HomePage} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;

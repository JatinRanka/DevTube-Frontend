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
import { isUserLoggedIn } from './helper';
import { fetchApi } from './helper/fetchApi';

function App() {
	const fetchPlaylists = async () => {
		try {
			const { playlists } = await fetchApi({
				url: '/playlists',
				isProtected: true
			});
		} catch (error) {}
	};

	useEffect(() => {
		if (isUserLoggedIn()) fetchPlaylists();
	}, []);

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

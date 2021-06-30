import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { VideoProvider } from './context/videos';
import { PlayListProvider } from './context/playlist';
import { UserProvider } from './context/user';

ReactDOM.render(
	<React.StrictMode>
		<UserProvider>
			<VideoProvider>
				<PlayListProvider>
					<App />
				</PlayListProvider>
			</VideoProvider>
		</UserProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { VideoProvider } from './context/videos';
import { PlayListProvider } from './context/playlist';

ReactDOM.render(
	<React.StrictMode>
		<VideoProvider>
			<PlayListProvider>
				<App />
			</PlayListProvider>
		</VideoProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

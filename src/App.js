import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import HomePage from "./views/HomePage";
import VideoPage from "./views/VideoPage";
import PlaylistsPage from "./views/Playlists";
import NavBar from "./components/NavBar";
import "./App.css";
import PlayListsView from "./views/PLayListsView";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route path="/videos/:videoId" exact component={VideoPage} />
          <Route path="/playlists/:playlistId" component={PlayListsView} />
          <Route path="/playlists" component={PlaylistsPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

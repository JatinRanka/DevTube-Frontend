import React, { useState } from "react";
import { isVideoInPlaylist } from "../../helper";
import Modal from "../Modal";
import {
  usePlaylistContext,
  ADD_PLAYLIST,
  ADD_VIDEO_IN_PLAYLIST,
  REMOVE_VIDEO_FROM_PLAYLIST,
} from "../../context/playlist";
import "./index.scss";

const SavePlaylistModal = ({ showModal, handleCloseModal, videoDetails }) => {
  const [newPlaylistName, setNewPlaylistName] = useState("");

  const {
    state: { playlists },
    dispatch,
  } = usePlaylistContext();

  const handleAddPlaylistAndSave = () => {
    if (!newPlaylistName) return;

    dispatch({
      type: ADD_PLAYLIST,
      payload: {
        name: newPlaylistName,
        listOfVideos: [{ ...videoDetails }],
      },
    });
  };

  return (
    <Modal showModal={showModal} handleCloseModal={handleCloseModal}>
      <div className="video-page-modal">
        <p>Save To</p>
        <hr />
        <div className="playlists">
          {playlists.map((playlist) => {
            return (
              <div className="playlists-item" key={playlist._id}>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={isVideoInPlaylist({
                    videoId: videoDetails._id,
                    playlist,
                  })}
                  onClick={(event) => {
                    dispatch({
                      type: event.target.checked
                        ? ADD_VIDEO_IN_PLAYLIST
                        : REMOVE_VIDEO_FROM_PLAYLIST,
                      payload: {
                        video: { ...videoDetails },
                        playlistId: playlist._id,
                      },
                    });
                  }}
                />
                <label>{playlist.name}</label>
              </div>
            );
          })}
        </div>
        <hr />

        <input
          placeholder="Add playlist name"
          value={newPlaylistName}
          onChange={(event) => setNewPlaylistName(event.target.value)}
        />
        <button onClick={handleAddPlaylistAndSave}>Save</button>
      </div>
    </Modal>
  );
};

export default SavePlaylistModal;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import VideoPageComponent from "../../components/VideoPageComponent";
import { useVideosContext } from "../../context/videos";
import "./index.scss";

const VideoPage = () => {
  const { videoId } = useParams();
  const {
    state: { videosList },
  } = useVideosContext();

  const videoDetails = videosList.find((video) => video._id === videoId);

  return (
    <VideoPageComponent videoDetails={videoDetails} videosList={videosList} />
  );
};

export default VideoPage;

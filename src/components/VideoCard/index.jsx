import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { Link } from "react-router-dom";
import "./index.scss";

const getCalculatedWidth = () =>
  window.innerWidth < 500 ? window.innerWidth : 300;
const getCalculatedHeight = (width) => width / 1.7;

const VideoCard = ({ videoDetails }) => {
  const initialWidth = window.innerWidth < 500 ? window.innerWidth : 300;

  const [dimensions, setDimensions] = React.useState({
    width: initialWidth,
    height: initialWidth / 1.8,
  });

  const handleResize = () => {
    const newWidth = getCalculatedWidth();
    const newHeight = getCalculatedHeight(newWidth);

    setDimensions({
      width: newWidth,
      height: newHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { _id, title, channelName, createdAt, url } = videoDetails;
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const onMouseEnter = () => {
    setIsVideoPlaying(true);
  };

  const OnMouseLeave = () => {
    setIsVideoPlaying(false);
  };

  return (
    <Link to={`/videos/${_id}`}>
      <div className="video-card" style={{ width: `${dimensions.width}px` }}>
        <ReactPlayer
          className="react-player"
          width={`${dimensions.width}px`}
          height={`${dimensions.height}px`}
          light={!isVideoPlaying} // To show thumbnail
          playing={isVideoPlaying}
          controls={false}
          muted={true}
          playIcon={<></>}
          onMouseEnter={onMouseEnter}
          onMouseLeave={OnMouseLeave}
          url={url}
        />

        <div className="video-card__details">
          <div className="channel-logo">
            <img src="https://yt3.ggpht.com/ytc/AAUvwnh53ZRIGnyzC28QrfuggCINb3cfNbNWo4Uc6qR9=s100-c-k-c0x00ffffff-no-rj" />
          </div>

          <div className="description">
            <h3 className="video-card__description-title">{title}</h3>
            <span className="video-card__description-small-text">
              {channelName}| 302K Views | 4 days ago
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;

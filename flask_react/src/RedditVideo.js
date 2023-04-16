import React, { useState } from 'react';

const RedditVideo = ({ url }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlay = () => {
        setIsPlaying(true);
    };

    const handlePause = () => {
        setIsPlaying(false);
    };

    return (
        <video controls onPlay={handlePlay} onPause={handlePause}>
            <source src={`${url}/DASH_1080.mp4`} type="video/mp4" />
            Sorry, your browser doesn't support embedded videos.
        </video>
    );
};

export default RedditVideo;
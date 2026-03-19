import React, { useRef } from 'react';
import './IntroVideoPage.css';

const IntroVideoPage = ({ onComplete }) => {
  const videoRef = useRef(null);

  const handleVideoEnd = () => {
    onComplete();
  };

  return (
    <div className="intro-video-page">
      <video
        ref={videoRef}
        className="intro-video"
        src="/assets/Videos/Frame 1 Referance.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
      />
    </div>
  );
};

export default IntroVideoPage;

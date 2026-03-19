import React, { useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './TransitionVideoPage.css';

const TransitionVideoPage = ({ videoSrc, onComplete }) => {
  const videoRef = useRef(null);
  const { isMuted } = useLanguage();

  const handleVideoEnd = () => {
    onComplete();
  };

  return (
    <div className="page active transition-video-page">
      <video
        ref={videoRef}
        className="transition-video"
        src={videoSrc}
        autoPlay
        muted={isMuted}
        playsInline
        onEnded={handleVideoEnd}
      />
    </div>
  );
};

export default TransitionVideoPage;

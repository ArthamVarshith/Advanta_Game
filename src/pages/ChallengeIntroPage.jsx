import React, { useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './ChallengeIntroPage.css';

const ChallengeIntroPage = ({ onStart }) => {
  const videoRef = useRef(null);
  const { isMuted } = useLanguage();

  const handleVideoEnd = () => {
    onStart();
  };

  return (
    <div className="page active challenge-intro-video-page">
      <video
        ref={videoRef}
        className="challenge-intro-video"
        src="/assets/Videos/Frame 5 Video.mp4"
        autoPlay
        muted={isMuted}
        playsInline
        onEnded={handleVideoEnd}
      />
    </div>
  );
};

export default ChallengeIntroPage;

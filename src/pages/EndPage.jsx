import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './EndPage.css';

const EndPage = ({ onProceed }) => {
  const { t, isMuted } = useLanguage();
  const [isVideoEnded, setIsVideoEnded] = useState(false);

  return (
    <div className="page active end-page-container">
      {/* Background Video */}
      <video
        src="/assets/Videos/Frame 12 Video.mp4"
        className="end-video-bg"
        autoPlay
        muted={isMuted}
        playsInline
        onEnded={() => setIsVideoEnded(true)}
      />

      {isVideoEnded && (
        <div className="end-video-overlay">
          <button
            className="cashback-btn-video"
            onClick={onProceed}
          >
            {t.endPageBtn}
          </button>
        </div>
      )}
    </div>
  );
};

export default EndPage;
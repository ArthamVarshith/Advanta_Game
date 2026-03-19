import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './InstructionPage.css';

const InstructionPage = ({ onStart }) => {
  const { t } = useLanguage();

  return (
    <div className="page active instruction-page-container">
      {/* Background Video */}
      <video
        className="fluid-bg"
        src="/assets/Videos/Frame 2 BG.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      
      {/* Main Board */}
      <div className="instruction-board">
        <img src="/assets/images/frame.png" alt="board" className="board-bg" />
        
        <div className="board-content instruction-board-content">
          <h1 className="instruction-title">{t.instructionTitleText}</h1>
          
          <div className="instruction-text-container">
            <p className="instruction-text-body">
              {t.instructionBody1}
            </p>
            {t.instructionBody2 && (
              <p className="instruction-text-body">
                {t.instructionBody2}
              </p>
            )}
          </div>

          <button 
            className="play-action-btn"
            onClick={onStart}
          >
            <img src="/assets/images/Button 2.png" alt="play bg" className="btn-bg" />
            <span className="btn-text">{t.playBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructionPage;

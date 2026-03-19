import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import HappinessMeter from '../components/HappinessMeter';
import Timer from '../components/Timer';
import './ChallengePage.css';
import '../components/ScrollUI.css';

const GearIcon = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="white" style={{filter: 'drop-shadow(1px 2px 2px rgba(0,0,0,0.5))'}}>
    <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.06-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.73,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.06,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.43-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.49-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
  </svg>
);


const ChallengePage = ({ 
  currentLevel, 
  happinessScore, 
  setHappinessScore, 
  onWrongAnswer, 
  onCorrectAnswer, 
  onLevelComplete,
  collectedBubbles,
  setCollectedBubbles
}) => {

  const { t } = useLanguage();
  
  const [challengeStage, setChallengeStage] = useState('action');
  const [timer, setTimer] = useState(10); 
  const [isShaking, setIsShaking] = useState(false);
  const [highlightedOption, setHighlightedOption] = useState(null); 
  const [wrongSelectionsThisLevel, setWrongSelectionsThisLevel] = useState([]);

  const tickAudioRef = useRef(typeof Audio !== 'undefined' ? new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg") : null);
  const timerIntervalRef = useRef(null);

  const levels = t.levels;
  const gridOptions = t.gridOptions; 

  // Cleanup timers on dismount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  // Sequence Hooks
  useEffect(() => {
    if (challengeStage === 'action') {
      setTimer(10);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      
      timerIntervalRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            clearInterval(timerIntervalRef.current);
            onWrongAnswer();
            return 0;
          }
        });
      }, 1000);
      return () => clearInterval(timerIntervalRef.current);
    } 
    else if (challengeStage === 'post') {
      const timeout = setTimeout(() => {
          onLevelComplete();
          setHighlightedOption(null);
          setWrongSelectionsThisLevel([]);
          setChallengeStage('action');
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [currentLevel, challengeStage]);


  const handleChoose = (e, value) => {
    e.stopPropagation(); // prevent triggering page click when clicking a tile
    if (challengeStage !== 'action' || highlightedOption) return;

    const level = levels[currentLevel];
    if (!level) return;
    
    if (value === level.correct) {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      setHighlightedOption(value);
      setHappinessScore(prev => prev + 10);
      onCorrectAnswer(value);
      
      setTimeout(() => {
          setCollectedBubbles(prev => [...prev, value]);
          setChallengeStage('post');
      }, 2500);

    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 300);
      setWrongSelectionsThisLevel(prev => [...prev, value]);
      onWrongAnswer();
    }
  };

  const currentData = levels[currentLevel];
  if (!currentData) return null;

  let displayText = "";
  if (challengeStage === 'action') displayText = currentData.action;
  else if (challengeStage === 'post') displayText = currentData.post;

  const sparkles = Array.from({ length: 12 }).map((_, i) => (
    <div key={i} className="sparkle" style={{
      top: `${20 + Math.random() * 60}%`, 
      left: `${10 + Math.random() * 80}%`,
      animationDelay: `${Math.random()}s`,
      transform: `scale(${0.5 + Math.random()})`
    }}></div>
  ));

  // Per-level background images
  const levelBackgrounds = [
    '/assets/images/Frame 5 end.png',
    '/assets/images/Frame 6 end.png',
    '/assets/images/Frame 7 end.png',
    '/assets/images/Frame 8 end.png',
    '/assets/images/Frame 9 end.png',
  ];

  return (
    <div className="page active challenge-page-container">
      {/* Background - per level */}
      <img 
        key={`bg-${currentLevel}`}
        src={levelBackgrounds[currentLevel] || levelBackgrounds[0]} 
        alt="background" 
        className="fluid-bg" 
      />
      
      <div className={`challenge-content-wrapper ${isShaking ? 'shake' : ''}`}>
        
        {/* Top HUD */}
        <div className="top-hud" onClick={(e) => e.stopPropagation()}>
          <div className="hud-left">
            <div className="gear-icon-wrapper">
              <GearIcon />
            </div>
          </div>
          
          <HappinessMeter score={happinessScore} />

          <div className="hud-right">
            <Timer time={timer} />
          </div>
        </div>

        {/* Action Layer overlaying the Farmer */}
        <div className="action-layer-container">
          {/* Farmer Image Centered - always visible */}

          {/* Render Interactive Action Screen Elements ONLY if stage is NOT 'intro' and NOT post highlighted */}
          {!highlightedOption && (
            <div className="interactive-play-area">
              
              <div className="question-wood-banner">
                <span className="question-text-inner">{displayText}</span>
              </div>

              {challengeStage === 'action' && (
                <div className="options-grid-3x3">
                  {gridOptions.map((letter, idx) => (
                    <div 
                      key={idx} 
                      className="wood-tile-btn" 
                      onClick={(e) => handleChoose(e, letter)}
                    >
                      {letter}
                    </div>
                  ))}
                </div>
              )}
              
              <div className="wrong-selections-tray">
                 {wrongSelectionsThisLevel.map((letter, idx) => (
                   <div key={idx} className="wrong-bubble-indicator">{letter}</div>
                 ))}
              </div>

            </div>
          )}

          {/* Success Modal Layout */}
          {highlightedOption && (
            <div className="success-overlay-container">
              <div className="starburst-bg"></div>
              {sparkles}
              <div className="massive-orb">
                {highlightedOption}
              </div>
            </div>
          )}
        </div>

        {/* Collected correct answers at bottom center */}
        {collectedBubbles.length > 0 && !highlightedOption && (
          <div className="collected-bubbles-tray">
            {collectedBubbles.map((letter, idx) => (
              <div key={idx} className="correct-bubble-indicator">{letter}</div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default ChallengePage;

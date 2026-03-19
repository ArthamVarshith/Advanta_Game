import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import IntroVideoPage from './pages/IntroVideoPage';
import LanguagePage from './pages/LanguagePage';
import FormPage from './pages/FormPage';
import InstructionPage from './pages/InstructionPage';
import ChallengeIntroPage from './pages/ChallengeIntroPage';
import ChallengePage from './pages/ChallengePage';
import TransitionVideoPage from './pages/TransitionVideoPage';
import TryAgainPage from './pages/TryAgainPage';
import EndPage from './pages/EndPage';
import FinalAnimationPage from './pages/FinalAnimationPage';

const SHEET_URL = "https://script.google.com/macros/s/AKfycbxQvtdFOQ-zNmIpYo_B8HD6qVRU66y2vJcV7LB_pc8_8Shoyl65UuI8vp6ivF35fleS/exec";

function AppContent() {
  const { t } = useLanguage();
  
  const [page, setPage] = useState('introVideo');
  const [currentUser, setCurrentUser] = useState({ name: '', phone: '' });

  const [currentLevel, setCurrentLevel] = useState(0);
  const [happinessScore, setHappinessScore] = useState(50); // Start at Neutral (50/100)
  const [collectedBubbles, setCollectedBubbles] = useState([]);
  const [transitionVideoSrc, setTransitionVideoSrc] = useState('');

  // Videos to play AFTER completing each level (before next question)
  const levelTransitionVideos = [
    '/assets/Videos/Frame 6 Video.mp4',  // after Q1 → before Q2
    '/assets/Videos/Frame 7 Video.mp4',  // after Q2 → before Q3
    '/assets/Videos/Frame 8 Video.mp4',  // after Q3 → before Q4
    '/assets/Videos/Frame 9 Video.mp4',  // after Q4 → before Q5
  ];

  const handleIntroVideoComplete = () => {
    setPage('languagePage');
  };

  const handleLanguageComplete = () => {
    setPage('instructionPage');
  };

  const handleInstructionNext = () => {
    setPage('formPage');
  };

  const handleFormSubmit = (userData) => {
    setCurrentUser(userData);
    fetch(SHEET_URL, {
      method: "POST",
      body: JSON.stringify({ name: userData.name, phone: userData.phone, status: "lose" }),
      mode: 'no-cors'
    }).catch(e => console.error(e));

    startGame();
  };

  const startGame = () => {
    setCurrentLevel(0);
    setCollectedBubbles([]);
    setHappinessScore(50);
    setPage('challengeIntroPage');
  };

  const handleIntroComplete = () => {
    setPage('challengePage');
  };

  const handleWrongAnswer = () => {
    setHappinessScore(prev => Math.max(prev - 10, 0)); // Penalize
    setPage('tryAgainPage');
  };

  const retryQuestion = () => {
    setPage('challengePage');
  };

  const handleCorrectAnswer = (value) => {
    // Score update is handled in ChallengePage directly for immediate UI feedback.
    // The delay logic is also inside ChallengePage to allow the glow animation to play.
  };

  const handleLevelComplete = () => {
    if (currentLevel + 1 >= t.levels.length) {
      // Last question done → end game
      setTransitionVideoSrc('/assets/Videos/Frame 10 Video.mp4');
      setPage('finalTransitionVideo');
    } else {
      // Show transition video before next question
      const videoSrc = levelTransitionVideos[currentLevel];
      if (videoSrc) {
        setTransitionVideoSrc(videoSrc);
        setPage('transitionVideo');
      } else {
        // Fallback: go directly to next question
        setCurrentLevel(prev => prev + 1);
      }
    }
  };

  const handleTransitionVideoComplete = () => {
    setCurrentLevel(prev => prev + 1);
    setPage('challengePage');
  };

  const handleFinalTransitionVideoComplete = () => {
    setPage('finalAnimationPage');
  };

  const handleFinalAnimationComplete = () => {
    setTransitionVideoSrc('/assets/Videos/Frame 11 Video.mp4');
    setPage('postAnimationTransitionVideo');
  };

  const handlePostAnimationVideoComplete = () => {
    handleGameComplete();
  };

  const handleGameComplete = () => {
    // 1) Post final Win status
    fetch(SHEET_URL, {
        method: "POST",
        body: JSON.stringify({ name: currentUser.name, phone: currentUser.phone, status: "win" }),
        mode: 'no-cors'
    }).catch(e => console.error(e));
    
    // 2) Move to final completion screen
    setPage('endPage');
  };

  const renderPage = () => {
    switch (page) {
      case 'introVideo':
        return <IntroVideoPage onComplete={handleIntroVideoComplete} />;
      case 'languagePage':
        return <LanguagePage onComplete={handleLanguageComplete} />;
      case 'instructionPage':
        return <InstructionPage onStart={handleInstructionNext} />;
      case 'formPage':
        return <FormPage onSubmit={handleFormSubmit} />;
      case 'challengeIntroPage':
        return (
          <ChallengeIntroPage
            currentLevel={currentLevel}
            happinessScore={happinessScore}
            onStart={handleIntroComplete}
          />
        );
      case 'challengePage':
        return (
          <ChallengePage 
            currentLevel={currentLevel}
            happinessScore={happinessScore}
            setHappinessScore={setHappinessScore}
            onWrongAnswer={handleWrongAnswer}
            onCorrectAnswer={handleCorrectAnswer}
            onLevelComplete={handleLevelComplete}
            onGameComplete={handleGameComplete}
            collectedBubbles={collectedBubbles}
            setCollectedBubbles={setCollectedBubbles}
          />
        );
      case 'transitionVideo':
        return (
          <TransitionVideoPage
            videoSrc={transitionVideoSrc}
            onComplete={handleTransitionVideoComplete}
          />
        );
      case 'finalTransitionVideo':
        return (
          <TransitionVideoPage
            videoSrc={transitionVideoSrc}
            onComplete={handleFinalTransitionVideoComplete}
          />
        );
      case 'finalAnimationPage':
        return (
          <FinalAnimationPage 
            onComplete={handleFinalAnimationComplete} 
          />
        );
      case 'postAnimationTransitionVideo':
        return (
          <TransitionVideoPage
            videoSrc={transitionVideoSrc}
            onComplete={handlePostAnimationVideoComplete}
          />
        );
      case 'tryAgainPage':
        return <TryAgainPage onRetry={retryQuestion} />;
      case 'endPage':
        return <EndPage onProceed={() => window.location.href = "https://wa.me/9182879315"} />;
      default:
        return null;
    }
  };

  return (
    <>
      {renderPage()}
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;

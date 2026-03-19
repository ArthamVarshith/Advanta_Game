import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './FinalAnimationPage.css';

const FinalAnimationPage = ({ onComplete }) => {
  const { t } = useLanguage();
  // Extract correct letters from levels (works for both languges)
  const letters = t.levels.map(l => l.correct);

  return (
    <div className="page active final-animation-container" onClick={onComplete}>
      <img src="/assets/images/Frame 10 end.png" alt="background" className="fluid-bg" />
      
      {/* Optional starburst to make it look epic */}
      <div className="final-starburst-bg"></div>
      
      <div className="letters-container">
        {letters.map((letter, idx) => (
          <div 
            key={idx} 
            className="jumbo-letter-btn" 
            style={{ animationDelay: `${idx * 0.3}s` }}
          >
            {letter}
          </div>
        ))}
      </div>
      
      <div className="tap-to-continue">
        {t.proceed || "Tap to continue"}
      </div>
    </div>
  );
};

export default FinalAnimationPage;

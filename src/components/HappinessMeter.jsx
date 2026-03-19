import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './HappinessMeter.css';

const HappinessMeter = ({ score }) => {
  const { t } = useLanguage();

  const clampedScore = Math.min(Math.max(score, 0), 100);
  
  return (
    <div className="hud-center">
      <h2 className="happiness-meter-title">{t.happinessMeter}</h2>
      <div className="happiness-meter-bar-wrapper">
        <div 
          className="happiness-meter-marker" 
          style={{ left: `${clampedScore}%` }}
        ></div>
      </div>
    </div>
  );
};

export default HappinessMeter;

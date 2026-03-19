import React, { createContext, useState, useContext } from 'react';
import hi from '../locales/hi';
import pa from '../locales/pa';

const translations = {
  hi,
  pa
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('hi');
  const [isMuted, setIsMuted] = useState(false);

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isMuted, setIsMuted }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

'use client'

import React, { useState, useEffect } from 'react';
import { i18n, Locale } from '@/lib/i18n';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export function LanguageSwitcher({ className = '', variant = 'light' }: LanguageSwitcherProps) {
  const [currentLocale, setCurrentLocale] = useState<Locale>('id');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setCurrentLocale(i18n.getLocale());
  }, []);

  const handleLocaleChange = (locale: Locale) => {
    i18n.setLocale(locale);
    setCurrentLocale(locale);
    setIsOpen(false);
    
    // Trigger re-render of the page
    window.location.reload();
  };

  const getFlag = (locale: Locale) => {
    const flags = {
      id: '🇮🇩',
      en: '🇺🇸',
      ar: '🇸🇦'
    };
    return flags[locale];
  };

  const isDark = variant === 'dark';
  const buttonClasses = isDark 
    ? "flex items-center gap-2 px-3 py-2 bg-transparent border border-white/30 rounded-lg hover:bg-white/10 transition-colors text-white"
    : "flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors";

  const textClasses = isDark 
    ? "text-sm font-medium text-white"
    : "text-sm font-medium text-gray-700";

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={buttonClasses}
      >
        <span className="text-lg">{getFlag(currentLocale)}</span>
        <span className={textClasses}>
          {i18n.getLocaleName(currentLocale)}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''} ${isDark ? 'text-white' : 'text-gray-500'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
          {i18n.getAvailableLocales().map((locale) => (
            <button
              key={locale}
              onClick={() => handleLocaleChange(locale)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                currentLocale === locale ? 'bg-green-50 text-green-700' : 'text-gray-700'
              } ${locale === 'ar' ? 'text-right' : ''}`}
            >
              <span className="text-lg">{getFlag(locale)}</span>
              <span className="text-sm font-medium">
                {i18n.getLocaleName(locale)}
              </span>
              {currentLocale === locale && (
                <svg className="w-4 h-4 ml-auto text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
} 
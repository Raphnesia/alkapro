'use client'

import { useState, useEffect } from 'react';
import { i18n, Locale } from '@/lib/i18n';

export function useI18n() {
  const [currentLocale, setCurrentLocale] = useState<Locale>(i18n.getLocale());

  useEffect(() => {
    setCurrentLocale(i18n.getLocale());
  }, []);

  const t = (key: string): string => {
    return i18n.t(key);
  };

  const changeLocale = (locale: Locale) => {
    i18n.setLocale(locale);
    setCurrentLocale(locale);
  };

  const getAvailableLocales = () => {
    return i18n.getAvailableLocales();
  };

  const getLocaleName = (locale: Locale) => {
    return i18n.getLocaleName(locale);
  };

  return {
    currentLocale,
    t,
    changeLocale,
    getAvailableLocales,
    getLocaleName
  };
} 
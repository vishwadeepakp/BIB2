'use client';

import { useLanguage } from './language-context';
import { t } from './translations';
import { useCallback } from 'react';

export function useTranslation() {
  const { language } = useLanguage();
  
  // useCallback ensures this function is updated whenever language changes
  const translate = useCallback((key: string) => t(key, language), [language]);
  
  return translate;
}

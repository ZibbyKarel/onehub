'use client';

import { useTranslations } from 'next-intl';
import type { Translations } from './translations';
import type { TranslationParams } from './types';

export const useLocalizedText = (): ((key: Translations, params?: TranslationParams) => string) => {
  const t = useTranslations();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (key: Translations, params?: TranslationParams) => t(key as any, params as any) as string;
};

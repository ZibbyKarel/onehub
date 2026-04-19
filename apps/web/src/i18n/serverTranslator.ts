import { getTranslations } from 'next-intl/server';
import type { Translations } from './translations';
import type { TranslationParams } from './types';

export const getServerTranslator = async (
  _locale?: string,
): Promise<(key: Translations, params?: TranslationParams) => string> => {
  const t = await getTranslations();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (key: Translations, params?: TranslationParams) => t(key as any, params as any) as string;
};

import type { Translations } from './translations';

export type TranslationParams = Record<string, string | number>;

export type TranslationFunction = (key: Translations, params?: TranslationParams) => string;

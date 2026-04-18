import enDictionary from './en.json';
import plDictionary from './pl.json';
import { LocaleCode } from './types';
import { TranslationKeys } from './translationKeys';

export type TranslationDictionary = Record<TranslationKeys, string>;

export const dictionaries: Record<LocaleCode, TranslationDictionary> = {
  en: enDictionary as TranslationDictionary,
  pl: plDictionary as TranslationDictionary,
};

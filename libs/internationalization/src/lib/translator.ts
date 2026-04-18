import { dictionaries } from './dictionaries';
import { formatMessage } from './format';
import { TranslationKeys } from './translationKeys';
import { LocaleCode, TranslationFunction, TranslationParams } from './types';

const isDevelopment = process.env.NODE_ENV !== 'production';

const warnMissingTranslation = (
  key: TranslationKeys,
  locale: LocaleCode,
  defaultLocale: LocaleCode,
): void => {
  if (!isDevelopment) {
    return;
  }

  // eslint-disable-next-line no-console
  console.warn(
    `[i18n] Missing translation for key "${key}" in locale "${locale}" and default locale "${defaultLocale}". Falling back to key name.`,
  );
};

export interface GetTranslatorOptions {
  locale: LocaleCode;
  defaultLocale?: LocaleCode;
}

export const getTranslator = ({
  locale,
  defaultLocale = 'en',
}: GetTranslatorOptions): TranslationFunction => {
  return (key: TranslationKeys, params?: TranslationParams): string => {
    const activeLocaleValue = dictionaries[locale]?.[key];

    if (activeLocaleValue !== undefined) {
      return formatMessage(activeLocaleValue, params);
    }

    const defaultLocaleValue = dictionaries[defaultLocale]?.[key];

    if (defaultLocaleValue !== undefined) {
      return formatMessage(defaultLocaleValue, params);
    }

    warnMissingTranslation(key, locale, defaultLocale);
    return key;
  };
};

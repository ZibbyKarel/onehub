import { getTranslator } from './translator';
import { TranslationKeys } from './translation-keys';

describe('getTranslator', () => {
  const missingKey = 'NonExistentMissingKey' as TranslationKeys;

  it('returns translation from active locale when present', () => {
    const t = getTranslator({ locale: 'pl', defaultLocale: 'en' });

    expect(t(TranslationKeys.GiveawaysPageTitle)).toBe('Giveaway Dashboard');
  });

  it('falls back to default locale when active locale translation is missing', () => {
    const t = getTranslator({ locale: 'pl', defaultLocale: 'en' });

    expect(t(TranslationKeys.TestingFallbackOnlyEnglish)).toBe('Fallback string in English only');
  });

  it('falls back to key name and warns in development when missing in both locales', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => undefined);

    const t = getTranslator({ locale: 'pl', defaultLocale: 'en' });

    expect(t(missingKey)).toBe('NonExistentMissingKey');
    expect(warnSpy).toHaveBeenCalledWith(
      '[i18n] Missing translation for key "NonExistentMissingKey" in locale "pl" and default locale "en". Falling back to key name.',
    );

    warnSpy.mockRestore();
  });
});

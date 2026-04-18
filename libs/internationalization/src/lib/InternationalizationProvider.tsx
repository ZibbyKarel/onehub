import { PropsWithChildren, useMemo } from 'react';

import {
  InternationalizationContext,
  InternationalizationContextValue,
} from './context';
import { getTranslator } from './translator';
import { LocaleCode } from './types';

export interface InternationalizationProviderProps extends PropsWithChildren {
  locale: LocaleCode;
  defaultLocale?: LocaleCode;
}

/**
 * Provides localization context for React descendants.
 *
 * Usage example:
 * ```tsx
 * <InternationalizationProvider locale="pl" defaultLocale="en">
 *   <App />
 * </InternationalizationProvider>
 * ```
 */
export const InternationalizationProvider = ({
  locale,
  defaultLocale = 'en',
  children,
}: InternationalizationProviderProps): JSX.Element => {
  const value = useMemo<InternationalizationContextValue>(() => {
    return {
      locale,
      defaultLocale,
      t: getTranslator({ locale, defaultLocale }),
    };
  }, [defaultLocale, locale]);

  return (
    <InternationalizationContext.Provider value={value}>
      {children}
    </InternationalizationContext.Provider>
  );
};

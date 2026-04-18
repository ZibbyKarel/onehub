import { createContext } from 'react';

import { LocaleCode, TranslationFunction } from './types';

export interface InternationalizationContextValue {
  locale: LocaleCode;
  defaultLocale: LocaleCode;
  t: TranslationFunction;
}

/**
 * React context carrying the active locale and translation function.
 *
 * Typical usage:
 * - Wrap app (or route segment) with `InternationalizationProvider`
 * - Read translations via `useLocalizedText().t(...)`
 */
export const InternationalizationContext =
  createContext<InternationalizationContextValue | null>(null);

InternationalizationContext.displayName = 'InternationalizationContext';

/**
 * Usage example:
 *
 * ```tsx
 * <InternationalizationProvider locale="en">
 *   <DashboardPage />
 * </InternationalizationProvider>
 * ```
 */

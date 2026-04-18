import { useContext } from 'react';

import { InternationalizationContext } from './context';
import { TranslationFunction } from './types';

/**
 * Hook returning the localized translator function.
 *
 * Usage example:
 * ```tsx
 * const { t } = useLocalizedText();
 *
 * return (
 *   <h1>{t(TranslationKeys.DashboardPageTitle)}</h1>
 * );
 * ```
 */
export const useLocalizedText = (): { t: TranslationFunction } => {
  const context = useContext(InternationalizationContext);

  if (!context) {
    throw new Error(
      'useLocalizedText must be used within an InternationalizationProvider.',
    );
  }

  return { t: context.t };
};

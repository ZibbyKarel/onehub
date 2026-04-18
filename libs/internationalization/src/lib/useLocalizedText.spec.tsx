import { renderHook } from '@testing-library/react';
import { PropsWithChildren } from 'react';

import { InternationalizationProvider } from './InternationalizationProvider';
import { TranslationKeys } from './translationKeys';
import { useLocalizedText } from './useLocalizedText';

const ProviderWrapper = ({ children }: PropsWithChildren): JSX.Element => (
  <InternationalizationProvider locale="pl" defaultLocale="en">
    {children}
  </InternationalizationProvider>
);

describe('useLocalizedText', () => {
  it('returns a translator function from context when used inside the provider', () => {
    const { result } = renderHook(() => useLocalizedText(), {
      wrapper: ProviderWrapper,
    });

    expect(result.current.t(TranslationKeys.DashboardPageTitle)).toBe(
      'Konkursy na Instagramie',
    );
  });

  it('throws a clear error when used outside InternationalizationProvider', () => {
    expect(() => renderHook(() => useLocalizedText())).toThrowError(
      'useLocalizedText must be used within an InternationalizationProvider.',
    );
  });
});

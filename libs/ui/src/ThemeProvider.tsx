'use client';

import type { ReactNode } from 'react';
import { ThemeProvider as ScThemeProvider } from 'styled-components';
import { theme } from './tokens/theme';
import { GlobalStyles } from './GlobalStyles';

/**
 * App-level theme root. Wrap the Next.js `app/layout.tsx` children in this so
 * every styled-component can access `theme` and the global reset runs once.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ScThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ScThemeProvider>
  );
}

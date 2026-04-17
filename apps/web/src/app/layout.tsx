import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { StyledComponentsRegistry } from './registry.js';
import { Providers } from './providers.js';
import { AppShell } from '../components/AppShell.js';

export const metadata: Metadata = {
  title: 'IG Giveaway Aggregator',
  description: 'Soute\u017ee z Instagramu na jednom m\u00edst\u011b.',
};

export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <html lang="cs">
      <body>
        <StyledComponentsRegistry>
          <Providers>
            <AppShell>{children}</AppShell>
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

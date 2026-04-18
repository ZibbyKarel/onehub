import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { StyledComponentsRegistry } from './registry';
import { Providers } from './providers';
import { AppShell } from '../components/AppShell';

export const metadata: Metadata = {
  title: 'IG Giveaway Aggregator',
  description: 'Soute\u017ee z Instagramu na jednom m\u00edst\u011b.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
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

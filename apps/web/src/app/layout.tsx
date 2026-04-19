import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { getServerTranslator, Translations } from '@app/internationalization';
import { StyledComponentsRegistry } from './StyledComponentsRegistry';
import { Providers } from './Providers';
import { AppShell } from '../components/AppShell';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerTranslator();
  return {
    title: t(Translations.AppMetaTitle),
    description: t(Translations.AppMetaDescription),
  };
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const messages = await getMessages();
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <NextIntlClientProvider messages={messages}>
            <Providers>
              <AppShell>{children}</AppShell>
            </Providers>
          </NextIntlClientProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

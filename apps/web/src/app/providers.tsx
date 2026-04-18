'use client';

import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { InternationalizationProvider } from '@app/internationalization';
import { ThemeProvider } from '@app/ui';

const DEFAULT_LOCALE = 'en';

/**
 * Client-side providers. Keep this file under "use client" but only what
 * actually needs it — the theme provider, the query client.
 */
export function Providers({ children }: { children: ReactNode }) {
  // `useState` ensures a single QueryClient instance per client render.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <InternationalizationProvider locale={DEFAULT_LOCALE} defaultLocale={DEFAULT_LOCALE}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>{children}</ThemeProvider>
      </QueryClientProvider>
    </InternationalizationProvider>
  );
}

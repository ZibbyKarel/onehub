'use client';

import { useState, type ReactNode } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

/**
 * Styled-Components registry bridging SSR and hydration.
 *
 * On the server we collect styles into a `ServerStyleSheet`, flush them into
 * `<head>` via `useServerInsertedHTML`, and re-mount cleanly on the client.
 * This is the standard Next 13+ app-router pattern — see
 * https://styled-components.com/docs/advanced#nextjs
 */
export function StyledComponentsRegistry({ children }: { children: ReactNode }): JSX.Element {
  const [sheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const tags = sheet.getStyleElement();
    sheet.instance.clearTag();
    return <>{tags}</>;
  });

  if (typeof window !== 'undefined') return <>{children}</>;

  return <StyleSheetManager sheet={sheet.instance}>{children}</StyleSheetManager>;
}

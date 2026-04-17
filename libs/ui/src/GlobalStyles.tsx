'use client';

import { createGlobalStyle } from 'styled-components';

/** Minimal reset + base typography. Keep this small; component styles win. */
export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    background: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.typography.fontFamily.sans};
    font-size: ${({ theme }) => theme.typography.fontSize.md};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
    -webkit-font-smoothing: antialiased;
  }

  body {
    min-height: 100vh;
  }

  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: none;
  }
  a:hover { text-decoration: underline; }

  button, input, select, textarea {
    font-family: inherit;
    font-size: inherit;
  }

  :focus-visible {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadows.focus};
    border-radius: ${({ theme }) => theme.radius.sm};
  }
`;

/**
 * Design-system colour palette. Keep the shape flat and semantic — component
 * code should reference `theme.colors.surface` rather than a raw hex.
 */
export const colors = {
  // Neutrals
  bg: '#0b0f14',
  surface: '#131a24',
  surfaceRaised: '#1a2330',
  border: '#253144',
  borderSubtle: '#1b2535',

  // Text
  text: '#e6ebf2',
  textMuted: '#93a1b5',
  textOnAccent: '#0b0f14',

  // Accent — warm highlight for contest cards
  accent: '#f5b341',
  accentHover: '#ffc252',

  // Status
  success: '#3ecf8e',
  warning: '#f5b341',
  danger: '#ef5a5a',
  info: '#5aa9ef',

  // Contest status badges (semantic names that map to enum)
  statusNew: '#5aa9ef',
  statusEntered: '#3ecf8e',
  statusExpired: '#93a1b5',
  statusWon: '#f5b341',
  statusLost: '#ef5a5a',
  statusDismissed: '#6b7a90',
} as const;

export type Colors = typeof colors;

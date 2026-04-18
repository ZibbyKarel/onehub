import { colors } from './colors';
import { radius } from './radius';
import { shadows } from './shadows';
import { spacing, type SpacingKey } from './spacing';
import { typography } from './typography';

/**
 * The single theme object consumed by Styled-Components. Keep this type
 * stable — it's declaration-merged into `DefaultTheme` in `@app/ui/styled.d.ts`.
 */
export const theme = {
  colors,
  typography,
  radius,
  shadows,
  /** Preferred accessor: `theme.space(4)` returns the token. */
  space: (key: SpacingKey): string => spacing[key],
  spacing,
} as const;

export type AppTheme = typeof theme;

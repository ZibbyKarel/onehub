import { colors } from './colors.js';
import { radius } from './radius.js';
import { shadows } from './shadows.js';
import { spacing, type SpacingKey } from './spacing.js';
import { typography } from './typography.js';

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

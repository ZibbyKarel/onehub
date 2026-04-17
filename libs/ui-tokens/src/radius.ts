export const radius = {
  none: '0',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  pill: '999px',
} as const;

export type Radius = typeof radius;

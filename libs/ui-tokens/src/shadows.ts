export const shadows = {
  none: 'none',
  sm: '0 1px 2px rgba(0, 0, 0, 0.25)',
  md: '0 4px 12px rgba(0, 0, 0, 0.3)',
  lg: '0 12px 32px rgba(0, 0, 0, 0.4)',
  focus: '0 0 0 3px rgba(245, 179, 65, 0.35)',
} as const;

export type Shadows = typeof shadows;

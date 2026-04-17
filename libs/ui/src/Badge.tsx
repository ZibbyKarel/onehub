'use client';

import styled from 'styled-components';
import type { Colors } from '@app/ui-tokens';

export type BadgeVariant =
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'accent';

/**
 * Status names supported by `StatusBadge`. Kept in-file intentionally:
 * `@app/ui` must not depend on `@app/shared-types` (that would drag Zod into
 * the design system). The `ContestStatus` enum in shared-types happens to use
 * the same strings — we re-assert the union here.
 */
export type BadgeStatusKey =
  | 'NEW'
  | 'ENTERED'
  | 'WON'
  | 'LOST'
  | 'EXPIRED'
  | 'DISMISSED';

const statusToColor: Record<BadgeStatusKey, keyof Colors> = {
  NEW: 'statusNew',
  ENTERED: 'statusEntered',
  WON: 'statusWon',
  LOST: 'statusLost',
  EXPIRED: 'statusExpired',
  DISMISSED: 'statusDismissed',
};

export interface BadgeProps {
  variant?: BadgeVariant;
}

export const Badge = styled.span<BadgeProps>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(1)};
  padding: ${({ theme }) => `${theme.space(1)} ${theme.space(2)}`};
  border-radius: ${({ theme }) => theme.radius.pill};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  background: ${({ theme, variant = 'neutral' }) => {
    switch (variant) {
      case 'info': return theme.colors.info;
      case 'success': return theme.colors.success;
      case 'warning': return theme.colors.warning;
      case 'danger': return theme.colors.danger;
      case 'accent': return theme.colors.accent;
      default: return theme.colors.surfaceRaised;
    }
  }};
  color: ${({ theme, variant = 'neutral' }) =>
    variant === 'neutral' ? theme.colors.text : theme.colors.textOnAccent};
`;

/**
 * Badge whose colour is driven by a contest status. Accepts `BadgeStatusKey`;
 * callers with a `ContestStatus` from `@app/shared-types` can pass it directly
 * since the string unions are structurally identical.
 */
export const StatusBadge = styled(Badge)<{ status: BadgeStatusKey }>`
  background: ${({ theme, status }) => theme.colors[statusToColor[status]]};
  color: ${({ theme }) => theme.colors.textOnAccent};
`;

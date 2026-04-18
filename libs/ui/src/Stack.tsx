'use client';

import styled from 'styled-components';
import type { SpacingKey } from './tokens/spacing';

/** Vertical flex stack — the go-to layout primitive. */
export const Stack = styled.div<{ gap?: SpacingKey; align?: 'stretch' | 'center' | 'start' | 'end' }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme, gap = 3 }) => theme.space(gap)};
  align-items: ${({ align = 'stretch' }) => align};
`;

/** Horizontal row. `wrap` lets items flow onto new lines when space runs out. */
export const Row = styled.div<{
  gap?: SpacingKey;
  align?: 'stretch' | 'center' | 'start' | 'end';
  justify?: 'start' | 'center' | 'end' | 'space-between';
  wrap?: boolean;
}>`
  display: flex;
  gap: ${({ theme, gap = 3 }) => theme.space(gap)};
  align-items: ${({ align = 'center' }) => align};
  justify-content: ${({ justify = 'start' }) =>
    justify === 'start' ? 'flex-start' : justify === 'end' ? 'flex-end' : justify};
  flex-wrap: ${({ wrap }) => (wrap ? 'wrap' : 'nowrap')};
`;

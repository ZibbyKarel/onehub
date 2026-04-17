'use client';

import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import styled from 'styled-components';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
}

const Row = styled.label`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(2)};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  user-select: none;
`;

const Box = styled.input<{ $invalid?: boolean }>`
  width: 1rem;
  height: 1rem;
  accent-color: ${({ theme }) => theme.colors.accent};
  cursor: pointer;
  ${({ $invalid, theme }) =>
    $invalid ? `outline: 1px solid ${theme.colors.danger}; outline-offset: 2px;` : ''}
`;

const Hint = styled.small<{ $error?: boolean }>`
  display: block;
  color: ${({ theme, $error }) => ($error ? theme.colors.danger : theme.colors.textMuted)};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  margin-top: ${({ theme }) => theme.space(1)};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(1)};
`;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, hint, error, id, ...rest },
  ref,
) {
  const fieldId = id ?? rest.name;
  const hintOrError = error ?? hint;
  return (
    <Wrapper>
      <Row htmlFor={fieldId}>
        <Box
          ref={ref}
          id={fieldId}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          $invalid={Boolean(error)}
          {...rest}
        />
        {label}
      </Row>
      {hintOrError && <Hint $error={Boolean(error)}>{hintOrError}</Hint>}
    </Wrapper>
  );
});

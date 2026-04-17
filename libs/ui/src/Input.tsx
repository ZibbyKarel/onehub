'use client';

import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import styled, { css } from 'styled-components';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
}

const fieldFrame = css`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(1)};
  width: 100%;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const Hint = styled.small<{ $error?: boolean }>`
  color: ${({ theme, $error }) => ($error ? theme.colors.danger : theme.colors.textMuted)};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
`;

const Wrapper = styled.div`
  ${fieldFrame}
`;

export const StyledInput = styled.input<{ $invalid?: boolean }>`
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid
    ${({ theme, $invalid }) => ($invalid ? theme.colors.danger : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ theme }) => `${theme.space(2)} ${theme.space(3)}`};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  transition: border-color 120ms ease, box-shadow 120ms ease;

  &::placeholder { color: ${({ theme }) => theme.colors.textMuted}; }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, id, ...rest },
  ref,
) {
  const inputId = id ?? rest.name;
  const hintOrError = error ?? hint;
  const describedBy = hintOrError && inputId ? `${inputId}-desc` : undefined;
  return (
    <Wrapper>
      {label && <Label htmlFor={inputId}>{label}</Label>}
      <StyledInput
        ref={ref}
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        $invalid={Boolean(error)}
        {...rest}
      />
      {hintOrError && (
        <Hint id={describedBy} $error={Boolean(error)}>
          {hintOrError}
        </Hint>
      )}
    </Wrapper>
  );
});

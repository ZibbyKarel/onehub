'use client';

import { forwardRef, type ReactNode, type SelectHTMLAttributes } from 'react';
import styled from 'styled-components';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
}

const Wrapper = styled.div`
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

export const StyledSelect = styled.select<{ $invalid?: boolean }>`
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid
    ${({ theme, $invalid }) => ($invalid ? theme.colors.danger : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ theme }) => `${theme.space(2)} ${theme.space(3)}`};
  font-size: ${({ theme }) => theme.typography.fontSize.md};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }
`;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, hint, error, id, children, ...rest },
  ref,
) {
  const fieldId = id ?? rest.name;
  const hintOrError = error ?? hint;
  const describedBy = hintOrError && fieldId ? `${fieldId}-desc` : undefined;
  return (
    <Wrapper>
      {label && <Label htmlFor={fieldId}>{label}</Label>}
      <StyledSelect
        ref={ref}
        id={fieldId}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        $invalid={Boolean(error)}
        {...rest}
      >
        {children}
      </StyledSelect>
      {hintOrError && (
        <Hint id={describedBy} $error={Boolean(error)}>
          {hintOrError}
        </Hint>
      )}
    </Wrapper>
  );
});

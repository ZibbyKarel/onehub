'use client';

import { forwardRef, type ReactNode, type TextareaHTMLAttributes } from 'react';
import styled from 'styled-components';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
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

export const StyledTextarea = styled.textarea<{ $invalid?: boolean }>`
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid
    ${({ theme, $invalid }) => ($invalid ? theme.colors.danger : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ theme }) => `${theme.space(2)} ${theme.space(3)}`};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-family: inherit;
  resize: vertical;
  min-height: 88px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }
`;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, hint, error, id, ...rest },
  ref,
) {
  const fieldId = id ?? rest.name;
  const hintOrError = error ?? hint;
  const describedBy = hintOrError && fieldId ? `${fieldId}-desc` : undefined;
  return (
    <Wrapper>
      {label && <Label htmlFor={fieldId}>{label}</Label>}
      <StyledTextarea
        ref={ref}
        id={fieldId}
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

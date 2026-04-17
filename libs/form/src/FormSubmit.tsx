'use client';

import type { ReactNode } from 'react';
import { useFormContext, useFormState } from 'react-hook-form';
import { Button, type ButtonProps } from '@app/ui';

export interface FormSubmitProps extends Omit<ButtonProps, 'type' | 'children'> {
  children: ReactNode;
  /**
   * When true, the button is disabled while the form is submitting OR while
   * validation is in progress. Default true.
   */
  disableWhileBusy?: boolean;
}

/**
 * A submit button that is aware of the surrounding form's state. Must be
 * nested inside a `<FormProvider>` — otherwise `useFormContext` returns null.
 */
export function FormSubmit({
  children,
  disableWhileBusy = true,
  disabled,
  ...rest
}: FormSubmitProps) {
  const form = useFormContext();
  const { isSubmitting, isValidating } = useFormState({ control: form?.control });
  const busy = disableWhileBusy && (isSubmitting || isValidating);
  return (
    <Button type="submit" disabled={disabled || busy} {...rest}>
      {children}
    </Button>
  );
}

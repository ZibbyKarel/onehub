'use client';

import { Controller, type FieldValues } from 'react-hook-form';
import { Textarea, type TextareaProps } from '@app/ui';
import type { FormControllerProps } from './types.js';

type FormTextareaProps<T extends FieldValues> = FormControllerProps<T> &
  Omit<TextareaProps, 'name' | 'value' | 'onChange' | 'onBlur' | 'ref' | 'error'>;

export function FormTextarea<T extends FieldValues>({
  name,
  control,
  rules,
  ...rest
}: FormTextareaProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <Textarea
          {...rest}
          {...field}
          value={field.value ?? ''}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}

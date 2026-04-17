'use client';

import { Controller, type FieldValues } from 'react-hook-form';
import { Select, type SelectProps } from '@app/ui';
import type { FormControllerProps } from './types.js';

type FormSelectProps<T extends FieldValues> = FormControllerProps<T> &
  Omit<SelectProps, 'name' | 'value' | 'onChange' | 'onBlur' | 'ref' | 'error'>;

export function FormSelect<T extends FieldValues>({
  name,
  control,
  rules,
  children,
  ...rest
}: FormSelectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <Select
          {...rest}
          {...field}
          value={field.value ?? ''}
          error={fieldState.error?.message}
        >
          {children}
        </Select>
      )}
    />
  );
}

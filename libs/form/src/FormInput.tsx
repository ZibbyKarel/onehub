'use client';

import { Controller, type FieldValues } from 'react-hook-form';
import { Input, type InputProps } from '@app/ui';
import type { FormControllerProps } from './types.js';

type FormInputProps<T extends FieldValues> = FormControllerProps<T> &
  Omit<InputProps, 'name' | 'value' | 'onChange' | 'onBlur' | 'ref' | 'error'>;

/**
 * `<FormInput />` binds a `@app/ui`-styled text input to react-hook-form.
 *
 * Usage:
 *   <FormInput
 *     name="handle"
 *     control={control}
 *     label="Instagram handle"
 *     placeholder="nike"
 *   />
 *
 * The field-level validation error (from the Zod resolver) is surfaced as the
 * input's `error` prop automatically.
 */
export function FormInput<T extends FieldValues>({
  name,
  control,
  rules,
  ...inputProps
}: FormInputProps<T>): JSX.Element {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <Input
          {...inputProps}
          {...field}
          value={field.value ?? ''}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}

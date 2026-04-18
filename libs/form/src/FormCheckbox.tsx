'use client';

import { Controller, type FieldValues } from 'react-hook-form';
import { Checkbox, type CheckboxProps } from '@app/ui';
import type { FormControllerProps } from './types';

type FormCheckboxProps<T extends FieldValues> = FormControllerProps<T> &
  Omit<
    CheckboxProps,
    'name' | 'value' | 'onChange' | 'onBlur' | 'ref' | 'error' | 'checked' | 'defaultChecked'
  >;

export function FormCheckbox<T extends FieldValues>({
  name,
  control,
  rules,
  ...rest
}: FormCheckboxProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <Checkbox
          {...rest}
          name={field.name}
          ref={field.ref}
          checked={Boolean(field.value)}
          onBlur={field.onBlur}
          onChange={(e) => field.onChange(e.target.checked)}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}

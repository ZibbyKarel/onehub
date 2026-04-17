import type {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';

/**
 * Shared set of props every `Form*` component accepts on top of the underlying
 * design-system component. Keep this minimal — fancy features (array fields,
 * dependent fields) live in user code, not here.
 */
export interface FormControllerProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  rules?: Omit<
    RegisterOptions<T, FieldPath<T>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
}

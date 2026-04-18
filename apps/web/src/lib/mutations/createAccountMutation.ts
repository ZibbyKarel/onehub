import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { type AccountFormValues } from '@app/shared-types';
import { accountsQueryKeys } from '../queries/fetchAccountsQuery';

/**
 * Create a new account via the API
 * @param values Form values containing account details
 * @returns Promise that resolves when account is created
 */
export async function createAccount(values: AccountFormValues): Promise<void> {
  const res = await fetch('/api/accounts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(body.error ?? `Failed ${res.status}`);
  }
}

/**
 * Custom hook for creating an account
 * @param options Optional TanStack Query mutation options
 * @returns Mutation object with mutate and mutation state
 */
export function useCreateAccountMutation(
  options?: Omit<UseMutationOptions<void, Error, AccountFormValues>, 'mutationFn'>,
) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: accountsQueryKeys.list() });
    },
    ...options,
  });
}

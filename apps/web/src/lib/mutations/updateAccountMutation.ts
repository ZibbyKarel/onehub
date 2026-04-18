import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { type AccountFormValues } from '@app/shared-types';
import { accountsQueryKeys } from '../queries/fetchAccountsQuery';

/**
 * Update an account via the API
 * @param id Account ID to update
 * @param patch Partial account data to update
 * @returns Promise that resolves when account is updated
 */
export async function updateAccount(
  id: string,
  patch: Partial<AccountFormValues>,
): Promise<void> {
  const res = await fetch(`/api/accounts/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch),
  });
  if (!res.ok) throw new Error(`Failed ${res.status}`);
}

/**
 * Custom hook for updating an account
 * @param options Optional TanStack Query mutation options
 * @returns Mutation object with mutate and mutation state
 */
export function useUpdateAccountMutation(
  options?: Omit<
    UseMutationOptions<void, Error, { id: string; patch: Partial<AccountFormValues> }>,
    'mutationFn'
  >,
) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, patch }) => updateAccount(id, patch),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: accountsQueryKeys.list() });
    },
    ...options,
  });
}

import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { accountsQueryKeys } from '../queries/fetchAccountsQuery';

/**
 * Delete an account via the API
 * @param id Account ID to delete
 * @returns Promise that resolves when account is deleted
 */
export async function deleteAccount(id: string): Promise<void> {
  const res = await fetch(`/api/accounts/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`Failed ${res.status}`);
}

/**
 * Custom hook for deleting an account
 * @param options Optional TanStack Query mutation options
 * @returns Mutation object with mutate and mutation state
 */
export function useDeleteAccountMutation(
  options?: Omit<UseMutationOptions<void, Error, string>, 'mutationFn'>,
) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: accountsQueryKeys.list() });
    },
    ...options,
  });
}

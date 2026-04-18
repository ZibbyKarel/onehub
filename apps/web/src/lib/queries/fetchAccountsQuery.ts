import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export interface AccountSummary {
  id: string;
  handle: string;
  displayName: string | null;
  active: boolean;
  createdAt: string;
  lastScrapedAt: string | null;
}

/**
 * Query key factory for accounts queries
 * Ensures consistent cache management and invalidation
 */
export const accountsQueryKeys = {
  all: ['accounts'] as const,
  lists: () => [...accountsQueryKeys.all, 'list'] as const,
  list: () => accountsQueryKeys.lists(),
} as const;

/**
 * Fetch accounts from the API
 * @returns Promise<AccountSummary[]> Array of account summaries
 */
export async function fetchAccounts(): Promise<AccountSummary[]> {
  const res = await fetch('/api/accounts');
  if (!res.ok) throw new Error(`Failed ${res.status}`);
  const data = (await res.json()) as {
    accounts: Array<Omit<AccountSummary, 'createdAt' | 'lastScrapedAt'> & {
      createdAt: string;
      lastScrapedAt: string | null;
    }>;
  };
  return data.accounts;
}

/**
 * Custom hook for fetching accounts
 * @param options Optional TanStack Query options
 * @returns Query result with accounts data
 */
export function useFetchAccountsQuery(
  options?: Omit<UseQueryOptions<AccountSummary[]>, 'queryKey' | 'queryFn'>,
) {
  return useQuery({
    queryKey: accountsQueryKeys.list(),
    queryFn: fetchAccounts,
    ...options,
  });
}

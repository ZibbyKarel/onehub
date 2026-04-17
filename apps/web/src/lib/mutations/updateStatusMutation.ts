'use client';

import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import type { ContestStatus } from '@app/shared-types';

interface UpdateStatusInput {
  postId: string;
  status: ContestStatus;
}

/**
 * Updates the status of a contest
 */
export async function updateStatus({ postId, status }: UpdateStatusInput): Promise<void> {
  const res = await fetch(`/api/contests/${postId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error(`Failed with ${res.status}`);
}

/**
 * Custom hook for updating contest status
 * Automatically invalidates the contests query on success
 */
export function useUpdateStatusMutation(
  options?: Omit<UseMutationOptions<void, Error, UpdateStatusInput>, 'mutationFn'>,
) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateStatus,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['contests'] });
    },
    ...options,
  });
}

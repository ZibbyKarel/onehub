'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Stack } from '@app/ui';
import type { ContestStatus } from '@app/shared-types';
import { ContestCardView } from './ContestCard.js';
import type { ContestCard } from '../lib/contests.js';

async function updateStatus(postId: string, status: ContestStatus): Promise<void> {
  const res = await fetch(`/api/contests/${postId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error(`Failed with ${res.status}`);
}

export interface ContestListProps {
  contests: ContestCard[];
  /** When true, renders the "mark entered / dismiss" actions. */
  actionable?: boolean;
}

export function ContestList({ contests, actionable }: ContestListProps): JSX.Element {
  const qc = useQueryClient();
  const mutate = useMutation({
    mutationFn: ({ postId, status }: { postId: string; status: ContestStatus }) =>
      updateStatus(postId, status),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['contests'] });
    },
  });

  if (contests.length === 0) {
    return <Stack gap={3}><p>Zat\u00edm tu nic nen\u00ed. Worker mus\u00ed nejd\u0159\u00edv doj\u00edt.</p></Stack>;
  }

  return (
    <Stack gap={4}>
      {contests.map((c) => (
        <ContestCardView
          key={c.postId}
          contest={c}
          onMarkEntered={
            actionable
              ? (postId) => mutate.mutate({ postId, status: 'ENTERED' })
              : undefined
          }
          onDismiss={
            actionable
              ? (postId) => mutate.mutate({ postId, status: 'DISMISSED' })
              : undefined
          }
        />
      ))}
    </Stack>
  );
}

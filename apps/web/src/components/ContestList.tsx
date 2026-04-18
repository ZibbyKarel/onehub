'use client';

import { Stack } from '@app/ui';
import { ContestCardView } from './ContestCard.js';
import type { ContestCard } from '../lib/contests.js';
import { useUpdateStatusMutation } from '../lib/mutations/updateStatusMutation.js';

export interface ContestListProps {
  contests: ContestCard[];
  /** When true, renders the "mark entered / dismiss" actions. */
  actionable?: boolean;
}

export function ContestList({ contests, actionable }: ContestListProps): JSX.Element {
  const mutate = useUpdateStatusMutation();

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

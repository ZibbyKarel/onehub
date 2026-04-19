'use client';

import { Stack } from '@app/ui';
import { useLocalizedText, Translations } from '@app/internationalization';
import { ContestCardView } from './ContestCard';
import type { ContestCard } from '../lib/contests';
import { useUpdateStatusMutation } from '../lib/mutations/updateStatusMutation';

export interface ContestListProps {
  contests: ContestCard[];
  /** When true, renders the "mark entered / dismiss" actions. */
  actionable?: boolean;
}

export function ContestList({ contests, actionable }: ContestListProps) {
  const mutate = useUpdateStatusMutation();
  const t = useLocalizedText();

  if (contests.length === 0) {
    return <Stack gap={3}><p>{t(Translations.ContestListEmpty)}</p></Stack>;
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

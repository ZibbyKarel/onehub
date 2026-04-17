import { Stack } from '@app/ui';
import { fetchContestsByStatus } from '../../lib/contests.js';
import { ContestList } from '../../components/ContestList.js';

export const dynamic = 'force-dynamic';

export default async function HistoryPage() {
  const contests = await fetchContestsByStatus([
    'ENTERED',
    'WON',
    'LOST',
    'EXPIRED',
    'DISMISSED',
  ]);
  return (
    <Stack gap={5}>
      <h1>Historie</h1>
      <ContestList contests={contests} />
    </Stack>
  );
}

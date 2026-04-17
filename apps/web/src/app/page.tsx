import { Stack } from '@app/ui';
import { fetchContestsByStatus } from '../lib/contests.js';
import { ContestList } from '../components/ContestList.js';

export const dynamic = 'force-dynamic';

export default async function CurrentContestsPage(): Promise<JSX.Element> {
  const contests = await fetchContestsByStatus(['NEW']);
  return (
    <Stack gap={5}>
      <h1>Aktu\u00e1ln\u00ed soute\u017ee</h1>
      <ContestList contests={contests} actionable />
    </Stack>
  );
}

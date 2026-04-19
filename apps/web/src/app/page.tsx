import { Stack } from '@app/ui';
import { getServerTranslator, Translations } from '@app/internationalization';
import { fetchContestsByStatus } from '../lib/contests';
import { ContestList } from '../components/ContestList';

export const dynamic = 'force-dynamic';

export default async function CurrentContestsPage() {
  const [t, contests] = await Promise.all([
    getServerTranslator(),
    fetchContestsByStatus(['NEW']),
  ]);
  return (
    <Stack gap={5}>
      <h1>{t(Translations.CurrentContestsPageTitle)}</h1>
      <ContestList contests={contests} actionable />
    </Stack>
  );
}

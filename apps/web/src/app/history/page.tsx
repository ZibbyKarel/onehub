import { Stack } from '@app/ui';
import { getServerTranslator, Translations } from '@app/internationalization';
import { fetchContestsByStatus } from '../../lib/contests';
import { ContestList } from '../../components/ContestList';

export const dynamic = 'force-dynamic';

export default async function HistoryPage() {
  const [t, contests] = await Promise.all([
    getServerTranslator(),
    fetchContestsByStatus(['ENTERED', 'WON', 'LOST', 'EXPIRED', 'DISMISSED']),
  ]);
  return (
    <Stack gap={5}>
      <h1>{t(Translations.HistoryPageTitle)}</h1>
      <ContestList contests={contests} />
    </Stack>
  );
}

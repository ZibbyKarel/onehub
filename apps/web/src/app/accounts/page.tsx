import { prisma } from '@app/db';
import { Stack } from '@app/ui';
import { getServerTranslator, Translations } from '@app/internationalization';
import { AccountsManager } from '../../components/AccountsManager';

export const dynamic = 'force-dynamic';

export default async function AccountsPage() {
  const [t, accounts] = await Promise.all([
    getServerTranslator(),
    prisma.account.findMany({ orderBy: { createdAt: 'desc' } }),
  ]);
  return (
    <Stack gap={5}>
      <h1>{t(Translations.AccountsPageTitle)}</h1>
      <AccountsManager
        initialAccounts={accounts.map((a) => ({
          id: a.id,
          handle: a.handle,
          displayName: a.displayName,
          active: a.active,
          createdAt: a.createdAt.toISOString(),
          lastScrapedAt: a.lastScrapedAt?.toISOString() ?? null,
        }))}
      />
    </Stack>
  );
}

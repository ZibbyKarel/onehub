import { prisma } from '@app/db';
import { Stack } from '@app/ui';
import { AccountsManager } from '../../components/AccountsManager';

export const dynamic = 'force-dynamic';

export default async function AccountsPage() {
  const accounts = await prisma.account.findMany({ orderBy: { createdAt: 'desc' } });
  return (
    <Stack gap={5}>
      <h1>Sledovan\u00e9 \u00fa\u010dty</h1>
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

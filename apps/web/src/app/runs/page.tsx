import { prisma } from '@app/db';
import { Card, CardBody, CardHeader, CardTitle, Row, Stack } from '@app/ui';
import { getServerTranslator, Translations } from '@app/internationalization';
import { formatDateTime, formatRelative } from '../../lib/format';

export const dynamic = 'force-dynamic';

export default async function RunsPage() {
  const t = await getServerTranslator();
  const runs = await prisma.classificationRun.findMany({
    orderBy: { startedAt: 'desc' },
    take: 50,
  });

  return (
    <Stack gap={5}>
      <h1>{t(Translations.RunsPageTitle)}</h1>
      {runs.length === 0 ? (
        <p>{t(Translations.RunsEmpty)}</p>
      ) : (
        <Stack gap={3}>
          {runs.map((r) => {
            const duration =
              r.finishedAt && r.startedAt
                ? Math.round((r.finishedAt.getTime() - r.startedAt.getTime()) / 1000)
                : null;
            const errorCount = Array.isArray(r.errors) ? r.errors.length : 0;
            const statusValue = r.finishedAt
              ? duration != null
                ? t(Translations.RunsStatusDoneWithDuration, { duration })
                : t(Translations.RunsStatusDone)
              : t(Translations.RunsStatusRunning);
            return (
              <Card key={r.id}>
                <CardHeader>
                  <CardTitle>
                    {formatDateTime(r.startedAt)} — {formatRelative(r.startedAt)}
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <Row gap={4} wrap>
                    <small>{t(Translations.RunsPostsScanned, { count: r.postsScanned })}</small>
                    <small>{t(Translations.RunsContestsFound, { count: r.contestsFound })}</small>
                    <small>{t(Translations.RunsStatusLabel, { value: statusValue })}</small>
                    <small>{t(Translations.RunsErrorsCount, { count: errorCount })}</small>
                  </Row>
                  {errorCount > 0 && (
                    <pre style={{ marginTop: 12, fontSize: 12, whiteSpace: 'pre-wrap' }}>
                      {JSON.stringify(r.errors, null, 2)}
                    </pre>
                  )}
                </CardBody>
              </Card>
            );
          })}
        </Stack>
      )}
    </Stack>
  );
}

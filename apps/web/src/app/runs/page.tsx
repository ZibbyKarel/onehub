import { prisma } from '@app/db';
import { Card, CardBody, CardHeader, CardTitle, Row, Stack } from '@app/ui';
import { formatDateTime, formatRelative } from '../../lib/format.js';

export const dynamic = 'force-dynamic';

export default async function RunsPage() {
  const runs = await prisma.classificationRun.findMany({
    orderBy: { startedAt: 'desc' },
    take: 50,
  });

  return (
    <Stack gap={5}>
      <h1>B\u011bhy workeru</h1>
      {runs.length === 0 ? (
        <p>Je\u0161t\u011b nebyl spu\u0161t\u011bn \u017e\u00e1dn\u00fd b\u011bh.</p>
      ) : (
        <Stack gap={3}>
          {runs.map((r) => {
            const duration =
              r.finishedAt && r.startedAt
                ? Math.round((r.finishedAt.getTime() - r.startedAt.getTime()) / 1000)
                : null;
            const errorCount = Array.isArray(r.errors) ? r.errors.length : 0;
            return (
              <Card key={r.id}>
                <CardHeader>
                  <CardTitle>
                    {formatDateTime(r.startedAt)} — {formatRelative(r.startedAt)}
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <Row gap={4} wrap>
                    <small>Postů naskenováno: {r.postsScanned}</small>
                    <small>Soutěží nalezeno: {r.contestsFound}</small>
                    <small>
                      Stav: {r.finishedAt ? `hotovo${duration != null ? ` (${duration}s)` : ''}` : 'b\u011b\u017e\u00ed'}
                    </small>
                    <small>Chyby: {errorCount}</small>
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

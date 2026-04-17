const CS = 'cs-CZ';

export function formatDateTime(value: Date | string | null | undefined): string {
  if (!value) return '—';
  const date = typeof value === 'string' ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat(CS, {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function formatRelative(value: Date | string | null | undefined): string {
  if (!value) return '—';
  const date = typeof value === 'string' ? new Date(value) : value;
  const diffMs = date.getTime() - Date.now();
  const rtf = new Intl.RelativeTimeFormat(CS, { numeric: 'auto' });
  const units: Array<{ unit: Intl.RelativeTimeFormatUnit; ms: number }> = [
    { unit: 'year', ms: 365 * 24 * 3600 * 1000 },
    { unit: 'month', ms: 30 * 24 * 3600 * 1000 },
    { unit: 'day', ms: 24 * 3600 * 1000 },
    { unit: 'hour', ms: 3600 * 1000 },
    { unit: 'minute', ms: 60 * 1000 },
  ];
  for (const { unit, ms } of units) {
    if (Math.abs(diffMs) >= ms) {
      return rtf.format(Math.round(diffMs / ms), unit);
    }
  }
  return rtf.format(Math.round(diffMs / 1000), 'second');
}

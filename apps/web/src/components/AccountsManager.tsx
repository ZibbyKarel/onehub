'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Row,
  Stack,
} from '@app/ui';
import {
  FormCheckbox,
  FormInput,
  FormSubmit,
} from '@app/form';
import {
  accountFormSchema,
  type AccountFormValues,
} from '@app/shared-types';
import { formatDateTime, formatRelative } from '../lib/format.js';

export interface AccountSummary {
  id: string;
  handle: string;
  displayName: string | null;
  active: boolean;
  createdAt: string;
  lastScrapedAt: string | null;
}

async function fetchAccounts(): Promise<AccountSummary[]> {
  const res = await fetch('/api/accounts');
  if (!res.ok) throw new Error(`Failed ${res.status}`);
  const data = (await res.json()) as {
    accounts: Array<Omit<AccountSummary, 'createdAt' | 'lastScrapedAt'> & {
      createdAt: string;
      lastScrapedAt: string | null;
    }>;
  };
  return data.accounts;
}

async function createAccount(values: AccountFormValues): Promise<void> {
  const res = await fetch('/api/accounts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(body.error ?? `Failed ${res.status}`);
  }
}

async function updateAccount(id: string, patch: Partial<AccountFormValues>): Promise<void> {
  const res = await fetch(`/api/accounts/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch),
  });
  if (!res.ok) throw new Error(`Failed ${res.status}`);
}

async function deleteAccount(id: string): Promise<void> {
  const res = await fetch(`/api/accounts/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`Failed ${res.status}`);
}

export function AccountsManager({
  initialAccounts,
}: {
  initialAccounts: AccountSummary[];
}) {
  const qc = useQueryClient();
  const { data: accounts = initialAccounts } = useQuery({
    queryKey: ['accounts'],
    queryFn: fetchAccounts,
    initialData: initialAccounts,
  });

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: { handle: '', displayName: '', active: true },
  });

  const createMut = useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      form.reset({ handle: '', displayName: '', active: true });
      void qc.invalidateQueries({ queryKey: ['accounts'] });
    },
    onError: (err) => {
      form.setError('handle', {
        type: 'manual',
        message: err instanceof Error ? err.message : 'Chyba',
      });
    },
  });

  const toggleMut = useMutation({
    mutationFn: ({ id, active }: { id: string; active: boolean }) =>
      updateAccount(id, { active }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['accounts'] }),
  });

  const deleteMut = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['accounts'] }),
  });

  const onSubmit = form.handleSubmit((values) => createMut.mutate(values));

  return (
    <Stack gap={5}>
      <Card>
        <CardHeader>
          <CardTitle>P\u0159idat \u00fa\u010det</CardTitle>
        </CardHeader>
        <CardBody>
          <FormProvider {...form}>
            <form onSubmit={onSubmit}>
              <Stack gap={3}>
                <FormInput
                  name="handle"
                  control={form.control}
                  label="Instagram handle"
                  placeholder="nike"
                  autoComplete="off"
                />
                <FormInput
                  name="displayName"
                  control={form.control}
                  label="N\u00e1zev (nepovinn\u00fd)"
                  placeholder="Nike"
                />
                <FormCheckbox name="active" control={form.control} label="Aktivn\u00ed (scrapovat)" />
                <Row>
                  <FormSubmit>P\u0159idat</FormSubmit>
                </Row>
              </Stack>
            </form>
          </FormProvider>
        </CardBody>
      </Card>

      <Stack gap={3}>
        {accounts.map((a) => (
          <Card key={a.id}>
            <CardHeader>
              <Stack gap={1}>
                <CardTitle>@{a.handle}</CardTitle>
                {a.displayName && <small>{a.displayName}</small>}
              </Stack>
              <Badge variant={a.active ? 'success' : 'neutral'}>
                {a.active ? 'aktivn\u00ed' : 'pozastaven'}
              </Badge>
            </CardHeader>
            <CardBody>
              <Row gap={4} wrap>
                <small>P\u0159id\u00e1n: {formatDateTime(a.createdAt)}</small>
                <small>
                  Posledn\u00ed sken:{' '}
                  {a.lastScrapedAt ? formatRelative(a.lastScrapedAt) : 'nikdy'}
                </small>
              </Row>
            </CardBody>
            <CardFooter>
              <Button
                variant="secondary"
                onClick={() => toggleMut.mutate({ id: a.id, active: !a.active })}
              >
                {a.active ? 'Pozastavit' : 'Obnovit'}
              </Button>
              <Button variant="danger" onClick={() => deleteMut.mutate(a.id)}>
                Smazat
              </Button>
            </CardFooter>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
}

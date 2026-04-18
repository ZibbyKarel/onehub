'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
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
import { formatDateTime, formatRelative } from '../lib/format';
import {
  useFetchAccountsQuery,
  type AccountSummary,
} from '../lib/queries/fetchAccountsQuery';
import { useCreateAccountMutation } from '../lib/mutations/createAccountMutation';
import { useUpdateAccountMutation } from '../lib/mutations/updateAccountMutation';
import { useDeleteAccountMutation } from '../lib/mutations/deleteAccountMutation';

export type { AccountSummary } from '../lib/queries/fetchAccountsQuery';

export function AccountsManager({
  initialAccounts,
}: {
  initialAccounts: AccountSummary[];
}) {
  const qc = useQueryClient();
  const { data: accounts = initialAccounts } = useFetchAccountsQuery({
    initialData: initialAccounts,
  });

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: { handle: '', displayName: '', active: true },
  });

  const createMut = useCreateAccountMutation({
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

  const toggleMut = useUpdateAccountMutation();

  const deleteMut = useDeleteAccountMutation();

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
                onClick={() => toggleMut.mutate({ id: a.id, patch: { active: !a.active } })}
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

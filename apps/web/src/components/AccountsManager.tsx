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
import { useLocalizedText, Translations, type TranslationFunction } from '@app/internationalization';
import { formatDateTime, formatRelative } from '../lib/format';
import {
  useFetchAccountsQuery,
  type AccountSummary,
} from '../lib/queries/fetchAccountsQuery';
import { useCreateAccountMutation } from '../lib/mutations/createAccountMutation';
import { useUpdateAccountMutation } from '../lib/mutations/updateAccountMutation';
import { useDeleteAccountMutation } from '../lib/mutations/deleteAccountMutation';

export type { AccountSummary } from '../lib/queries/fetchAccountsQuery';

const getErrorMessage = (err: unknown, t: TranslationFunction): string => {
  const msg = err instanceof Error ? err.message : '';
  if (msg === 'handle_already_exists') return t(Translations.AccountsErrorHandleExists);
  if (msg === 'validation_failed') return t(Translations.AccountsErrorValidation);
  return t(Translations.AccountsErrorUnknown);
};

export function AccountsManager({
  initialAccounts,
}: {
  initialAccounts: AccountSummary[];
}) {
  const qc = useQueryClient();
  const t = useLocalizedText();
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
        message: getErrorMessage(err, t),
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
          <CardTitle>{t(Translations.AccountsAddCardTitle)}</CardTitle>
        </CardHeader>
        <CardBody>
          <FormProvider {...form}>
            <form onSubmit={onSubmit}>
              <Stack gap={3}>
                <FormInput
                  name="handle"
                  control={form.control}
                  label={t(Translations.AccountsFieldHandleLabel)}
                  placeholder={t(Translations.AccountsFieldHandlePlaceholder)}
                  autoComplete="off"
                />
                <FormInput
                  name="displayName"
                  control={form.control}
                  label={t(Translations.AccountsFieldNameLabel)}
                  placeholder={t(Translations.AccountsFieldNamePlaceholder)}
                />
                <FormCheckbox
                  name="active"
                  control={form.control}
                  label={t(Translations.AccountsFieldActiveLabel)}
                />
                <Row>
                  <FormSubmit>{t(Translations.AccountsSubmitAdd)}</FormSubmit>
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
                {a.active ? t(Translations.AccountsBadgeActive) : t(Translations.AccountsBadgePaused)}
              </Badge>
            </CardHeader>
            <CardBody>
              <Row gap={4} wrap>
                <small>{t(Translations.AccountsAddedAt, { date: formatDateTime(a.createdAt) })}</small>
                <small>
                  {t(Translations.AccountsLastScan, {
                    when: a.lastScrapedAt
                      ? formatRelative(a.lastScrapedAt)
                      : t(Translations.AccountsLastScanNever),
                  })}
                </small>
              </Row>
            </CardBody>
            <CardFooter>
              <Button
                variant="secondary"
                onClick={() => toggleMut.mutate({ id: a.id, patch: { active: !a.active } })}
              >
                {a.active ? t(Translations.AccountsButtonPause) : t(Translations.AccountsButtonResume)}
              </Button>
              <Button variant="danger" onClick={() => deleteMut.mutate(a.id)}>
                {t(Translations.AccountsButtonDelete)}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
}

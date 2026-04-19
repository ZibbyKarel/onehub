'use client';

import { useState } from 'react';
import styled from 'styled-components';
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
  StatusBadge,
  type BadgeStatusKey,
} from '@app/ui';
import type { ContestTask } from '@app/shared-types';
import { useLocalizedText, Translations } from '@app/internationalization';
import { formatDateTime, formatRelative } from '../lib/format';
import type { ContestCard as ContestCardData } from '../lib/contests';

const TASK_KEYS: Record<ContestTask, Translations> = {
  like_post: Translations.ContestTaskLike,
  follow_account: Translations.ContestTaskFollow,
  comment: Translations.ContestTaskComment,
  tag_friend: Translations.ContestTaskTagFriend,
  share_story: Translations.ContestTaskShareStory,
  save_post: Translations.ContestTaskSavePost,
  visit_link: Translations.ContestTaskVisitLink,
  other: Translations.ContestTaskOther,
};

const STATUS_KEYS: Record<string, Translations> = {
  NEW: Translations.ContestStatusNew,
  ENTERED: Translations.ContestStatusEntered,
  WON: Translations.ContestStatusWon,
  LOST: Translations.ContestStatusLost,
  EXPIRED: Translations.ContestStatusExpired,
  DISMISSED: Translations.ContestStatusDismissed,
};

const Thumb = styled.a`
  display: block;
  width: 96px;
  height: 96px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surfaceRaised};
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
`;

const Handle = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

const CommentBlock = styled.pre`
  background: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ theme }) => theme.space(3)};
  white-space: pre-wrap;
  word-break: break-word;
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export interface ContestCardProps {
  contest: ContestCardData;
  onMarkEntered?: (postId: string) => void;
  onDismiss?: (postId: string) => void;
}

export function ContestCardView({ contest, onMarkEntered, onDismiss }: ContestCardProps) {
  const [copied, setCopied] = useState(false);
  const t = useLocalizedText();

  const copyComment = async () => {
    if (!contest.suggestedComment) return;
    await navigator.clipboard.writeText(contest.suggestedComment);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <Card>
      <CardHeader>
        <Row gap={3}>
          <Thumb
            href={contest.post.permalink}
            target="_blank"
            rel="noreferrer"
            aria-label={t(Translations.ContestOpenOnInstagramAria)}
            style={{
              backgroundImage: contest.post.mediaUrl
                ? `url(${contest.post.mediaUrl})`
                : undefined,
            }}
          />
          <Stack gap={1}>
            <CardTitle>@{contest.post.accountHandle}</CardTitle>
            <Handle>
              {t(Translations.ContestPostedAt, {
                postedAt: formatDateTime(contest.post.postedAt),
                detectedAt: formatRelative(contest.detectedAt),
              })}
            </Handle>
          </Stack>
        </Row>
        <StatusBadge status={contest.status as BadgeStatusKey}>
          {t(STATUS_KEYS[contest.status] ?? Translations.ContestStatusNew)}
        </StatusBadge>
      </CardHeader>

      <CardBody>
        <Stack gap={3}>
          <div>{contest.summary}</div>

          <Row gap={2} wrap>
            {contest.tasks.map((task) => (
              <Badge key={task} variant="accent">
                {t(TASK_KEYS[task])}
              </Badge>
            ))}
            {contest.deadline && (
              <Badge variant="warning">
                {t(Translations.ContestDeadline, { date: formatDateTime(contest.deadline) })}
              </Badge>
            )}
          </Row>

          {contest.suggestedComment && (
            <Stack gap={2}>
              <Handle>{t(Translations.ContestSuggestedCommentTitle)}</Handle>
              <CommentBlock>{contest.suggestedComment}</CommentBlock>
            </Stack>
          )}
        </Stack>
      </CardBody>

      <CardFooter>
        {contest.suggestedComment && (
          <Button variant="primary" onClick={copyComment}>
            {copied ? t(Translations.ContestCopyCommentDone) : t(Translations.ContestCopyComment)}
          </Button>
        )}
        <Button
          as="a"
          variant="secondary"
          href={contest.post.permalink}
          target="_blank"
          rel="noreferrer"
        >
          {t(Translations.ContestOpenOnInstagram)}
        </Button>
        {onMarkEntered && contest.status === 'NEW' && (
          <Button variant="ghost" onClick={() => onMarkEntered(contest.postId)}>
            {t(Translations.ContestMarkEntered)}
          </Button>
        )}
        {onDismiss && contest.status === 'NEW' && (
          <Button variant="ghost" onClick={() => onDismiss(contest.postId)}>
            {t(Translations.ContestDismiss)}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

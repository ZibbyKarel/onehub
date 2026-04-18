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
import { formatDateTime, formatRelative } from '../lib/format';
import type { ContestCard as ContestCardData } from '../lib/contests';

const TASK_LABELS: Record<ContestTask, string> = {
  like_post: 'Like',
  follow_account: 'Follow',
  comment: 'Koment\u00e1\u0159',
  tag_friend: 'Ozna\u010dit kamar\u00e1da',
  share_story: 'Sd\u00edlet do story',
  save_post: 'Ulo\u017eit post',
  visit_link: 'Nav\u0161t\u00edvit odkaz',
  other: 'Jin\u00e9',
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
            aria-label="Otev\u0159\u00edt post na Instagramu"
            style={{
              backgroundImage: contest.post.mediaUrl
                ? `url(${contest.post.mediaUrl})`
                : undefined,
            }}
          />
          <Stack gap={1}>
            <CardTitle>@{contest.post.accountHandle}</CardTitle>
            <Handle>
              Post z {formatDateTime(contest.post.postedAt)} — zachyceno {formatRelative(contest.detectedAt)}
            </Handle>
          </Stack>
        </Row>
        <StatusBadge status={contest.status as BadgeStatusKey}>{contest.status}</StatusBadge>
      </CardHeader>

      <CardBody>
        <Stack gap={3}>
          <div>{contest.summary}</div>

          <Row gap={2} wrap>
            {contest.tasks.map((t) => (
              <Badge key={t} variant="accent">
                {TASK_LABELS[t]}
              </Badge>
            ))}
            {contest.deadline && (
              <Badge variant="warning">Deadline: {formatDateTime(contest.deadline)}</Badge>
            )}
          </Row>

          {contest.suggestedComment && (
            <Stack gap={2}>
              <Handle>Navr\u017een\u00fd koment\u00e1\u0159:</Handle>
              <CommentBlock>{contest.suggestedComment}</CommentBlock>
            </Stack>
          )}
        </Stack>
      </CardBody>

      <CardFooter>
        {contest.suggestedComment && (
          <Button variant="primary" onClick={copyComment}>
            {copied ? 'Zkop\u00edrov\u00e1no!' : 'Zkop\u00edrovat koment\u00e1\u0159'}
          </Button>
        )}
        <Button
          as="a"
          variant="secondary"
          href={contest.post.permalink}
          target="_blank"
          rel="noreferrer"
        >
          Otev\u0159\u00edt na IG
        </Button>
        {onMarkEntered && contest.status === 'NEW' && (
          <Button variant="ghost" onClick={() => onMarkEntered(contest.postId)}>
            Zapsat jako zadan\u00e9
          </Button>
        )}
        {onDismiss && contest.status === 'NEW' && (
          <Button variant="ghost" onClick={() => onDismiss(contest.postId)}>
            Zahodit
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

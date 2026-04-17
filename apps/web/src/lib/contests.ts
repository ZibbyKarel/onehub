import { prisma, type Contest, type Post, type Account } from '@app/db';
import type { ContestStatus, ContestTask } from '@app/shared-types';

/** Shape rendered in the dashboard cards. Flat for easy client-side mapping. */
export interface ContestCard {
  postId: string;
  status: ContestStatus;
  summary: string;
  suggestedComment: string | null;
  tasks: ContestTask[];
  detectedAt: string;
  deadline: string | null;
  post: {
    permalink: string;
    caption: string;
    mediaUrl: string | null;
    postedAt: string;
    accountHandle: string;
    accountDisplayName: string | null;
  };
}

function toCard(row: Contest & { post: Post & { account: Account } }): ContestCard {
  return {
    postId: row.postId,
    status: row.status,
    summary: row.summary,
    suggestedComment: row.suggestedComment,
    tasks: (Array.isArray(row.tasks) ? row.tasks : []) as ContestTask[],
    detectedAt: row.detectedAt.toISOString(),
    deadline: row.deadline?.toISOString() ?? null,
    post: {
      permalink: row.post.permalink,
      caption: row.post.caption,
      mediaUrl: row.post.mediaUrl,
      postedAt: row.post.postedAt.toISOString(),
      accountHandle: row.post.account.handle,
      accountDisplayName: row.post.account.displayName,
    },
  };
}

export async function fetchContestsByStatus(
  statuses: ContestStatus[],
): Promise<ContestCard[]> {
  const rows = await prisma.contest.findMany({
    where: { status: { in: statuses } },
    include: { post: { include: { account: true } } },
    orderBy: { detectedAt: 'desc' },
    take: 200,
  });
  return rows.map(toCard);
}

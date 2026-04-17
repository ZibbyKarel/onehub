import { z } from 'zod';

/**
 * Canonical list of contest task codes. Keep in sync with the Claude classifier
 * prompt (`libs/ai/src/prompts/classify.ts`) — the model emits these codes.
 */
export const CONTEST_TASK_CODES = [
  'like_post',
  'follow_account',
  'comment',
  'tag_friend',
  'share_story',
  'save_post',
  'visit_link',
  'other',
] as const;

export const contestTaskSchema = z.enum(CONTEST_TASK_CODES);
export type ContestTask = z.infer<typeof contestTaskSchema>;

export const contestStatusSchema = z.enum([
  'NEW',
  'ENTERED',
  'WON',
  'LOST',
  'EXPIRED',
  'DISMISSED',
]);
export type ContestStatus = z.infer<typeof contestStatusSchema>;

export const contestSchema = z.object({
  postId: z.string(),
  summary: z.string().min(1),
  suggestedComment: z.string().nullable(),
  tasks: z.array(contestTaskSchema),
  status: contestStatusSchema,
  detectedAt: z.coerce.date(),
  deadline: z.coerce.date().nullable(),
});
export type Contest = z.infer<typeof contestSchema>;

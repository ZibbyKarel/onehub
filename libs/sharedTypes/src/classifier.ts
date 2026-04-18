import { z } from 'zod';
import { contestTaskSchema } from './contest';

/**
 * Input to the classifier for a single post.
 * The worker batches up to ~10 of these into one Claude call.
 */
export const classifierInputPostSchema = z.object({
  postId: z.string(),
  accountHandle: z.string(),
  postedAt: z.coerce.date(),
  caption: z.string(),
  permalink: z.string().url(),
});
export type ClassifierInputPost = z.infer<typeof classifierInputPostSchema>;

/**
 * What Claude returns per post. Strict — we enforce this with Zod in
 * `libs/ai/src/classifier.ts`.
 */
export const classifierResultSchema = z.object({
  postId: z.string(),
  /** False = not a giveaway. Remaining fields should be null in that case. */
  isContest: z.boolean(),
  /** One-sentence Czech summary of what entering the giveaway requires. */
  summary: z.string().nullable(),
  /** A ready-to-paste Czech comment, if `comment` is in `tasks`. */
  suggestedComment: z.string().nullable(),
  /** Normalised list of tasks the entrant must complete. */
  tasks: z.array(contestTaskSchema),
  /** ISO-8601 date if the caption mentions an explicit deadline. */
  deadline: z.string().datetime().nullable(),
  /** Model-reported confidence 0..1; classifier drops `< 0.6`. */
  confidence: z.number().min(0).max(1),
});
export type ClassifierResult = z.infer<typeof classifierResultSchema>;

export const classifierBatchResponseSchema = z.object({
  results: z.array(classifierResultSchema),
});
export type ClassifierBatchResponse = z.infer<typeof classifierBatchResponseSchema>;

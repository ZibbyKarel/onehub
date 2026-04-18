import { z } from 'zod';
import { contestStatusSchema } from './contest';

/** Handle validation matching Instagram's rules (1-30 chars, alnum/_/.). */
const igHandleSchema = z
  .string()
  .trim()
  .min(1, 'Handle je povinn\u00fd')
  .max(30, 'Handle je p\u0159\u00edli\u0161 dlouh\u00fd')
  .regex(/^[a-zA-Z0-9._]+$/, 'Pouze p\u00edsmena, \u010d\u00edslice, te\u010dka a podtr\u017e\u00edtko');

export const accountFormSchema = z.object({
  handle: igHandleSchema,
  displayName: z.string().trim().max(80).optional().or(z.literal('')),
  active: z.boolean().default(true),
});
export type AccountFormValues = z.infer<typeof accountFormSchema>;

export const contestStatusUpdateSchema = z.object({
  status: contestStatusSchema,
});
export type ContestStatusUpdate = z.infer<typeof contestStatusUpdateSchema>;

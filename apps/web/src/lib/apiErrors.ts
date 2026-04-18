import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

/**
 * Tiny helper: turn a Zod validation failure into a 422 response with the
 * flattened field errors so the client can render them next to form fields.
 */
export function zodErrorResponse(err: ZodError): NextResponse {
  return NextResponse.json(
    { error: 'validation_failed', issues: err.flatten().fieldErrors },
    { status: 422 },
  );
}

export function handleRouteError(err: unknown): NextResponse {
  if (err instanceof ZodError) return zodErrorResponse(err);
  const message = err instanceof Error ? err.message : 'unknown_error';
  console.error('API error', err);
  return NextResponse.json({ error: message }, { status: 500 });
}

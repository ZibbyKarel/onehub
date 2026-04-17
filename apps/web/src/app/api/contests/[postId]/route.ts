import { NextResponse } from 'next/server';
import { prisma } from '@app/db';
import { contestStatusUpdateSchema } from '@app/shared-types';
import { handleRouteError } from '../../../../lib/api-errors.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Params = { params: Promise<{ postId: string }> };

export async function PATCH(req: Request, { params }: Params): Promise<NextResponse> {
  try {
    const { postId } = await params;
    const body = (await req.json()) as unknown;
    const { status } = contestStatusUpdateSchema.parse(body);

    const contest = await prisma.contest.update({
      where: { postId },
      data: { status },
    });
    return NextResponse.json({ contest });
  } catch (err) {
    return handleRouteError(err);
  }
}

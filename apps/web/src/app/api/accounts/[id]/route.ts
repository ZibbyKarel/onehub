import { NextResponse } from 'next/server';
import { prisma } from '@app/db';
import { accountFormSchema } from '@app/shared-types';
import { handleRouteError } from '../../../../lib/apiErrors';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, { params }: Params): Promise<NextResponse> {
  try {
    const { id } = await params;
    const body = (await req.json()) as unknown;
    const data = accountFormSchema.partial().parse(body);

    const account = await prisma.account.update({
      where: { id },
      data: {
        ...(data.handle !== undefined && { handle: data.handle }),
        ...(data.displayName !== undefined && { displayName: data.displayName || null }),
        ...(data.active !== undefined && { active: data.active }),
      },
    });
    return NextResponse.json({ account });
  } catch (err) {
    return handleRouteError(err);
  }
}

export async function DELETE(_req: Request, { params }: Params): Promise<NextResponse> {
  try {
    const { id } = await params;
    await prisma.account.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return handleRouteError(err);
  }
}

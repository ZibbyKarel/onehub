import { NextResponse } from 'next/server';
import { prisma, Prisma } from '@app/db';
import { accountFormSchema } from '@app/shared-types';
import { handleRouteError } from '../../../lib/apiErrors';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(): Promise<NextResponse> {
  try {
    const accounts = await prisma.account.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ accounts });
  } catch (err) {
    return handleRouteError(err);
  }
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = (await req.json()) as unknown;
    const data = accountFormSchema.parse(body);
    const account = await prisma.account.create({
      data: {
        handle: data.handle,
        displayName: data.displayName || null,
        active: data.active,
      },
    });
    return NextResponse.json({ account }, { status: 201 });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      return NextResponse.json({ error: 'handle_already_exists' }, { status: 409 });
    }
    return handleRouteError(err);
  }
}

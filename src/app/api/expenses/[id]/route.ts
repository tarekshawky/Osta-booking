import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const updated = await prisma.expense.update({
    where: { id: params.id },
    data: {
      title: body.title,
      category: body.category,
      amount: body.amount !== undefined ? parseFloat(body.amount) : undefined,
      notes: body.notes ?? undefined,
    },
  });
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await prisma.expense.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}

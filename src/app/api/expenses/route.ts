import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const expenses = await prisma.expense.findMany({
    orderBy: { spentAt: "desc" },
    include: { createdBy: true },
  });
  return NextResponse.json(expenses);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const expense = await prisma.expense.create({
    data: {
      title: body.title,
      category: body.category || "General",
      amount: parseFloat(body.amount) || 0,
      notes: body.notes || null,
      spentAt: body.spentAt ? new Date(body.spentAt) : new Date(),
      createdById: (session.user as any).id,
    },
  });
  return NextResponse.json(expense, { status: 201 });
}

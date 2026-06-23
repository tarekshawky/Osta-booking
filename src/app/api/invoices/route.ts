import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const invoices = await prisma.invoice.findMany({
    orderBy: { createdAt: "desc" },
    include: { customer: true },
  });
  return NextResponse.json(invoices);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN")
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const count = await prisma.invoice.count();
  const invoiceNumber = `INV-2024-${1058 + count}`;

  const invoice = await prisma.invoice.create({
    data: {
      invoiceNumber,
      amount: parseFloat(body.amount) || 0,
      status: body.status || "PENDING",
      notes: body.notes || null,
      customerId: body.customerId || null,
      dueAt: body.dueAt ? new Date(body.dueAt) : null,
    },
  });
  return NextResponse.json(invoice, { status: 201 });
}

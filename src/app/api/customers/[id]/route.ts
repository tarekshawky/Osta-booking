import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") return null;
  return session;
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const body = await req.json();
  const updated = await prisma.customer.update({
    where: { id: params.id },
    data: {
      name: body.name,
      email: body.email || null,
      phone: body.phone || null,
      address: body.address || null,
    },
  });
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  // Detach related records to satisfy FK constraints, then delete
  await prisma.invoice.updateMany({ where: { customerId: params.id }, data: { customerId: null } });
  await prisma.job.updateMany({ where: { customerId: params.id }, data: { customerId: null } });
  await prisma.appointment.deleteMany({ where: { customerId: params.id } });
  await prisma.customer.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}

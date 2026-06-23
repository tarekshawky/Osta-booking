import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function getAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") return null;
  return session;
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const body = await req.json();

  const data: any = {
    name: body.name,
    role: body.role === "ADMIN" ? "ADMIN" : body.role === "CUSTOMER" ? "CUSTOMER" : "TECHNICIAN",
    title: body.title || null,
    phone: body.phone || null,
    active: body.active ?? undefined,
  };
  if (body.password) data.password = await bcrypt.hash(body.password, 10);

  const updated = await prisma.user.update({
    where: { id: params.id },
    data,
    select: { id: true, name: true, email: true, role: true, title: true, phone: true, active: true, createdAt: true },
  });
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if ((session.user as any).id === params.id)
    return NextResponse.json({ error: "You cannot delete your own account" }, { status: 400 });

  // Unassign jobs/expenses before delete
  await prisma.job.updateMany({ where: { technicianId: params.id }, data: { technicianId: null } });
  await prisma.expense.updateMany({ where: { createdById: params.id }, data: { createdById: null } });
  await prisma.user.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}

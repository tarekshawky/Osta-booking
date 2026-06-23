import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = session.user as any;
  const isStaff = user.role === "ADMIN" || user.role === "TECHNICIAN";

  const appt = await prisma.appointment.findUnique({ where: { id: params.id }, include: { customer: true } });
  if (!appt) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (!isStaff && appt.customer.userId !== user.id)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const updated = await prisma.appointment.update({
    where: { id: params.id },
    data: {
      service: body.service ?? appt.service,
      status: body.status ?? appt.status,
      scheduledAt: body.scheduledAt ? new Date(body.scheduledAt) : appt.scheduledAt,
      address: body.address ?? appt.address,
      phone: body.phone ?? appt.phone,
      notes: body.notes ?? appt.notes,
    },
  });
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = session.user as any;
  const isStaff = user.role === "ADMIN" || user.role === "TECHNICIAN";

  const appt = await prisma.appointment.findUnique({ where: { id: params.id }, include: { customer: true } });
  if (!appt) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (!isStaff && appt.customer.userId !== user.id)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await prisma.appointment.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}

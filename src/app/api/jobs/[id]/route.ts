import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = session.user as any;
  const job = await prisma.job.findUnique({ where: { id: params.id } });
  if (!job) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json();

  // Technicians may only update status of their own jobs
  if (user.role === "TECHNICIAN") {
    if (job.technicianId !== user.id)
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const updated = await prisma.job.update({
      where: { id: params.id },
      data: { status: body.status ?? job.status },
    });
    return NextResponse.json(updated);
  }
  if (user.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const updated = await prisma.job.update({
    where: { id: params.id },
    data: {
      service: body.service,
      status: body.status,
      amount: body.amount !== undefined ? parseFloat(body.amount) : undefined,
      customerId: body.customerId || null,
      technicianId: body.technicianId || null,
      scheduledAt: body.scheduledAt ? new Date(body.scheduledAt) : undefined,
      notes: body.notes ?? undefined,
    },
  });
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN")
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  await prisma.job.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}

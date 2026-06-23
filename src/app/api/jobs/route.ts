import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: "desc" },
    include: { customer: true, technician: true },
  });
  return NextResponse.json(jobs);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN")
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const count = await prisma.job.count();
  const jobNumber = `JOB-2024-${String(20 + count).padStart(3, "0")}`;

  const job = await prisma.job.create({
    data: {
      jobNumber,
      service: body.service,
      status: body.status || "SCHEDULED",
      amount: parseFloat(body.amount) || 0,
      customerId: body.customerId || null,
      technicianId: body.technicianId || null,
      scheduledAt: body.scheduledAt ? new Date(body.scheduledAt) : null,
      notes: body.notes || null,
    },
  });
  return NextResponse.json(job, { status: 201 });
}

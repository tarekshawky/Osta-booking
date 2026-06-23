import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN")
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, email: true, role: true, title: true, phone: true, active: true, createdAt: true },
  });
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN")
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  if (!body.name || !body.email || !body.password)
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const exists = await prisma.user.findUnique({ where: { email: body.email.toLowerCase() } });
  if (exists) return NextResponse.json({ error: "Email already exists" }, { status: 409 });

  const hashed = await bcrypt.hash(body.password, 10);
  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email.toLowerCase(),
      password: hashed,
      role: body.role === "ADMIN" ? "ADMIN" : "TECHNICIAN",
      title: body.title || null,
      phone: body.phone || null,
    },
    select: { id: true, name: true, email: true, role: true, title: true, phone: true, active: true, createdAt: true },
  });
  return NextResponse.json(user, { status: 201 });
}

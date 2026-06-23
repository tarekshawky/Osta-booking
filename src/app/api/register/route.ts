import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body.name || !body.email || !body.password)
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  if (String(body.password).length < 6)
    return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });

  const email = String(body.email).toLowerCase();
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return NextResponse.json({ error: "Email already registered" }, { status: 409 });

  const hashed = await bcrypt.hash(body.password, 10);
  const user = await prisma.user.create({
    data: {
      name: body.name,
      email,
      password: hashed,
      role: "CUSTOMER",
      phone: body.phone || null,
    },
  });
  // Create linked customer record
  await prisma.customer.create({
    data: { name: body.name, email, phone: body.phone || null, userId: user.id },
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendMail, appointmentEmail } from "@/lib/email";
import { fmtDate } from "@/lib/format";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = session.user as any;

  if (user.role === "ADMIN" || user.role === "TECHNICIAN") {
    const all = await prisma.appointment.findMany({
      orderBy: { scheduledAt: "desc" },
      include: { customer: true },
    });
    return NextResponse.json(all);
  }

  const customer = await prisma.customer.findUnique({ where: { userId: user.id } });
  if (!customer) return NextResponse.json([]);
  const mine = await prisma.appointment.findMany({
    where: { customerId: customer.id },
    orderBy: { scheduledAt: "desc" },
  });
  return NextResponse.json(mine);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Please log in to book." }, { status: 401 });
  const user = session.user as any;

  const body = await req.json();
  if (!body.service || !body.scheduledAt)
    return NextResponse.json({ error: "Service and date are required" }, { status: 400 });

  // Resolve (or create) the Customer record for this user
  let customer = await prisma.customer.findUnique({ where: { userId: user.id } });
  if (!customer) {
    customer = await prisma.customer.create({
      data: {
        name: user.name || "Customer",
        email: user.email || null,
        phone: body.phone || null,
        address: body.address || null,
        userId: user.id,
      },
    });
  }

  const appointment = await prisma.appointment.create({
    data: {
      service: body.service,
      status: "PENDING",
      scheduledAt: new Date(body.scheduledAt),
      address: body.address || customer.address || null,
      phone: body.phone || customer.phone || null,
      notes: body.notes || null,
      customerId: customer.id,
    },
  });

  // Notify customer + admin (no-op fallback if SMTP not configured)
  const when = `${fmtDate(appointment.scheduledAt)} ${new Date(appointment.scheduledAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`;
  const html = appointmentEmail({
    customerName: customer.name,
    service: appointment.service,
    when,
    address: appointment.address,
    phone: appointment.phone,
  });
  try {
    const recipients: string[] = [];
    if (customer.email) recipients.push(customer.email);
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) recipients.push(adminEmail);
    if (recipients.length) {
      await sendMail({
        to: recipients,
        subject: `OSTA Services — Appointment for ${appointment.service}`,
        html,
      });
    }
  } catch (e) {
    console.error("Email send failed:", e);
  }

  return NextResponse.json(appointment, { status: 201 });
}

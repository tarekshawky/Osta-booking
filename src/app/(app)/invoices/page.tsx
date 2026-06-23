import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import InvoicesClient from "@/components/InvoicesClient";

export const dynamic = "force-dynamic";

export default async function InvoicesPage() {
  const session = await getServerSession(authOptions);
  const isAdmin = (session!.user as any).role === "ADMIN";
  const [invoices, customers] = await Promise.all([
    prisma.invoice.findMany({ orderBy: { createdAt: "desc" }, include: { customer: true } }),
    prisma.customer.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <InvoicesClient
      invoices={JSON.parse(JSON.stringify(invoices))}
      customers={customers.map((c) => ({ id: c.id, name: c.name }))}
      isAdmin={isAdmin}
    />
  );
}

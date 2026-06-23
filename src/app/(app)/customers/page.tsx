import { prisma } from "@/lib/prisma";
import CustomersClient from "@/components/CustomersClient";

export const dynamic = "force-dynamic";

export default async function CustomersPage() {
  const customers = await prisma.customer.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { jobs: true, invoices: true } } },
  });
  return <CustomersClient customers={JSON.parse(JSON.stringify(customers))} />;
}

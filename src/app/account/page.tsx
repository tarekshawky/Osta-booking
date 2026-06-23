import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AccountClient from "@/components/AccountClient";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  const user = session!.user as any;

  const customer = await prisma.customer.findUnique({
    where: { userId: user.id },
    include: {
      appointments: { orderBy: { scheduledAt: "desc" } },
      invoices: { orderBy: { createdAt: "desc" } },
    },
  });

  return (
    <AccountClient
      name={user.name}
      appointments={JSON.parse(JSON.stringify(customer?.appointments ?? []))}
      invoices={JSON.parse(JSON.stringify(customer?.invoices ?? []))}
    />
  );
}

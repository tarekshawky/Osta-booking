import { prisma } from "@/lib/prisma";
import ExpensesClient from "@/components/ExpensesClient";

export const dynamic = "force-dynamic";

export default async function ExpensesPage() {
  const expenses = await prisma.expense.findMany({
    orderBy: { spentAt: "desc" },
    include: { createdBy: true },
  });
  return <ExpensesClient expenses={JSON.parse(JSON.stringify(expenses))} />;
}

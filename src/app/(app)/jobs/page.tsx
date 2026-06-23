import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import JobsClient from "@/components/JobsClient";

export const dynamic = "force-dynamic";

export default async function JobsPage() {
  const session = await getServerSession(authOptions);
  const user = session!.user as any;
  const isAdmin = user.role === "ADMIN";

  const [jobs, customers, technicians] = await Promise.all([
    prisma.job.findMany({
      where: isAdmin ? {} : { technicianId: user.id },
      orderBy: { createdAt: "desc" },
      include: { customer: true, technician: true },
    }),
    prisma.customer.findMany({ orderBy: { name: "asc" } }),
    prisma.user.findMany({ where: { role: "TECHNICIAN" }, orderBy: { name: "asc" } }),
  ]);

  return (
    <JobsClient
      jobs={JSON.parse(JSON.stringify(jobs))}
      customers={customers.map((c) => ({ id: c.id, name: c.name }))}
      technicians={technicians.map((t) => ({ id: t.id, name: t.name }))}
      isAdmin={isAdmin}
    />
  );
}

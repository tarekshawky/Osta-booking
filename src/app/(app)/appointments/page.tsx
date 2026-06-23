import { prisma } from "@/lib/prisma";
import AppointmentsClient from "@/components/AppointmentsClient";

export const dynamic = "force-dynamic";

export default async function AppointmentsPage() {
  const appointments = await prisma.appointment.findMany({
    orderBy: { scheduledAt: "desc" },
    include: { customer: true },
  });
  return <AppointmentsClient appointments={JSON.parse(JSON.stringify(appointments))} />;
}

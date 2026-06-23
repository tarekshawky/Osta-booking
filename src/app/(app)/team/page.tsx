import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import TeamClient from "@/components/TeamClient";

export const dynamic = "force-dynamic";

export default async function TeamPage() {
  const session = await getServerSession(authOptions);
  if ((session!.user as any).role !== "ADMIN") redirect("/dashboard");

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, email: true, role: true, title: true, phone: true, active: true, createdAt: true },
  });
  return <TeamClient users={JSON.parse(JSON.stringify(users))} currentUserId={(session!.user as any).id} />;
}

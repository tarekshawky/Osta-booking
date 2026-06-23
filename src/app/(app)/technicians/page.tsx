import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/Modal";
import { aed } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function TechniciansPage() {
  const techs = await prisma.user.findMany({
    where: { role: "TECHNICIAN" },
    include: {
      jobs: true,
      _count: { select: { jobs: true } },
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6">
      <PageHeader title="Technicians" subtitle="Performance overview of your field team." />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {techs.map((t) => {
          const completed = t.jobs.filter((j) => j.status === "COMPLETED").length;
          const revenue = t.jobs.reduce((s, j) => s + j.amount, 0);
          return (
            <div key={t.id} className="card">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand/20 text-base font-bold text-brand-400">
                  {t.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-white">{t.name}</p>
                  <p className="truncate text-xs text-slate-400">{t.title || "Technician"}</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl bg-ink-900 p-2">
                  <p className="text-lg font-bold text-white">{t._count.jobs}</p>
                  <p className="text-[10px] text-slate-400">Total Jobs</p>
                </div>
                <div className="rounded-xl bg-ink-900 p-2">
                  <p className="text-lg font-bold text-accent-green">{completed}</p>
                  <p className="text-[10px] text-slate-400">Completed</p>
                </div>
                <div className="rounded-xl bg-ink-900 p-2">
                  <p className="text-sm font-bold text-white">{aed(revenue)}</p>
                  <p className="text-[10px] text-slate-400">Revenue</p>
                </div>
              </div>
            </div>
          );
        })}
        {techs.length === 0 && <p className="text-sm text-slate-500">No technicians yet.</p>}
      </div>
    </div>
  );
}

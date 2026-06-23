import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StatCard } from "@/components/StatCard";
import { RevenueChart, DonutChart } from "@/components/Charts";
import { aed, statusColor, labelize } from "@/lib/format";
import { IconDollar, IconInvoice, IconJobs, IconExpense, IconTrend } from "@/components/icons";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const user = session!.user as any;

  const [invoices, expenses, jobs, recentInvoices, topTechs] = await Promise.all([
    prisma.invoice.findMany(),
    prisma.expense.findMany(),
    prisma.job.findMany(),
    prisma.invoice.findMany({ take: 4, orderBy: { createdAt: "desc" }, include: { customer: true } }),
    prisma.user.findMany({
      where: { role: "TECHNICIAN" },
      include: { _count: { select: { jobs: true } } },
      take: 4,
    }),
  ]);

  const totalRevenue = invoices.reduce((s, i) => s + i.amount, 0);
  const pendingInvoices = invoices.filter((i) => i.status === "PENDING");
  const pendingAmount = pendingInvoices.reduce((s, i) => s + i.amount, 0);
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const netProfit = totalRevenue - totalExpenses;
  const activeJobs = jobs.filter((j) => ["ON_THE_WAY", "IN_PROGRESS", "SCHEDULED"].includes(j.status));

  const revenueSeries = ["1 May", "5 May", "10 May", "15 May", "20 May", "25 May", "31 May"].map(
    (name, i) => ({ name, value: Math.round(totalRevenue * [0.4, 0.55, 0.7, 0.85, 1, 0.78, 0.62][i]) })
  );

  const jobStatusData = ["SCHEDULED", "ON_THE_WAY", "IN_PROGRESS", "COMPLETED", "CANCELLED"].map((s) => ({
    name: labelize(s),
    value: jobs.filter((j) => j.status === s).length,
  })).filter((d) => d.value > 0);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-slate-400">Welcome back,</p>
        <h1 className="text-2xl font-bold text-white md:text-3xl">{user.name}</h1>
        <p className="mt-1 text-sm text-slate-400">Here&apos;s what&apos;s happening with your business today.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Total Revenue" value={aed(totalRevenue)} Icon={IconDollar} accent="brand" trend={{ up: true, text: "12.5% vs last month" }} />
        <StatCard label="Pending Invoices" value={aed(pendingAmount)} Icon={IconInvoice} accent="purple" sub={`${pendingInvoices.length} Invoices`} />
        <StatCard label="Active Jobs" value={String(activeJobs.length)} Icon={IconJobs} accent="green" sub="In progress" />
        <StatCard label="Total Expenses" value={aed(totalExpenses)} Icon={IconExpense} accent="orange" trend={{ up: false, text: "8.2% vs last month" }} />
        <StatCard label="Net Profit" value={aed(netProfit)} Icon={IconTrend} accent="cyan" trend={{ up: true, text: "14.8% vs last month" }} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="card lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-white">Revenue Overview</h2>
              <p className="text-2xl font-bold text-white">{aed(totalRevenue)}
                <span className="ml-2 text-sm font-medium text-accent-green">↑ 12.5%</span>
              </p>
            </div>
            <span className="rounded-lg border border-white/10 bg-ink-900 px-3 py-1.5 text-xs text-slate-300">This Month</span>
          </div>
          <RevenueChart data={revenueSeries} />
        </div>

        <div className="card">
          <h2 className="mb-2 font-semibold text-white">Jobs Status</h2>
          <DonutChart data={jobStatusData.length ? jobStatusData : [{ name: "None", value: 1 }]} />
          <div className="mt-4 space-y-2">
            {jobStatusData.map((d, i) => (
              <div key={d.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-slate-300">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: ["#f59e0b","#2f6bff","#8b5cf6","#10b981","#ef4444"][i % 5] }} />
                  {d.name}
                </span>
                <span className="text-slate-400">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="card">
          <h2 className="mb-4 font-semibold text-white">Top Technicians</h2>
          <div className="space-y-4">
            {topTechs.map((t) => (
              <div key={t.id} className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/20 text-sm font-bold text-brand-400">{t.name.charAt(0)}</div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white">{t.name}</p>
                  <p className="text-xs text-slate-400">Jobs Completed</p>
                </div>
                <span className="text-sm font-bold text-white">{t._count.jobs}</span>
              </div>
            ))}
            {topTechs.length === 0 && <p className="text-sm text-slate-500">No technicians yet.</p>}
          </div>
        </div>

        <div className="card">
          <h2 className="mb-4 font-semibold text-white">Recent Invoices</h2>
          <div className="space-y-3">
            {recentInvoices.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">{inv.invoiceNumber}</p>
                  <p className="text-xs text-slate-400">{inv.customer?.name ?? "—"}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-white">{aed(inv.amount)}</span>
                  <span className={`badge ${statusColor[inv.status]}`}>{labelize(inv.status)}</span>
                </div>
              </div>
            ))}
            {recentInvoices.length === 0 && <p className="text-sm text-slate-500">No invoices yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/Modal";
import { StatCard } from "@/components/StatCard";
import { ComparisonChart, DonutChart } from "@/components/Charts";
import { aed } from "@/lib/format";
import { IconDollar, IconExpense, IconTrend, IconJobs } from "@/components/icons";

export const dynamic = "force-dynamic";

export default async function ReportsPage() {
  const [invoices, expenses, jobs] = await Promise.all([
    prisma.invoice.findMany(),
    prisma.expense.findMany(),
    prisma.job.findMany(),
  ]);

  const totalRevenue = invoices.reduce((s, i) => s + i.amount, 0);
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const netProfit = totalRevenue - totalExpenses;
  const margin = totalRevenue ? Math.round((netProfit / totalRevenue) * 1000) / 10 : 0;

  // Revenue by service
  const serviceMap: Record<string, number> = {};
  jobs.forEach((j) => { serviceMap[j.service] = (serviceMap[j.service] || 0) + j.amount; });
  const revenueByService = Object.entries(serviceMap).map(([name, value]) => ({ name, value }));

  const comparison = ["Jan", "Feb", "Mar", "Apr", "May"].map((name, i) => ({
    name,
    revenue: Math.round(totalRevenue * [0.6, 0.7, 0.8, 0.9, 1][i]),
    expenses: Math.round(totalExpenses * [0.5, 0.65, 0.75, 0.85, 1][i]),
  }));

  return (
    <div className="space-y-6">
      <PageHeader title="Reports & Analytics" subtitle="Detailed insights about your business performance." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Revenue" value={aed(totalRevenue)} Icon={IconDollar} accent="brand" trend={{ up: true, text: "12.5%" }} />
        <StatCard label="Total Expenses" value={aed(totalExpenses)} Icon={IconExpense} accent="orange" trend={{ up: false, text: "8.2%" }} />
        <StatCard label="Net Profit" value={aed(netProfit)} Icon={IconTrend} accent="green" trend={{ up: true, text: "14.8%" }} />
        <StatCard label="Profit Margin" value={`${margin}%`} Icon={IconJobs} accent="purple" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="card lg:col-span-2">
          <h2 className="mb-4 font-semibold text-white">Monthly Comparison</h2>
          <ComparisonChart data={comparison} />
          <div className="mt-3 flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-brand" /> Revenue</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-accent-purple" /> Expenses</span>
          </div>
        </div>
        <div className="card">
          <h2 className="mb-2 font-semibold text-white">Revenue by Service</h2>
          <DonutChart data={revenueByService.length ? revenueByService : [{ name: "None", value: 1 }]} />
          <div className="mt-4 space-y-2">
            {revenueByService.map((d, i) => (
              <div key={d.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-slate-300">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: ["#f59e0b","#2f6bff","#8b5cf6","#10b981","#ef4444"][i % 5] }} />
                  {d.name}
                </span>
                <span className="text-slate-400">{aed(d.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

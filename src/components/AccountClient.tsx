"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { aed, fmtDate, statusColor, labelize } from "@/lib/format";

type Appt = { id: string; service: string; status: string; scheduledAt: string; address: string | null };
type Inv = { id: string; invoiceNumber: string; amount: number; status: string; issuedAt: string };

export default function AccountClient({
  name, appointments, invoices,
}: { name: string; appointments: Appt[]; invoices: Inv[] }) {
  const router = useRouter();

  async function cancel(id: string) {
    if (!confirm("Cancel this appointment?")) return;
    const res = await fetch(`/api/appointments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "CANCELLED" }),
    });
    if (res.ok) router.refresh();
  }

  const upcoming = appointments.filter((a) => a.status !== "CANCELLED" && a.status !== "COMPLETED");
  const totalInvoiced = invoices.reduce((s, i) => s + i.amount, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">My Dashboard</h1>
          <p className="mt-1 text-sm text-slate-400">Welcome back, {name}</p>
        </div>
        <Link href="/book" className="btn-primary">+ Book Appointment</Link>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="stat-card"><p className="text-sm text-slate-400">Upcoming</p><p className="mt-2 text-2xl font-bold text-white">{upcoming.length}</p></div>
        <div className="stat-card"><p className="text-sm text-slate-400">Total Invoices</p><p className="mt-2 text-2xl font-bold text-white">{aed(totalInvoiced)}</p></div>
        <div className="stat-card"><p className="text-sm text-slate-400">Total Bookings</p><p className="mt-2 text-2xl font-bold text-white">{appointments.length}</p></div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card">
          <h2 className="mb-4 font-semibold text-white">My Appointments</h2>
          <div className="space-y-3">
            {appointments.map((a) => (
              <div key={a.id} className="flex items-center justify-between rounded-xl border border-white/5 bg-ink-900 p-3">
                <div>
                  <p className="font-medium text-white">{a.service}</p>
                  <p className="text-xs text-slate-400">{fmtDate(a.scheduledAt)} · {new Date(a.scheduledAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</p>
                  {a.address && <p className="text-xs text-slate-500">{a.address}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`badge ${statusColor[a.status]}`}>{labelize(a.status)}</span>
                  {a.status === "PENDING" || a.status === "CONFIRMED" ? (
                    <button onClick={() => cancel(a.id)} className="text-xs text-accent-red hover:underline">Cancel</button>
                  ) : null}
                </div>
              </div>
            ))}
            {appointments.length === 0 && <p className="text-sm text-slate-500">No appointments yet. <Link href="/book" className="text-brand-400">Book one</Link>.</p>}
          </div>
        </div>

        <div className="card">
          <h2 className="mb-4 font-semibold text-white">My Invoices</h2>
          <div className="space-y-3">
            {invoices.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between rounded-xl border border-white/5 bg-ink-900 p-3">
                <div>
                  <p className="font-medium text-white">{inv.invoiceNumber}</p>
                  <p className="text-xs text-slate-400">{fmtDate(inv.issuedAt)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-white">{aed(inv.amount)}</span>
                  <span className={`badge ${statusColor[inv.status]}`}>{labelize(inv.status)}</span>
                </div>
              </div>
            ))}
            {invoices.length === 0 && <p className="text-sm text-slate-500">No invoices yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

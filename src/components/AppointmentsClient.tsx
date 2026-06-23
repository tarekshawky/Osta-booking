"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "./Modal";
import { fmtDate, statusColor, labelize } from "@/lib/format";

type Appt = {
  id: string; service: string; status: string; scheduledAt: string;
  address: string | null; phone: string | null; customer: { name: string } | null;
};
const STATUSES = ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"];

export default function AppointmentsClient({ appointments }: { appointments: Appt[] }) {
  const router = useRouter();

  async function setStatus(id: string, status: string) {
    const res = await fetch(`/api/appointments/${id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }),
    });
    if (res.ok) router.refresh();
  }
  async function remove(id: string) {
    if (!confirm("Delete this appointment?")) return;
    const res = await fetch(`/api/appointments/${id}`, { method: "DELETE" });
    if (res.ok) router.refresh();
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Appointments" subtitle="Manage and track all customer appointments." />
      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 text-left text-xs uppercase tracking-wide text-slate-400">
                <th className="px-5 py-3">Customer</th><th className="px-5 py-3">Service</th>
                <th className="px-5 py-3">Date &amp; Time</th><th className="px-5 py-3">Location</th>
                <th className="px-5 py-3">Status</th><th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                  <td className="px-5 py-3 font-medium text-white">{a.customer?.name ?? "—"}</td>
                  <td className="px-5 py-3 text-slate-300">{a.service}</td>
                  <td className="px-5 py-3 text-slate-400">{fmtDate(a.scheduledAt)} · {new Date(a.scheduledAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</td>
                  <td className="px-5 py-3 text-slate-400">{a.address ?? "—"}</td>
                  <td className="px-5 py-3">
                    <select value={a.status} onChange={(e) => setStatus(a.id, e.target.value)}
                      className="rounded-lg border border-white/10 bg-ink-900 px-2 py-1 text-xs text-white">
                      {STATUSES.map((s) => <option key={s} value={s}>{labelize(s)}</option>)}
                    </select>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end">
                      <button onClick={() => remove(a.id)} className="rounded-lg border border-white/10 px-2 py-1 text-xs text-accent-red hover:bg-white/5">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {appointments.length === 0 && <tr><td colSpan={6} className="px-5 py-10 text-center text-slate-500">No appointments yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

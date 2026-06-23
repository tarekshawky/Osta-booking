"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal, PageHeader } from "./Modal";
import { IconPlus } from "./icons";
import { aed, fmtDate, statusColor, labelize } from "@/lib/format";

type Job = {
  id: string; jobNumber: string; service: string; status: string; amount: number;
  scheduledAt: string | null; customerId?: string | null; technicianId?: string | null;
  customer: { name: string } | null; technician: { name: string } | null;
};
type Opt = { id: string; name: string };

const SERVICES = ["AC Maintenance", "AC Repair", "AC Installation", "Duct Cleaning", "Gas Refilling", "Other Services"];
const STATUSES = ["SCHEDULED", "ON_THE_WAY", "IN_PROGRESS", "COMPLETED", "CANCELLED"];

export default function JobsClient({
  jobs, customers, technicians, isAdmin,
}: { jobs: Job[]; customers: Opt[]; technicians: Opt[]; isAdmin: boolean }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const empty = { service: SERVICES[0], customerId: "", technicianId: "", amount: "", status: "SCHEDULED", scheduledAt: "" };
  const [form, setForm] = useState<any>(empty);

  function openNew() { setEditId(null); setForm(empty); setOpen(true); }
  function openEdit(j: Job) {
    setEditId(j.id);
    setForm({
      service: j.service, customerId: j.customerId || "", technicianId: j.technicianId || "",
      amount: String(j.amount), status: j.status,
      scheduledAt: j.scheduledAt ? new Date(j.scheduledAt).toISOString().slice(0, 16) : "",
    });
    setOpen(true);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch(editId ? `/api/jobs/${editId}` : "/api/jobs", {
      method: editId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) { setOpen(false); router.refresh(); }
  }

  async function remove(id: string) {
    if (!confirm("Delete this job?")) return;
    const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
    if (res.ok) router.refresh();
  }

  async function quickStatus(id: string, status: string) {
    const res = await fetch(`/api/jobs/${id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }),
    });
    if (res.ok) router.refresh();
  }

  return (
    <div className="space-y-6">
      <PageHeader title={isAdmin ? "Jobs Management" : "My Jobs"}
        subtitle="Track and manage all jobs from assignment to completion."
        action={isAdmin && <button className="btn-primary" onClick={openNew}><IconPlus width={16} height={16} /> New Job</button>} />

      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 text-left text-xs uppercase tracking-wide text-slate-400">
                <th className="px-5 py-3">Job ID</th><th className="px-5 py-3">Customer</th>
                <th className="px-5 py-3">Service</th><th className="px-5 py-3">Technician</th>
                <th className="px-5 py-3">Date</th><th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Amount</th><th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((j) => (
                <tr key={j.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                  <td className="px-5 py-3 font-medium text-white">{j.jobNumber}</td>
                  <td className="px-5 py-3 text-slate-300">{j.customer?.name ?? "—"}</td>
                  <td className="px-5 py-3 text-slate-300">{j.service}</td>
                  <td className="px-5 py-3 text-slate-300">{j.technician?.name ?? "—"}</td>
                  <td className="px-5 py-3 text-slate-400">{fmtDate(j.scheduledAt)}</td>
                  <td className="px-5 py-3">
                    {isAdmin ? <span className={`badge ${statusColor[j.status]}`}>{labelize(j.status)}</span> : (
                      <select value={j.status} onChange={(e) => quickStatus(j.id, e.target.value)}
                        className="rounded-lg border border-white/10 bg-ink-900 px-2 py-1 text-xs text-white">
                        {STATUSES.map((s) => <option key={s} value={s}>{labelize(s)}</option>)}
                      </select>
                    )}
                  </td>
                  <td className="px-5 py-3 font-semibold text-white">{aed(j.amount)}</td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-1.5">
                      {isAdmin && <button onClick={() => openEdit(j)} className="rounded-lg border border-white/10 px-2 py-1 text-xs text-brand-400 hover:bg-white/5">Edit</button>}
                      {isAdmin && <button onClick={() => remove(j.id)} className="rounded-lg border border-white/10 px-2 py-1 text-xs text-accent-red hover:bg-white/5">Delete</button>}
                    </div>
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && <tr><td colSpan={8} className="px-5 py-10 text-center text-slate-500">No jobs found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editId ? "Edit Job" : "New Job"}>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm text-slate-300">Service</label>
              <select className="input" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
                {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-slate-300">Status</label>
              <select className="input" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                {STATUSES.map((s) => <option key={s} value={s}>{labelize(s)}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm text-slate-300">Customer</label>
              <select className="input" value={form.customerId} onChange={(e) => setForm({ ...form, customerId: e.target.value })}>
                <option value="">Select…</option>
                {customers.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-slate-300">Technician</label>
              <select className="input" value={form.technicianId} onChange={(e) => setForm({ ...form, technicianId: e.target.value })}>
                <option value="">Select…</option>
                {technicians.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm text-slate-300">Amount (AED)</label>
              <input type="number" min="0" step="0.01" className="input" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-slate-300">Scheduled Date</label>
              <input type="datetime-local" className="input" value={form.scheduledAt} onChange={(e) => setForm({ ...form, scheduledAt: e.target.value })} />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" className="btn-ghost" onClick={() => setOpen(false)}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={saving}>{saving ? "Saving…" : "Save Job"}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

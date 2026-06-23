"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal, PageHeader } from "./Modal";
import { IconPlus } from "./icons";
import { aed, fmtDate, statusColor, labelize } from "@/lib/format";
import { downloadInvoicePdf } from "@/lib/pdf";

type Invoice = {
  id: string; invoiceNumber: string; amount: number; status: string;
  issuedAt: string; notes?: string | null; customerId?: string | null; customer: { name: string } | null;
};
type Customer = { id: string; name: string };

const empty = { customerId: "", amount: "", status: "PENDING", notes: "" };

export default function InvoicesClient({
  invoices, customers, isAdmin,
}: { invoices: Invoice[]; customers: Customer[]; isAdmin: boolean }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<any>(empty);

  function openNew() { setEditId(null); setForm(empty); setOpen(true); }
  function openEdit(inv: Invoice) {
    setEditId(inv.id);
    setForm({ customerId: inv.customerId || "", amount: String(inv.amount), status: inv.status, notes: inv.notes || "" });
    setOpen(true);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch(editId ? `/api/invoices/${editId}` : "/api/invoices", {
      method: editId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) { setOpen(false); router.refresh(); }
  }

  async function remove(id: string) {
    if (!confirm("Delete this invoice?")) return;
    const res = await fetch(`/api/invoices/${id}`, { method: "DELETE" });
    if (res.ok) router.refresh();
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Invoices" subtitle="Create, edit and track all customer invoices."
        action={isAdmin && <button className="btn-primary" onClick={openNew}><IconPlus width={16} height={16} /> New Invoice</button>} />

      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 text-left text-xs uppercase tracking-wide text-slate-400">
                <th className="px-5 py-3">Invoice</th><th className="px-5 py-3">Customer</th>
                <th className="px-5 py-3">Date</th><th className="px-5 py-3">Amount</th>
                <th className="px-5 py-3">Status</th><th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                  <td className="px-5 py-3 font-medium text-white">{inv.invoiceNumber}</td>
                  <td className="px-5 py-3 text-slate-300">{inv.customer?.name ?? "—"}</td>
                  <td className="px-5 py-3 text-slate-400">{fmtDate(inv.issuedAt)}</td>
                  <td className="px-5 py-3 font-semibold text-white">{aed(inv.amount)}</td>
                  <td className="px-5 py-3"><span className={`badge ${statusColor[inv.status]}`}>{labelize(inv.status)}</span></td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-1.5">
                      <button onClick={() => downloadInvoicePdf(inv)} title="Download PDF"
                        className="rounded-lg border border-white/10 px-2 py-1 text-xs text-slate-300 hover:bg-white/5">PDF</button>
                      {isAdmin && <button onClick={() => openEdit(inv)} className="rounded-lg border border-white/10 px-2 py-1 text-xs text-brand-400 hover:bg-white/5">Edit</button>}
                      {isAdmin && <button onClick={() => remove(inv.id)} className="rounded-lg border border-white/10 px-2 py-1 text-xs text-accent-red hover:bg-white/5">Delete</button>}
                    </div>
                  </td>
                </tr>
              ))}
              {invoices.length === 0 && <tr><td colSpan={6} className="px-5 py-10 text-center text-slate-500">No invoices yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editId ? "Edit Invoice" : "New Invoice"}>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm text-slate-300">Customer</label>
            <select className="input" value={form.customerId} onChange={(e) => setForm({ ...form, customerId: e.target.value })} required>
              <option value="">Select customer…</option>
              {customers.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm text-slate-300">Amount (AED)</label>
              <input type="number" min="0" step="0.01" className="input" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-slate-300">Status</label>
              <select className="input" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option value="PENDING">Pending</option><option value="PAID">Paid</option><option value="OVERDUE">Overdue</option>
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-slate-300">Notes</label>
            <textarea className="input" rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" className="btn-ghost" onClick={() => setOpen(false)}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={saving}>{saving ? "Saving…" : "Save Invoice"}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

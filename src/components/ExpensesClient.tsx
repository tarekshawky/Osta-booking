"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal, PageHeader } from "./Modal";
import { IconPlus } from "./icons";
import { aed, fmtDate } from "@/lib/format";
import { downloadExpensePdf } from "@/lib/pdf";

type Expense = {
  id: string; title: string; category: string; amount: number;
  spentAt: string; notes?: string | null; createdBy: { name: string } | null;
};

const CATEGORIES = ["General", "Parts", "Transport", "Equipment", "Office", "Salaries", "Utilities"];
const empty = { title: "", category: "General", amount: "", notes: "" };

export default function ExpensesClient({ expenses }: { expenses: Expense[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<any>(empty);
  const total = expenses.reduce((s, e) => s + e.amount, 0);

  function openNew() { setEditId(null); setForm(empty); setOpen(true); }
  function openEdit(ex: Expense) {
    setEditId(ex.id);
    setForm({ title: ex.title, category: ex.category, amount: String(ex.amount), notes: ex.notes || "" });
    setOpen(true);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch(editId ? `/api/expenses/${editId}` : "/api/expenses", {
      method: editId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) { setOpen(false); router.refresh(); }
  }

  async function remove(id: string) {
    if (!confirm("Delete this expense?")) return;
    const res = await fetch(`/api/expenses/${id}`, { method: "DELETE" });
    if (res.ok) router.refresh();
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Expenses" subtitle={`Total recorded: ${aed(total)}`}
        action={<button className="btn-primary" onClick={openNew}><IconPlus width={16} height={16} /> Add Expense</button>} />

      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 text-left text-xs uppercase tracking-wide text-slate-400">
                <th className="px-5 py-3">Title</th><th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Date</th><th className="px-5 py-3">Added by</th>
                <th className="px-5 py-3">Amount</th><th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((ex) => (
                <tr key={ex.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                  <td className="px-5 py-3 font-medium text-white">{ex.title}</td>
                  <td className="px-5 py-3"><span className="badge bg-white/5 text-slate-300">{ex.category}</span></td>
                  <td className="px-5 py-3 text-slate-400">{fmtDate(ex.spentAt)}</td>
                  <td className="px-5 py-3 text-slate-300">{ex.createdBy?.name ?? "—"}</td>
                  <td className="px-5 py-3 font-semibold text-accent-orange">{aed(ex.amount)}</td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-1.5">
                      <button onClick={() => downloadExpensePdf(ex)} title="Download PDF" className="rounded-lg border border-white/10 px-2 py-1 text-xs text-slate-300 hover:bg-white/5">PDF</button>
                      <button onClick={() => openEdit(ex)} className="rounded-lg border border-white/10 px-2 py-1 text-xs text-brand-400 hover:bg-white/5">Edit</button>
                      <button onClick={() => remove(ex.id)} className="rounded-lg border border-white/10 px-2 py-1 text-xs text-accent-red hover:bg-white/5">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {expenses.length === 0 && <tr><td colSpan={6} className="px-5 py-10 text-center text-slate-500">No expenses yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editId ? "Edit Expense" : "Add Expense"}>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm text-slate-300">Title</label>
            <input className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm text-slate-300">Category</label>
              <select className="input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-slate-300">Amount (AED)</label>
              <input type="number" min="0" step="0.01" className="input" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-slate-300">Notes</label>
            <textarea className="input" rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" className="btn-ghost" onClick={() => setOpen(false)}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={saving}>{saving ? "Saving…" : "Save Expense"}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

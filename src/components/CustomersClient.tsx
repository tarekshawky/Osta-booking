"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal, PageHeader } from "./Modal";
import { IconPlus } from "./icons";

type Customer = {
  id: string; name: string; email: string | null; phone: string | null; address: string | null;
  _count: { jobs: number; invoices: number };
};
const empty = { name: "", email: "", phone: "", address: "" };

export default function CustomersClient({ customers }: { customers: Customer[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<any>(empty);

  function openNew() { setEditId(null); setForm(empty); setOpen(true); }
  function openEdit(c: Customer) {
    setEditId(c.id);
    setForm({ name: c.name, email: c.email || "", phone: c.phone || "", address: c.address || "" });
    setOpen(true);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch(editId ? `/api/customers/${editId}` : "/api/customers", {
      method: editId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) { setOpen(false); router.refresh(); }
  }

  async function remove(id: string) {
    if (!confirm("Delete this customer? Related invoices/jobs will be unassigned.")) return;
    const res = await fetch(`/api/customers/${id}`, { method: "DELETE" });
    if (res.ok) router.refresh();
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Customers" subtitle="Manage your customer directory."
        action={<button className="btn-primary" onClick={openNew}><IconPlus width={16} height={16} /> Add Customer</button>} />

      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 text-left text-xs uppercase tracking-wide text-slate-400">
                <th className="px-5 py-3">Name</th><th className="px-5 py-3">Phone</th>
                <th className="px-5 py-3">Address</th><th className="px-5 py-3">Jobs</th>
                <th className="px-5 py-3">Invoices</th><th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                  <td className="px-5 py-3 font-medium text-white">{c.name}</td>
                  <td className="px-5 py-3 text-slate-300">{c.phone ?? "—"}</td>
                  <td className="px-5 py-3 text-slate-400">{c.address ?? "—"}</td>
                  <td className="px-5 py-3 text-slate-300">{c._count.jobs}</td>
                  <td className="px-5 py-3 text-slate-300">{c._count.invoices}</td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-1.5">
                      <button onClick={() => openEdit(c)} className="rounded-lg border border-white/10 px-2 py-1 text-xs text-brand-400 hover:bg-white/5">Edit</button>
                      <button onClick={() => remove(c.id)} className="rounded-lg border border-white/10 px-2 py-1 text-xs text-accent-red hover:bg-white/5">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {customers.length === 0 && <tr><td colSpan={6} className="px-5 py-10 text-center text-slate-500">No customers yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editId ? "Edit Customer" : "Add Customer"}>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm text-slate-300">Name</label>
            <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm text-slate-300">Email</label>
              <input type="email" className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-slate-300">Phone</label>
              <input className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-slate-300">Address</label>
            <input className="input" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" className="btn-ghost" onClick={() => setOpen(false)}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={saving}>{saving ? "Saving…" : "Save Customer"}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

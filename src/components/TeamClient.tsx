"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal, PageHeader } from "./Modal";
import { IconPlus } from "./icons";
import { fmtDate } from "@/lib/format";

type User = {
  id: string; name: string; email: string; role: string;
  title: string | null; phone: string | null; active: boolean; createdAt: string;
};

export default function TeamClient({ users, currentUserId }: { users: User[]; currentUserId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const empty = { name: "", email: "", password: "", role: "TECHNICIAN", title: "", phone: "" };
  const [form, setForm] = useState<any>(empty);

  function openNew() { setEditId(null); setError(""); setForm(empty); setOpen(true); }
  function openEdit(u: User) {
    setEditId(u.id); setError("");
    setForm({ name: u.name, email: u.email, password: "", role: u.role, title: u.title || "", phone: u.phone || "" });
    setOpen(true);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setError("");
    const res = await fetch(editId ? `/api/users/${editId}` : "/api/users", {
      method: editId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) { setOpen(false); router.refresh(); }
    else { const d = await res.json().catch(() => ({})); setError(d.error || "Failed"); }
  }

  async function remove(id: string) {
    if (!confirm("Delete this user?")) return;
    const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
    if (res.ok) router.refresh();
    else { const d = await res.json().catch(() => ({})); alert(d.error || "Failed to delete"); }
  }

  const roleBadge = (r: string) =>
    r === "ADMIN" ? "bg-brand/15 text-brand-400" : r === "CUSTOMER" ? "bg-accent-purple/15 text-accent-purple" : "bg-accent-green/15 text-accent-green";

  return (
    <div className="space-y-6">
      <PageHeader title="Team Management" subtitle="Add, edit and manage admin, technician and customer accounts."
        action={<button className="btn-primary" onClick={openNew}><IconPlus width={16} height={16} /> Add User</button>} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((u) => (
          <div key={u.id} className="card">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand/20 text-base font-bold text-brand-400">{u.name.charAt(0)}</div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-white">{u.name}</p>
                <p className="truncate text-xs text-slate-400">{u.email}</p>
              </div>
              <span className={`badge ${roleBadge(u.role)}`}>{u.role.charAt(0) + u.role.slice(1).toLowerCase()}</span>
            </div>
            <div className="mt-4 space-y-1 text-xs text-slate-400">
              <p>Title: <span className="text-slate-300">{u.title || "—"}</span></p>
              <p>Phone: <span className="text-slate-300">{u.phone || "—"}</span></p>
              <p>Joined: <span className="text-slate-300">{fmtDate(u.createdAt)}</span></p>
            </div>
            <div className="mt-4 flex gap-2">
              <button onClick={() => openEdit(u)} className="flex-1 rounded-lg border border-white/10 py-1.5 text-xs text-brand-400 hover:bg-white/5">Edit</button>
              {u.id !== currentUserId && <button onClick={() => remove(u.id)} className="flex-1 rounded-lg border border-white/10 py-1.5 text-xs text-accent-red hover:bg-white/5">Delete</button>}
            </div>
          </div>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editId ? "Edit User" : "Add New User"}>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm text-slate-300">Full Name</label>
              <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-slate-300">Role</label>
              <select className="input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                <option value="TECHNICIAN">Technician</option>
                <option value="ADMIN">Admin</option>
                <option value="CUSTOMER">Customer</option>
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-slate-300">Email</label>
            <input type="email" className="input" value={form.email} disabled={!!editId}
              onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-slate-300">{editId ? "New Password (leave blank to keep)" : "Password"}</label>
            <input type="text" className="input" value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })} required={!editId} minLength={editId ? 0 : 6} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm text-slate-300">Title</label>
              <input className="input" placeholder="e.g. AC Technician" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-slate-300">Phone</label>
              <input className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
          </div>
          {error && <p className="rounded-lg bg-accent-red/10 px-3 py-2 text-sm text-accent-red">{error}</p>}
          <div className="flex justify-end gap-2">
            <button type="button" className="btn-ghost" onClick={() => setOpen(false)}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={saving}>{saving ? "Saving…" : editId ? "Save Changes" : "Create User"}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

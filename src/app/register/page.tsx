"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      setError(d.error || "Registration failed");
      setLoading(false);
      return;
    }
    // Auto sign-in
    await signIn("credentials", { email: form.email, password: form.password, redirect: false });
    setLoading(false);
    router.push("/account");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-600 text-2xl font-black text-white">OS</Link>
          <h1 className="text-2xl font-bold text-white">Create your account</h1>
          <p className="mt-1 text-sm text-slate-400">Join OSTA Services to book appointments</p>
        </div>
        <form onSubmit={onSubmit} className="card space-y-4">
          <div>
            <label className="mb-1.5 block text-sm text-slate-300">Full Name</label>
            <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-slate-300">Email</label>
            <input type="email" className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-slate-300">Phone</label>
            <input className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-slate-300">Password</label>
            <input type="password" className="input" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required minLength={6} />
          </div>
          {error && <p className="rounded-lg bg-accent-red/10 px-3 py-2 text-sm text-accent-red">{error}</p>}
          <button className="btn-primary w-full" disabled={loading}>{loading ? "Creating…" : "Create Account"}</button>
          <p className="text-center text-sm text-slate-400">Already have an account? <Link href="/login" className="text-brand-400">Sign in</Link></p>
        </form>
      </div>
    </div>
  );
}

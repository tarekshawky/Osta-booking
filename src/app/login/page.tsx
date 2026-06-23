"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@osta.ae");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.error) {
      setLoading(false);
      setError("Invalid email or password");
      return;
    }
    // Route by role
    const session = await fetch("/api/auth/session").then((r) => r.json()).catch(() => null);
    const role = session?.user?.role;
    setLoading(false);
    router.push(role === "CUSTOMER" ? "/account" : "/dashboard");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-600 text-2xl font-black tracking-tight text-white shadow-lg shadow-brand/40">
            OS
          </div>
          <h1 className="text-2xl font-bold tracking-wide text-white">
            OSTA <span className="text-brand-400">SERVICES</span>
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Sign in to the management dashboard
          </p>
        </div>

        <form onSubmit={onSubmit} className="card space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-300">
              Email Address
            </label>
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@osta.ae"
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-300">
              Password
            </label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="rounded-lg bg-accent-red/10 px-3 py-2 text-sm text-accent-red">
              {error}
            </p>
          )}

          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <div className="mt-6 rounded-xl border border-white/5 bg-ink-850/50 p-4 text-xs text-slate-400">
          <p className="mb-2 font-semibold text-slate-300">Demo accounts</p>
          <p>Admin: <span className="text-brand-400">admin@osta.ae</span> / password123</p>
          <p>Technician: <span className="text-brand-400">rashid@osta.ae</span> / password123</p>
          <p>Customer: <span className="text-brand-400">customer@osta.ae</span> / password123</p>
        </div>
        <p className="mt-4 text-center text-sm text-slate-400">
          New customer? <a href="/register" className="text-brand-400">Create an account</a>
        </p>
      </div>
    </div>
  );
}

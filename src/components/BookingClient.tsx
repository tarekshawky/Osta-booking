"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const SERVICES = [
  { name: "AC Repair", price: "AED 150", icon: "🔧" },
  { name: "AC Maintenance", price: "AED 120", icon: "❄️" },
  { name: "AC Installation", price: "AED 450", icon: "🛠️" },
  { name: "Gas Refilling", price: "AED 180", icon: "🧯" },
  { name: "Duct Cleaning", price: "AED 250", icon: "💨" },
  { name: "Other Services", price: "Custom", icon: "⚙️" },
];
const TIMES = ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM", "07:00 PM"];
const STEPS = ["Service", "Date & Time", "Your Details", "Confirmation"];

export default function BookingClient() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    service: "", date: "", time: "", name: "", phone: "", address: "", notes: "",
  });

  function next() { setStep((s) => Math.min(s + 1, 3)); }
  function back() { setStep((s) => Math.max(s - 1, 0)); }

  async function submit() {
    setSaving(true); setError("");
    const [h, mer] = form.time.split(" ");
    let [hh, mm] = h.split(":").map(Number);
    if (mer === "PM" && hh !== 12) hh += 12;
    if (mer === "AM" && hh === 12) hh = 0;
    const scheduledAt = new Date(`${form.date}T${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:00`);

    const res = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service: form.service,
        scheduledAt: scheduledAt.toISOString(),
        phone: form.phone, address: form.address, notes: form.notes,
      }),
    });
    setSaving(false);
    if (res.ok) { setDone(true); }
    else {
      const d = await res.json().catch(() => ({}));
      setError(d.error || "Failed to book appointment");
    }
  }

  if (status === "loading") return <div className="mx-auto max-w-3xl px-4 py-16 text-slate-400">Loading…</div>;

  if (!session) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-white">Book an Appointment</h1>
        <p className="mt-3 text-slate-400">Please log in or create an account to book a service.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/login" className="btn-primary px-6 py-3">Login</Link>
          <Link href="/register" className="btn-ghost px-6 py-3">Create Account</Link>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent-green/15 text-3xl">✅</div>
        <h1 className="text-2xl font-bold text-white">Appointment Booked!</h1>
        <p className="mt-3 text-slate-400">A confirmation has been sent to your email. Our team will contact you shortly.</p>
        <Link href="/account" className="btn-primary mt-6 inline-flex px-6 py-3">Go to My Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="text-3xl font-bold text-white">Book an Appointment</h1>
      <p className="mt-1 text-sm text-slate-400">Home › Book Appointment</p>

      {/* Stepper */}
      <div className="my-8 flex items-center justify-between">
        {STEPS.map((s, i) => (
          <div key={s} className="flex flex-1 items-center">
            <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${i <= step ? "bg-brand text-white" : "bg-ink-800 text-slate-500"}`}>{i + 1}</div>
            <span className={`ml-2 hidden text-xs sm:block ${i <= step ? "text-white" : "text-slate-500"}`}>{s}</span>
            {i < STEPS.length - 1 && <div className={`mx-2 h-0.5 flex-1 ${i < step ? "bg-brand" : "bg-ink-800"}`} />}
          </div>
        ))}
      </div>

      <div className="card">
        {step === 0 && (
          <div>
            <h2 className="mb-4 font-semibold text-white">Select a Service</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {SERVICES.map((s) => (
                <button key={s.name} onClick={() => setForm({ ...form, service: s.name })}
                  className={`rounded-xl border p-4 text-left transition ${form.service === s.name ? "border-brand bg-brand/10" : "border-white/10 bg-ink-900 hover:border-white/20"}`}>
                  <div className="text-2xl">{s.icon}</div>
                  <p className="mt-2 font-medium text-white">{s.name}</p>
                  <p className="text-xs text-slate-400">Starting from {s.price}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="mb-4 font-semibold text-white">Select Date &amp; Time</h2>
            <input type="date" className="input mb-4" value={form.date} min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setForm({ ...form, date: e.target.value })} />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {TIMES.map((t) => (
                <button key={t} onClick={() => setForm({ ...form, time: t })}
                  className={`rounded-xl border py-2.5 text-sm transition ${form.time === t ? "border-brand bg-brand/10 text-white" : "border-white/10 bg-ink-900 text-slate-300 hover:border-white/20"}`}>{t}</button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="font-semibold text-white">Your Details</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm text-slate-300">Full Name</label>
                <input className="input" value={form.name || session.user?.name || ""}
                  onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Enter your full name" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm text-slate-300">Phone Number</label>
                <input className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Enter your phone number" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-slate-300">Location / Address</label>
              <input className="input" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Enter your location" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-slate-300">Additional Notes (Optional)</label>
              <textarea className="input" rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Any specific instructions?" />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            <h2 className="font-semibold text-white">Confirm Your Booking</h2>
            <div className="rounded-xl border border-white/10 bg-ink-900 p-4 text-sm">
              <Row label="Service" value={form.service} />
              <Row label="Date" value={form.date} />
              <Row label="Time" value={form.time} />
              <Row label="Phone" value={form.phone || "—"} />
              <Row label="Location" value={form.address || "—"} />
            </div>
            {error && <p className="rounded-lg bg-accent-red/10 px-3 py-2 text-sm text-accent-red">{error}</p>}
          </div>
        )}

        <div className="mt-6 flex justify-between">
          <button onClick={back} disabled={step === 0} className="btn-ghost disabled:opacity-40">Back</button>
          {step < 3 ? (
            <button onClick={next} className="btn-primary"
              disabled={(step === 0 && !form.service) || (step === 1 && (!form.date || !form.time))}>Continue</button>
          ) : (
            <button onClick={submit} className="btn-primary" disabled={saving}>{saving ? "Booking…" : "Confirm Booking"}</button>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-white/5 py-2 last:border-0">
      <span className="text-slate-400">{label}</span>
      <span className="font-medium text-white">{value}</span>
    </div>
  );
}

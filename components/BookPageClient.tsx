"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Check,
  ShieldCheck,
  Tag,
  BadgeCheck,
  Wrench,
  Snowflake,
  Settings,
  Flame,
  Wind,
} from "lucide-react";
import { Button } from "@/components/Button";

const services = [
  { id: "repair", icon: Wrench, name: "AC Repair", price: "AED 150" },
  {
    id: "maint",
    icon: Snowflake,
    name: "AC Maintenance",
    price: "AED 120",
  },
  {
    id: "install",
    icon: Settings,
    name: "AC Installation",
    price: "AED 450",
  },
  { id: "gas", icon: Flame, name: "Gas Refilling", price: "AED 180" },
  {
    id: "duct",
    icon: Wind,
    name: "Duct Cleaning",
    price: "AED 250",
  },
];

const timeSlots = [
  "09:00 AM",
  "11:00 AM",
  "01:00 PM",
  "03:00 PM",
  "05:00 PM",
  "07:00 PM",
];

const steps = [
  "Service",
  "Date & Time",
  "Your Details",
  "Confirmation",
];

export default function BookPageClient() {
  const [step, setStep] = useState(0);
  const [service, setService] = useState("maint");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [done, setDone] = useState(false);

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="min-h-screen bg-background">
      <section className="container mx-auto px-6 pt-16 pb-8">
        <p className="text-sm text-muted-foreground mb-3">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>{" "}
          / Book Appointment
        </p>

        <h1 className="font-display text-5xl md:text-6xl font-bold">
          Book an Appointment
        </h1>
      </section>

      <section className="container mx-auto px-6 pb-24">
        <div className="rounded-2xl bg-surface/60 border border-border/50 p-6 mb-6">
          <div className="flex items-center justify-between gap-2">
            {steps.map((s, i) => (
              <div
                key={s}
                className="flex items-center flex-1 last:flex-none"
              >
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center font-semibold text-sm transition-smooth ${
                      i <= step
                        ? "bg-gradient-primary text-primary-foreground shadow-glow"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {i < step ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      i + 1
                    )}
                  </div>

                  <span
                    className={`text-xs font-medium ${
                      i <= step
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {s}
                  </span>
                </div>

                {i < steps.length - 1 && (
                  <div
                    className={`h-px flex-1 mx-2 mb-6 ${
                      i < step ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-card border border-border/50 shadow-card p-6 md:p-10">
          {step === 0 && (
            <div>
              <h2 className="font-display text-2xl font-bold mb-6">
                Select a Service
              </h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setService(s.id)}
                    className={`text-left rounded-2xl p-5 border transition-smooth ${
                      service === s.id
                        ? "bg-primary/10 border-primary shadow-glow"
                        : "bg-surface/60 border-border/50 hover:border-primary/40"
                    }`}
                  >
                    <s.icon
                      className={`h-6 w-6 mb-3 ${
                        service === s.id
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    />

                    <div className="font-semibold">{s.name}</div>

                    <div className="text-xs text-muted-foreground mt-1">
                      Starting from {s.price}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="font-display text-2xl font-bold mb-6">
                Select Date & Time
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="text-sm font-medium block mb-2">
                    Date
                  </label>

                  <input
                    className="input-primary"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium block mb-2">
                    Available Time Slots
                  </label>

                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTime(t)}
                        className={`rounded-xl py-2.5 text-sm font-medium border transition-smooth ${
                          time === t
                            ? "bg-primary/10 border-primary text-primary"
                            : "bg-surface/60 border-border/50 hover:border-primary/40"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="font-display text-2xl font-bold mb-6">
                Your Details
              </h2>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium block mb-1.5">
                    Full Name
                  </label>

                  <input
                  className="input-primary"
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium block mb-1.5">
                    Phone Number
                  </label>

                  <input
                    className="input-primary"
                    required
                    type="tel"
                    placeholder="+971 50 000 0000"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium block mb-1.5">
                    Email
                  </label>

                  <input
                    className="input-primary"
                    required
                    type="email"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium block mb-1.5">
                    Location
                  </label>

                  <input
                    className="input-primary"
                    required
                    placeholder="Address in Dubai"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm font-medium block mb-1.5">
                    Additional Notes (optional)
                  </label>

                  <textarea
                    className="input-primary"
                    rows={4}
                    placeholder="Any specific instructions?"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-8">
              {!done ? (
                <>
                  <h2 className="font-display text-2xl font-bold mb-3">
                    Confirm your booking
                  </h2>

                  <p className="text-muted-foreground mb-8">
                    Review and confirm your service appointment.
                  </p>

                  <div className="max-w-md mx-auto rounded-2xl bg-surface/60 border border-border/50 p-6 text-left space-y-3 mb-8">
                    <Row
                      label="Service"
                      value={
                        services.find((s) => s.id === service)?.name ??
                        "—"
                      }
                    />

                    <Row label="Date" value={date || "—"} />

                    <Row label="Time" value={time || "—"} />
                  </div>

                  <Button
                    variant="hero"
                    size="lg"
                    onClick={() => setDone(true)}
                  >
                    Confirm Booking
                  </Button>
                </>
              ) : (
                <>
                  <div className="mx-auto h-16 w-16 rounded-full bg-gradient-primary shadow-glow flex items-center justify-center mb-5">
                    <Check className="h-8 w-8 text-primary-foreground" />
                  </div>

                  <h2 className="font-display text-3xl font-bold mb-2">
                    Booking confirmed!
                  </h2>

                  <p className="text-muted-foreground mb-6">
                    We&apos;ll contact you shortly to finalize the
                    details.
                  </p>

                  <Button asChild variant="glass">
                    <Link href="/">Back to Home</Link>
                  </Button>
                </>
              )}
            </div>
          )}

          {!done && (
            <div className="flex justify-between mt-10 pt-6 border-t border-border/50">
              <Button
                variant="glass"
                onClick={prev}
                disabled={step === 0}
              >
                Back
              </Button>

              {step < 3 && (
                <Button variant="hero" onClick={next}>
                  Continue
                </Button>
              )}
            </div>
          )}
        </div>

        <div className="mt-6 grid sm:grid-cols-3 gap-3">
          {[
            {
              icon: ShieldCheck,
              title: "Secure Booking",
              desc: "Your data is safe with us",
            },
            {
              icon: Tag,
              title: "No Hidden Charges",
              desc: "Transparent pricing",
            },
            {
              icon: BadgeCheck,
              title: "Expert Technicians",
              desc: "Trained & certified",
            },
          ].map((t) => (
            <div
              key={t.title}
              className="rounded-2xl bg-surface/60 border border-border/50 p-5 flex items-center gap-3"
            >
              <t.icon className="h-5 w-5 text-primary shrink-0" />

              <div>
                <div className="text-sm font-semibold">
                  {t.title}
                </div>

                <div className="text-xs text-muted-foreground">
                  {t.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>

      <span className="font-medium">{value}</span>
    </div>
  );
}
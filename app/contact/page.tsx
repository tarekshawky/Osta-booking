import { Button } from "@/components/Button";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — OSTA Services",
  description:
    "Get in touch with OSTA Services. Call us, email us, or send a message — we respond within hours.",
  openGraph: {
    title: "Contact OSTA Services",
    description:
      "Call, email, or message OSTA Services — we respond within hours.",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="container mx-auto px-6 pt-16 pb-12">
        <h1 className="font-display text-5xl md:text-6xl font-bold">
          Get in Touch
        </h1>

        <p className="text-lg text-muted-foreground mt-4 max-w-2xl">
          Have a question or need a quote? We&apos;re here to help — 24/7.
        </p>
      </section>

      <section className="container mx-auto px-6 pb-24 grid lg:grid-cols-[1fr_1.2fr] gap-8">
        <div className="space-y-4">
          {[
            { icon: Phone, label: "Phone", value: "+971 50 123 4567" },
            { icon: Mail, label: "Email", value: "info@ostaservices.ae" },
            {
              icon: MapPin,
              label: "Office",
              value: "Business Bay, Dubai, UAE",
            },
            {
              icon: Clock,
              label: "Hours",
              value: "24/7 Emergency Support",
            },
          ].map((c) => (
            <div
              key={c.label}
              className="rounded-2xl p-6 bg-gradient-card border border-border/50 flex items-center gap-4"
            >
              <div className="h-12 w-12 rounded-xl bg-gradient-primary shadow-glow flex items-center justify-center shrink-0">
                <c.icon className="h-5 w-5 text-primary-foreground" />
              </div>

              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  {c.label}
                </div>

                <div className="font-medium mt-0.5">{c.value}</div>
              </div>
            </div>
          ))}
        </div>

        <form
          className="rounded-3xl bg-gradient-card border border-border/50 p-8 md:p-10 space-y-5"
        >
          <h2 className="font-display text-2xl font-bold">
            Send us a message
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium block mb-1.5">
                Full Name
              </label>

              <input className="input-primary" required placeholder="Enter your full name" />
            </div>

            <div>
              <label className="text-sm font-medium block mb-1.5">
                Phone
              </label>

              <input
              className="input-primary"
                required
                type="tel"
                placeholder="+971 50 000 0000"
              />
            </div>
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
              Message
            </label>

            <textarea
            className="input-primary w-full"
              required
              rows={5}
              placeholder="How can we help?"
            />
          </div>

          <Button
            type="submit"
            variant="hero"
            size="lg"
            className="w-full"
          >
            Send Message
          </Button>
        </form>
      </section>
    </div>
  );
}
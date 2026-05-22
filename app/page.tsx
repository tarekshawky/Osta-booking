// app/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Phone,
  Snowflake,
  Wrench,
  Wind,
  Settings,
  Flame,
  ShieldCheck,
  Clock,
  BadgeCheck,
  Sparkles,
  Calendar,
  Truck,
  HardHat,
  Smile,
  Star,
  Quote,
} from "lucide-react";

import heroImg from "@/public/hero-ac.jpg";
import testimonialImg from "@/public/testimonial-1.jpg";

const services = [
  {
    icon: Wrench,
    title: "AC Repair",
    desc: "Fast and reliable AC repair for all brands and models.",
  },
  {
    icon: Snowflake,
    title: "AC Maintenance",
    desc: "Keep your AC running smoothly with regular check-ups.",
  },
  {
    icon: Settings,
    title: "AC Installation",
    desc: "Expert installation for all types of AC systems.",
  },
  {
    icon: Flame,
    title: "Gas Refilling",
    desc: "High-quality gas refill service to keep you cool.",
  },
  {
    icon: Wind,
    title: "Duct Cleaning",
    desc: "Clean air for a healthier life and better airflow.",
  },
];

const features = [
  {
    icon: BadgeCheck,
    title: "Certified Technicians",
    desc: "Trained and experienced professionals.",
  },
  {
    icon: Clock,
    title: "On-Time Service",
    desc: "We respect your time and schedule.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Pricing",
    desc: "No hidden charges. Ever.",
  },
  {
    icon: Sparkles,
    title: "Quality Guarantee",
    desc: "100% satisfaction, guaranteed.",
  },
];

const steps = [
  {
    icon: Calendar,
    title: "Book Online",
    desc: "Choose service and time.",
  },
  {
    icon: Truck,
    title: "We Arrive",
    desc: "Our technician reaches you.",
  },
  {
    icon: HardHat,
    title: "We Fix",
    desc: "Get your service done right.",
  },
  {
    icon: Smile,
    title: "You Relax",
    desc: "Enjoy comfort worry-free.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="mx-auto max-w-7xl px-6 pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="max-w-xl space-y-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium text-cyan-400 backdrop-blur">
                <Snowflake className="h-3.5 w-3.5" />
                HVAC & Technical Services
              </div>

              <h1 className="text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
                Comfort You
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Can Count On
                </span>
              </h1>

              <p className="text-lg leading-relaxed text-slate-300">
                Professional AC repair, maintenance, installation and more —
                delivered with quality, trust, and care across the UAE.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-medium text-black transition hover:bg-cyan-400"
                >
                  Book Now
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <a
                  href="tel:+971501234567"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-medium backdrop-blur transition hover:bg-white/20"
                >
                  <Phone className="h-4 w-4" />
                  Call Us
                </a>
              </div>

              <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
                {[
                  { v: "5000+", l: "Happy Customers" },
                  { v: "4.9", l: "Customer Rating" },
                  { v: "24/7", l: "Support Available" },
                  { v: "100%", l: "Satisfaction" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="text-2xl font-bold md:text-3xl">
                      {s.v}
                    </div>
                    <div className="mt-1 text-xs text-slate-400">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-cyan-500/20 blur-3xl" />

              <Image
                src={heroImg}
                alt="Modern air conditioner"
                className="relative aspect-[4/3] w-full rounded-3xl object-cover shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-4xl font-bold md:text-5xl">
              Our Services
            </h2>

            <p className="mt-3 max-w-md text-slate-400">
              Everything you need to keep your space comfortable,
              year-round.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 transition hover:bg-white/10"
          >
            View All Services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-cyan-400/40"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10">
                <service.icon className="h-5 w-5 text-cyan-400" />
              </div>

              <h3 className="mb-1.5 font-semibold">
                {service.title}
              </h3>

              <p className="text-sm leading-relaxed text-slate-400">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="mb-12 text-4xl font-bold md:text-5xl">
          Why Choose OSTA?
        </h2>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-7"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500">
                <feature.icon className="h-5 w-5 text-black" />
              </div>

              <h3 className="mb-1.5 font-semibold">
                {feature.title}
              </h3>

              <p className="text-sm text-slate-400">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="mb-12 text-4xl font-bold md:text-5xl">
          How It Works
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="relative rounded-2xl border border-white/10 bg-white/5 p-7"
            >
              <div className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 font-bold text-black">
                {i + 1}
              </div>

              <step.icon className="mb-4 h-7 w-7 text-cyan-400" />

              <h3 className="mb-1 font-semibold">{step.title}</h3>

              <p className="text-sm text-slate-400">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid items-center gap-8 rounded-3xl border border-white/10 bg-white/5 p-8 md:grid-cols-[auto_1fr] md:p-12">
          <Image
            src={testimonialImg}
            alt="Ahmed"
            className="h-24 w-24 rounded-2xl object-cover ring-2 ring-cyan-400/30 md:h-32 md:w-32"
          />

          <div>
            <Quote className="mb-3 h-8 w-8 text-cyan-400" />

            <p className="mb-5 text-lg leading-relaxed md:text-xl">
              Amazing service! The technician was professional and my
              AC is working like new.
            </p>

            <div className="flex items-center gap-4">
              <div>
                <div className="font-semibold">Ahmed R.</div>

                <div className="text-sm text-slate-400">
                  Dubai Marina
                </div>
              </div>

              <div className="ml-auto flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-cyan-400 text-cyan-400"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="relative overflow-hidden rounded-3xl bg-cyan-500 p-10 shadow-2xl md:p-16">
          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-3xl font-bold text-black md:text-4xl">
                Need immediate help?
              </h2>

              <p className="mt-2 text-black/80">
                We are available 24/7 for emergency service across the UAE.
              </p>
            </div>

            <a
              href="tel:+971501234567"
              className="inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3 font-medium text-white transition hover:bg-black/90"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
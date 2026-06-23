import Link from "next/link";

const services = [
  { name: "AC Repair", desc: "Fast & reliable repair for all types", icon: "🔧" },
  { name: "AC Maintenance", desc: "Keep your AC running smoothly", icon: "❄️" },
  { name: "AC Installation", desc: "Expert installation for all types", icon: "🛠️" },
  { name: "Gas Refilling", desc: "High-quality gas refill service", icon: "🧯" },
  { name: "Duct Cleaning", desc: "Clean air for a healthy life", icon: "💨" },
];

const why = [
  { title: "Certified Technicians", desc: "Trained & experienced professionals" },
  { title: "On-Time Service", desc: "We value your time and schedule" },
  { title: "Transparent Pricing", desc: "No hidden charges, ever" },
  { title: "Quality Guarantee", desc: "100% satisfaction guaranteed" },
];

const steps = [
  { n: 1, title: "Book Online", desc: "Choose your service and time" },
  { n: 2, title: "We Arrive", desc: "Our technician reaches you" },
  { n: 3, title: "We Fix", desc: "Get your service done" },
  { n: 4, title: "You Relax", desc: "Enjoy comfort worry-free" },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/20 via-transparent to-transparent" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-medium text-brand-400">
              ❄️ HVAC &amp; TECHNICAL SERVICES
            </span>
            <h1 className="mt-5 text-4xl font-black leading-tight text-white md:text-6xl">
              Comfort You<br />Can Count On
            </h1>
            <p className="mt-5 max-w-md text-lg text-slate-300">
              Professional AC repair, maintenance, installation and more — delivered with quality, trust and care.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/book" className="btn-primary px-6 py-3 text-base">Book Now</Link>
              <a href="tel:+971501234567" className="btn-ghost px-6 py-3 text-base">📞 Call Us</a>
            </div>
            <div className="mt-10 grid grid-cols-4 gap-4 border-t border-white/10 pt-6">
              {[["5000+", "Happy Customers"], ["4.9", "Customer Rating"], ["24/7", "Support Available"], ["100%", "Satisfaction"]].map(([v, l]) => (
                <div key={l}>
                  <p className="text-xl font-bold text-white md:text-2xl">{v}</p>
                  <p className="text-xs text-slate-400">{l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800 to-ink-900 p-8 shadow-2xl">
              <div className="flex h-64 items-center justify-center rounded-2xl bg-gradient-to-br from-brand/30 to-ink-850 text-7xl">
                ❄️
              </div>
              <p className="mt-4 text-center text-sm text-slate-400">Premium cooling solutions for your home &amp; business</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Our Services</h2>
          <Link href="/services" className="btn-ghost text-sm">View All Services</Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {services.map((s) => (
            <div key={s.name} className="card text-center transition hover:border-brand/40">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand/15 text-2xl">{s.icon}</div>
              <h3 className="font-semibold text-white">{s.name}</h3>
              <p className="mt-1 text-xs text-slate-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why choose */}
      <section className="border-y border-white/5 bg-ink-900/40">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">Why Choose OSTA?</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {why.map((w) => (
              <div key={w.title} className="card">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-600 text-white">✓</div>
                <h3 className="font-semibold text-white">{w.title}</h3>
                <p className="mt-1 text-sm text-slate-400">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <h2 className="mb-8 text-center text-2xl font-bold text-white">How It Works</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="text-center">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/15 text-xl font-bold text-brand-400">{s.n}</div>
              <h3 className="font-semibold text-white">{s.title}</h3>
              <p className="mt-1 text-sm text-slate-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-brand/30 bg-gradient-to-r from-brand/20 to-ink-850 p-8 sm:flex-row">
          <div>
            <h3 className="text-xl font-bold text-white">Need Immediate Help?</h3>
            <p className="text-sm text-slate-300">We are available 24/7 for emergency services.</p>
          </div>
          <Link href="/book" className="btn-primary px-6 py-3">Book a Service</Link>
        </div>
      </section>
    </div>
  );
}

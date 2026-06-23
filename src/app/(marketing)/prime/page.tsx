import Link from "next/link";

const plans = [
  { name: "PRIME BASIC", tag: "Essential care with priority", price: 299, popular: false,
    features: ["Priority Booking", "Response within 24 hours", "10% Discount on Services", "1 Free Annual Checkup", "VIP Support"] },
  { name: "PRIME PLUS", tag: "More benefits, more savings", price: 499, popular: true,
    features: ["Priority Booking", "Response within 12 hours", "15% Discount on Services", "2 Free Annual Checkups", "No Call-out Charges", "VIP Support"] },
  { name: "PRIME ELITE", tag: "The ultimate care experience", price: 899, popular: false,
    features: ["Priority Booking", "Response within 6 hours", "20% Discount on Services", "4 Free Annual Checkups", "No Call-out Charges", "Dedicated Technician", "24/7 VIP Support"] },
];

const benefits = [
  { title: "Priority Booking", desc: "Get priority over regular customers" },
  { title: "Fast Response", desc: "Response within 15 minutes" },
  { title: "Exclusive Discounts", desc: "Up to 25% off on all services" },
  { title: "Free Annual Checkups", desc: "2 free preventive maintenance visits" },
  { title: "24/7 VIP Support", desc: "Dedicated support for you anytime" },
];

export default function PrimePage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/25 via-transparent to-transparent" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-6">
          <div>
            <h1 className="text-4xl font-black text-white md:text-6xl">OSTA <span className="text-brand-400">PRIME</span> 👑</h1>
            <p className="mt-4 text-2xl font-semibold text-white">Exclusive Membership.<br />Premium Care for Your Home.</p>
            <p className="mt-4 max-w-md text-slate-300">
              OSTA PRIME is our exclusive membership that gives you priority service, special discounts, and total peace of mind.
            </p>
            <Link href="/book" className="btn-primary mt-6 inline-flex px-6 py-3">Join OSTA PRIME 👑</Link>
          </div>
          <div className="space-y-3">
            {benefits.map((b) => (
              <div key={b.title} className="flex items-start gap-3 rounded-xl border border-white/10 bg-ink-850/60 p-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/15 text-brand-400">★</span>
                <div>
                  <p className="font-semibold text-white">{b.title}</p>
                  <p className="text-sm text-slate-400">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <h2 className="mb-10 text-center text-2xl font-bold text-white">CHOOSE YOUR PRIME PLAN</h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <div key={p.name} className={`relative rounded-2xl border p-6 ${p.popular ? "border-brand bg-gradient-to-b from-brand/15 to-ink-850" : "border-white/10 bg-ink-850/60"}`}>
              {p.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3 py-1 text-xs font-bold text-white">MOST POPULAR</span>}
              <h3 className="text-center text-lg font-bold text-white">{p.name}</h3>
              <p className="text-center text-sm text-slate-400">{p.tag}</p>
              <p className="my-4 text-center text-4xl font-black text-white">
                AED <span className="text-brand-400">{p.price}</span><span className="text-base font-medium text-slate-400">/year</span>
              </p>
              <ul className="space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-300"><span className="text-accent-green">✓</span>{f}</li>
                ))}
              </ul>
              <Link href="/book" className={`mt-6 w-full ${p.popular ? "btn-primary" : "btn-ghost"}`}>Choose {p.name.split(" ")[1]}</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";

const services = [
  { name: "AC Repair", desc: "Fast and reliable AC repair services for all brands and models.", points: ["Quick Diagnosis", "Affordable Pricing", "6 Months Warranty"], price: "AED 150" },
  { name: "AC Maintenance", desc: "Regular maintenance to keep your AC running efficiently and increase its lifespan.", points: ["Deep Cleaning", "Performance Check", "6 Months Warranty"], price: "AED 120" },
  { name: "AC Installation", desc: "Professional installation services for all types of air conditioning systems.", points: ["Expert Installation", "Quality Equipment", "1 Year Warranty"], price: "AED 450" },
  { name: "Gas Refilling", desc: "High-quality gas refilling services to ensure your AC cools perfectly.", points: ["Genuine Gas", "Leak Check", "Performance Test"], price: "AED 180" },
  { name: "Duct Cleaning", desc: "Clean ducts for better air quality and a healthier environment.", points: ["Dust Removal", "Sanitization", "Better Air Quality"], price: "AED 250" },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
      <div className="mb-10">
        <p className="text-sm text-slate-400">Home › Services</p>
        <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">Our Services</h1>
        <p className="mt-2 max-w-2xl text-slate-300">
          We offer a wide range of HVAC &amp; technical services to keep your home and business comfortable.
        </p>
      </div>

      <div className="space-y-5">
        {services.map((s) => (
          <div key={s.name} className="card flex flex-col gap-5 md:flex-row md:items-center">
            <div className="flex h-40 w-full shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand/25 to-ink-850 text-5xl md:w-64">❄️</div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-bold text-white">{s.name}</h3>
                <span className="rounded-lg bg-brand/15 px-3 py-1 text-sm font-semibold text-brand-400">From {s.price}</span>
              </div>
              <p className="mt-2 text-slate-300">{s.desc}</p>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-400">
                {s.points.map((p) => <li key={p} className="flex items-center gap-2"><span className="text-accent-green">✓</span>{p}</li>)}
              </ul>
              <Link href="/book" className="btn-primary mt-4 inline-flex">Book Now</Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-3xl border border-white/10 bg-ink-850 p-8 sm:flex-row">
        <div>
          <h3 className="text-lg font-bold text-white">Still Need Help?</h3>
          <p className="text-sm text-slate-400">Our support team is here for you 24/7.</p>
        </div>
        <a href="tel:+971501234567" className="btn-ghost px-6 py-3">Contact Us</a>
      </div>
    </div>
  );
}

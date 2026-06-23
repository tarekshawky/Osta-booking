import Link from "next/link";

export default function PublicFooter() {
  return (
    <footer className="border-t border-white/5 bg-ink-900/60">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 md:grid-cols-4 md:px-6">
        <div className="col-span-2 md:col-span-1">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-600 font-black text-white">OS</div>
            <span className="text-lg font-bold tracking-wide text-white">OSTA</span>
          </div>
          <p className="text-sm text-slate-400">Professional AC repair, maintenance, installation and more — delivered with quality, trust and care.</p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/services" className="hover:text-white">Services</Link></li>
            <li><Link href="/prime" className="hover:text-white">OSTA Prime</Link></li>
            <li><Link href="/book" className="hover:text-white">Book Now</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Services</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>AC Repair</li><li>AC Maintenance</li><li>Installation</li><li>Duct Cleaning</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Contact Us</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>+971 50 123 4567</li>
            <li>info@ostaservices.ae</li>
            <li>Dubai, UAE</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} OSTA Services. All rights reserved.
      </div>
    </footer>
  );
}

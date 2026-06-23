"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/prime", label: "OSTA Prime" },
  { href: "/book", label: "Book Now" },
];

export default function PublicNavbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const role = (session?.user as any)?.role;
  const dashHref = role === "CUSTOMER" ? "/account" : "/dashboard";

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-ink-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-600 font-black text-white">OS</div>
          <span className="text-lg font-bold tracking-wide text-white">OSTA</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link key={l.href} href={l.href}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${active ? "text-brand-400" : "text-slate-300 hover:text-white"}`}>
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {session ? (
            <>
              <Link href={dashHref} className="btn-ghost hidden sm:inline-flex">My Dashboard</Link>
              <button onClick={() => signOut({ callbackUrl: "/" })} className="btn-primary">Sign out</button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn-ghost hidden sm:inline-flex">Login</Link>
              <Link href="/book" className="btn-primary">Book Now</Link>
            </>
          )}
          <button className="rounded-lg border border-white/10 p-2 text-slate-300 md:hidden" onClick={() => setOpen(!open)}>☰</button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/5 px-4 py-3 md:hidden">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5">{l.label}</Link>
          ))}
        </div>
      )}
    </header>
  );
}

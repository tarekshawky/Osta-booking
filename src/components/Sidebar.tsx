"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  IconDashboard, IconCustomers, IconInvoice, IconExpense, IconJobs,
  IconWrench, IconReports, IconUsers, IconLogout, IconCalendar,
} from "./icons";

const adminNav = [
  { href: "/dashboard", label: "Dashboard", Icon: IconDashboard },
  { href: "/customers", label: "Customers", Icon: IconCustomers },
  { href: "/appointments", label: "Appointments", Icon: IconCalendar },
  { href: "/jobs", label: "Jobs", Icon: IconJobs },
  { href: "/invoices", label: "Invoices", Icon: IconInvoice },
  { href: "/expenses", label: "Expenses", Icon: IconExpense },
  { href: "/technicians", label: "Technicians", Icon: IconWrench },
  { href: "/reports", label: "Reports", Icon: IconReports },
  { href: "/team", label: "Team Management", Icon: IconUsers },
];

const techNav = [
  { href: "/dashboard", label: "Dashboard", Icon: IconDashboard },
  { href: "/jobs", label: "My Jobs", Icon: IconJobs },
  { href: "/expenses", label: "Expenses", Icon: IconExpense },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = (session?.user as any)?.role ?? "TECHNICIAN";
  const nav = role === "ADMIN" ? adminNav : techNav;

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-white/5 bg-ink-900/80 p-4 lg:flex">
      <div className="mb-6 flex items-center gap-3 px-2 pt-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-600 font-black text-white">
          OS
        </div>
        <div>
          <p className="text-base font-bold leading-tight tracking-wide text-white">OSTA</p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Services</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {nav.map(({ href, label, Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link key={href} href={href} className={`sidebar-link ${active ? "active" : ""}`}>
              <Icon />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-4 rounded-2xl border border-white/5 bg-ink-850 p-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/20 text-sm font-bold text-brand-400">
            {(session?.user?.name ?? "U").charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">{session?.user?.name}</p>
            <p className="truncate text-xs text-slate-400">
              {role === "ADMIN" ? "Administrator" : (session?.user as any)?.title || "Technician"}
            </p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 py-2 text-xs font-medium text-slate-300 hover:bg-white/5"
        >
          <IconLogout width={14} height={14} /> Sign out
        </button>
      </div>
    </aside>
  );
}

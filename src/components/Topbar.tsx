"use client";

import { useSession } from "next-auth/react";
import { IconSearch, IconBell, IconCalendar } from "./icons";

export default function Topbar() {
  const { data: session } = useSession();
  const today = new Date().toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });

  return (
    <header className="sticky top-0 z-10 flex items-center gap-4 border-b border-white/5 bg-ink-950/80 px-4 py-3 backdrop-blur md:px-6">
      <div className="relative hidden flex-1 max-w-md md:block">
        <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input className="input pl-10" placeholder="Search anything…" />
      </div>
      <div className="ml-auto flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-xl border border-white/10 bg-ink-850 px-3 py-2 text-sm text-slate-300 sm:flex">
          <IconCalendar width={16} height={16} className="text-slate-400" />
          {today}
        </div>
        <button className="relative rounded-xl border border-white/10 bg-ink-850 p-2.5 text-slate-300 hover:bg-white/5">
          <IconBell width={18} height={18} />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">3</span>
        </button>
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-ink-850 py-1.5 pl-1.5 pr-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/20 text-sm font-bold text-brand-400">
            {(session?.user?.name ?? "U").charAt(0)}
          </div>
          <div className="hidden text-left sm:block">
            <p className="text-xs font-semibold leading-tight text-white">{session?.user?.name}</p>
            <p className="text-[10px] text-slate-400">
              {(session?.user as any)?.role === "ADMIN" ? "Administrator" : "Technician"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

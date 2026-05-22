"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Snowflake, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/Button";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Footer() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/70 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary shadow-glow transition-smooth group-hover:scale-105">
            <Snowflake className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-lg font-bold tracking-tight">OSTA</span>
            <span className="text-[10px] font-medium tracking-[0.2em] text-muted-foreground">
              SERVICES
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {nav.map((item) => {
            const isActive = pathname === item.to;

            return (
              <Link
                key={item.to}
                href={item.to}
                className={`px-4 py-2 text-sm font-medium transition-smooth ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Button asChild variant="hero" size="sm" className="hidden sm:inline-flex">
            <Link href="/book">Book Now</Link>
          </Button>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-surface"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/50 bg-surface/95 backdrop-blur">
          <nav className="container mx-auto px-6 py-4 flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.to}
                href={item.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}

            <Button asChild variant="hero" size="sm" className="mt-2">
              <Link href="/book" onClick={() => setOpen(false)}>
                Book Now
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
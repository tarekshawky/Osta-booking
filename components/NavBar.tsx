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

export function NavBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/70 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg transition-transform group-hover:scale-105">
            <Snowflake className="h-5 w-5 text-white" />
          </div>

          <div className="flex flex-col leading-none">
            <span className="text-lg font-bold tracking-tight">OSTA</span>
            <span className="text-[10px] font-medium tracking-[0.2em] text-gray-500">
              SERVICES
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {nav.map((item) => {
            const isActive = pathname === item.to;

            return (
              <Link
                key={item.to}
                href={item.to}
                className={`px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "text-white"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button asChild variant="hero" size="sm" className="hidden sm:inline-flex">
            <Link href="/book">Book Now</Link>
          </Button>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t bg-white/95 backdrop-blur">
          <nav className="container mx-auto px-6 py-4 flex flex-col gap-1">
            {nav.map((item) => {
              const isActive = pathname === item.to;

              return (
                <Link
                  key={item.to}
                  href={item.to}
                  onClick={() => setOpen(false)}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? "text-black bg-gray-100"
                      : "text-gray-500 hover:bg-gray-100 hover:text-black"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

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
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {  Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/Button";
import Image from "next/image";
import logo from "@/public/osta-prime-logo.png";

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
      <div className="container mx-auto flex h-18 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image src={logo} alt="Osta Prime" width={150} height={150}  className="h-auto w-auto"/>
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
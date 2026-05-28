import Link from "next/link";
import Image from "next/image";
import { Check, ArrowRight } from "lucide-react";

import { Button } from "@/components/Button";

import repairImg from "@/public/service-repair.jpg";
import maintImg from "@/public/service-maintenance.jpg";
import installImg from "@/public/service-install.jpg";
import gasImg from "@/public/service-gas.jpg";
import ductImg from "@/public/service-duct.jpg";

export const metadata = {
  title: "Our Services — OSTA HVAC & AC Specialists",
  description:
    "Explore the full range of HVAC and technical services from OSTA: AC repair, maintenance, installation, gas refilling, and duct cleaning.",
  openGraph: {
    title: "Our Services — OSTA HVAC Specialists",
    description:
      "AC repair, maintenance, installation, gas refilling, and duct cleaning across the UAE.",
  },
};

const services = [
  {
    img: repairImg,
    title: "AC Repair",
    desc: "Fast and reliable AC repair services for all brands and models.",
    bullets: ["Quick Diagnosis", "Affordable Pricing", "6 Months Warranty"],
  },
  {
    img: maintImg,
    title: "AC Maintenance",
    desc: "Regular maintenance to keep your AC running efficiently and increase its lifespan.",
    bullets: ["Deep Cleaning", "Performance Check", "6 Months Warranty"],
  },
  {
    img: installImg,
    title: "AC Installation",
    desc: "Professional installation services for all types of air conditioning systems.",
    bullets: ["Expert Installation", "Quality Equipment", "1 Year Warranty"],
  },
  {
    img: gasImg,
    title: "Gas Refilling",
    desc: "High-quality gas refilling services to ensure your AC cools perfectly.",
    bullets: ["Genuine Gas", "Leak Check", "Performance Test"],
  },
  {
    img: ductImg,
    title: "Duct Cleaning",
    desc: "Clean ducts for better air quality and a healthier environment.",
    bullets: ["Dust Removal", "Sanitization", "Better Air Quality"],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="container mx-auto px-6 pt-16 pb-12">
        <p className="text-sm text-muted-foreground mb-3">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>{" "}
          / Services
        </p>

        <h1 className="font-display text-5xl md:text-6xl font-bold">
          Our Services
        </h1>

        <p className="text-lg text-muted-foreground mt-4 max-w-2xl">
          We offer a wide range of HVAC and technical services to keep your home
          and business comfortable.
        </p>
      </section>

      <section className="container mx-auto px-6 pb-16 space-y-6">
        {services.map((s, i) => (
          <div
            key={s.title}
            className={`rounded-3xl bg-gradient-card border border-border/50 shadow-card overflow-hidden grid md:grid-cols-2 gap-0 ${
              i % 2 ? "md:[&_.service-image]:order-2" : ""
            }`}
          >
            <Image
              src={s.img}
              alt={s.title}
              width={800}
              height={600}
              priority={i === 0}
              className="service-image h-64 md:h-full w-full object-cover"
            />

            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="font-display text-3xl font-bold mb-3">
                {s.title}
              </h2>

              <p className="text-muted-foreground mb-6">{s.desc}</p>

              <ul className="space-y-2.5 mb-6">
                {s.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-center gap-2.5 text-sm"
                  >
                    <span className="h-5 w-5 rounded-full bg-primary/15 flex items-center justify-center">
                      <Check className="h-3 w-3 text-primary" />
                    </span>

                    {b}
                  </li>
                ))}
              </ul>

              <Button
                asChild
                variant="hero"
                size="lg"
                className="self-start"
              >
                <Link href="/book">
                  Book Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
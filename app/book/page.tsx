import type { Metadata } from "next";
import BookPageClient from "@/components/BookPageClient";

export const metadata: Metadata = {
  title: "Book an Appointment — OSTA Services",
  description:
    "Book your AC repair, maintenance, installation, gas refilling, or duct cleaning service in just a few clicks.",
  openGraph: {
    title: "Book an Appointment — OSTA Services",
    description: "Schedule HVAC service across the UAE in minutes.",
  },
};

export default function Page() {
  return <BookPageClient />;
}
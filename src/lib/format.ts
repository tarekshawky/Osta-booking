export function aed(n: number): string {
  return "AED " + n.toLocaleString("en-AE", { maximumFractionDigits: 0 });
}

export function fmtDate(d: Date | string | null | undefined): string {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

export const statusColor: Record<string, string> = {
  PAID: "bg-accent-green/15 text-accent-green",
  PENDING: "bg-accent-orange/15 text-accent-orange",
  OVERDUE: "bg-accent-red/15 text-accent-red",
  SCHEDULED: "bg-accent-orange/15 text-accent-orange",
  ON_THE_WAY: "bg-brand/15 text-brand-400",
  IN_PROGRESS: "bg-accent-purple/15 text-accent-purple",
  COMPLETED: "bg-accent-green/15 text-accent-green",
  CANCELLED: "bg-accent-red/15 text-accent-red",
};

export function labelize(s: string): string {
  return s.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}

import React from "react";

export function StatCard({
  label, value, sub, accent = "brand", Icon, trend,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: "brand" | "green" | "orange" | "purple" | "cyan";
  Icon: React.ComponentType<any>;
  trend?: { up: boolean; text: string };
}) {
  const accents: Record<string, string> = {
    brand: "from-brand to-brand-600",
    green: "from-accent-green to-emerald-600",
    orange: "from-accent-orange to-amber-600",
    purple: "from-accent-purple to-violet-600",
    cyan: "from-accent-cyan to-cyan-600",
  };
  return (
    <div className="stat-card">
      <div className="flex items-start justify-between">
        <span className="text-sm text-slate-400">{label}</span>
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${accents[accent]} text-white`}>
          <Icon width={18} height={18} />
        </div>
      </div>
      <p className="mt-3 text-2xl font-bold text-white">{value}</p>
      <div className="mt-1 flex items-center gap-2 text-xs">
        {trend && (
          <span className={trend.up ? "text-accent-green" : "text-accent-red"}>
            {trend.up ? "↑" : "↓"} {trend.text}
          </span>
        )}
        {sub && <span className="text-slate-500">{sub}</span>}
      </div>
    </div>
  );
}

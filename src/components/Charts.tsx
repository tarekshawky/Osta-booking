"use client";

import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, BarChart, Bar, CartesianGrid,
} from "recharts";

export function RevenueChart({ data }: { data: { name: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data} margin={{ left: -10, right: 8, top: 8 }}>
        <defs>
          <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2f6bff" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#2f6bff" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" stroke="#5b6680" fontSize={11} tickLine={false} axisLine={false} />
        <YAxis stroke="#5b6680" fontSize={11} tickLine={false} axisLine={false}
          tickFormatter={(v) => (v >= 1000 ? `${v / 1000}K` : v)} />
        <Tooltip contentStyle={{ background: "#0d1426", border: "1px solid #1d2b4d", borderRadius: 12, color: "#fff" }} />
        <Area type="monotone" dataKey="value" stroke="#2f6bff" strokeWidth={2.5} fill="url(#rev)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

const DONUT = ["#f59e0b", "#2f6bff", "#8b5cf6", "#10b981", "#ef4444"];

export function DonutChart({ data }: { data: { name: string; value: number }[] }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={data} dataKey="value" innerRadius={68} outerRadius={95} paddingAngle={2} stroke="none">
            {data.map((_, i) => <Cell key={i} fill={DONUT[i % DONUT.length]} />)}
          </Pie>
          <Tooltip contentStyle={{ background: "#0d1426", border: "1px solid #1d2b4d", borderRadius: 12, color: "#fff" }} />
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-white">{total}</span>
        <span className="text-xs text-slate-400">Total Jobs</span>
      </div>
    </div>
  );
}

export function ComparisonChart({ data }: { data: { name: string; revenue: number; expenses: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ left: -10, right: 8, top: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#16213d" vertical={false} />
        <XAxis dataKey="name" stroke="#5b6680" fontSize={11} tickLine={false} axisLine={false} />
        <YAxis stroke="#5b6680" fontSize={11} tickLine={false} axisLine={false}
          tickFormatter={(v) => (v >= 1000 ? `${v / 1000}K` : v)} />
        <Tooltip contentStyle={{ background: "#0d1426", border: "1px solid #1d2b4d", borderRadius: 12, color: "#fff" }} />
        <Bar dataKey="revenue" fill="#2f6bff" radius={[4, 4, 0, 0]} />
        <Bar dataKey="expenses" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

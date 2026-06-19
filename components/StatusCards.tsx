"use client";

import clsx from "clsx";
import { CheckCircle2, XCircle, AlertTriangle, Clock } from "lucide-react";
import React from "react";

interface StatusCardsProps {
  hadir: number;
  alfa: number;
  izin: number;
  sakit: number;
  total: number;
  persentase: number;
}

interface CardItem {
  label: string;
  value: number;
  total: number;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  barColor: string;
  badge?: { label: string; class: string };
}

export default React.memo(function StatusCards({
  hadir,
  alfa,
  izin,
  sakit,
  total,
}: StatusCardsProps) {
  const cards: CardItem[] = [
    {
      label: "Hadir",
      value: hadir,
      total,
      icon: CheckCircle2,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      barColor: "bg-emerald-500",
    },
    {
      label: "Alfa",
      value: alfa,
      total,
      icon: XCircle,
      iconBg: "bg-rose-50",
      iconColor: "text-rose-600",
      barColor: "bg-rose-500",
      badge: alfa >= 3 ? { label: "PERINGATAN", class: "bg-rose-100 text-rose-700" } : undefined,
    },
    {
      label: "Izin",
      value: izin,
      total,
      icon: Clock,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      barColor: "bg-amber-500",
    },
    {
      label: "Sakit",
      value: sakit,
      total,
      icon: AlertTriangle,
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
      barColor: "bg-violet-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map(({ label, value, total, icon: Icon, iconBg, iconColor, barColor, badge }) => (
        <div
          key={label}
          className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start mb-4">
            <div className={clsx("w-12 h-12 rounded-xl flex items-center justify-center", iconBg)}>
              <Icon size={24} className={iconColor} />
            </div>
            {badge && (
              <span className={clsx("text-[10px] font-bold px-2 py-1 rounded-md tracking-wide", badge.class)}>
                {badge.label}
              </span>
            )}
          </div>

          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">
            {label}
          </p>
          
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl font-bold text-slate-900 font-mono tracking-tight">{value}</span>
            <span className="text-sm font-medium text-slate-400 font-mono">/ {total}</span>
          </div>

          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={clsx("h-full rounded-full transition-all duration-1000 ease-out", barColor)}
              style={{ width: `${(value / total) * 100}%` }}
            />
          </div>
          <p className="text-xs font-medium text-slate-500 mt-2">
            {((value / total) * 100).toFixed(1)}% dari total
          </p>
        </div>
      ))}
    </div>
  );
});

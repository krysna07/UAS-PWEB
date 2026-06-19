"use client";

import { AttendanceStatus } from "@/lib/types";

interface AttendanceRingProps {
  persentase: number;
  detail: AttendanceStatus[];
  totalPertemuan?: number;
  hadirCount: number;
}

const DOT_COUNT = 16;

function getDotColor(status: AttendanceStatus | undefined) {
  if (!status) return { fill: "#E2E8F0", stroke: "#CBD5E1" }; // slate-200
  switch (status) {
    case "hadir":
      return { fill: "#10B981", stroke: "#059669" }; // emerald
    case "alfa":
      return { fill: "#EF4444", stroke: "#DC2626" }; // red
    case "izin":
      return { fill: "#F59E0B", stroke: "#D97706" }; // amber
    case "sakit":
      return { fill: "#8B5CF6", stroke: "#7C3AED" }; // violet
    default:
      return { fill: "#E2E8F0", stroke: "#CBD5E1" };
  }
}

function getStatusLabel(persentase: number) {
  if (persentase >= 75) return { label: "AMAN", color: "#10B981", bg: "#ECFDF5" };
  if (persentase >= 60) return { label: "SP-1", color: "#F59E0B", bg: "#FFFBEB" };
  if (persentase >= 50) return { label: "SP-2", color: "#EA580C", bg: "#FFF7ED" };
  return { label: "D.O", color: "#EF4444", bg: "#FEF2F2" };
}

export default function AttendanceRing({
  persentase,
  detail,
  totalPertemuan = 16,
  hadirCount,
}: AttendanceRingProps) {
  const SIZE = 240;
  const CENTER = SIZE / 2;
  const RING_RADIUS = 90;
  const DOT_RADIUS = 5;
  const INNER_RING_R = 70;
  const BAR_STROKE = 12;

  const status = getStatusLabel(persentase);
  const circumference = 2 * Math.PI * INNER_RING_R;
  const progressOffset = circumference - (persentase / 100) * circumference;

  const dots = Array.from({ length: DOT_COUNT }, (_, i) => {
    const angle = (i / DOT_COUNT) * 2 * Math.PI - Math.PI / 2;
    const x = CENTER + RING_RADIUS * Math.cos(angle);
    const y = CENTER + RING_RADIUS * Math.sin(angle);
    const attendance = detail[i];
    const colors = getDotColor(attendance);
    return { x, y, ...colors, attendance, index: i };
  });

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
          {/* Background track */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={INNER_RING_R}
            fill="none"
            stroke="#F1F5F9"
            strokeWidth={BAR_STROKE}
          />

          {/* Progress arc */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={INNER_RING_R}
            fill="none"
            stroke={status.color}
            strokeWidth={BAR_STROKE}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={progressOffset}
            transform={`rotate(-90 ${CENTER} ${CENTER})`}
            style={{ transition: "stroke-dashoffset 1s ease-out" }}
          />

          {/* Inner circle for text */}
          <circle cx={CENTER} cy={CENTER} r={INNER_RING_R - 10} fill="#FFFFFF" />

          {/* 16 attendance dots */}
          {dots.map((dot) => (
            <g key={dot.index}>
              <circle
                cx={dot.x}
                cy={dot.y}
                r={DOT_RADIUS}
                fill={dot.fill}
              />
              <text
                x={dot.x}
                y={dot.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="6"
                fontFamily="system-ui"
                fill={dot.attendance ? "#FFFFFF" : "#64748B"}
                fontWeight="bold"
              >
                {dot.index + 1}
              </text>
            </g>
          ))}

          {/* Percentage */}
          <text
            x={CENTER}
            y={CENTER - 5}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="32"
            fontFamily="system-ui"
            fontWeight="800"
            fill="#0F172A"
          >
            {persentase}%
          </text>

          {/* Count */}
          <text
            x={CENTER}
            y={CENTER + 16}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="10"
            fontFamily="system-ui"
            fontWeight="500"
            fill="#64748B"
          >
            {hadirCount}/{totalPertemuan} hadir
          </text>
        </svg>

        {/* Status Badge */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-slate-200 shadow-sm">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: status.color }} />
          <span className="text-[10px] font-bold text-slate-700 tracking-wide">{status.label}</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 mt-6">
        {[
          { color: "#10B981", label: "Hadir" },
          { color: "#EF4444", label: "Alfa" },
          { color: "#F59E0B", label: "Izin" },
          { color: "#8B5CF6", label: "Sakit" },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-xs font-medium text-slate-500">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

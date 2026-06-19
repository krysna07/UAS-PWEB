"use client";
"use strict";
exports.__esModule = true;
var clsx_1 = require("clsx");
var lucide_react_1 = require("lucide-react");
var react_1 = require("react");
exports["default"] = react_1["default"].memo(function StatusCards(_a) {
    var hadir = _a.hadir, alfa = _a.alfa, izin = _a.izin, sakit = _a.sakit, total = _a.total;
    var cards = [
        {
            label: "Hadir",
            value: hadir,
            total: total,
            icon: lucide_react_1.CheckCircle2,
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-600",
            barColor: "bg-emerald-500"
        },
        {
            label: "Alfa",
            value: alfa,
            total: total,
            icon: lucide_react_1.XCircle,
            iconBg: "bg-rose-50",
            iconColor: "text-rose-600",
            barColor: "bg-rose-500",
            badge: alfa >= 3 ? { label: "PERINGATAN", "class": "bg-rose-100 text-rose-700" } : undefined
        },
        {
            label: "Izin",
            value: izin,
            total: total,
            icon: lucide_react_1.Clock,
            iconBg: "bg-amber-50",
            iconColor: "text-amber-600",
            barColor: "bg-amber-500"
        },
        {
            label: "Sakit",
            value: sakit,
            total: total,
            icon: lucide_react_1.AlertTriangle,
            iconBg: "bg-violet-50",
            iconColor: "text-violet-600",
            barColor: "bg-violet-500"
        },
    ];
    return (react_1["default"].createElement("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-6" }, cards.map(function (_a) {
        var label = _a.label, value = _a.value, total = _a.total, Icon = _a.icon, iconBg = _a.iconBg, iconColor = _a.iconColor, barColor = _a.barColor, badge = _a.badge;
        return (react_1["default"].createElement("div", { key: label, className: "bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow" },
            react_1["default"].createElement("div", { className: "flex justify-between items-start mb-4" },
                react_1["default"].createElement("div", { className: clsx_1["default"]("w-12 h-12 rounded-xl flex items-center justify-center", iconBg) },
                    react_1["default"].createElement(Icon, { size: 24, className: iconColor })),
                badge && (react_1["default"].createElement("span", { className: clsx_1["default"]("text-[10px] font-bold px-2 py-1 rounded-md tracking-wide", badge["class"]) }, badge.label))),
            react_1["default"].createElement("p", { className: "text-sm font-medium text-slate-500 uppercase tracking-wider mb-1" }, label),
            react_1["default"].createElement("div", { className: "flex items-baseline gap-2 mb-4" },
                react_1["default"].createElement("span", { className: "text-3xl font-bold text-slate-900 font-mono tracking-tight" }, value),
                react_1["default"].createElement("span", { className: "text-sm font-medium text-slate-400 font-mono" },
                    "/ ",
                    total)),
            react_1["default"].createElement("div", { className: "w-full h-1.5 bg-slate-100 rounded-full overflow-hidden" },
                react_1["default"].createElement("div", { className: clsx_1["default"]("h-full rounded-full transition-all duration-1000 ease-out", barColor), style: { width: (value / total) * 100 + "%" } })),
            react_1["default"].createElement("p", { className: "text-xs font-medium text-slate-500 mt-2" },
                ((value / total) * 100).toFixed(1),
                "% dari total")));
    })));
});

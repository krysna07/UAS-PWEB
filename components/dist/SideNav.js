"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var AuthContext_1 = require("@/lib/AuthContext");
var react_2 = require("react");
var clsx_1 = require("clsx");
var lucide_react_1 = require("lucide-react");
var link_1 = require("next/link");
var navigation_1 = require("next/navigation");
var navItems = [
    { label: "Dashboard Admin", href: "/", icon: lucide_react_1.LayoutDashboard, adminOnly: true },
    { label: "Data Mahasiswa", href: "/mahasiswa", icon: lucide_react_1.Users, adminOnly: true },
    { label: "Laporan Kehadiran", href: "/laporan", icon: lucide_react_1.FileText, adminOnly: true },
    { label: "Jadwal Kuliah", href: "/jadwal", icon: lucide_react_1.Calendar, adminOnly: true },
    { label: "Hak Akses", href: "/akses", icon: lucide_react_1.Shield, adminOnly: true },
    { label: "Pengaturan", href: "/pengaturan", icon: lucide_react_1.Settings, adminOnly: true },
];
exports["default"] = react_2["default"].memo(function SideNav(_a) {
    var _b = _a.namaAdmin, namaAdmin = _b === void 0 ? "Admin Akademik" : _b, _c = _a.role, role = _c === void 0 ? "Administrator" : _c;
    var pathname = navigation_1.usePathname() || "/";
    var _d = AuthContext_1.useAuth(), userEmail = _d.userEmail, fullName = _d.fullName, isAdmin = _d.isAdmin;
    var _e = react_1.useState(false), isOpen = _e[0], setIsOpen = _e[1];
    react_1.useEffect(function () {
        var handleToggle = function () { return setIsOpen(function (prev) { return !prev; }); };
        window.addEventListener('toggle-sidebar', handleToggle);
        return function () { return window.removeEventListener('toggle-sidebar', handleToggle); };
    }, []);
    var displayNama = fullName ? fullName : (userEmail ? userEmail.split("@")[0].toUpperCase() : namaAdmin);
    var displayRole = isAdmin ? role : "Mahasiswa";
    var filteredNavItems = navItems.filter(function (item) { return isAdmin || !item.adminOnly; });
    return (react_2["default"].createElement(react_2["default"].Fragment, null,
        isOpen && (react_2["default"].createElement("div", { onClick: function () { return setIsOpen(false); }, className: "fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-200" })),
        react_2["default"].createElement("aside", { className: clsx_1["default"]("fixed left-0 top-0 h-full w-64 bg-slate-900 border-r border-slate-800 flex flex-col z-50 transition-transform duration-300 ease-in-out md:translate-x-0", isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:shadow-none") },
            react_2["default"].createElement("div", { className: "flex items-center gap-3 px-6 py-5 border-b border-slate-800" },
                react_2["default"].createElement("div", { className: "w-10 h-10 rounded-xl bg-blue-950 text-blue-400 border border-blue-900/50 flex items-center justify-center" },
                    react_2["default"].createElement(lucide_react_1.GraduationCap, { size: 20 })),
                react_2["default"].createElement("div", null,
                    react_2["default"].createElement("p", { className: "text-sm font-bold text-white tracking-wide" }, "SIGAP"),
                    react_2["default"].createElement("p", { className: "text-xs text-slate-400" }, "Primakara University"))),
            react_2["default"].createElement("div", { className: "mx-4 my-6 p-4 rounded-2xl bg-slate-800/40 border border-slate-800/60" },
                react_2["default"].createElement("div", { className: "flex items-center gap-3 mb-3" },
                    react_2["default"].createElement("div", { className: "w-10 h-10 rounded-full bg-slate-700 text-slate-200 flex items-center justify-center text-sm font-bold uppercase" }, displayNama.charAt(0)),
                    react_2["default"].createElement("div", { className: "flex-1 min-w-0" },
                        react_2["default"].createElement("p", { className: "text-sm font-semibold text-white truncate" }, displayNama),
                        react_2["default"].createElement("p", { className: "text-xs font-semibold text-emerald-400" }, displayRole)))),
            react_2["default"].createElement("nav", { className: "flex-1 px-4 space-y-1.5 overflow-y-auto" },
                react_2["default"].createElement("p", { className: "text-[10px] font-semibold uppercase tracking-wider text-slate-500 px-2 mb-3" }, "Menu Utama"),
                filteredNavItems.map(function (_a) {
                    var label = _a.label, href = _a.href, Icon = _a.icon;
                    var isActive = pathname === href || (pathname.startsWith(href) && href !== "/");
                    return (react_2["default"].createElement(link_1["default"], { key: href, href: href, onClick: function () { return setIsOpen(false); }, className: clsx_1["default"]("flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group", isActive
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                            : "text-slate-400 hover:bg-slate-800/50 hover:text-white") },
                        react_2["default"].createElement(Icon, { size: 18, className: isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200" }),
                        react_2["default"].createElement("span", { className: "flex-1" }, label === "Dashboard" ? (isAdmin ? "Dashboard Admin" : "Dashboard Mahasiswa") : label),
                        isActive && react_2["default"].createElement(lucide_react_1.ChevronRight, { size: 16, className: "text-white" })));
                })),
            react_2["default"].createElement("div", { className: "p-4 border-t border-slate-800" },
                react_2["default"].createElement("div", { className: "flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-950/40 border border-emerald-900/50" },
                    react_2["default"].createElement("div", { className: "relative flex h-2 w-2" },
                        react_2["default"].createElement("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" }),
                        react_2["default"].createElement("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-emerald-500" })),
                    react_2["default"].createElement("span", { className: "text-xs font-medium text-emerald-400" }, "System Online"))))));
});

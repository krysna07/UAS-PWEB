"use client";

import { useState, useEffect } from "react";
import { CourseStatus } from "@/lib/types";
import { useAuth } from "@/lib/AuthContext";
import React from "react";
import clsx from "clsx";
import {
  LayoutDashboard,
  Users,
  Settings,
  Shield,
  GraduationCap,
  ChevronRight,
  FileText,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard Admin", href: "/", icon: LayoutDashboard, adminOnly: true },
  { label: "Data Mahasiswa", href: "/mahasiswa", icon: Users, adminOnly: true },
  { label: "Laporan Kehadiran", href: "/laporan", icon: FileText, adminOnly: true },
  { label: "Pengaturan", href: "/pengaturan", icon: Settings, adminOnly: true },
];

interface SideNavProps {
  namaAdmin?: string;
  role?: string;
}

export default React.memo(function SideNav({ namaAdmin = "Admin Akademik", role = "Administrator" }: SideNavProps) {
  const pathname = usePathname() || "/";
  const { userEmail, fullName, isAdmin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleToggle = () => setIsOpen(prev => !prev);
    window.addEventListener('toggle-sidebar', handleToggle);
    return () => window.removeEventListener('toggle-sidebar', handleToggle);
  }, []);

  const displayNama = fullName ? fullName : (userEmail ? userEmail.split("@")[0].toUpperCase() : namaAdmin);
  const displayRole = role;

  const filteredNavItems = navItems;

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-200"
        />
      )}

      <aside className={clsx(
        "fixed left-0 top-0 h-full w-64 bg-slate-900 border-r border-slate-800 flex flex-col z-50 transition-transform duration-300 ease-in-out md:translate-x-0",
        isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:shadow-none"
      )}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-blue-950 text-blue-400 border border-blue-900/50 flex items-center justify-center">
            <GraduationCap size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-white tracking-wide">SIGAP</p>
            <p className="text-xs text-slate-400">Primakara University</p>
          </div>
        </div>

        {/* Profile Card */}
        <div className="mx-4 my-6 p-4 rounded-2xl bg-slate-800/40 border border-slate-800/60">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-slate-700 text-slate-200 flex items-center justify-center text-sm font-bold uppercase">
              {displayNama.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                {displayNama}
              </p>
              <p className="text-xs font-semibold text-emerald-400">
                {displayRole}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 px-2 mb-3">
            Menu Utama
          </p>
          {filteredNavItems.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href || (pathname.startsWith(href) && href !== "/");
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                )}
              >
                <Icon size={18} className={isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200"} />
                <span className="flex-1">{label}</span>
                {isActive && <ChevronRight size={16} className="text-white" />}
              </Link>
            );
          })}
        </nav>

        {/* System Status */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-950/40 border border-emerald-900/50">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <span className="text-xs font-medium text-emerald-400">System Online</span>
          </div>
        </div>
      </aside>
    </>
  );
});

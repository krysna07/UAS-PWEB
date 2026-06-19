"use client";

import { useState, useEffect } from "react";
import { 
  Bell, 
  ChevronDown, 
  Menu, 
  User, 
  HelpCircle, 
  LogOut, 
  X, 
  CheckCircle2, 
  Shield, 
  Lock, 
  Mail, 
  BookOpen, 
  Phone, 
  ExternalLink 
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/AuthContext";
import React from "react";
import Link from "next/link";
import clsx from "clsx";

interface TopBarProps {
  nama: string;
  semester: number;
  semesterLabel: string;
}

export default React.memo(function TopBar({ nama, semester, semesterLabel }: TopBarProps) {
  const { userEmail, fullName, userNim, isAdmin, setFullName, setUserNim, setUserEmail } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);
  
  // Modals state
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Form edit state
  const [editNama, setEditNama] = useState("");
  const [editNim, setEditNim] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const displayNama = fullName ? fullName : (nama || "Admin");

  const adminNotifications = [
    { id: "a1", type: "request", title: "Pengajuan Sakit Baru", message: "Budi Cahyono mengajukan izin sakit (Surat Dokter dilampirkan).", time: "2 jam lalu", read: false },
    { id: "a2", type: "system", title: "Laporan Mingguan", message: "Laporan persentase kehadiran minggu ke-8 otomatis berhasil di-generate.", time: "09:00", read: false },
    { id: "a3", type: "warning", title: "Notifikasi Presensi WhatsApp", message: "Peringatan otomatis terkirim ke WhatsApp 2 mahasiswa dengan status DANGER.", time: "Kemarin", read: true },
  ];

  const studentNotifications = [
    { id: "s1", type: "status", title: "Kehadiran Diperbarui", message: "Status kehadiran Anda pada mata kuliah Pemrograman Web Lanjut hari ini diset ke HADIR.", time: "1 jam lalu", read: false },
    { id: "s2", type: "warning", title: "Peringatan Kehadiran (DANGER)", message: "Persentase kehadiran Anda berada di bawah batas aman (74% di matkul Aljabar Linier). Segera hubungi dosen.", time: "10:15", read: false },
    { id: "s3", type: "info", title: "Perpindahan Kelas Kuliah", message: "Jadwal kuliah Basis Data Lanjutan besok dipindahkan ke Lab Komputer B.", time: "2 hari lalu", read: true },
  ];

  const notifications = adminNotifications;

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const updatePayload: any = {
        data: { full_name: editNama, nim: editNim }
      };
      if (editEmail && editEmail !== userEmail) {
        updatePayload.email = editEmail;
      }
      if (editPassword) {
        updatePayload.password = editPassword;
      }

      const { data, error } = await supabase.auth.updateUser(updatePayload);
      if (error) throw error;

      // Update local state immediately
      setFullName(editNama);
      setUserNim(editNim);
      if (editEmail) setUserEmail(editEmail);

      setIsProfileModalOpen(false);
      showToast("Profil & Pengaturan berhasil diperbarui!");
    } catch (err: any) {
      alert("Gagal memperbarui profil: " + (err.message || "Pastikan email valid dan password minimal 6 karakter."));
    } finally {
      setIsSaving(false);
    }
  };

  const openProfileModal = () => {
    setEditNama(displayNama);
    setEditNim(userNim || "");
    setEditEmail(userEmail || "");
    setEditPassword("");
    setIsDropdownOpen(false);
    setIsProfileModalOpen(true);
  };

  const now = new Date();
  const dateStr = now.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <header className="fixed top-0 right-0 z-30 flex items-center justify-between px-4 md:px-8 h-20 bg-slate-900 text-white border-b border-slate-800 left-0 md:left-64 transition-all print:hidden">
        <div className="flex items-center gap-3">
          {/* Hamburger button for mobile */}
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('toggle-sidebar'))}
            className="p-2 md:hidden text-white hover:bg-slate-800 rounded-xl transition-colors"
          >
            <Menu size={24} />
          </button>
          <div>
            <h1 className="text-lg md:text-xl font-bold text-white tracking-tight">Dashboard Kehadiran</h1>
            <p className="text-xs md:text-sm text-slate-400 mt-0.5">
              {semesterLabel} • Semester {semester}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Date */}
          <div className="hidden md:flex items-center px-4 py-2 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <span className="text-sm font-medium text-slate-300">{dateStr}</span>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => {
                setIsNotificationOpen(!isNotificationOpen);
                setIsDropdownOpen(false);
              }}
              className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-700"
            >
              <Bell size={20} className="text-slate-300" />
              {hasUnreadNotifications && (
                <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-slate-900" />
              )}
            </button>

            {isNotificationOpen && (
              <>
                <div 
                  onClick={() => setIsNotificationOpen(false)} 
                  className="fixed inset-0 z-40"
                />
                <div className="absolute right-0 top-full mt-2 w-80 md:w-96 bg-white rounded-2xl border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 text-slate-800">
                  <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-800">Notifikasi</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Pemberitahuan sistem SIGAP terbaru.</p>
                    </div>
                    {hasUnreadNotifications && (
                      <button 
                        onClick={() => setHasUnreadNotifications(false)}
                        className="text-[10px] font-bold text-blue-600 hover:text-blue-700"
                      >
                        Tandai semua dibaca
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {notifications.map((notif) => (
                      <div 
                        key={notif.id} 
                        className={clsx(
                          "px-4 py-3 text-left transition-colors hover:bg-slate-50",
                          !notif.read && hasUnreadNotifications ? "bg-blue-50/30" : "bg-white"
                        )}
                      >
                        <div className="flex gap-2.5">
                          <div className={clsx(
                            "w-2 h-2 mt-1.5 rounded-full flex-shrink-0",
                            !notif.read && hasUnreadNotifications ? "bg-blue-600" : "bg-transparent"
                          )} />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-800 flex justify-between gap-2">
                              <span className="truncate">{notif.title}</span>
                              <span className="text-[9px] font-medium text-slate-400 flex-shrink-0 font-mono">{notif.time}</span>
                            </p>
                            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{notif.message}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Profile Dropdown Wrapper */}
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-xl border border-slate-800 bg-slate-800/60 shadow-sm hover:bg-slate-800 transition-colors text-left"
            >
              <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold uppercase">
                {displayNama.charAt(0)}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-bold text-slate-100 leading-none truncate max-w-[150px]">
                  {displayNama}
                </p>
                <p className="text-xs font-mono text-slate-400 mt-1 max-w-[160px] truncate" title={userEmail || "admin@primakara.ac.id"}>
                  {userEmail || "admin@primakara.ac.id"}
                </p>
              </div>
              <ChevronDown size={16} className="text-slate-400 ml-1" />
            </button>

            {isDropdownOpen && (
              <>
                <div 
                  onClick={() => setIsDropdownOpen(false)} 
                  className="fixed inset-0 z-40"
                />
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Informasi Akun</p>
                    <p className="text-sm font-bold text-slate-800 mt-1 truncate">{displayNama}</p>
                    <p className="text-xs text-slate-500 truncate">{userEmail || "admin@primakara.ac.id"}</p>
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      Administrator
                    </div>
                  </div>



                  <div className="py-1">
                      <Link 
                        href="/pengaturan"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                      >
                        <User size={16} className="text-slate-400" />
                        <span>Profil & Pengaturan</span>
                      </Link>

                    <button 
                      onClick={() => { setIsDropdownOpen(false); setIsHelpModalOpen(true); }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors text-left font-normal"
                    >
                      <HelpCircle size={16} className="text-slate-400" />
                      <span>Bantuan & FAQ</span>
                    </button>
                  </div>

                  <div className="pt-1 border-t border-slate-100">
                    <button 
                      onClick={async () => {
                        setIsDropdownOpen(false);
                        localStorage.removeItem("sb_mock_admin_session");
                        await supabase.auth.signOut();
                        window.location.href = "/login";
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors font-semibold"
                    >
                      <LogOut size={16} />
                      <span>Keluar (Logout)</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Logout Button */}
          <button 
            onClick={async () => {
              localStorage.removeItem("sb_mock_admin_session");
              await supabase.auth.signOut();
              window.location.href = "/login";
            }}
            className="px-4 py-2 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-100 rounded-xl transition-colors"
          >
            LOGOUT
          </button>
        </div>
      </header>



      {/* MODAL BANTUAN & FAQ */}
      {isHelpModalOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden text-left my-8">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Pusat Bantuan & FAQ SIGAP</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Solusi kendala kehadiran & presensi mahasiswa.</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setIsHelpModalOpen(false)} 
                  className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              
              <div className="p-6 space-y-6 text-left">
                {/* FAQ List */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pertanyaan Sering Diajukan (FAQ)</h4>
                  
                  <div className="space-y-3">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
                      <p className="text-sm font-bold text-slate-900">1. Bagaimana jika status kehadiran saya salah (alfa padahal hadir)?</p>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Silakan menghubungi Dosen Pengampu mata kuliah atau Admin Akademik maksimal 2x24 jam setelah sesi kelas selesai untuk mengajukan penyesuaian/koreksi presensi.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
                      <p className="text-sm font-bold text-slate-900">2. Bagaimana prosedur pengajuan Izin atau Sakit?</p>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Surat izin atau sertifikat dokter yang sah wajib diserahkan ke bagian Administrasi Akademik atau diunggah sebelum jam perkuliahan dimulai agar status dapat diperbarui.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
                      <p className="text-sm font-bold text-slate-900">3. Berapa syarat minimal kehadiran (SAFE) ujian?</p>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Sesuai peraturan akademik Primakara University, mahasiswa wajib memenuhi minimal 75% kehadiran dari total pertemuan efektif untuk dapat mengikuti UTS/UAS.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Kontak Dukungan */}
                <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h5 className="font-bold text-blue-900 text-sm">Butuh Bantuan Langsung?</h5>
                      <p className="text-xs text-blue-700">Tim Helpdesk Akademik siap membantu Anda.</p>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <a 
                      href="https://wa.me/6289685041084" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex items-center justify-center gap-2 w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm shadow-emerald-200"
                    >
                      <Phone size={14} /> Hubungi via WhatsApp (+62 896-8504-1084)
                    </a>
                    <p className="text-[10px] text-center text-blue-600 font-medium">Jam Layanan: Senin - Jumat (08:00 - 17:00 WITA)</p>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 flex justify-end bg-white">
                <button 
                  type="button" 
                  onClick={() => setIsHelpModalOpen(false)} 
                  className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition-colors"
                >
                  Tutup Pustaka Bantuan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-6 py-3.5 rounded-2xl shadow-2xl border bg-emerald-600 text-white border-emerald-500 animate-in slide-in-from-bottom-4 duration-300">
          <CheckCircle2 size={20} />
          <span className="text-sm font-bold tracking-wide">{toast}</span>
        </div>
      )}
    </>
  );
});

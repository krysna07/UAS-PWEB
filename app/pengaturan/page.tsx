"use client";

import { useState, useEffect } from "react";
import SideNav from "@/components/SideNav";
import TopBar from "@/components/TopBar";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { 
  User, 
  Settings, 
  Lock, 
  Bell, 
  BookOpen, 
  Save, 
  Camera,
  Smartphone,
  Globe,
  Shield,
  CheckCircle2,
  X
} from "lucide-react";
import clsx from "clsx";

type TabType = "profil" | "akademik" | "keamanan" | "notifikasi";

export default function PengaturanPage() {
  const { isAdmin, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthLoading && !isAdmin) {
      router.push('/login');
    }
  }, [isAdmin, isAuthLoading, router]);

  const [activeTab, setActiveTab] = useState<TabType>("profil");
  const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showNotification("Pengaturan berhasil disimpan!");
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <SideNav />
      <TopBar 
        nama="Admin Akademik" 
        semester={4} 
        semesterLabel="Genap 2024/2025" 
      />
      
      <main className="flex-1 md:ml-64 pt-20 pb-12">
        <div className="p-8 max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Pengaturan Sistem</h2>
            <p className="text-sm text-slate-500 mt-1">Kelola preferensi akun dan konfigurasi akademik sistem SIGAP.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Tabs */}
            <div className="w-full md:w-64 space-y-1">
              {[
                { id: "profil", label: "Profil Saya", icon: User },
                { id: "akademik", label: "Konfigurasi Akademik", icon: BookOpen },
                { id: "keamanan", label: "Keamanan", icon: Lock },
                { id: "notifikasi", label: "Notifikasi & WA", icon: Bell },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={clsx(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200",
                    activeTab === tab.id 
                      ? "bg-blue-600 text-white shadow-md shadow-blue-200" 
                      : "text-slate-600 hover:bg-white hover:text-slate-900"
                  )}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <form onSubmit={handleSave} className="p-8 space-y-8">
                
                {activeTab === "profil" && (
                  <div className="space-y-6 animate-in fade-in duration-500">
                    <div className="flex items-center gap-6 pb-6 border-b border-slate-100">
                      <div className="relative group">
                        <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold border-4 border-white shadow-lg">
                          A
                        </div>
                        <button type="button" className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center border-2 border-white shadow-md hover:bg-blue-700 transition-colors">
                          <Camera size={14} />
                        </button>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">Foto Profil</h3>
                        <p className="text-xs text-slate-500 mt-1">PNG, JPG maksimal 2MB.</p>
                        <button type="button" className="text-xs font-bold text-blue-600 mt-2 hover:underline">Hapus Foto</button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Nama Lengkap</label>
                        <input 
                          type="text" 
                          defaultValue="Admin Akademik"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email</label>
                        <input 
                          type="email" 
                          defaultValue="admin@primakara.ac.id"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Jabatan</label>
                        <input 
                          type="text" 
                          defaultValue="Kepala Administrasi"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">NIP / ID Karyawan</label>
                        <input 
                          type="text" 
                          defaultValue="19950821202301"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "akademik" && (
                  <div className="space-y-6 animate-in fade-in duration-500">
                    <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-100 rounded-2xl">
                      <Settings className="text-blue-600" size={20} />
                      <p className="text-xs font-medium text-blue-800">Perubahan pada bagian ini akan berdampak pada seluruh perhitungan statistik dashboard.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h4 className="text-sm font-bold text-slate-900 border-l-4 border-blue-600 pl-3">Periode Aktif</h4>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Semester</label>
                          <select defaultValue="Genap 2024/2025" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm">
                            <option>Ganjil 2024/2025</option>
                            <option>Genap 2024/2025</option>
                            <option>Ganjil 2025/2026</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Total Pertemuan Default</label>
                          <input type="number" defaultValue={16} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-sm font-bold text-slate-900 border-l-4 border-emerald-600 pl-3">Ambang Batas Kehadiran</h4>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Minimal SAFE (%)</label>
                          <input type="number" defaultValue={75} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Threshold SP-1 (%)</label>
                          <input type="number" defaultValue={60} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "keamanan" && (
                  <div className="space-y-6 animate-in fade-in duration-500">
                    <div className="max-w-md space-y-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Password Saat Ini</label>
                        <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Password Baru</label>
                        <input type="password" placeholder="Minimal 8 karakter" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Konfirmasi Password Baru</label>
                        <input type="password" placeholder="Ulangi password baru" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100">
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                            <Shield size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">Two-Factor Authentication (2FA)</p>
                            <p className="text-xs text-slate-500">Tambahkan lapisan keamanan ekstra pada akun Anda.</p>
                          </div>
                        </div>
                        <div className="w-12 h-6 bg-slate-300 rounded-full relative cursor-pointer">
                          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "notifikasi" && (
                  <div className="space-y-6 animate-in fade-in duration-500">
                    <div className="space-y-6">
                      <div className="flex items-start gap-4 p-5 bg-emerald-50 border border-emerald-100 rounded-2xl">
                        <Smartphone className="text-emerald-600 mt-1" size={24} />
                        <div>
                          <h4 className="text-sm font-bold text-emerald-900">Integrasi WhatsApp API</h4>
                          <p className="text-xs text-emerald-700 mt-1 leading-relaxed">Hubungkan sistem dengan gateway WhatsApp untuk mengirim notifikasi kehadiran otomatis kepada mahasiswa dan orang tua.</p>
                          <div className="mt-4 flex gap-2">
                            <button type="button" className="px-3 py-1.5 bg-emerald-600 text-white text-[10px] font-bold rounded-lg uppercase tracking-wider hover:bg-emerald-700 transition-colors">Hubungkan API</button>
                            <button type="button" className="px-3 py-1.5 bg-white text-emerald-600 text-[10px] font-bold rounded-lg uppercase tracking-wider border border-emerald-200 hover:bg-emerald-50 transition-colors">Test Koneksi</button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-sm font-bold text-slate-900">Pengaturan Notifikasi</h4>
                        <div className="space-y-3">
                          {[
                            { label: "Kirim peringatan otomatis saat mahasiswa Alfa 3x", desc: "Mahasiswa akan menerima pesan WhatsApp otomatis.", checked: true },
                            { label: "Laporan mingguan ke email Dosen", desc: "Ringkasan kehadiran kelas dikirim setiap Senin pagi.", checked: false },
                            { label: "Notifikasi login baru", desc: "Dapatkan email jika ada aktivitas login dari perangkat baru.", checked: true },
                          ].map((item, i) => (
                            <label key={i} className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer">
                              <div>
                                <p className="text-sm font-bold text-slate-800">{item.label}</p>
                                <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                              </div>
                              <input type="checkbox" defaultChecked={item.checked} className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-8 border-t border-slate-100 flex justify-end">
                  <button 
                    type="submit"
                    className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-200 active:scale-95"
                  >
                    <Save size={18} />
                    Simpan Semua Perubahan
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Notification Toast */}
      {notification && (
        <div className={clsx(
          "fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-6 py-3.5 rounded-2xl shadow-2xl border animate-in slide-in-from-bottom-4 duration-300",
          notification.type === 'success' 
            ? "bg-emerald-600 text-white border-emerald-500" 
            : "bg-rose-600 text-white border-rose-500"
        )}>
          {notification.type === 'success' ? <CheckCircle2 size={20} /> : <X size={20} />}
          <span className="text-sm font-bold tracking-wide">{notification.message}</span>
        </div>
      )}
    </div>
  );
}

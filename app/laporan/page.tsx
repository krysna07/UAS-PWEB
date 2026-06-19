"use client";

import { useState, useEffect } from "react";
import SideNav from "@/components/SideNav";
import TopBar from "@/components/TopBar";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { generatePDF } from "@/lib/pdf-generator";
import { 
  FileText, 
  Download, 
  Filter, 
  Search, 
  Printer, 
  FilePieChart,
  ChevronDown,
  Loader2,
  Calendar
} from "lucide-react";
import clsx from "clsx";

export default function LaporanPage() {
  const { isAdmin, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthLoading && !isAdmin) {
      router.push('/login');
    }
  }, [isAdmin, isAuthLoading, router]);

  const [isLoading, setIsLoading] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("Semua Mata Kuliah");
  const [selectedSemester, setSelectedSemester] = useState("Genap 2024/2025");
  const [students, setStudents] = useState<any[]>([]);

  const handlePrint = () => {
    try {
      setIsPrinting(true);
      generatePDF({
        elementId: "laporan-container",
        title: "Laporan Kehadiran Mahasiswa"
      });
    } catch (error) {
      console.error("Error printing:", error);
      alert("Gagal membuka print dialog. Silakan coba lagi.");
    } finally {
      setIsPrinting(false);
    }
  };



  useEffect(() => {
    async function fetchReportData() {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('students')
          .select('*')
          .order('nama', { ascending: true });
        
        if (error) throw error;
        if (data) setStudents(data);
      } catch (err) {
        console.error("Error fetching report data:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchReportData();
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50 print:bg-white">
      <div className="print:hidden">
        <SideNav />
      </div>
      <div className="print:hidden">
        <TopBar 
          nama="Admin Akademik" 
          semester={4} 
          semesterLabel="Genap 2024/2025" 
        />
      </div>
      
      <main className="flex-1 md:ml-64 pt-20 pb-12 print:ml-0 print:pt-0 print:pb-0 print:p-0">
        <div id="laporan-container" className="p-8 max-w-7xl mx-auto space-y-8 print:p-0 print:space-y-0 print:max-w-none print:w-full">
          
          {/* Header & Export Actions */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 print:hidden">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  <FileText size={20} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Laporan Kehadiran</h2>
              </div>
              <p className="text-sm text-slate-500">Generate dan unduh rekapitulasi kehadiran mahasiswa secara periodik.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={handlePrint}
                disabled={isPrinting}
                className={clsx(
                  "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm",
                  isPrinting
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                )}
              >
                {isPrinting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Mempersiapkan...
                  </>
                ) : (
                  <>
                    <Printer size={18} />
                    Cetak PDF
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm print:hidden">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mata Kuliah</label>
              <div className="relative">
                <select 
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full appearance-none px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer"
                >
                  <option>Semua Mata Kuliah</option>
                  <option>Pemrograman Web</option>
                  <option>Basis Data Lanjutan</option>
                  <option>Keamanan Data dan Informasi</option>
                  <option>Bisnis dan Digitalisasi UMKM</option>
                  <option>Desain dan Analisis Algoritma</option>
                  <option>Manajemen Proyek Teknologi Informasi</option>
                  <option>Aljabar Linier</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Semester</label>
              <div className="relative">
                <select 
                   value={selectedSemester}
                   onChange={(e) => setSelectedSemester(e.target.value)}
                  className="w-full appearance-none px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer"
                >
                  <option>Ganjil 2023/2024</option>
                  <option>Genap 2023/2024</option>
                  <option>Ganjil 2024/2025</option>
                  <option>Genap 2024/2025</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Urutkan Berdasarkan</label>
              <div className="relative">
                <select className="w-full appearance-none px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer">
                  <option>Nama (A-Z)</option>
                  <option>Persentase Terendah</option>
                  <option>Persentase Tertinggi</option>
                  <option>NIM (0-9)</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-end">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-100 transition-all border border-blue-100">
                <Filter size={18} />
                Terapkan Filter
              </button>
            </div>
          </div>

          {/* Report Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 print:hidden">
            {[
              { 
                label: "Rata-rata Kehadiran", 
                value: students.length > 0 
                  ? `${Math.round(students.reduce((acc, s) => acc + (s.persentase || 0), 0) / students.length)}%` 
                  : "0%", 
                trend: "+2.4%", 
                icon: FilePieChart, 
                color: "text-blue-600", 
                bg: "bg-blue-50" 
              },
              { 
                label: "Mahasiswa Aman", 
                value: students.filter(s => s.status === "SAFE").length, 
                trend: students.length > 0 ? `${Math.round((students.filter(s => s.status === "SAFE").length / students.length) * 100)}%` : "0%", 
                icon: FileText, 
                color: "text-emerald-600", 
                bg: "bg-emerald-50" 
              },
              { 
                label: "Mahasiswa SP", 
                value: students.filter(s => s.status === "SP").length, 
                trend: students.length > 0 ? `${Math.round((students.filter(s => s.status === "SP").length / students.length) * 100)}%` : "0%", 
                icon: Calendar, 
                color: "text-amber-600", 
                bg: "bg-amber-50" 
              },
              { 
                label: "Mahasiswa D.O", 
                value: students.filter(s => s.status === "DO").length, 
                trend: students.length > 0 ? `${Math.round((students.filter(s => s.status === "DO").length / students.length) * 100)}%` : "0%", 
                icon: Filter, 
                color: "text-rose-600", 
                bg: "bg-rose-50" 
              },
            ].map((card, i) => (
              <div key={i} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className={clsx("w-10 h-10 rounded-xl flex items-center justify-center", card.bg)}>
                    <card.icon size={20} className={card.color} />
                  </div>
                  <span className={clsx("text-[10px] font-black px-2 py-1 rounded-lg", card.bg, card.color)}>
                    {card.trend}
                  </span>
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{card.label}</p>
                <p className="text-2xl font-black text-slate-900 mt-1">{card.value}</p>
              </div>
            ))}
          </div>

          {/* Main Report Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden print:border-none print:shadow-none print:rounded-none">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between print:px-0">
              <h3 className="font-bold text-slate-900 print:text-xl">Rekapitulasi Kehadiran Mahasiswa</h3>
              <div className="relative print:hidden">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text"
                  placeholder="Cari NIM/Nama..."
                  className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Mahasiswa</th>
                    <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Hadir</th>
                    <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Alfa</th>
                    <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Izin/Sakit</th>
                    <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">% Kehadiran</th>
                    <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status Akhir</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {isLoading ? (
                    <tr>
                      <td colSpan={6} className="py-20 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                          <p className="text-sm font-medium text-slate-500">Menyusun laporan...</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    students.map((s, i) => {
                      const mhs = s.mahasiswa || s;
                      return (
                        <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 px-6">
                            <p className="text-sm font-bold text-slate-900">{mhs.nama}</p>
                            <p className="text-[10px] font-mono text-slate-500 mt-0.5">{mhs.nim} &bull; {mhs.program_studi}</p>
                          </td>
                          <td className="py-4 px-6 text-center text-sm font-bold text-slate-700">{s.hadir || 0}</td>
                          <td className="py-4 px-6 text-center text-sm font-bold text-rose-600">{s.alfa || 0}</td>
                          <td className="py-4 px-6 text-center text-sm font-bold text-slate-700">{(s.izin || 0) + (s.sakit || 0)}</td>
                          <td className="py-4 px-6 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <div className="flex-1 max-w-[60px] bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                <div 
                                  className={clsx(
                                    "h-full rounded-full",
                                    (s.persentase || 0) >= 75 ? "bg-emerald-500" : "bg-rose-500"
                                  )} 
                                  style={{ width: `${s.persentase || 0}%` }} 
                                />
                              </div>
                              <span className="text-xs font-black font-mono text-slate-700">{s.persentase || 0}%</span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <span className={clsx(
                              "inline-flex px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide border uppercase",
                              s.status === "SAFE" ? "bg-emerald-50 text-emerald-700 border-emerald-100 print:bg-transparent print:border-emerald-600 print:text-emerald-700" :
                              s.status === "DO" ? "bg-rose-50 text-rose-700 border-rose-100 print:bg-transparent print:border-rose-600 print:text-rose-700" :
                              "bg-amber-50 text-amber-700 border-amber-100 print:bg-transparent print:border-amber-600 print:text-amber-700"
                            )}>
                              {s.status || "N/A"}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

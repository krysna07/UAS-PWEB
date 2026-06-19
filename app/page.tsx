"use client";

import { useState, useEffect, useMemo } from "react";
import SideNav from "@/components/SideNav";
import TopBar from "@/components/TopBar";
import StatusCards from "@/components/StatusCards";
import { MOCK_ADMIN_DATA } from "@/lib/mock-data";
import { useAuth } from "@/lib/AuthContext";
import { Plus, MoreVertical, X, Loader2, Trash2, Edit2, MessageCircle, ExternalLink, CheckCircle2 } from "lucide-react";
import clsx from "clsx";
import { AttendanceStatus, StudentAttendanceSummary } from "@/lib/types";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

function getStatusBadge(status: string) {
  switch (status) {
    case "SAFE": return { label: "AMAN", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" };
    case "SP1": return { label: "SP-1", bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" };
    case "SP2": return { label: "SP-2", bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" };
    case "DO": return { label: "D.O", bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" };
    default: return { label: "N/A", bg: "bg-slate-50", text: "text-slate-700", border: "border-slate-200" };
  }
}

function getDotColor(status: AttendanceStatus | undefined) {
  if (!status) return "bg-slate-200";
  switch (status) {
    case "hadir": return "bg-emerald-500";
    case "alfa": return "bg-rose-500";
    case "izin": return "bg-amber-500";
    case "sakit": return "bg-violet-500";
    default: return "bg-slate-200";
  }
}

export default function Home() {
  const { 
    mata_kuliah, 
    semester_aktif, 
    students 
  } = MOCK_ADMIN_DATA;

  // Get auth from context
  const { isAdmin, userEmail, fullName, userNim, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();

  // Check admin access
  useEffect(() => {
    if (!isAuthLoading && !isAdmin) {
      router.push('/login');
    }
  }, [isAdmin, isAuthLoading, router]);
  const [studentList, setStudentList] = useState<StudentAttendanceSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<any>(null);
  const [formData, setFormData] = useState({ 
    nim: '', 
    nama: '', 
    prodi: 'Teknologi Informasi', 
    jk: 'L',
    matkul: 'Pemrograman Web Lanjut',
    hadir: 0,
    alfa: 0,
    izin: 0,
    sakit: 0,
    phone: ''
  });
  const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Fetch student data from database
  useEffect(() => {
    async function fetchStudents() {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('students')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          // Fallback to mock data if table doesn't exist or error occurs
          setStudentList(students);
        } else if (data && data.length > 0) {
          // Map database format back to our nested interface if needed
          // Assuming the table structure matches our requirements
          setStudentList(data);
        } else {
          // If no data in Supabase, use mock data as initial seed
          setStudentList(students);
        }
      } catch (err) {
        setStudentList(students);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStudents();
  }, []);

  // Dynamic calculations (memoized to prevent unnecessary recalculations)
  const stats = useMemo(() => {
    const totalMahasiswa = studentList.length;
    const totalHadir = studentList.reduce((acc, curr) => acc + curr.hadir, 0);
    const totalAlfa = studentList.reduce((acc, curr) => acc + curr.alfa, 0);
    const totalIzin = studentList.reduce((acc, curr) => acc + curr.izin, 0);
    const totalSakit = studentList.reduce((acc, curr) => acc + curr.sakit, 0);
    const totalSemuaPertemuan = studentList.reduce((acc, curr) => acc + curr.total_pertemuan, 0);
    const persentaseGlobal = totalSemuaPertemuan > 0 ? Math.round((totalHadir / totalSemuaPertemuan) * 100) : 0;
    
    return { totalMahasiswa, totalHadir, totalAlfa, totalIzin, totalSakit, totalSemuaPertemuan, persentaseGlobal };
  }, [studentList]);

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const total = Number(formData.hadir) + Number(formData.alfa) + Number(formData.izin) + Number(formData.sakit);
    const persentase = Math.round((Number(formData.hadir) / 16) * 100);
    
    // Status logic based on percentage
    let status: any = "DO";
    if (persentase >= 75) status = "SAFE";
    else if (persentase >= 60) status = "SP1";
    else if (persentase >= 50) status = "SP2";

    // Create detail array based on counts (Hadir first, then others)
    const detail = [
      ...Array(Number(formData.hadir)).fill("hadir"),
      ...Array(Number(formData.alfa)).fill("alfa"),
      ...Array(Number(formData.izin)).fill("izin"),
      ...Array(Number(formData.sakit)).fill("sakit"),
    ];
    // Pad with nulls to 16
    while (detail.length < 16) detail.push(null);
    // Slice if somehow exceeds 16
    const finalDetail = detail.slice(0, 16);

    const newStudentData: any = {
      nim: formData.nim,
      nama: formData.nama,
      program_studi: formData.prodi,
      jenis_kelamin: formData.jk,
      mata_kuliah_aktif: formData.matkul,
      phone: formData.phone,
      semester: 4,
      angkatan: 2024,
      total_pertemuan: 16,
      hadir: Number(formData.hadir),
      alfa: Number(formData.alfa),
      izin: Number(formData.izin),
      sakit: Number(formData.sakit),
      persentase: persentase,
      status: status,
      detail: finalDetail
    };

    try {
      if (editingStudent) {
        // UPDATE Logic
        const { data, error } = await supabase
          .from('students')
          .update(newStudentData)
          .eq('id', editingStudent.id)
          .select();

        if (error) throw error;
        setStudentList(studentList.map(s => (s as any).id === editingStudent.id ? data[0] : s));
        showNotification("Data mahasiswa berhasil diperbarui!");
      } else {
        // INSERT Logic
        const { data, error } = await supabase
          .from('students')
          .insert([newStudentData])
          .select();

        if (error) {
          console.error("Error inserting student:", error);
          showNotification("Gagal menyimpan data ke Supabase.", "error");
        } else if (data) {
          setStudentList([data[0], ...studentList]);
          showNotification("Mahasiswa baru berhasil ditambahkan!");
        }
      }
    } catch (err) {
      console.error("Supabase operation error:", err);
      showNotification("Terjadi kesalahan saat menyimpan data.", "error");
    }

    setIsModalOpen(false);
    setEditingStudent(null);
    setFormData({ 
      nim: '', 
      nama: '', 
      prodi: 'Teknologi Informasi', 
      jk: 'L', 
      matkul: 'Pemrograman Web Lanjut',
      hadir: 0,
      alfa: 0,
      izin: 0,
      sakit: 0,
      phone: ''
    });
  };

  const handleDeleteStudent = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus data mahasiswa ini?")) return;
    
    try {
      const { error } = await supabase
        .from('students')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setStudentList(studentList.filter(s => ((s as any).id || (s as any).mahasiswa?.id) !== id));
      showNotification("Data mahasiswa berhasil dihapus.");
    } catch (err) {
      console.error("Delete error:", err);
      showNotification("Gagal menghapus data.", "error");
    }
  };

  const handleEditClick = (student: any) => {
    const mhs = student.mahasiswa || student;
    setEditingStudent(student);
    setFormData({
      nim: mhs.nim,
      nama: mhs.nama,
      prodi: mhs.program_studi,
      jk: mhs.jenis_kelamin,
      matkul: student.mata_kuliah_aktif || 'Pemrograman Web Lanjut',
      hadir: student.hadir,
      alfa: student.alfa,
      izin: student.izin,
      sakit: student.sakit,
      phone: student.phone || ''
    });
    setIsModalOpen(true);
  };

  const openWhatsApp = (student: any) => {
    const mhs = student.mahasiswa || student;
    const phone = student.phone || "";
    if (!phone) {
      alert("Nomor WA tidak tersedia. Silakan edit data mahasiswa untuk menambahkan nomor.");
      return;
    }
    const message = `Halo ${mhs.nama}, saya Admin Akademik. Kami memperhatikan kehadiran Anda di mata kuliah ${student.mata_kuliah_aktif || 'Pemrograman Web Lanjut'} saat ini memiliki status ${student.status}. Mohon segera menghubungi dosen pengampu.`;
    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const adminName = userEmail ? userEmail.split("@")[0].toUpperCase() : "Admin Akademik";

  return (
    <div className="flex min-h-screen bg-slate-50 relative">
      <SideNav namaAdmin={adminName} role="Administrator" />
      
      <TopBar
        nama="Admin Akademik"
        semester={4}
        semesterLabel={semester_aktif}
      />
      
      <main className="flex-1 md:ml-64 pt-20 pb-12">
        <div className="p-8 max-w-7xl mx-auto space-y-8">
          
          {isLoading && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-white/60 backdrop-blur-[2px]">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                <p className="text-sm font-bold text-slate-600 animate-pulse">Menghubungkan ke Supabase...</p>
              </div>
            </div>
          )}
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard Admin</h2>
              <p className="text-slate-500 text-sm mt-1">
                Total Seluruh Kelas: {stats.totalMahasiswa} Mahasiswa
              </p>
            </div>
            <div className="px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
              <span className="text-sm font-medium text-slate-500">Rata-rata Kelas</span>
              <span className="text-2xl font-black text-blue-600 font-mono tracking-tight">{stats.persentaseGlobal}%</span>
            </div>
          </div>

          <StatusCards
            hadir={stats.totalHadir}
            alfa={stats.totalAlfa}
            izin={stats.totalIzin}
            sakit={stats.totalSakit}
            total={stats.totalSemuaPertemuan}
            persentase={stats.persentaseGlobal}
          />

          {/* Charts & Leaderboard */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Bar Chart */}
            <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6 tracking-tight">Statistik Kehadiran Keseluruhan</h3>
              <div className="h-48 flex items-stretch justify-around gap-4 mt-8 px-4">
                {[
                  { label: "Hadir", value: stats.totalHadir, color: "bg-emerald-500" },
                  { label: "Alfa", value: stats.totalAlfa, color: "bg-rose-500" },
                  { label: "Izin", value: stats.totalIzin, color: "bg-amber-500" },
                  { label: "Sakit", value: stats.totalSakit, color: "bg-violet-500" },
                ].map((stat, i) => {
                  const max = Math.max(stats.totalHadir, stats.totalAlfa, stats.totalIzin, stats.totalSakit, 1);
                  const height = `${(stat.value / max) * 100}%`;
                  return (
                    <div key={i} className="flex flex-col items-center flex-1 group justify-end">
                      <span className="text-sm font-bold text-slate-700 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">{stat.value}</span>
                      <div className="w-16 bg-slate-50 rounded-t-xl relative flex items-end flex-1">
                        <div 
                          className={clsx("w-full rounded-t-xl transition-all duration-1000", stat.color)} 
                          style={{ height }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-slate-500 mt-3 uppercase tracking-wider">{stat.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Leaderboard Alfa */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6 tracking-tight">Top 3 Terbanyak Alfa</h3>
              <div className="space-y-4">
                {(() => {
                  const filteredStudents = [...studentList]
                    .filter(student => student.alfa > 0)
                    .sort((a, b) => b.alfa - a.alfa)
                    .slice(0, 3);

                  if (filteredStudents.length === 0) {
                    return (
                      <div className="py-8 text-center text-slate-400 italic text-sm">
                        Tidak ada mahasiswa dengan riwayat alfa.
                      </div>
                    );
                  }

                  return filteredStudents.map((student, i) => {
                    const mhs = (student as any).mahasiswa || student;
                    const id = mhs.id || (student as any).id;
                    const nama = mhs.nama;
                    const nim = mhs.nim;
                    
                    return (
                      <div key={id} className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                        <div className={clsx(
                          "w-10 h-10 flex items-center justify-center rounded-xl font-black text-lg",
                          i === 0 ? "bg-rose-100 text-rose-600" :
                          i === 1 ? "bg-orange-100 text-orange-600" :
                          "bg-amber-100 text-amber-600"
                        )}>
                          #{i + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-slate-900 truncate">{nama}</p>
                          <p className="text-xs text-slate-500 font-mono mt-0.5">{nim}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-black text-rose-600 leading-none">{student.alfa}</p>
                          <p className="text-[9px] uppercase font-bold text-slate-400 mt-1">Alfa</p>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          </div>

          {/* Table Component */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Daftar Kehadiran Mahasiswa</h2>
                <p className="text-xs text-slate-500 mt-1">16 Pertemuan per Semester</p>
              </div>
              <button 
                onClick={() => {
                  setEditingStudent(null);
                  setFormData({ 
                    nim: '', 
                    nama: '', 
                    prodi: 'Teknologi Informasi', 
                    jk: 'L', 
                    matkul: 'Pemrograman Web Lanjut',
                    hadir: 0,
                    alfa: 0,
                    izin: 0,
                    sakit: 0,
                    phone: ''
                  });
                  setIsModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
              >
                <Plus size={18} />
                Tambah Mahasiswa
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="py-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-12 text-center">No</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-28">NIM</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider min-w-[180px]">Mahasiswa</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Mata Kuliah</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">L/P</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Kehadiran (16x)</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">% Hadir</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Status</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {studentList.map((student, idx) => {
                    const badge = getStatusBadge(student.status);
                    // Handle both Supabase flat structure and Mock nested structure
                    const mhs = (student as any).mahasiswa || student;
                    const id = mhs.id || (student as any).id;
                    const nim = mhs.nim;
                    const nama = mhs.nama;
                    const prodi = mhs.program_studi;
                    const jk = mhs.jenis_kelamin;
                    const detail = student.detail || Array(16).fill(null);

                    return (
                      <tr key={id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-4 text-sm text-slate-500 text-center font-medium">
                          {idx + 1}
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm font-mono text-slate-700 bg-slate-100 px-2 py-1 rounded-md">{nim}</span>
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-sm font-bold text-slate-900">{nama}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{prodi}</p>
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-sm font-medium text-slate-800">{student.mata_kuliah_aktif || mata_kuliah.nama}</p>
                          <p className="text-[10px] text-slate-400 font-mono mt-0.5">{mata_kuliah.kode}</p>
                        </td>
                        <td className="py-4 px-4 text-sm font-medium text-slate-600 text-center">
                          {jk}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1.5 flex-wrap w-[180px]">
                            {detail.map((status: any, i: number) => (
                              <div 
                                key={i} 
                                title={`Pertemuan ${i + 1}: ${status || 'Belum'}`}
                                className={clsx("w-2.5 h-2.5 rounded-full cursor-help transition-transform hover:scale-125", getDotColor(status))}
                              />
                            ))}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className={clsx(
                            "text-sm font-bold font-mono",
                            student.persentase >= 75 ? "text-emerald-600" : (student.persentase > 0 ? "text-rose-600" : "text-slate-400")
                          )}>
                            {student.persentase}%
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className={clsx("inline-flex px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide border", badge.bg, badge.text, badge.border)}>
                            {badge.label}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <button 
                              onClick={() => handleEditClick(student)}
                              className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit Data"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button 
                              onClick={() => openWhatsApp(student)}
                              className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                              title="Kirim Peringatan WA"
                            >
                              <MessageCircle size={16} />
                            </button>
                            <button 
                              onClick={() => handleDeleteStudent(id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Hapus Data"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center gap-4 justify-center sm:justify-start">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2">Keterangan:</span>
              {[
                { color: "bg-emerald-500", label: "Hadir" },
                { color: "bg-rose-500", label: "Alfa" },
                { color: "bg-amber-500", label: "Izin" },
                { color: "bg-violet-500", label: "Sakit" },
                { color: "bg-slate-200", label: "Belum" },
              ].map(({ color, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div className={clsx("w-2 h-2 rounded-full", color)} />
                  <span className="text-xs font-medium text-slate-500">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Modal Tambah Mahasiswa */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">
                  {editingStudent ? 'Update Data Mahasiswa' : 'Tambah Mahasiswa Baru'}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Lengkapi informasi mahasiswa di bawah ini.
                </p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            
            <form onSubmit={handleAddStudent} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">NIM</label>
                <input 
                  required 
                  type="text" 
                  value={formData.nim} 
                  onChange={e => setFormData({...formData, nim: e.target.value})} 
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm transition-all bg-slate-50"
                  placeholder="Masukkan NIM..." 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nama Lengkap</label>
                <input 
                  required 
                  type="text" 
                  value={formData.nama} 
                  onChange={e => setFormData({...formData, nama: e.target.value})} 
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm transition-all bg-slate-50"
                  placeholder="Masukkan Nama Lengkap..." 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">No. WhatsApp (Contoh: 628123...)</label>
                <input 
                  type="text" 
                  value={formData.phone} 
                  onChange={e => setFormData({...formData, phone: e.target.value})} 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm transition-all" 
                  placeholder="628123456789" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Mata Kuliah</label>
                <select 
                  value={formData.matkul} 
                  onChange={e => setFormData({...formData, matkul: e.target.value})} 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm transition-all"
                >
                  <option value="Pemrograman Web">1. Pemrograman Web</option>
                  <option value="Basis Data Lanjutan">2. Basis Data Lanjutan</option>
                  <option value="Keamanan Data dan Informasi">3. Keamanan Data dan Informasi</option>
                  <option value="Bisnis dan Digitalisasi UMKM">4. Bisnis dan Digitalisasi UMKM</option>
                  <option value="Desain dan Analisis Algoritma">5. Desain dan Analisis Algoritma</option>
                  <option value="Manajemen Projek Teknologi Informasi">6. Manajemen Projek Teknologi Informasi</option>
                  <option value="Aljabar Linear">7. Aljabar Linear</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Program Studi</label>
                  <select 
                    value={formData.prodi} 
                    onChange={e => setFormData({...formData, prodi: e.target.value})} 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm transition-all"
                  >
                    <option value="Teknologi Informasi">Teknologi Informasi</option>
                    <option value="Sistem Informasi">Sistem Informasi</option>
                    <option value="Informatika">Informatika</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Jenis Kelamin</label>
                  <select 
                    value={formData.jk} 
                    onChange={e => setFormData({...formData, jk: e.target.value})} 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm transition-all"
                  >
                    <option value="L">Laki-laki (L)</option>
                    <option value="P">Perempuan (P)</option>
                  </select>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 space-y-4">
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Detail Kehadiran (Max 16 Pertemuan)</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">Jumlah Hadir</label>
                    <input 
                      type="number" 
                      max="16"
                      min="0"
                      value={formData.hadir} 
                      onChange={e => setFormData({...formData, hadir: parseInt(e.target.value) || 0})} 
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">Jumlah Alfa</label>
                    <input 
                      type="number" 
                      max="16"
                      min="0"
                      value={formData.alfa} 
                      onChange={e => setFormData({...formData, alfa: parseInt(e.target.value) || 0})} 
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">Jumlah Izin</label>
                    <input 
                      type="number" 
                      max="16"
                      min="0"
                      value={formData.izin} 
                      onChange={e => setFormData({...formData, izin: parseInt(e.target.value) || 0})} 
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">Jumlah Sakit</label>
                    <input 
                      type="number" 
                      max="16"
                      min="0"
                      value={formData.sakit} 
                      onChange={e => setFormData({...formData, sakit: parseInt(e.target.value) || 0})} 
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                    />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-blue-100">
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Total Kelas</label>
                  <input 
                    type="text" 
                    readOnly 
                    value="16 Kali Pertemuan" 
                    className="w-full px-3 py-2 bg-blue-100/50 border border-blue-200 rounded-lg text-sm text-blue-700 font-bold outline-none cursor-not-allowed" 
                  />
                </div>
              </div>
              
              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="flex-1 px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-sm font-semibold transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
                >
                  {editingStudent ? 'Simpan Perubahan' : 'Simpan Data'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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

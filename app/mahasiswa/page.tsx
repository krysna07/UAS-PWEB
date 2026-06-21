"use client";

import { useState, useEffect } from "react";
import SideNav from "@/components/SideNav";
import TopBar from "@/components/TopBar";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { 
  Loader2, 
  Users, 
  Search, 
  Filter, 
  UserPlus, 
  X, 
  CheckCircle2, 
  XCircle,
  Plus,
  ChevronLeft,
  ChevronRight,
  Database
} from "lucide-react";
import clsx from "clsx";

export default function MahasiswaPage() {
  const { isAdmin, userEmail, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();
  
  // Check admin access
  useEffect(() => {
    if (!isAuthLoading && !isAdmin) {
      router.push('/login');
    }
  }, [isAdmin, isAuthLoading, router]);
  
  const [students, setStudents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
  
  const [formData, setFormData] = useState({
    nim: "",
    nama: "",
    program_studi: "Informatika",
    jenis_kelamin: "L",
    angkatan: new Date().getFullYear().toString()
  });

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // 5. Debounce Search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1); // Reset halaman ke 1 setiap kali mencari sesuatu yang baru
    }, 500); // Tunggu 500ms setelah user berhenti mengetik
    
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // 1. Pagination & Server-Side Filtering (Nomer 1)
  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      // Mulai dengan query dasar
      let query = supabase
        .from('students')
        .select('*', { count: 'exact' }); // Tambahkan penghitung total data

      // Jika ada pencarian, gunakan filter ILIKE dari database
      if (debouncedSearch) {
        query = query.or(`nim.ilike.%${debouncedSearch}%,nama.ilike.%${debouncedSearch}%`);
      }

      // Ambil data dengan Pagination menggunakan .range()
      const { data, error, count } = await query
        .order('nim', { ascending: true })
        .range((page - 1) * itemsPerPage, page * itemsPerPage - 1);

      if (error) throw error;
      
      if (data) {
        setStudents(data);
      }
      
      if (count !== null) {
        setTotalItems(count);
        setTotalPages(Math.ceil(count / itemsPerPage));
      }
    } catch (err) {
      console.error("Error fetching students:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [page, debouncedSearch]); // Akan fetch ulang setiap kali halaman atau pencarian (yang sudah di-debounce) berubah

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Check if student with same NIM already exists
      const { data: existingStudent, error: checkError } = await supabase
        .from('students')
        .select('id, nama')
        .eq('nim', formData.nim)
        .maybeSingle();

      if (checkError) {
        console.error("Error checking existing student:", checkError);
      }

      if (existingStudent) {
        showNotification(`Mahasiswa dengan NIM ${formData.nim} sudah terdaftar (${existingStudent.nama})!`, "error");
        return;
      }

      const { error } = await supabase
        .from('students')
        .insert([formData]);

      if (error) throw error;

      showNotification("Mahasiswa berhasil ditambahkan!");
      fetchStudents();
      setIsModalOpen(false);
      setFormData({
        nim: "",
        nama: "",
        program_studi: "Informatika",
        jenis_kelamin: "L",
        angkatan: new Date().getFullYear().toString()
      });
    } catch (err: any) {
      showNotification(err.message, "error");
    }
  };

  // 2. Batch Insert (Nomer 2)
  const handleBatchInsert = async () => {
    if (!confirm("Apakah Anda yakin ingin menambahkan 50 data dummy mahasiswa secara masal?")) return;
    
    setIsLoading(true);
    try {
      // Buat Array berisi 50 data
      const dummyData = Array.from({ length: 50 }).map((_, i) => {
        const randomId = Math.floor(Math.random() * 9000) + 1000;
        return {
          nim: `240102${randomId}`,
          nama: `Mahasiswa Dummy ${randomId}`,
          program_studi: "Informatika",
          jenis_kelamin: Math.random() > 0.5 ? "L" : "P",
          angkatan: "2024",
          hadir: 12,
          alfa: 0,
          izin: 0,
          sakit: 0,
          persentase: 100,
          status: "SAFE"
        };
      });

      // LANGSUNG INSERT 1 ARRAY (BATCH INSERT) - Tidak pakai for loop!
      const { error } = await supabase
        .from('students')
        .insert(dummyData);

      if (error) throw error;

      showNotification("50 Data Dummy berhasil di-Batch Insert!");
      fetchStudents();
    } catch (err: any) {
      showNotification(err.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const adminName = userEmail ? userEmail.split("@")[0].toUpperCase() : "Admin Akademik";

  return (
    <div className="flex min-h-screen bg-slate-50">
      <SideNav namaAdmin={adminName} role="Administrator" />
      <TopBar 
        nama="Admin Akademik" 
        semester={4} 
        semesterLabel="Genap 2024/2025" 
      />
      
      <main className="flex-1 md:ml-64 pt-20 pb-12">
        <div className="p-8 max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Database Mahasiswa</h2>
              <p className="text-sm text-slate-500 mt-1">Daftar seluruh mahasiswa yang terdaftar di sistem.</p>
            </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleBatchInsert}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-sm font-semibold transition-all shadow-sm"
                >
                  <Database size={18} />
                  Generate 50 Dummy (Batch)
                </button>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm shadow-blue-200"
                >
                  <UserPlus size={18} />
                  Tambah Mahasiswa
                </button>
              </div>
          </div>

          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text"
                placeholder="Cari NIM atau Nama..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 flex items-center gap-2 hover:bg-slate-50 transition-colors">
              <Filter size={18} />
              <span className="text-sm font-medium">Filter</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            {isLoading ? (
              <div className="p-20 flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                <p className="text-slate-500 font-medium">Memuat data mahasiswa...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">No</th>
                      <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">NIM</th>
                      <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Nama Mahasiswa</th>
                      <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Prodi</th>
                      <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">L/P</th>
                      <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Angkatan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {students.length > 0 ? (
                      students.map((student, idx) => {
                        const mhs = student.mahasiswa || student;
                        return (
                          <tr key={mhs.id || student.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="py-4 px-6 text-sm text-slate-500">{(page - 1) * itemsPerPage + idx + 1}</td>
                            <td className="py-4 px-6">
                              <span className="text-sm font-mono text-slate-700 bg-slate-100 px-2 py-1 rounded-md">{mhs.nim}</span>
                            </td>
                            <td className="py-4 px-6 text-sm font-bold text-slate-900">{mhs.nama}</td>
                            <td className="py-4 px-6 text-sm text-slate-600">{mhs.program_studi}</td>
                            <td className="py-4 px-6 text-sm text-center text-slate-600">{mhs.jenis_kelamin}</td>
                            <td className="py-4 px-6 text-sm text-slate-600">{mhs.angkatan || 2024}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-20 text-center text-slate-400 italic">
                          Tidak ada data mahasiswa ditemukan.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {!isLoading && totalPages > 0 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-slate-500">
                Menampilkan <span className="font-semibold text-slate-900">{(page - 1) * itemsPerPage + 1}</span> hingga <span className="font-semibold text-slate-900">{Math.min(page * itemsPerPage, totalItems)}</span> dari <span className="font-semibold text-slate-900">{totalItems}</span> mahasiswa
              </p>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={18} className="text-slate-600" />
                </button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                    // Logika sederhana untuk menampilkan 5 halaman di sekitar halaman saat ini
                    let pageNum = page;
                    if (totalPages <= 5) pageNum = i + 1;
                    else if (page <= 3) pageNum = i + 1;
                    else if (page >= totalPages - 2) pageNum = totalPages - 4 + i;
                    else pageNum = page - 2 + i;

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={clsx(
                          "w-9 h-9 rounded-lg text-sm font-medium transition-colors",
                          page === pageNum 
                            ? "bg-blue-600 text-white shadow-sm shadow-blue-200" 
                            : "text-slate-600 hover:bg-slate-100"
                        )}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button 
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={18} className="text-slate-600" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modal Tambah Mahasiswa */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Tambah Mahasiswa Baru</h3>
                <p className="text-xs text-slate-500 mt-1">Daftarkan mahasiswa baru ke dalam database.</p>
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
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">NIM (Nomor Induk Mahasiswa)</label>
                <input 
                  required 
                  type="text" 
                  value={formData.nim} 
                  onChange={e => setFormData({...formData, nim: e.target.value})} 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm transition-all" 
                  placeholder="Contoh: 2301010001" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nama Lengkap</label>
                <input 
                  required 
                  type="text" 
                  value={formData.nama} 
                  onChange={e => setFormData({...formData, nama: e.target.value})} 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm transition-all" 
                  placeholder="Contoh: Budi Cahyono" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Program Studi</label>
                <select 
                  value={formData.program_studi} 
                  onChange={e => setFormData({...formData, program_studi: e.target.value})} 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm transition-all"
                >
                  <option value="Informatika">Informatika</option>
                  <option value="Sistem Informasi">Sistem Informasi</option>
                  <option value="Desain Komunikasi Visual">Desain Komunikasi Visual</option>
                  <option value="Bisnis Digital">Bisnis Digital</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Jenis Kelamin</label>
                  <select 
                    value={formData.jenis_kelamin} 
                    onChange={e => setFormData({...formData, jenis_kelamin: e.target.value})} 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm transition-all"
                  >
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Angkatan</label>
                  <input 
                    required 
                    type="number" 
                    value={formData.angkatan} 
                    onChange={e => setFormData({...formData, angkatan: e.target.value})} 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm transition-all" 
                    placeholder="2024" 
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
                  Simpan Data
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
          {notification.type === 'success' ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
          <span className="text-sm font-bold tracking-wide">{notification.message}</span>
        </div>
      )}
    </div>
  );
}


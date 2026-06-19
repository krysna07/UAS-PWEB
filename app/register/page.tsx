"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  GraduationCap, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Loader2, 
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  User
} from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: nama,
            nim: nim,
          }
        }
      });

      if (error) {
        throw error;
      }

      setSuccess("Pendaftaran berhasil! Silakan periksa email Anda untuk verifikasi atau langsung login.");
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Gagal mendaftar. Pastikan email belum terdaftar dan password minimal 6 karakter.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-900 py-12">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 scale-110 blur-[2px] opacity-40"
        style={{ 
          backgroundImage: `url('/campus_background_abstract.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Animated Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Branding */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center mb-4 shadow-2xl">
            <GraduationCap className="text-blue-400" size={32} />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">SIGAP</h1>
          <p className="text-blue-200/60 text-sm font-medium mt-1 tracking-wide uppercase">Pendaftaran Akun Baru</p>
        </div>

        {/* Register Card */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white">Buat Akun Portal</h2>
            <p className="text-slate-400 text-sm mt-1">Daftarkan email akademik Anda untuk mengakses sistem.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            {error && (
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3.5 rounded-2xl flex items-center gap-3 text-xs font-bold animate-in fade-in slide-in-from-top-2 duration-300">
                <AlertCircle size={16} className="flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-3.5 rounded-2xl flex items-center gap-3 text-xs font-bold animate-in fade-in slide-in-from-top-2 duration-300">
                <CheckCircle2 size={16} className="flex-shrink-0" />
                <span>{success}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-widest ml-1">Nama Lengkap</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                <input 
                  required
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Budi Cahyono"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-widest ml-1">Nomor Induk Mahasiswa (NIM)</label>
              <div className="relative group">
                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                <input 
                  required
                  type="text"
                  value={nim}
                  onChange={(e) => setNim(e.target.value)}
                  placeholder="2401020095"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm font-mono"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-widest ml-1">Email Akademik</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                <input 
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="budi@primakara.ac.id"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                <input 
                  required
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-12 text-white placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              disabled={isLoading}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white rounded-2xl py-4 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/20 active:scale-[0.98] mt-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Mendaftarkan Akun...
                </>
              ) : (
                <>
                  Daftar Sekarang
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-slate-400">
              Sudah punya akun?{" "}
              <Link href="/login" className="font-bold text-blue-400 hover:text-blue-300 transition-colors">
                Masuk di sini
              </Link>
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10">
            <div className="flex items-center justify-center gap-2 text-slate-500">
              <ShieldCheck size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Secure SSL Encryption</span>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-slate-500 text-[10px] font-medium uppercase tracking-[0.2em]">
          &copy; 2024 Primakara University &bull; Made with &hearts; for Education
        </p>
      </div>
    </div>
  );
}

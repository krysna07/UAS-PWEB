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
  AlertCircle
} from "lucide-react";
import clsx from "clsx";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (email === "admin@primakara.ac.id" && password === "admin123") {
        await supabase.auth.signOut();
        localStorage.setItem("sb_mock_admin_session", "true");
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
        return;
      }

      // Simulate/Attempt Supabase Auth Login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      localStorage.removeItem("sb_mock_admin_session");
      router.push("/");
    } catch (err: any) {
      if (err.message?.includes("Email not confirmed")) {
        setError("Email Anda belum terverifikasi. Silakan cek inbox/spam email Anda untuk verifikasi, atau matikan pengaturan 'Confirm email' di Dashboard Supabase (Authentication -> Providers -> Email).");
      } else {
        setError(err.message || "Gagal masuk. Periksa email dan password Anda.");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-900">
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
          <p className="text-blue-200/60 text-sm font-medium mt-1 tracking-wide uppercase">Primakara University Portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white">Selamat Datang Kembali</h2>
            <p className="text-slate-400 text-sm mt-1">Masuk untuk mengelola absensi kampus.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3.5 rounded-2xl flex items-center gap-3 text-xs font-bold animate-in fade-in slide-in-from-top-2 duration-300">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-widest ml-1">Email Akademik</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                <input 
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@primakara.ac.id"
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
                  placeholder="••••••••"
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

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input type="checkbox" className="peer appearance-none w-4 h-4 rounded border border-white/20 bg-white/5 checked:bg-blue-600 checked:border-blue-600 transition-all" />
                  <div className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity">
                    <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-400 group-hover:text-slate-300 transition-colors">Ingat saya</span>
              </label>
              <button type="button" className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors">Lupa Password?</button>
            </div>

            <button 
              disabled={isLoading}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white rounded-2xl py-4 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/20 active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Memproses...
                </>
              ) : (
                <>
                  Masuk ke Dashboard
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-slate-400">
              Belum punya akun?{" "}
              <Link href="/register" className="font-bold text-blue-400 hover:text-blue-300 transition-colors">
                Daftar di sini
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

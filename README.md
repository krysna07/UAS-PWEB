# 📊 SIGAP - Sistem Informasi & Gateway Presensi (Campus Attendance System)

**SIGAP** adalah platform web modern dan responsif yang dirancang untuk mengelola dan memantau kehadiran (presensi) mahasiswa di tingkat universitas. Aplikasi ini dirancang dengan berfokus pada kemudahan administrasi akademik, optimasi performa tinggi, serta integrasi database real-time.

---

## 🚀 Fitur Utama

1. **Dashboard Utama & Statistik Kehadiran**
   * Visualisasi persentase kehadiran global dan ringkasan kondisi mahasiswa (Hadir, Alfa, Izin, Sakit).
   * Indikator status otomatis untuk mahasiswa: **AMAN** (kehadiran ≥ 75%), **SP-1** (kehadiran 60-74%), **SP-2** (kehadiran 50-59%), dan **D.O** (kehadiran < 50%).
   * Grafik visualisasi lingkaran presensi per mahasiswa untuk total 16 pertemuan per semester.

2. **Manajemen Database Mahasiswa**
   * **Validasi Unik NIM**: Mencegah pendaftaran NIM ganda guna menjaga integritas data presensi di database.
   * **Pencarian Teroptimasi**: Fitur pencarian mahasiswa berdasarkan NIM/Nama yang menggunakan teknologi *Debounce* untuk mengurangi query berlebihan.
   * **Pagination Dinamis**: Pembagian data per halaman untuk performa rendering yang cepat dan efisien.
   * **Batch Insert Dummy (1-Click)**: Mempermudah penambahan 50 data dummy mahasiswa sekaligus untuk keperluan testing performa secara instan.

3. **Laporan Kehadiran & Cetak PDF**
   * Filter laporan presensi berdasarkan Mata Kuliah dan Semester.
   * Fitur cetak rekap kehadiran langsung menjadi file PDF terformat rapi menggunakan *Native Print Optimization* (otomatis menyembunyikan tombol navigasi saat dicetak).
   * Ekspor rekapitulasi data mahasiswa langsung ke format JSON.

4. **Sistem Autentikasi & Keamanan**
   * Registrasi dan Login admin terintegrasi dengan **Supabase Auth**.
   * Proteksi rute (middleware-like redirect) berbasis hak akses Admin (Administrator).

---

## 🛠️ Tech Stack & Dependencies

Proyek ini dibangun menggunakan teknologi terbaru di ekosistem web modern:
* **Core Framework**: [Next.js 16.2.4 (App Router)](https://nextjs.org/)
* **Library UI**: [React 19.2.4](https://react.dev/)
* **Styling**: [Tailwind CSS v4.0.0](https://tailwindcss.com/) & Vanilla CSS
* **Database & Auth Provider**: [Supabase JS Client ^2.105.1](https://supabase.com/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Developer Language**: [TypeScript](https://www.typescriptlang.org/)

---

## ⚡ Optimasi Performa yang Diterapkan

Aplikasi ini telah melalui proses audit performa untuk memastikan switching menu yang sangat cepat dan minim konsumsi memori:
* 🔑 **Centralized AuthProvider (`AuthContext`)**: Mengurangi koneksi berulang (onAuthStateChange) dari 4 kali inisialisasi per komponen menjadi hanya 1 kali inisialisasi di root layout. (Mengurangi request network sebesar 75%).
* 💾 **React.memo**: Mencegah re-render yang tidak perlu pada komponen statis seperti `SideNav`, `TopBar`, dan `StatusCards`.
* 📊 **useMemo**: Mengoptimalkan perhitungan matematika rekap data presensi global sehingga proses loop (reduce) hanya berjalan saat data mahasiswa berubah.

---

## 📋 Struktur Database (Supabase)

Proyek ini menggunakan tabel `students` di Supabase. Anda dapat membuat tabel dengan struktur berikut:

```sql
create table public.students (
  id uuid default gen_random_uuid() not null primary key,
  nim text not null unique,
  nama text not null,
  program_studi text not null,
  jenis_kelamin varchar(2) not null,
  angkatan text default '2024'::text,
  hadir integer default 0,
  alfa integer default 0,
  izin integer default 0,
  sakit integer default 0,
  persentase integer default 0,
  status text default 'SAFE'::text,
  detail text[] default '{}'::text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

---

## ⚙️ Cara Menjalankan Project Secara Lokal

### 1. Klon Repositori
```bash
git clone https://github.com/krysna07/UAS-PWEB.git
cd campus-attendance
```

### 2. Konfigurasi Environment Variables
Buat file bernama `.env.local` pada direktori root proyek dan isi dengan kredensial Supabase Anda:
```env
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-id>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Jalankan Development Server
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) pada browser Anda untuk melihat hasilnya.

### 5. Build untuk Produksi
```bash
npm run build
npm run start
```

---

## 🚀 Deployment di Vercel

Saat melakukan deployment di Vercel:
1. Pastikan Anda telah mengaktifkan repositori Git Anda di dashboard Vercel.
2. Tambahkan kedua variabel lingkungan dari `.env.local` (`NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY`) pada bagian **Project Settings > Environment Variables** di Vercel.
3. Vercel akan otomatis mendeteksi konfigurasi Next.js dan melakukan build secara optimal.

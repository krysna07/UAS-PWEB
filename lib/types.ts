// Database types
export type AttendanceStatus = "hadir" | "alfa" | "izin" | "sakit";
export type CourseStatus = "SAFE" | "SP1" | "SP2" | "DO" | "PENDING";

export interface Mahasiswa {
  id: string;
  nim: string;
  nama: string;
  program_studi: string;
  semester: number;
  angkatan: number;
  foto_url?: string;
  jenis_kelamin: "L" | "P";
}

export interface MataKuliah {
  id: string;
  kode: string;
  nama: string;
  sks: number;
  dosen: string;
  hari: string;
  jam: string;
  ruangan: string;
}

export interface StudentAttendanceSummary {
  mahasiswa: Mahasiswa;
  mata_kuliah_aktif?: string;
  total_pertemuan: number;
  hadir: number;
  alfa: number;
  izin: number;
  sakit: number;
  persentase: number;
  status: CourseStatus;
  detail: AttendanceStatus[]; // array 16 item per pertemuan
}

export interface AdminDashboardData {
  mata_kuliah: MataKuliah;
  semester_aktif: string;
  total_mahasiswa: number;
  rata_rata_kehadiran: number;
  total_hadir_semua: number;
  total_alfa_semua: number;
  total_izin_semua: number;
  total_sakit_semua: number;
  students: StudentAttendanceSummary[];
}

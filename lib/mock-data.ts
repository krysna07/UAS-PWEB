import { StudentAttendanceSummary, AdminDashboardData, AttendanceStatus, CourseStatus } from "./types";

// ─── Helpers ─────────────────────────────────────────────
function getCourseStatus(persentase: number): CourseStatus {
  if (persentase >= 75) return "SAFE";
  if (persentase >= 60) return "SP1";
  if (persentase >= 50) return "SP2";
  if (persentase > 0) return "DO";
  return "PENDING";
}

// ─── Mock Data ────────────────────────────────────────────
export const MOCK_ADMIN_DATA: AdminDashboardData = {
  mata_kuliah: {
    id: "mk-001",
    kode: "TI301",
    nama: "Pemrograman Web Lanjut",
    sks: 3,
    dosen: "Dr. I Wayan Santika, M.Kom",
    hari: "Senin",
    jam: "08:00 - 10:30",
    ruangan: "Lab Komputer A",
  },
  semester_aktif: "Genap 2024/2025",
  total_mahasiswa: 6,
  rata_rata_kehadiran: 75,
  total_hadir_semua: 69,
  total_alfa_semua: 19,
  total_izin_semua: 6,
  total_sakit_semua: 2,
  students: [
    {
      mahasiswa: {
        id: "mhs-001",
        nim: "2315101001",
        nama: "I Putu Krysna Aditya",
        program_studi: "Teknologi Informasi",
        semester: 4,
        angkatan: 2023,
        jenis_kelamin: "L",
      },
      total_pertemuan: 16,
      hadir: 14,
      alfa: 1,
      izin: 1,
      sakit: 0,
      persentase: 87.5,
      status: "SAFE",
      detail: [
        "hadir","hadir","hadir","hadir","hadir",
        "hadir","hadir","hadir","izin","hadir",
        "hadir","hadir","alfa","hadir","hadir","hadir",
      ] as AttendanceStatus[],
    },
    {
      mahasiswa: {
        id: "mhs-002",
        nim: "2315101002",
        nama: "Ni Luh Putu Ayu Saraswati",
        program_studi: "Sistem Informasi",
        semester: 4,
        angkatan: 2023,
        jenis_kelamin: "P",
      },
      total_pertemuan: 16,
      hadir: 16,
      alfa: 0,
      izin: 0,
      sakit: 0,
      persentase: 100,
      status: "SAFE",
      detail: [
        "hadir","hadir","hadir","hadir","hadir",
        "hadir","hadir","hadir","hadir","hadir",
        "hadir","hadir","hadir","hadir","hadir","hadir",
      ] as AttendanceStatus[],
    },
    {
      mahasiswa: {
        id: "mhs-003",
        nim: "2315101003",
        nama: "I Kadek Budiarta",
        program_studi: "Teknologi Informasi",
        semester: 4,
        angkatan: 2023,
        jenis_kelamin: "L",
      },
      total_pertemuan: 16,
      hadir: 10,
      alfa: 4,
      izin: 2,
      sakit: 0,
      persentase: 62.5,
      status: "SP1",
      detail: [
        "hadir","hadir","alfa","hadir","hadir",
        "hadir","alfa","hadir","hadir","izin",
        "izin","hadir","hadir","alfa","alfa","hadir",
      ] as AttendanceStatus[],
    },
    {
      mahasiswa: {
        id: "mhs-004",
        nim: "2315101004",
        nama: "Siti Nurhaliza",
        program_studi: "Informatika",
        semester: 4,
        angkatan: 2023,
        jenis_kelamin: "P",
      },
      total_pertemuan: 16,
      hadir: 8,
      alfa: 7,
      izin: 1,
      sakit: 0,
      persentase: 50.0,
      status: "SP2",
      detail: [
        "hadir","alfa","hadir","alfa","hadir",
        "alfa","hadir","alfa","hadir","izin",
        "hadir","alfa","hadir","alfa","alfa","hadir",
      ] as AttendanceStatus[],
    },
    {
      mahasiswa: {
        id: "mhs-005",
        nim: "2315101005",
        nama: "I Wayan Darmawan",
        program_studi: "Teknologi Informasi",
        semester: 4,
        angkatan: 2023,
        jenis_kelamin: "L",
      },
      total_pertemuan: 16,
      hadir: 6,
      alfa: 7,
      izin: 1,
      sakit: 2,
      persentase: 37.5,
      status: "DO",
      detail: [
        "alfa","sakit","alfa","hadir","alfa",
        "hadir","alfa","hadir","alfa","izin",
        "alfa","sakit","alfa","hadir","hadir","hadir",
      ] as AttendanceStatus[],
    },
    {
      mahasiswa: {
        id: "mhs-006",
        nim: "2315101006",
        nama: "Made Rina Handayani",
        program_studi: "Sistem Informasi",
        semester: 4,
        angkatan: 2023,
        jenis_kelamin: "P",
      },
      total_pertemuan: 16,
      hadir: 15,
      alfa: 0,
      izin: 1,
      sakit: 0,
      persentase: 93.75,
      status: "SAFE",
      detail: [
        "hadir","hadir","hadir","hadir","hadir",
        "hadir","hadir","izin","hadir","hadir",
        "hadir","hadir","hadir","hadir","hadir","hadir",
      ] as AttendanceStatus[],
    },
  ],
};

export { getCourseStatus };

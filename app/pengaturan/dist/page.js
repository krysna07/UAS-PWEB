"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var SideNav_1 = require("@/components/SideNav");
var TopBar_1 = require("@/components/TopBar");
var AuthContext_1 = require("@/lib/AuthContext");
var navigation_1 = require("next/navigation");
var lucide_react_1 = require("lucide-react");
var clsx_1 = require("clsx");
function PengaturanPage() {
    var isAdmin = AuthContext_1.useAuth().isAdmin;
    var router = navigation_1.useRouter();
    react_1.useEffect(function () {
        if (isAdmin === false) {
            router.push('/login');
        }
    }, [isAdmin, router]);
    var _a = react_1.useState("profil"), activeTab = _a[0], setActiveTab = _a[1];
    var _b = react_1.useState(null), notification = _b[0], setNotification = _b[1];
    var showNotification = function (message, type) {
        if (type === void 0) { type = 'success'; }
        setNotification({ message: message, type: type });
        setTimeout(function () { return setNotification(null); }, 3000);
    };
    var handleSave = function (e) {
        e.preventDefault();
        showNotification("Pengaturan berhasil disimpan!");
    };
    return (React.createElement("div", { className: "flex min-h-screen bg-slate-50" },
        React.createElement(SideNav_1["default"], null),
        React.createElement(TopBar_1["default"], { nama: "Admin Akademik", semester: 4, semesterLabel: "Genap 2024/2025" }),
        React.createElement("main", { className: "flex-1 md:ml-64 pt-20 pb-12" },
            React.createElement("div", { className: "p-8 max-w-5xl mx-auto" },
                React.createElement("div", { className: "mb-8" },
                    React.createElement("h2", { className: "text-2xl font-bold text-slate-900 tracking-tight" }, "Pengaturan Sistem"),
                    React.createElement("p", { className: "text-sm text-slate-500 mt-1" }, "Kelola preferensi akun dan konfigurasi akademik sistem SIGAP.")),
                React.createElement("div", { className: "flex flex-col md:flex-row gap-8" },
                    React.createElement("div", { className: "w-full md:w-64 space-y-1" }, [
                        { id: "profil", label: "Profil Saya", icon: lucide_react_1.User },
                        { id: "akademik", label: "Konfigurasi Akademik", icon: lucide_react_1.BookOpen },
                        { id: "keamanan", label: "Keamanan", icon: lucide_react_1.Lock },
                        { id: "notifikasi", label: "Notifikasi & WA", icon: lucide_react_1.Bell },
                    ].map(function (tab) { return (React.createElement("button", { key: tab.id, onClick: function () { return setActiveTab(tab.id); }, className: clsx_1["default"]("w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200", activeTab === tab.id
                            ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                            : "text-slate-600 hover:bg-white hover:text-slate-900") },
                        React.createElement(tab.icon, { size: 18 }),
                        tab.label)); })),
                    React.createElement("div", { className: "flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden" },
                        React.createElement("form", { onSubmit: handleSave, className: "p-8 space-y-8" },
                            activeTab === "profil" && (React.createElement("div", { className: "space-y-6 animate-in fade-in duration-500" },
                                React.createElement("div", { className: "flex items-center gap-6 pb-6 border-b border-slate-100" },
                                    React.createElement("div", { className: "relative group" },
                                        React.createElement("div", { className: "w-24 h-24 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold border-4 border-white shadow-lg" }, "A"),
                                        React.createElement("button", { type: "button", className: "absolute bottom-0 right-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center border-2 border-white shadow-md hover:bg-blue-700 transition-colors" },
                                            React.createElement(lucide_react_1.Camera, { size: 14 }))),
                                    React.createElement("div", null,
                                        React.createElement("h3", { className: "font-bold text-slate-900" }, "Foto Profil"),
                                        React.createElement("p", { className: "text-xs text-slate-500 mt-1" }, "PNG, JPG maksimal 2MB."),
                                        React.createElement("button", { type: "button", className: "text-xs font-bold text-blue-600 mt-2 hover:underline" }, "Hapus Foto"))),
                                React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6" },
                                    React.createElement("div", { className: "space-y-1.5" },
                                        React.createElement("label", { className: "text-xs font-bold text-slate-500 uppercase tracking-wider ml-1" }, "Nama Lengkap"),
                                        React.createElement("input", { type: "text", defaultValue: "Admin Akademik", className: "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" })),
                                    React.createElement("div", { className: "space-y-1.5" },
                                        React.createElement("label", { className: "text-xs font-bold text-slate-500 uppercase tracking-wider ml-1" }, "Email"),
                                        React.createElement("input", { type: "email", defaultValue: "admin@primakara.ac.id", className: "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" })),
                                    React.createElement("div", { className: "space-y-1.5" },
                                        React.createElement("label", { className: "text-xs font-bold text-slate-500 uppercase tracking-wider ml-1" }, "Jabatan"),
                                        React.createElement("input", { type: "text", defaultValue: "Kepala Administrasi", className: "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" })),
                                    React.createElement("div", { className: "space-y-1.5" },
                                        React.createElement("label", { className: "text-xs font-bold text-slate-500 uppercase tracking-wider ml-1" }, "NIP / ID Karyawan"),
                                        React.createElement("input", { type: "text", defaultValue: "19950821202301", className: "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" }))))),
                            activeTab === "akademik" && (React.createElement("div", { className: "space-y-6 animate-in fade-in duration-500" },
                                React.createElement("div", { className: "flex items-center gap-3 p-4 bg-blue-50 border border-blue-100 rounded-2xl" },
                                    React.createElement(lucide_react_1.Settings, { className: "text-blue-600", size: 20 }),
                                    React.createElement("p", { className: "text-xs font-medium text-blue-800" }, "Perubahan pada bagian ini akan berdampak pada seluruh perhitungan statistik dashboard.")),
                                React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8" },
                                    React.createElement("div", { className: "space-y-4" },
                                        React.createElement("h4", { className: "text-sm font-bold text-slate-900 border-l-4 border-blue-600 pl-3" }, "Periode Aktif"),
                                        React.createElement("div", { className: "space-y-1.5" },
                                            React.createElement("label", { className: "text-xs font-bold text-slate-500 uppercase tracking-wider ml-1" }, "Semester"),
                                            React.createElement("select", { className: "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm" },
                                                React.createElement("option", null, "Ganjil 2024/2025"),
                                                React.createElement("option", { selected: true }, "Genap 2024/2025"),
                                                React.createElement("option", null, "Ganjil 2025/2026"))),
                                        React.createElement("div", { className: "space-y-1.5" },
                                            React.createElement("label", { className: "text-xs font-bold text-slate-500 uppercase tracking-wider ml-1" }, "Total Pertemuan Default"),
                                            React.createElement("input", { type: "number", defaultValue: 16, className: "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm" }))),
                                    React.createElement("div", { className: "space-y-4" },
                                        React.createElement("h4", { className: "text-sm font-bold text-slate-900 border-l-4 border-emerald-600 pl-3" }, "Ambang Batas Kehadiran"),
                                        React.createElement("div", { className: "space-y-1.5" },
                                            React.createElement("label", { className: "text-xs font-bold text-slate-500 uppercase tracking-wider ml-1" }, "Minimal SAFE (%)"),
                                            React.createElement("input", { type: "number", defaultValue: 75, className: "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm" })),
                                        React.createElement("div", { className: "space-y-1.5" },
                                            React.createElement("label", { className: "text-xs font-bold text-slate-500 uppercase tracking-wider ml-1" }, "Threshold SP-1 (%)"),
                                            React.createElement("input", { type: "number", defaultValue: 60, className: "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm" })))))),
                            activeTab === "keamanan" && (React.createElement("div", { className: "space-y-6 animate-in fade-in duration-500" },
                                React.createElement("div", { className: "max-w-md space-y-5" },
                                    React.createElement("div", { className: "space-y-1.5" },
                                        React.createElement("label", { className: "text-xs font-bold text-slate-500 uppercase tracking-wider ml-1" }, "Password Saat Ini"),
                                        React.createElement("input", { type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm" })),
                                    React.createElement("div", { className: "space-y-1.5" },
                                        React.createElement("label", { className: "text-xs font-bold text-slate-500 uppercase tracking-wider ml-1" }, "Password Baru"),
                                        React.createElement("input", { type: "password", placeholder: "Minimal 8 karakter", className: "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm" })),
                                    React.createElement("div", { className: "space-y-1.5" },
                                        React.createElement("label", { className: "text-xs font-bold text-slate-500 uppercase tracking-wider ml-1" }, "Konfirmasi Password Baru"),
                                        React.createElement("input", { type: "password", placeholder: "Ulangi password baru", className: "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm" }))),
                                React.createElement("div", { className: "pt-6 border-t border-slate-100" },
                                    React.createElement("div", { className: "flex items-center justify-between p-4 bg-slate-50 rounded-2xl" },
                                        React.createElement("div", { className: "flex items-center gap-3" },
                                            React.createElement("div", { className: "w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center" },
                                                React.createElement(lucide_react_1.Shield, { size: 20 })),
                                            React.createElement("div", null,
                                                React.createElement("p", { className: "text-sm font-bold text-slate-900" }, "Two-Factor Authentication (2FA)"),
                                                React.createElement("p", { className: "text-xs text-slate-500" }, "Tambahkan lapisan keamanan ekstra pada akun Anda."))),
                                        React.createElement("div", { className: "w-12 h-6 bg-slate-300 rounded-full relative cursor-pointer" },
                                            React.createElement("div", { className: "absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all" })))))),
                            activeTab === "notifikasi" && (React.createElement("div", { className: "space-y-6 animate-in fade-in duration-500" },
                                React.createElement("div", { className: "space-y-6" },
                                    React.createElement("div", { className: "flex items-start gap-4 p-5 bg-emerald-50 border border-emerald-100 rounded-2xl" },
                                        React.createElement(lucide_react_1.Smartphone, { className: "text-emerald-600 mt-1", size: 24 }),
                                        React.createElement("div", null,
                                            React.createElement("h4", { className: "text-sm font-bold text-emerald-900" }, "Integrasi WhatsApp API"),
                                            React.createElement("p", { className: "text-xs text-emerald-700 mt-1 leading-relaxed" }, "Hubungkan sistem dengan gateway WhatsApp untuk mengirim notifikasi kehadiran otomatis kepada mahasiswa dan orang tua."),
                                            React.createElement("div", { className: "mt-4 flex gap-2" },
                                                React.createElement("button", { type: "button", className: "px-3 py-1.5 bg-emerald-600 text-white text-[10px] font-bold rounded-lg uppercase tracking-wider hover:bg-emerald-700 transition-colors" }, "Hubungkan API"),
                                                React.createElement("button", { type: "button", className: "px-3 py-1.5 bg-white text-emerald-600 text-[10px] font-bold rounded-lg uppercase tracking-wider border border-emerald-200 hover:bg-emerald-50 transition-colors" }, "Test Koneksi")))),
                                    React.createElement("div", { className: "space-y-4" },
                                        React.createElement("h4", { className: "text-sm font-bold text-slate-900" }, "Pengaturan Notifikasi"),
                                        React.createElement("div", { className: "space-y-3" }, [
                                            { label: "Kirim peringatan otomatis saat mahasiswa Alfa 3x", desc: "Mahasiswa akan menerima pesan WhatsApp otomatis.", checked: true },
                                            { label: "Laporan mingguan ke email Dosen", desc: "Ringkasan kehadiran kelas dikirim setiap Senin pagi.", checked: false },
                                            { label: "Notifikasi login baru", desc: "Dapatkan email jika ada aktivitas login dari perangkat baru.", checked: true },
                                        ].map(function (item, i) { return (React.createElement("label", { key: i, className: "flex items-center justify-between p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer" },
                                            React.createElement("div", null,
                                                React.createElement("p", { className: "text-sm font-bold text-slate-800" }, item.label),
                                                React.createElement("p", { className: "text-xs text-slate-500 mt-0.5" }, item.desc)),
                                            React.createElement("input", { type: "checkbox", defaultChecked: item.checked, className: "w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" }))); })))))),
                            React.createElement("div", { className: "pt-8 border-t border-slate-100 flex justify-end" },
                                React.createElement("button", { type: "submit", className: "flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-200 active:scale-95" },
                                    React.createElement(lucide_react_1.Save, { size: 18 }),
                                    "Simpan Semua Perubahan"))))))),
        notification && (React.createElement("div", { className: clsx_1["default"]("fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-6 py-3.5 rounded-2xl shadow-2xl border animate-in slide-in-from-bottom-4 duration-300", notification.type === 'success'
                ? "bg-emerald-600 text-white border-emerald-500"
                : "bg-rose-600 text-white border-rose-500") },
            notification.type === 'success' ? React.createElement(lucide_react_1.CheckCircle2, { size: 20 }) : React.createElement(lucide_react_1.X, { size: 20 }),
            React.createElement("span", { className: "text-sm font-bold tracking-wide" }, notification.message)))));
}
exports["default"] = PengaturanPage;

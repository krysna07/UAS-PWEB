"use client";
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var SideNav_1 = require("@/components/SideNav");
var TopBar_1 = require("@/components/TopBar");
var AuthContext_1 = require("@/lib/AuthContext");
var navigation_1 = require("next/navigation");
var supabase_1 = require("@/lib/supabase");
var pdf_generator_1 = require("@/lib/pdf-generator");
var lucide_react_1 = require("lucide-react");
var clsx_1 = require("clsx");
function LaporanPage() {
    var isAdmin = AuthContext_1.useAuth().isAdmin;
    var router = navigation_1.useRouter();
    react_1.useEffect(function () {
        if (isAdmin === false) {
            router.push('/login');
        }
    }, [isAdmin, router]);
    var _a = react_1.useState(false), isLoading = _a[0], setIsLoading = _a[1];
    var _b = react_1.useState(false), isPrinting = _b[0], setIsPrinting = _b[1];
    var _c = react_1.useState("Semua Mata Kuliah"), selectedCourse = _c[0], setSelectedCourse = _c[1];
    var _d = react_1.useState("Genap 2024/2025"), selectedSemester = _d[0], setSelectedSemester = _d[1];
    var _e = react_1.useState([]), students = _e[0], setStudents = _e[1];
    var handlePrint = function () {
        try {
            setIsPrinting(true);
            pdf_generator_1.generatePDF({
                elementId: "laporan-container",
                title: "Laporan Kehadiran Mahasiswa"
            });
        }
        catch (error) {
            console.error("Error printing:", error);
            alert("Gagal membuka print dialog. Silakan coba lagi.");
        }
        finally {
            setIsPrinting(false);
        }
    };
    react_1.useEffect(function () {
        function fetchReportData() {
            return __awaiter(this, void 0, void 0, function () {
                var _a, data, error, err_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            setIsLoading(true);
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, 4, 5]);
                            return [4 /*yield*/, supabase_1.supabase
                                    .from('students')
                                    .select('*')
                                    .order('nama', { ascending: true })];
                        case 2:
                            _a = _b.sent(), data = _a.data, error = _a.error;
                            if (error)
                                throw error;
                            if (data)
                                setStudents(data);
                            return [3 /*break*/, 5];
                        case 3:
                            err_1 = _b.sent();
                            console.error("Error fetching report data:", err_1);
                            return [3 /*break*/, 5];
                        case 4:
                            setIsLoading(false);
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        }
        fetchReportData();
    }, []);
    return (React.createElement("div", { className: "flex min-h-screen bg-slate-50 print:bg-white" },
        React.createElement("div", { className: "print:hidden" },
            React.createElement(SideNav_1["default"], null)),
        React.createElement("div", { className: "print:hidden" },
            React.createElement(TopBar_1["default"], { nama: "Admin Akademik", semester: 4, semesterLabel: "Genap 2024/2025" })),
        React.createElement("main", { className: "flex-1 md:ml-64 pt-20 pb-12 print:ml-0 print:pt-0 print:pb-0 print:p-0" },
            React.createElement("div", { id: "laporan-container", className: "p-8 max-w-7xl mx-auto space-y-8 print:p-0 print:space-y-0 print:max-w-none print:w-full" },
                React.createElement("div", { className: "flex flex-col md:flex-row md:items-end justify-between gap-6 print:hidden" },
                    React.createElement("div", null,
                        React.createElement("div", { className: "flex items-center gap-3 mb-2" },
                            React.createElement("div", { className: "w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center" },
                                React.createElement(lucide_react_1.FileText, { size: 20 })),
                            React.createElement("h2", { className: "text-2xl font-bold text-slate-900 tracking-tight" }, "Laporan Kehadiran")),
                        React.createElement("p", { className: "text-sm text-slate-500" }, "Generate dan unduh rekapitulasi kehadiran mahasiswa secara periodik.")),
                    React.createElement("div", { className: "flex items-center gap-3" },
                        React.createElement("button", { onClick: handlePrint, disabled: isPrinting, className: clsx_1["default"]("flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm", isPrinting
                                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                                : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50") }, isPrinting ? (React.createElement(React.Fragment, null,
                            React.createElement(lucide_react_1.Loader2, { size: 18, className: "animate-spin" }),
                            "Mempersiapkan...")) : (React.createElement(React.Fragment, null,
                            React.createElement(lucide_react_1.Printer, { size: 18 }),
                            "Cetak PDF"))))),
                React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm print:hidden" },
                    React.createElement("div", { className: "space-y-1.5" },
                        React.createElement("label", { className: "text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1" }, "Mata Kuliah"),
                        React.createElement("div", { className: "relative" },
                            React.createElement("select", { value: selectedCourse, onChange: function (e) { return setSelectedCourse(e.target.value); }, className: "w-full appearance-none px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer" },
                                React.createElement("option", null, "Semua Mata Kuliah"),
                                React.createElement("option", null, "Pemrograman Web"),
                                React.createElement("option", null, "Basis Data Lanjutan"),
                                React.createElement("option", null, "Keamanan Data dan Informasi"),
                                React.createElement("option", null, "Bisnis dan Digitalisasi UMKM"),
                                React.createElement("option", null, "Desain dan Analisis Algoritma"),
                                React.createElement("option", null, "Manajemen Proyek Teknologi Informasi"),
                                React.createElement("option", null, "Aljabar Linier")),
                            React.createElement(lucide_react_1.ChevronDown, { size: 16, className: "absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" }))),
                    React.createElement("div", { className: "space-y-1.5" },
                        React.createElement("label", { className: "text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1" }, "Semester"),
                        React.createElement("div", { className: "relative" },
                            React.createElement("select", { value: selectedSemester, onChange: function (e) { return setSelectedSemester(e.target.value); }, className: "w-full appearance-none px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer" },
                                React.createElement("option", null, "Ganjil 2023/2024"),
                                React.createElement("option", null, "Genap 2023/2024"),
                                React.createElement("option", null, "Ganjil 2024/2025"),
                                React.createElement("option", null, "Genap 2024/2025")),
                            React.createElement(lucide_react_1.ChevronDown, { size: 16, className: "absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" }))),
                    React.createElement("div", { className: "space-y-1.5" },
                        React.createElement("label", { className: "text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1" }, "Urutkan Berdasarkan"),
                        React.createElement("div", { className: "relative" },
                            React.createElement("select", { className: "w-full appearance-none px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer" },
                                React.createElement("option", null, "Nama (A-Z)"),
                                React.createElement("option", null, "Persentase Terendah"),
                                React.createElement("option", null, "Persentase Tertinggi"),
                                React.createElement("option", null, "NIM (0-9)")),
                            React.createElement(lucide_react_1.ChevronDown, { size: 16, className: "absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" }))),
                    React.createElement("div", { className: "flex items-end" },
                        React.createElement("button", { className: "w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-100 transition-all border border-blue-100" },
                            React.createElement(lucide_react_1.Filter, { size: 18 }),
                            "Terapkan Filter"))),
                React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6 print:hidden" }, [
                    {
                        label: "Rata-rata Kehadiran",
                        value: students.length > 0
                            ? Math.round(students.reduce(function (acc, s) { return acc + (s.persentase || 0); }, 0) / students.length) + "%"
                            : "0%",
                        trend: "+2.4%",
                        icon: lucide_react_1.FilePieChart,
                        color: "text-blue-600",
                        bg: "bg-blue-50"
                    },
                    {
                        label: "Mahasiswa Aman",
                        value: students.filter(function (s) { return s.status === "SAFE"; }).length,
                        trend: students.length > 0 ? Math.round((students.filter(function (s) { return s.status === "SAFE"; }).length / students.length) * 100) + "%" : "0%",
                        icon: lucide_react_1.FileText,
                        color: "text-emerald-600",
                        bg: "bg-emerald-50"
                    },
                    {
                        label: "Mahasiswa SP",
                        value: students.filter(function (s) { return s.status === "SP"; }).length,
                        trend: students.length > 0 ? Math.round((students.filter(function (s) { return s.status === "SP"; }).length / students.length) * 100) + "%" : "0%",
                        icon: lucide_react_1.Calendar,
                        color: "text-amber-600",
                        bg: "bg-amber-50"
                    },
                    {
                        label: "Mahasiswa D.O",
                        value: students.filter(function (s) { return s.status === "DO"; }).length,
                        trend: students.length > 0 ? Math.round((students.filter(function (s) { return s.status === "DO"; }).length / students.length) * 100) + "%" : "0%",
                        icon: lucide_react_1.Filter,
                        color: "text-rose-600",
                        bg: "bg-rose-50"
                    },
                ].map(function (card, i) { return (React.createElement("div", { key: i, className: "bg-white p-5 rounded-3xl border border-slate-200 shadow-sm" },
                    React.createElement("div", { className: "flex items-center justify-between mb-4" },
                        React.createElement("div", { className: clsx_1["default"]("w-10 h-10 rounded-xl flex items-center justify-center", card.bg) },
                            React.createElement(card.icon, { size: 20, className: card.color })),
                        React.createElement("span", { className: clsx_1["default"]("text-[10px] font-black px-2 py-1 rounded-lg", card.bg, card.color) }, card.trend)),
                    React.createElement("p", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest" }, card.label),
                    React.createElement("p", { className: "text-2xl font-black text-slate-900 mt-1" }, card.value))); })),
                React.createElement("div", { className: "bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden print:border-none print:shadow-none print:rounded-none" },
                    React.createElement("div", { className: "p-6 border-b border-slate-100 flex items-center justify-between print:px-0" },
                        React.createElement("h3", { className: "font-bold text-slate-900 print:text-xl" }, "Rekapitulasi Kehadiran Mahasiswa"),
                        React.createElement("div", { className: "relative print:hidden" },
                            React.createElement(lucide_react_1.Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400", size: 16 }),
                            React.createElement("input", { type: "text", placeholder: "Cari NIM/Nama...", className: "pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500 w-64" }))),
                    React.createElement("div", { className: "overflow-x-auto" },
                        React.createElement("table", { className: "w-full text-left border-collapse" },
                            React.createElement("thead", null,
                                React.createElement("tr", { className: "bg-slate-50 border-b border-slate-100" },
                                    React.createElement("th", { className: "py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest" }, "Mahasiswa"),
                                    React.createElement("th", { className: "py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center" }, "Hadir"),
                                    React.createElement("th", { className: "py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center" }, "Alfa"),
                                    React.createElement("th", { className: "py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center" }, "Izin/Sakit"),
                                    React.createElement("th", { className: "py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center" }, "% Kehadiran"),
                                    React.createElement("th", { className: "py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center" }, "Status Akhir"))),
                            React.createElement("tbody", { className: "divide-y divide-slate-100" }, isLoading ? (React.createElement("tr", null,
                                React.createElement("td", { colSpan: 6, className: "py-20 text-center" },
                                    React.createElement("div", { className: "flex flex-col items-center gap-3" },
                                        React.createElement(lucide_react_1.Loader2, { className: "w-8 h-8 text-blue-600 animate-spin" }),
                                        React.createElement("p", { className: "text-sm font-medium text-slate-500" }, "Menyusun laporan..."))))) : (students.map(function (s, i) {
                                var mhs = s.mahasiswa || s;
                                return (React.createElement("tr", { key: i, className: "hover:bg-slate-50/50 transition-colors" },
                                    React.createElement("td", { className: "py-4 px-6" },
                                        React.createElement("p", { className: "text-sm font-bold text-slate-900" }, mhs.nama),
                                        React.createElement("p", { className: "text-[10px] font-mono text-slate-500 mt-0.5" },
                                            mhs.nim,
                                            " \u2022 ",
                                            mhs.program_studi)),
                                    React.createElement("td", { className: "py-4 px-6 text-center text-sm font-bold text-slate-700" }, s.hadir || 0),
                                    React.createElement("td", { className: "py-4 px-6 text-center text-sm font-bold text-rose-600" }, s.alfa || 0),
                                    React.createElement("td", { className: "py-4 px-6 text-center text-sm font-bold text-slate-700" }, (s.izin || 0) + (s.sakit || 0)),
                                    React.createElement("td", { className: "py-4 px-6 text-center" },
                                        React.createElement("div", { className: "flex items-center justify-center gap-2" },
                                            React.createElement("div", { className: "flex-1 max-w-[60px] bg-slate-100 h-1.5 rounded-full overflow-hidden" },
                                                React.createElement("div", { className: clsx_1["default"]("h-full rounded-full", (s.persentase || 0) >= 75 ? "bg-emerald-500" : "bg-rose-500"), style: { width: (s.persentase || 0) + "%" } })),
                                            React.createElement("span", { className: "text-xs font-black font-mono text-slate-700" },
                                                s.persentase || 0,
                                                "%"))),
                                    React.createElement("td", { className: "py-4 px-6 text-center" },
                                        React.createElement("span", { className: clsx_1["default"]("inline-flex px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide border uppercase", s.status === "SAFE" ? "bg-emerald-50 text-emerald-700 border-emerald-100 print:bg-transparent print:border-emerald-600 print:text-emerald-700" :
                                                s.status === "DO" ? "bg-rose-50 text-rose-700 border-rose-100 print:bg-transparent print:border-rose-600 print:text-rose-700" :
                                                    "bg-amber-50 text-amber-700 border-amber-100 print:bg-transparent print:border-amber-600 print:text-amber-700") }, s.status || "N/A"))));
                            }))))))))));
}
exports["default"] = LaporanPage;

"use client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var supabase_1 = require("@/lib/supabase");
var navigation_1 = require("next/navigation");
var lucide_react_1 = require("lucide-react");
var clsx_1 = require("clsx");
function MahasiswaPage() {
    var _this = this;
    var _a = AuthContext_1.useAuth(), isAdmin = _a.isAdmin, userEmail = _a.userEmail;
    var router = navigation_1.useRouter();
    // Check admin access
    react_1.useEffect(function () {
        if (isAdmin === false) {
            router.push('/login');
        }
    }, [isAdmin, router]);
    var _b = react_1.useState([]), students = _b[0], setStudents = _b[1];
    var _c = react_1.useState(true), isLoading = _c[0], setIsLoading = _c[1];
    var _d = react_1.useState(""), searchTerm = _d[0], setSearchTerm = _d[1];
    var _e = react_1.useState(""), debouncedSearch = _e[0], setDebouncedSearch = _e[1];
    var _f = react_1.useState(1), page = _f[0], setPage = _f[1];
    var _g = react_1.useState(1), totalPages = _g[0], setTotalPages = _g[1];
    var _h = react_1.useState(0), totalItems = _h[0], setTotalItems = _h[1];
    var itemsPerPage = 10;
    var _j = react_1.useState(false), isModalOpen = _j[0], setIsModalOpen = _j[1];
    var _k = react_1.useState(null), notification = _k[0], setNotification = _k[1];
    var _l = react_1.useState({
        nim: "",
        nama: "",
        program_studi: "Informatika",
        jenis_kelamin: "L",
        angkatan: new Date().getFullYear().toString()
    }), formData = _l[0], setFormData = _l[1];
    var showNotification = function (message, type) {
        if (type === void 0) { type = 'success'; }
        setNotification({ message: message, type: type });
        setTimeout(function () { return setNotification(null); }, 3000);
    };
    // 5. Debounce Search
    react_1.useEffect(function () {
        var timer = setTimeout(function () {
            setDebouncedSearch(searchTerm);
            setPage(1); // Reset halaman ke 1 setiap kali mencari sesuatu yang baru
        }, 500); // Tunggu 500ms setelah user berhenti mengetik
        return function () { return clearTimeout(timer); };
    }, [searchTerm]);
    // 1. Pagination & Server-Side Filtering (Nomer 1)
    var fetchStudents = function () { return __awaiter(_this, void 0, void 0, function () {
        var query, _a, data, error, count, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setIsLoading(true);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, 4, 5]);
                    query = supabase_1.supabase
                        .from('students')
                        .select('*', { count: 'exact' });
                    // Jika ada pencarian, gunakan filter ILIKE dari database
                    if (debouncedSearch) {
                        query = query.or("nim.ilike.%" + debouncedSearch + "%,nama.ilike.%" + debouncedSearch + "%");
                    }
                    return [4 /*yield*/, query
                            .order('nim', { ascending: true })
                            .range((page - 1) * itemsPerPage, page * itemsPerPage - 1)];
                case 2:
                    _a = _b.sent(), data = _a.data, error = _a.error, count = _a.count;
                    if (error)
                        throw error;
                    if (data) {
                        setStudents(data);
                    }
                    if (count !== null) {
                        setTotalItems(count);
                        setTotalPages(Math.ceil(count / itemsPerPage));
                    }
                    return [3 /*break*/, 5];
                case 3:
                    err_1 = _b.sent();
                    console.error("Error fetching students:", err_1);
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        fetchStudents();
    }, [page, debouncedSearch]); // Akan fetch ulang setiap kali halaman atau pencarian (yang sudah di-debounce) berubah
    var handleAddStudent = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var error, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, supabase_1.supabase
                            .from('students')
                            .insert([formData])];
                case 2:
                    error = (_a.sent()).error;
                    if (error)
                        throw error;
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
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    showNotification(err_2.message, "error");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    // 2. Batch Insert (Nomer 2)
    var handleBatchInsert = function () { return __awaiter(_this, void 0, void 0, function () {
        var dummyData, error, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!confirm("Apakah Anda yakin ingin menambahkan 50 data dummy mahasiswa secara masal?"))
                        return [2 /*return*/];
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    dummyData = Array.from({ length: 50 }).map(function (_, i) {
                        var randomId = Math.floor(Math.random() * 9000) + 1000;
                        return {
                            nim: "240102" + randomId,
                            nama: "Mahasiswa Dummy " + randomId,
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
                    return [4 /*yield*/, supabase_1.supabase
                            .from('students')
                            .insert(dummyData)];
                case 2:
                    error = (_a.sent()).error;
                    if (error)
                        throw error;
                    showNotification("50 Data Dummy berhasil di-Batch Insert!");
                    fetchStudents();
                    return [3 /*break*/, 5];
                case 3:
                    err_3 = _a.sent();
                    showNotification(err_3.message, "error");
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var adminName = userEmail ? userEmail.split("@")[0].toUpperCase() : "Admin Akademik";
    return (React.createElement("div", { className: "flex min-h-screen bg-slate-50" },
        React.createElement(SideNav_1["default"], { namaAdmin: adminName, role: isAdmin ? "Administrator" : "Mahasiswa" }),
        React.createElement(TopBar_1["default"], { nama: isAdmin ? "Admin Akademik" : "Mahasiswa", semester: 4, semesterLabel: "Genap 2024/2025" }),
        React.createElement("main", { className: "flex-1 md:ml-64 pt-20 pb-12" },
            React.createElement("div", { className: "p-8 max-w-7xl mx-auto space-y-6" },
                React.createElement("div", { className: "flex justify-between items-end" },
                    React.createElement("div", null,
                        React.createElement("h2", { className: "text-2xl font-bold text-slate-900" }, "Database Mahasiswa"),
                        React.createElement("p", { className: "text-sm text-slate-500 mt-1" }, "Daftar seluruh mahasiswa yang terdaftar di sistem.")),
                    isAdmin && (React.createElement("div", { className: "flex items-center gap-3" },
                        React.createElement("button", { onClick: handleBatchInsert, className: "flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-sm font-semibold transition-all shadow-sm" },
                            React.createElement(lucide_react_1.Database, { size: 18 }),
                            "Generate 50 Dummy (Batch)"),
                        React.createElement("button", { onClick: function () { return setIsModalOpen(true); }, className: "flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm shadow-blue-200" },
                            React.createElement(lucide_react_1.UserPlus, { size: 18 }),
                            "Tambah Mahasiswa")))),
                React.createElement("div", { className: "flex gap-4" },
                    React.createElement("div", { className: "relative flex-1" },
                        React.createElement(lucide_react_1.Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400", size: 18 }),
                        React.createElement("input", { type: "text", placeholder: "Cari NIM atau Nama...", value: searchTerm, onChange: function (e) { return setSearchTerm(e.target.value); }, className: "w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" })),
                    React.createElement("button", { className: "px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 flex items-center gap-2 hover:bg-slate-50 transition-colors" },
                        React.createElement(lucide_react_1.Filter, { size: 18 }),
                        React.createElement("span", { className: "text-sm font-medium" }, "Filter"))),
                React.createElement("div", { className: "bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden" }, isLoading ? (React.createElement("div", { className: "p-20 flex flex-col items-center justify-center gap-4" },
                    React.createElement(lucide_react_1.Loader2, { className: "w-10 h-10 text-blue-600 animate-spin" }),
                    React.createElement("p", { className: "text-slate-500 font-medium" }, "Memuat data mahasiswa..."))) : (React.createElement("div", { className: "overflow-x-auto" },
                    React.createElement("table", { className: "w-full text-left border-collapse" },
                        React.createElement("thead", null,
                            React.createElement("tr", { className: "bg-slate-50 border-b border-slate-100" },
                                React.createElement("th", { className: "py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider" }, "No"),
                                React.createElement("th", { className: "py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider" }, "NIM"),
                                React.createElement("th", { className: "py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider" }, "Nama Mahasiswa"),
                                React.createElement("th", { className: "py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider" }, "Prodi"),
                                React.createElement("th", { className: "py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center" }, "L/P"),
                                React.createElement("th", { className: "py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider" }, "Angkatan"))),
                        React.createElement("tbody", { className: "divide-y divide-slate-100" }, students.length > 0 ? (students.map(function (student, idx) {
                            var mhs = student.mahasiswa || student;
                            return (React.createElement("tr", { key: mhs.id || student.id, className: "hover:bg-slate-50/50 transition-colors" },
                                React.createElement("td", { className: "py-4 px-6 text-sm text-slate-500" }, (page - 1) * itemsPerPage + idx + 1),
                                React.createElement("td", { className: "py-4 px-6" },
                                    React.createElement("span", { className: "text-sm font-mono text-slate-700 bg-slate-100 px-2 py-1 rounded-md" }, mhs.nim)),
                                React.createElement("td", { className: "py-4 px-6 text-sm font-bold text-slate-900" }, mhs.nama),
                                React.createElement("td", { className: "py-4 px-6 text-sm text-slate-600" }, mhs.program_studi),
                                React.createElement("td", { className: "py-4 px-6 text-sm text-center text-slate-600" }, mhs.jenis_kelamin),
                                React.createElement("td", { className: "py-4 px-6 text-sm text-slate-600" }, mhs.angkatan || 2024)));
                        })) : (React.createElement("tr", null,
                            React.createElement("td", { colSpan: 6, className: "py-20 text-center text-slate-400 italic" }, "Tidak ada data mahasiswa ditemukan.")))))))),
                !isLoading && totalPages > 0 && (React.createElement("div", { className: "flex items-center justify-between mt-6" },
                    React.createElement("p", { className: "text-sm text-slate-500" },
                        "Menampilkan ",
                        React.createElement("span", { className: "font-semibold text-slate-900" }, (page - 1) * itemsPerPage + 1),
                        " hingga ",
                        React.createElement("span", { className: "font-semibold text-slate-900" }, Math.min(page * itemsPerPage, totalItems)),
                        " dari ",
                        React.createElement("span", { className: "font-semibold text-slate-900" }, totalItems),
                        " mahasiswa"),
                    React.createElement("div", { className: "flex items-center gap-2" },
                        React.createElement("button", { onClick: function () { return setPage(function (p) { return Math.max(1, p - 1); }); }, disabled: page === 1, className: "p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" },
                            React.createElement(lucide_react_1.ChevronLeft, { size: 18, className: "text-slate-600" })),
                        React.createElement("div", { className: "flex items-center gap-1" }, Array.from({ length: Math.min(5, totalPages) }).map(function (_, i) {
                            // Logika sederhana untuk menampilkan 5 halaman di sekitar halaman saat ini
                            var pageNum = page;
                            if (totalPages <= 5)
                                pageNum = i + 1;
                            else if (page <= 3)
                                pageNum = i + 1;
                            else if (page >= totalPages - 2)
                                pageNum = totalPages - 4 + i;
                            else
                                pageNum = page - 2 + i;
                            return (React.createElement("button", { key: pageNum, onClick: function () { return setPage(pageNum); }, className: clsx_1["default"]("w-9 h-9 rounded-lg text-sm font-medium transition-colors", page === pageNum
                                    ? "bg-blue-600 text-white shadow-sm shadow-blue-200"
                                    : "text-slate-600 hover:bg-slate-100") }, pageNum));
                        })),
                        React.createElement("button", { onClick: function () { return setPage(function (p) { return Math.min(totalPages, p + 1); }); }, disabled: page === totalPages, className: "p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" },
                            React.createElement(lucide_react_1.ChevronRight, { size: 18, className: "text-slate-600" }))))))),
        isModalOpen && (React.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200" },
            React.createElement("div", { className: "bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden" },
                React.createElement("div", { className: "p-6 border-b border-slate-100 flex justify-between items-center" },
                    React.createElement("div", null,
                        React.createElement("h3", { className: "font-bold text-slate-900 text-lg" }, "Tambah Mahasiswa Baru"),
                        React.createElement("p", { className: "text-xs text-slate-500 mt-1" }, "Daftarkan mahasiswa baru ke dalam database.")),
                    React.createElement("button", { onClick: function () { return setIsModalOpen(false); }, className: "w-8 h-8 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors" },
                        React.createElement(lucide_react_1.X, { size: 18 }))),
                React.createElement("form", { onSubmit: handleAddStudent, className: "p-6 space-y-4" },
                    React.createElement("div", null,
                        React.createElement("label", { className: "block text-sm font-semibold text-slate-700 mb-1.5" }, "NIM (Nomor Induk Mahasiswa)"),
                        React.createElement("input", { required: true, type: "text", value: formData.nim, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { nim: e.target.value })); }, className: "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm transition-all", placeholder: "Contoh: 2301010001" })),
                    React.createElement("div", null,
                        React.createElement("label", { className: "block text-sm font-semibold text-slate-700 mb-1.5" }, "Nama Lengkap"),
                        React.createElement("input", { required: true, type: "text", value: formData.nama, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { nama: e.target.value })); }, className: "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm transition-all", placeholder: "Contoh: Budi Cahyono" })),
                    React.createElement("div", null,
                        React.createElement("label", { className: "block text-sm font-semibold text-slate-700 mb-1.5" }, "Program Studi"),
                        React.createElement("select", { value: formData.program_studi, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { program_studi: e.target.value })); }, className: "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm transition-all" },
                            React.createElement("option", { value: "Informatika" }, "Informatika"),
                            React.createElement("option", { value: "Sistem Informasi" }, "Sistem Informasi"),
                            React.createElement("option", { value: "Desain Komunikasi Visual" }, "Desain Komunikasi Visual"),
                            React.createElement("option", { value: "Bisnis Digital" }, "Bisnis Digital"))),
                    React.createElement("div", { className: "grid grid-cols-2 gap-4" },
                        React.createElement("div", null,
                            React.createElement("label", { className: "block text-sm font-semibold text-slate-700 mb-1.5" }, "Jenis Kelamin"),
                            React.createElement("select", { value: formData.jenis_kelamin, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { jenis_kelamin: e.target.value })); }, className: "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm transition-all" },
                                React.createElement("option", { value: "L" }, "Laki-laki"),
                                React.createElement("option", { value: "P" }, "Perempuan"))),
                        React.createElement("div", null,
                            React.createElement("label", { className: "block text-sm font-semibold text-slate-700 mb-1.5" }, "Angkatan"),
                            React.createElement("input", { required: true, type: "number", value: formData.angkatan, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { angkatan: e.target.value })); }, className: "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm transition-all", placeholder: "2024" }))),
                    React.createElement("div", { className: "pt-4 flex gap-3" },
                        React.createElement("button", { type: "button", onClick: function () { return setIsModalOpen(false); }, className: "flex-1 px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-sm font-semibold transition-colors" }, "Batal"),
                        React.createElement("button", { type: "submit", className: "flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm" }, "Simpan Data")))))),
        notification && (React.createElement("div", { className: clsx_1["default"]("fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-6 py-3.5 rounded-2xl shadow-2xl border animate-in slide-in-from-bottom-4 duration-300", notification.type === 'success'
                ? "bg-emerald-600 text-white border-emerald-500"
                : "bg-rose-600 text-white border-rose-500") },
            notification.type === 'success' ? React.createElement(lucide_react_1.CheckCircle2, { size: 20 }) : React.createElement(lucide_react_1.XCircle, { size: 20 }),
            React.createElement("span", { className: "text-sm font-bold tracking-wide" }, notification.message)))));
}
exports["default"] = MahasiswaPage;

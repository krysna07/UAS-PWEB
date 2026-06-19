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
var lucide_react_1 = require("lucide-react");
var supabase_1 = require("@/lib/supabase");
var AuthContext_1 = require("@/lib/AuthContext");
var react_2 = require("react");
var link_1 = require("next/link");
var clsx_1 = require("clsx");
exports["default"] = react_2["default"].memo(function TopBar(_a) {
    var _this = this;
    var nama = _a.nama, semester = _a.semester, semesterLabel = _a.semesterLabel;
    var _b = AuthContext_1.useAuth(), userEmail = _b.userEmail, fullName = _b.fullName, userNim = _b.userNim, isAdmin = _b.isAdmin;
    var _c = react_1.useState(false), isDropdownOpen = _c[0], setIsDropdownOpen = _c[1];
    var _d = react_1.useState(false), isNotificationOpen = _d[0], setIsNotificationOpen = _d[1];
    var _e = react_1.useState(true), hasUnreadNotifications = _e[0], setHasUnreadNotifications = _e[1];
    // Modals state
    var _f = react_1.useState(false), isProfileModalOpen = _f[0], setIsProfileModalOpen = _f[1];
    var _g = react_1.useState(false), isHelpModalOpen = _g[0], setIsHelpModalOpen = _g[1];
    var _h = react_1.useState(null), toast = _h[0], setToast = _h[1];
    // Form edit state
    var _j = react_1.useState(""), editNama = _j[0], setEditNama = _j[1];
    var _k = react_1.useState(""), editNim = _k[0], setEditNim = _k[1];
    var _l = react_1.useState(""), editEmail = _l[0], setEditEmail = _l[1];
    var _m = react_1.useState(""), editPassword = _m[0], setEditPassword = _m[1];
    var _o = react_1.useState(false), isSaving = _o[0], setIsSaving = _o[1];
    var displayNama = fullName ? fullName : (userEmail && !isAdmin ? "Mahasiswa" : (nama || "Admin"));
    var adminNotifications = [
        { id: "a1", type: "request", title: "Pengajuan Sakit Baru", message: "Budi Cahyono mengajukan izin sakit (Surat Dokter dilampirkan).", time: "2 jam lalu", read: false },
        { id: "a2", type: "system", title: "Laporan Mingguan", message: "Laporan persentase kehadiran minggu ke-8 otomatis berhasil di-generate.", time: "09:00", read: false },
        { id: "a3", type: "warning", title: "Notifikasi Presensi WhatsApp", message: "Peringatan otomatis terkirim ke WhatsApp 2 mahasiswa dengan status DANGER.", time: "Kemarin", read: true },
    ];
    var studentNotifications = [
        { id: "s1", type: "status", title: "Kehadiran Diperbarui", message: "Status kehadiran Anda pada mata kuliah Pemrograman Web Lanjut hari ini diset ke HADIR.", time: "1 jam lalu", read: false },
        { id: "s2", type: "warning", title: "Peringatan Kehadiran (DANGER)", message: "Persentase kehadiran Anda berada di bawah batas aman (74% di matkul Aljabar Linier). Segera hubungi dosen.", time: "10:15", read: false },
        { id: "s3", type: "info", title: "Perpindahan Kelas Kuliah", message: "Jadwal kuliah Basis Data Lanjutan besok dipindahkan ke Lab Komputer B.", time: "2 hari lalu", read: true },
    ];
    var notifications = isAdmin ? adminNotifications : studentNotifications;
    var showToast = function (msg) {
        setToast(msg);
        setTimeout(function () { return setToast(null); }, 3000);
    };
    var handleSaveProfile = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var updatePayload, _a, data, error, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    e.preventDefault();
                    setIsSaving(true);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, 4, 5]);
                    updatePayload = {
                        data: { full_name: editNama, nim: editNim }
                    };
                    if (editEmail && editEmail !== userEmail) {
                        updatePayload.email = editEmail;
                    }
                    if (editPassword) {
                        updatePayload.password = editPassword;
                    }
                    return [4 /*yield*/, supabase_1.supabase.auth.updateUser(updatePayload)];
                case 2:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (error)
                        throw error;
                    // Update local state immediately
                    setFullName(editNama);
                    setUserNim(editNim);
                    if (editEmail)
                        setUserEmail(editEmail);
                    setIsProfileModalOpen(false);
                    showToast("Profil & Pengaturan berhasil diperbarui!");
                    return [3 /*break*/, 5];
                case 3:
                    err_1 = _b.sent();
                    alert("Gagal memperbarui profil: " + (err_1.message || "Pastikan email valid dan password minimal 6 karakter."));
                    return [3 /*break*/, 5];
                case 4:
                    setIsSaving(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var openProfileModal = function () {
        setEditNama(displayNama);
        setEditNim(userNim || "");
        setEditEmail(userEmail || "");
        setEditPassword("");
        setIsDropdownOpen(false);
        setIsProfileModalOpen(true);
    };
    var now = new Date();
    var dateStr = now.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });
    return (react_2["default"].createElement(react_2["default"].Fragment, null,
        react_2["default"].createElement("header", { className: "fixed top-0 right-0 z-30 flex items-center justify-between px-4 md:px-8 h-20 bg-slate-900 text-white border-b border-slate-800 left-0 md:left-64 transition-all print:hidden" },
            react_2["default"].createElement("div", { className: "flex items-center gap-3" },
                react_2["default"].createElement("button", { onClick: function () { return window.dispatchEvent(new CustomEvent('toggle-sidebar')); }, className: "p-2 md:hidden text-white hover:bg-slate-800 rounded-xl transition-colors" },
                    react_2["default"].createElement(lucide_react_1.Menu, { size: 24 })),
                react_2["default"].createElement("div", null,
                    react_2["default"].createElement("h1", { className: "text-lg md:text-xl font-bold text-white tracking-tight" }, "Dashboard Kehadiran"),
                    react_2["default"].createElement("p", { className: "text-xs md:text-sm text-slate-400 mt-0.5" },
                        semesterLabel,
                        " \u2022 Semester ",
                        semester))),
            react_2["default"].createElement("div", { className: "flex items-center gap-4" },
                react_2["default"].createElement("div", { className: "hidden md:flex items-center px-4 py-2 rounded-xl bg-slate-800/50 border border-slate-700/50" },
                    react_2["default"].createElement("span", { className: "text-sm font-medium text-slate-300" }, dateStr)),
                react_2["default"].createElement("div", { className: "relative" },
                    react_2["default"].createElement("button", { onClick: function () {
                            setIsNotificationOpen(!isNotificationOpen);
                            setIsDropdownOpen(false);
                        }, className: "relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-700" },
                        react_2["default"].createElement(lucide_react_1.Bell, { size: 20, className: "text-slate-300" }),
                        hasUnreadNotifications && (react_2["default"].createElement("span", { className: "absolute top-2 right-2.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-slate-900" }))),
                    isNotificationOpen && (react_2["default"].createElement(react_2["default"].Fragment, null,
                        react_2["default"].createElement("div", { onClick: function () { return setIsNotificationOpen(false); }, className: "fixed inset-0 z-40" }),
                        react_2["default"].createElement("div", { className: "absolute right-0 top-full mt-2 w-80 md:w-96 bg-white rounded-2xl border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 text-slate-800" },
                            react_2["default"].createElement("div", { className: "px-4 py-3 border-b border-slate-100 flex items-center justify-between" },
                                react_2["default"].createElement("div", null,
                                    react_2["default"].createElement("p", { className: "text-sm font-bold text-slate-800" }, "Notifikasi"),
                                    react_2["default"].createElement("p", { className: "text-[10px] text-slate-400 mt-0.5" }, "Pemberitahuan sistem SIGAP terbaru.")),
                                hasUnreadNotifications && (react_2["default"].createElement("button", { onClick: function () { return setHasUnreadNotifications(false); }, className: "text-[10px] font-bold text-blue-600 hover:text-blue-700" }, "Tandai semua dibaca"))),
                            react_2["default"].createElement("div", { className: "max-h-80 overflow-y-auto divide-y divide-slate-100" }, notifications.map(function (notif) { return (react_2["default"].createElement("div", { key: notif.id, className: clsx_1["default"]("px-4 py-3 text-left transition-colors hover:bg-slate-50", !notif.read && hasUnreadNotifications ? "bg-blue-50/30" : "bg-white") },
                                react_2["default"].createElement("div", { className: "flex gap-2.5" },
                                    react_2["default"].createElement("div", { className: clsx_1["default"]("w-2 h-2 mt-1.5 rounded-full flex-shrink-0", !notif.read && hasUnreadNotifications ? "bg-blue-600" : "bg-transparent") }),
                                    react_2["default"].createElement("div", { className: "flex-1 min-w-0" },
                                        react_2["default"].createElement("p", { className: "text-xs font-bold text-slate-800 flex justify-between gap-2" },
                                            react_2["default"].createElement("span", { className: "truncate" }, notif.title),
                                            react_2["default"].createElement("span", { className: "text-[9px] font-medium text-slate-400 flex-shrink-0 font-mono" }, notif.time)),
                                        react_2["default"].createElement("p", { className: "text-[11px] text-slate-600 mt-1 leading-relaxed" }, notif.message))))); })))))),
                react_2["default"].createElement("div", { className: "relative" },
                    react_2["default"].createElement("button", { onClick: function () { return setIsDropdownOpen(!isDropdownOpen); }, className: "flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-xl border border-slate-800 bg-slate-800/60 shadow-sm hover:bg-slate-800 transition-colors text-left" },
                        react_2["default"].createElement("div", { className: "w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold uppercase" }, displayNama.charAt(0)),
                        react_2["default"].createElement("div", { className: "text-left hidden sm:block" },
                            react_2["default"].createElement("p", { className: "text-sm font-bold text-slate-100 leading-none truncate max-w-[150px]" }, displayNama),
                            react_2["default"].createElement("p", { className: "text-xs font-mono text-slate-400 mt-1 max-w-[160px] truncate", title: userEmail || "admin@primakara.ac.id" }, userEmail || "admin@primakara.ac.id")),
                        react_2["default"].createElement(lucide_react_1.ChevronDown, { size: 16, className: "text-slate-400 ml-1" })),
                    isDropdownOpen && (react_2["default"].createElement(react_2["default"].Fragment, null,
                        react_2["default"].createElement("div", { onClick: function () { return setIsDropdownOpen(false); }, className: "fixed inset-0 z-40" }),
                        react_2["default"].createElement("div", { className: "absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200" },
                            react_2["default"].createElement("div", { className: "px-4 py-3 border-b border-slate-100" },
                                react_2["default"].createElement("p", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider" }, "Informasi Akun"),
                                react_2["default"].createElement("p", { className: "text-sm font-bold text-slate-800 mt-1 truncate" }, displayNama),
                                react_2["default"].createElement("p", { className: "text-xs text-slate-500 truncate" }, userEmail || "admin@primakara.ac.id"),
                                react_2["default"].createElement("div", { className: "mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider" },
                                    react_2["default"].createElement("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-600" }),
                                    isAdmin ? "Administrator" : "Mahasiswa Aktif")),
                            !isAdmin && (react_2["default"].createElement("div", { className: "px-4 py-3 border-b border-slate-100 bg-slate-50/50 space-y-1.5" },
                                react_2["default"].createElement("div", { className: "flex justify-between text-xs" },
                                    react_2["default"].createElement("span", { className: "text-slate-500 font-medium" }, "NIM:"),
                                    react_2["default"].createElement("span", { className: "font-mono font-bold text-slate-700" }, userNim || "2401020095")),
                                react_2["default"].createElement("div", { className: "flex justify-between text-xs" },
                                    react_2["default"].createElement("span", { className: "text-slate-500 font-medium" }, "Prodi:"),
                                    react_2["default"].createElement("span", { className: "font-bold text-slate-700" }, "Informatika")),
                                react_2["default"].createElement("div", { className: "flex justify-between text-xs" },
                                    react_2["default"].createElement("span", { className: "text-slate-500 font-medium" }, "Status:"),
                                    react_2["default"].createElement("span", { className: "font-bold text-emerald-600" }, "Terdaftar (Genap)")))),
                            react_2["default"].createElement("div", { className: "py-1" },
                                isAdmin ? (react_2["default"].createElement(link_1["default"], { href: "/pengaturan", onClick: function () { return setIsDropdownOpen(false); }, className: "flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors" },
                                    react_2["default"].createElement(lucide_react_1.User, { size: 16, className: "text-slate-400" }),
                                    react_2["default"].createElement("span", null, "Profil & Pengaturan"))) : (react_2["default"].createElement("button", { onClick: openProfileModal, className: "w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors text-left font-normal" },
                                    react_2["default"].createElement(lucide_react_1.User, { size: 16, className: "text-slate-400" }),
                                    react_2["default"].createElement("span", null, "Profil & Pengaturan"))),
                                react_2["default"].createElement("button", { onClick: function () { setIsDropdownOpen(false); setIsHelpModalOpen(true); }, className: "w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors text-left font-normal" },
                                    react_2["default"].createElement(lucide_react_1.HelpCircle, { size: 16, className: "text-slate-400" }),
                                    react_2["default"].createElement("span", null, "Bantuan & FAQ"))),
                            react_2["default"].createElement("div", { className: "pt-1 border-t border-slate-100" },
                                react_2["default"].createElement("button", { onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    setIsDropdownOpen(false);
                                                    localStorage.removeItem("sb_mock_admin_session");
                                                    return [4 /*yield*/, supabase_1.supabase.auth.signOut()];
                                                case 1:
                                                    _a.sent();
                                                    window.location.href = "/login";
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); }, className: "w-full flex items-center gap-3 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors font-semibold" },
                                    react_2["default"].createElement(lucide_react_1.LogOut, { size: 16 }),
                                    react_2["default"].createElement("span", null, "Keluar (Logout)"))))))),
                react_2["default"].createElement("button", { onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    localStorage.removeItem("sb_mock_admin_session");
                                    return [4 /*yield*/, supabase_1.supabase.auth.signOut()];
                                case 1:
                                    _a.sent();
                                    window.location.href = "/login";
                                    return [2 /*return*/];
                            }
                        });
                    }); }, className: "px-4 py-2 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-100 rounded-xl transition-colors" }, "LOGOUT"))),
        isProfileModalOpen && (react_2["default"].createElement("div", { className: "fixed inset-0 z-[100] overflow-y-auto bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200" },
            react_2["default"].createElement("div", { className: "flex min-h-full items-center justify-center p-4 text-center" },
                react_2["default"].createElement("div", { className: "bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden text-left my-8" },
                    react_2["default"].createElement("div", { className: "p-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10" },
                        react_2["default"].createElement("div", null,
                            react_2["default"].createElement("h3", { className: "font-bold text-slate-900 text-lg" }, "Profil & Pengaturan Mahasiswa"),
                            react_2["default"].createElement("p", { className: "text-xs text-slate-500 mt-0.5" }, "Kelola data akademik dan keamanan akun Anda.")),
                        react_2["default"].createElement("button", { type: "button", onClick: function () { return setIsProfileModalOpen(false); }, className: "w-8 h-8 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors" },
                            react_2["default"].createElement(lucide_react_1.X, { size: 18 }))),
                    react_2["default"].createElement("form", { onSubmit: handleSaveProfile, className: "p-6 space-y-6" },
                        react_2["default"].createElement("div", { className: "flex items-center gap-5 p-4 bg-slate-50 rounded-2xl border border-slate-100" },
                            react_2["default"].createElement("div", { className: "w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl font-bold shadow-inner" }, displayNama.charAt(0)),
                            react_2["default"].createElement("div", null,
                                react_2["default"].createElement("h4", { className: "font-bold text-slate-900 text-base" }, displayNama),
                                react_2["default"].createElement("p", { className: "text-xs font-mono text-slate-500 mt-0.5" }, userEmail || "krysnadeva123@gmail.com"),
                                react_2["default"].createElement("div", { className: "mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider" }, "Mahasiswa Primakara"))),
                        react_2["default"].createElement("div", { className: "space-y-4" },
                            react_2["default"].createElement("h5", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2" },
                                react_2["default"].createElement(lucide_react_1.BookOpen, { size: 14 }),
                                " Data Akademik"),
                            react_2["default"].createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" },
                                react_2["default"].createElement("div", { className: "space-y-1.5" },
                                    react_2["default"].createElement("label", { className: "text-xs font-bold text-slate-600" }, "Nomor Induk Mahasiswa (NIM)"),
                                    react_2["default"].createElement("input", { type: "text", required: true, value: editNim, onChange: function (e) { return setEditNim(e.target.value); }, placeholder: "Contoh: 2401020095", className: "w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm font-mono font-bold transition-all" })),
                                react_2["default"].createElement("div", { className: "space-y-1.5" },
                                    react_2["default"].createElement("label", { className: "text-xs font-bold text-slate-600" }, "Program Studi"),
                                    react_2["default"].createElement("input", { disabled: true, type: "text", value: "Informatika", className: "w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-500 font-bold cursor-not-allowed" })))),
                        react_2["default"].createElement("div", { className: "space-y-4" },
                            react_2["default"].createElement("h5", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2" },
                                react_2["default"].createElement(lucide_react_1.Lock, { size: 14 }),
                                " Keamanan & Akses"),
                            react_2["default"].createElement("div", { className: "space-y-4" },
                                react_2["default"].createElement("div", { className: "space-y-1.5" },
                                    react_2["default"].createElement("label", { className: "text-xs font-bold text-slate-600" }, "Nama Lengkap"),
                                    react_2["default"].createElement("input", { type: "text", required: true, value: editNama, onChange: function (e) { return setEditNama(e.target.value); }, className: "w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm transition-all" })),
                                react_2["default"].createElement("div", { className: "space-y-1.5" },
                                    react_2["default"].createElement("label", { className: "text-xs font-bold text-slate-600" }, "Email Utama"),
                                    react_2["default"].createElement("input", { type: "email", required: true, value: editEmail, onChange: function (e) { return setEditEmail(e.target.value); }, className: "w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm transition-all" })),
                                react_2["default"].createElement("div", { className: "space-y-1.5" },
                                    react_2["default"].createElement("label", { className: "text-xs font-bold text-slate-600" }, "Ganti Kata Sandi (Opsional)"),
                                    react_2["default"].createElement("input", { type: "password", value: editPassword, onChange: function (e) { return setEditPassword(e.target.value); }, placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022 (Biarkan kosong jika tidak ingin mengganti)", className: "w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm transition-all" })))),
                        react_2["default"].createElement("div", { className: "pt-4 border-t border-slate-100 flex gap-3" },
                            react_2["default"].createElement("button", { type: "button", disabled: isSaving, onClick: function () { return setIsProfileModalOpen(false); }, className: "flex-1 px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50" }, "Tutup"),
                            react_2["default"].createElement("button", { type: "submit", disabled: isSaving, className: "flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-blue-200 disabled:bg-blue-400 flex items-center justify-center gap-2" }, isSaving ? "Menyimpan..." : "Simpan Perubahan"))))))),
        isHelpModalOpen && (react_2["default"].createElement("div", { className: "fixed inset-0 z-[100] overflow-y-auto bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200" },
            react_2["default"].createElement("div", { className: "flex min-h-full items-center justify-center p-4 text-center" },
                react_2["default"].createElement("div", { className: "bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden text-left my-8" },
                    react_2["default"].createElement("div", { className: "p-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10" },
                        react_2["default"].createElement("div", null,
                            react_2["default"].createElement("h3", { className: "font-bold text-slate-900 text-lg" }, "Pusat Bantuan & FAQ SIGAP"),
                            react_2["default"].createElement("p", { className: "text-xs text-slate-500 mt-0.5" }, "Solusi kendala kehadiran & presensi mahasiswa.")),
                        react_2["default"].createElement("button", { type: "button", onClick: function () { return setIsHelpModalOpen(false); }, className: "w-8 h-8 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors" },
                            react_2["default"].createElement(lucide_react_1.X, { size: 18 }))),
                    react_2["default"].createElement("div", { className: "p-6 space-y-6 text-left" },
                        react_2["default"].createElement("div", { className: "space-y-4" },
                            react_2["default"].createElement("h4", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider" }, "Pertanyaan Sering Diajukan (FAQ)"),
                            react_2["default"].createElement("div", { className: "space-y-3" },
                                react_2["default"].createElement("div", { className: "p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5" },
                                    react_2["default"].createElement("p", { className: "text-sm font-bold text-slate-900" }, "1. Bagaimana jika status kehadiran saya salah (alfa padahal hadir)?"),
                                    react_2["default"].createElement("p", { className: "text-xs text-slate-600 leading-relaxed" }, "Silakan menghubungi Dosen Pengampu mata kuliah atau Admin Akademik maksimal 2x24 jam setelah sesi kelas selesai untuk mengajukan penyesuaian/koreksi presensi.")),
                                react_2["default"].createElement("div", { className: "p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5" },
                                    react_2["default"].createElement("p", { className: "text-sm font-bold text-slate-900" }, "2. Bagaimana prosedur pengajuan Izin atau Sakit?"),
                                    react_2["default"].createElement("p", { className: "text-xs text-slate-600 leading-relaxed" }, "Surat izin atau sertifikat dokter yang sah wajib diserahkan ke bagian Administrasi Akademik atau diunggah sebelum jam perkuliahan dimulai agar status dapat diperbarui.")),
                                react_2["default"].createElement("div", { className: "p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5" },
                                    react_2["default"].createElement("p", { className: "text-sm font-bold text-slate-900" }, "3. Berapa syarat minimal kehadiran (SAFE) ujian?"),
                                    react_2["default"].createElement("p", { className: "text-xs text-slate-600 leading-relaxed" }, "Sesuai peraturan akademik Primakara University, mahasiswa wajib memenuhi minimal 75% kehadiran dari total pertemuan efektif untuk dapat mengikuti UTS/UAS.")))),
                        react_2["default"].createElement("div", { className: "p-5 bg-blue-50 rounded-2xl border border-blue-100 space-y-3" },
                            react_2["default"].createElement("div", { className: "flex items-center gap-3" },
                                react_2["default"].createElement("div", { className: "w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center" },
                                    react_2["default"].createElement(lucide_react_1.Phone, { size: 20 })),
                                react_2["default"].createElement("div", null,
                                    react_2["default"].createElement("h5", { className: "font-bold text-blue-900 text-sm" }, "Butuh Bantuan Langsung?"),
                                    react_2["default"].createElement("p", { className: "text-xs text-blue-700" }, "Tim Helpdesk Akademik siap membantu Anda."))),
                            react_2["default"].createElement("div", { className: "pt-2 flex flex-col gap-2" },
                                react_2["default"].createElement("a", { href: "https://wa.me/6289685041084", target: "_blank", rel: "noreferrer", className: "flex items-center justify-center gap-2 w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm shadow-emerald-200" },
                                    react_2["default"].createElement(lucide_react_1.Phone, { size: 14 }),
                                    " Hubungi via WhatsApp (+62 896-8504-1084)"),
                                react_2["default"].createElement("p", { className: "text-[10px] text-center text-blue-600 font-medium" }, "Jam Layanan: Senin - Jumat (08:00 - 17:00 WITA)")))),
                    react_2["default"].createElement("div", { className: "p-4 border-t border-slate-100 flex justify-end bg-white" },
                        react_2["default"].createElement("button", { type: "button", onClick: function () { return setIsHelpModalOpen(false); }, className: "px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition-colors" }, "Tutup Pustaka Bantuan")))))),
        toast && (react_2["default"].createElement("div", { className: "fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-6 py-3.5 rounded-2xl shadow-2xl border bg-emerald-600 text-white border-emerald-500 animate-in slide-in-from-bottom-4 duration-300" },
            react_2["default"].createElement(lucide_react_1.CheckCircle2, { size: 20 }),
            react_2["default"].createElement("span", { className: "text-sm font-bold tracking-wide" }, toast)))));
});

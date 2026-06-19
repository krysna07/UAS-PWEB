"use client";
"use strict";
exports.__esModule = true;
exports.useAuth = exports.AuthProvider = void 0;
var react_1 = require("react");
var supabase_1 = require("@/lib/supabase");
var AuthContext = react_1.createContext(undefined);
function AuthProvider(_a) {
    var children = _a.children;
    var _b = react_1.useState(null), userEmail = _b[0], setUserEmail = _b[1];
    var _c = react_1.useState(null), fullName = _c[0], setFullName = _c[1];
    var _d = react_1.useState(null), userNim = _d[0], setUserNim = _d[1];
    var _e = react_1.useState(false), isAdmin = _e[0], setIsAdmin = _e[1];
    var _f = react_1.useState(true), isLoading = _f[0], setIsLoading = _f[1];
    react_1.useEffect(function () {
        // Initial auth check
        supabase_1.supabase.auth.getUser().then(function (_a) {
            var _b, _c;
            var user = _a.data.user;
            if (user === null || user === void 0 ? void 0 : user.email) {
                setUserEmail(user.email);
                setIsAdmin(user.email.toLowerCase().startsWith("admin"));
                setFullName(((_b = user.user_metadata) === null || _b === void 0 ? void 0 : _b.full_name) || null);
                setUserNim(((_c = user.user_metadata) === null || _c === void 0 ? void 0 : _c.nim) || null);
            }
            else {
                var isMockAdmin = localStorage.getItem("sb_mock_admin_session") === "true";
                if (isMockAdmin) {
                    setUserEmail("admin@primakara.ac.id");
                    setIsAdmin(true);
                    setFullName("Admin Akademik");
                }
                else {
                    setUserEmail(null);
                    setIsAdmin(false);
                    setFullName(null);
                    setUserNim(null);
                }
            }
            setIsLoading(false);
        });
        // Auth state subscription (one time only)
        var subscription = supabase_1.supabase.auth.onAuthStateChange(function (_event, session) {
            var _a, _b, _c;
            if ((_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.email) {
                setUserEmail(session.user.email);
                setIsAdmin(session.user.email.toLowerCase().startsWith("admin"));
                setFullName(((_b = session.user.user_metadata) === null || _b === void 0 ? void 0 : _b.full_name) || null);
                setUserNim(((_c = session.user.user_metadata) === null || _c === void 0 ? void 0 : _c.nim) || null);
            }
            else {
                var isMockAdmin = localStorage.getItem("sb_mock_admin_session") === "true";
                if (isMockAdmin) {
                    setUserEmail("admin@primakara.ac.id");
                    setIsAdmin(true);
                    setFullName("Admin Akademik");
                    setUserNim(null);
                }
                else {
                    setUserEmail(null);
                    setIsAdmin(false);
                    setFullName(null);
                    setUserNim(null);
                }
            }
        }).data.subscription;
        return function () { return subscription === null || subscription === void 0 ? void 0 : subscription.unsubscribe(); };
    }, []);
    return (react_1["default"].createElement(AuthContext.Provider, { value: { userEmail: userEmail, fullName: fullName, userNim: userNim, isAdmin: isAdmin, isLoading: isLoading } }, children));
}
exports.AuthProvider = AuthProvider;
function useAuth() {
    var context = react_1.useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}
exports.useAuth = useAuth;

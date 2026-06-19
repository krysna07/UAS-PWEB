import { createClient } from "@supabase/supabase-js";
import { MOCK_ADMIN_DATA } from "./mock-data";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Validate if they are actual Supabase config
const isValidUrl = supabaseUrl.startsWith("https://") && supabaseUrl.includes(".supabase.co");
// Supabase anon key can be a JWT (eyJ...) or new publishable key format (sb_publishable_...)
const isValidKey = (supabaseAnonKey.startsWith("eyJ") && supabaseAnonKey.split(".").length === 3) || supabaseAnonKey.startsWith("sb_publishable_");

// If we are in server-side render or credentials are not valid, we use mock client to prevent process env crashes & infinite fetch loops
const useMock = !isValidUrl || !isValidKey;

// Real client or Mock Client
let supabaseClient: any;

if (!useMock) {
  try {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
    console.log("Supabase client initialized successfully with real database.");
  } catch (err) {
    console.error("Failed to initialize real Supabase client, falling back to mock:", err);
    supabaseClient = createMockClient();
  }
} else {
  if (typeof window !== "undefined") {
    console.warn("Using MOCK Supabase client (local storage) due to invalid or missing credentials in .env.local.");
  }
  supabaseClient = createMockClient();
}

export const supabase = supabaseClient;

// Mock Client generator function
function createMockClient() {
  class MockQueryChain {
    private tableName: string;
    private isInsert = false;
    private isUpdate = false;
    private isDelete = false;
    private payload: any = null;
    private eqFilters: Array<{ column: string; value: any }> = [];
    private orFilter: string | null = null;
    private sortColumn: string | null = null;
    private sortAscending = true;
    private rangeFrom: number | null = null;
    private rangeTo: number | null = null;
    private exactCount = false;

    constructor(tableName: string) {
      this.tableName = tableName;
    }

    select(columns?: string, options?: { count?: string }) {
      if (options?.count === 'exact') {
        this.exactCount = true;
      }
      return this;
    }

    order(column: string, options?: { ascending?: boolean }) {
      this.sortColumn = column;
      this.sortAscending = options?.ascending !== false;
      return this;
    }

    range(from: number, to: number) {
      this.rangeFrom = from;
      this.rangeTo = to;
      return this;
    }

    or(filter: string) {
      this.orFilter = filter;
      return this;
    }

    eq(column: string, value: any) {
      this.eqFilters.push({ column, value });
      return this;
    }

    insert(data: any) {
      this.isInsert = true;
      this.payload = data;
      return this;
    }

    update(data: any) {
      this.isUpdate = true;
      this.payload = data;
      return this;
    }

    delete() {
      this.isDelete = true;
      return this;
    }

    private getTableData(): any[] {
      if (typeof window === "undefined") return [];
      const key = `mock_table_${this.tableName}`;
      const existing = localStorage.getItem(key);
      if (existing) {
        try {
          return JSON.parse(existing);
        } catch (e) {
          return [];
        }
      }
      
      // Seed initial mock data
      if (this.tableName === "students") {
        const seed = MOCK_ADMIN_DATA.students.map((s: any) => {
          const mhs = s.mahasiswa || s;
          return {
            id: mhs.id || `mhs-${Math.random().toString(36).substring(2, 9)}`,
            nim: mhs.nim,
            nama: mhs.nama,
            program_studi: mhs.program_studi,
            jenis_kelamin: mhs.jenis_kelamin,
            angkatan: mhs.angkatan || 2024,
            semester: mhs.semester || 4,
            phone: s.phone || "",
            mata_kuliah_aktif: s.mata_kuliah_aktif || "Pemrograman Web Lanjut",
            total_pertemuan: s.total_pertemuan || 16,
            hadir: s.hadir || 0,
            alfa: s.alfa || 0,
            izin: s.izin || 0,
            sakit: s.sakit || 0,
            persentase: s.persentase || 0,
            status: s.status || "SAFE",
            detail: s.detail || Array(16).fill(null),
            created_at: new Date().toISOString()
          };
        });
        localStorage.setItem(key, JSON.stringify(seed));
        return seed;
      }

      if (this.tableName === "profiles") {
        const seed = [
          { id: "1", name: "Admin Akademik", email: "admin@primakara.ac.id", role: "Super Admin", status: "Active", last_login: "Today, 08:45 AM" },
          { id: "2", name: "Dr. I Wayan Santika", email: "santika@primakara.ac.id", role: "Dosen", status: "Active", last_login: "Yesterday, 02:20 PM" },
          { id: "3", name: "Ni Putu Ayu", email: "ayu.staff@primakara.ac.id", role: "Staff Akademik", status: "Active", last_login: "Today, 09:15 AM" },
          { id: "4", name: "Budi Setiawan", email: "budi.s@primakara.ac.id", role: "Dosen", status: "Inactive", last_login: "2 weeks ago" }
        ];
        localStorage.setItem(key, JSON.stringify(seed));
        return seed;
      }

      return [];
    }

    private saveTableData(data: any[]) {
      if (typeof window === "undefined") return;
      localStorage.setItem(`mock_table_${this.tableName}`, JSON.stringify(data));
    }

    async execute() {
      let data = this.getTableData();
      let count: number | null = null;

      if (this.isInsert && this.payload) {
        const recordsToInsert = Array.isArray(this.payload) ? this.payload : [this.payload];
        const inserted: any[] = [];
        for (const record of recordsToInsert) {
          const newRecord = {
            id: record.id || `${this.tableName.substring(0, 3)}-${Math.random().toString(36).substring(2, 9)}`,
            created_at: new Date().toISOString(),
            ...record
          };
          data.push(newRecord);
          inserted.push(newRecord);
        }
        this.saveTableData(data);
        return { data: inserted, error: null, count: inserted.length };
      }

      if (this.isUpdate && this.payload) {
        let updatedData: any[] = [];
        data = data.map(item => {
          let match = true;
          for (const filter of this.eqFilters) {
            if (item[filter.column] !== filter.value) {
              match = false;
              break;
            }
          }
          if (match) {
            const updatedItem = { ...item, ...this.payload };
            updatedData.push(updatedItem);
            return updatedItem;
          }
          return item;
        });
        this.saveTableData(data);
        return { data: updatedData, error: null, count: updatedData.length };
      }

      if (this.isDelete) {
        const originalLen = data.length;
        data = data.filter(item => {
          let match = true;
          for (const filter of this.eqFilters) {
            if (item[filter.column] !== filter.value) {
              match = false;
              break;
            }
          }
          return !match;
        });
        this.saveTableData(data);
        return { data: [], error: null, count: originalLen - data.length };
      }

      // SELECT
      if (this.eqFilters.length > 0) {
        data = data.filter(item => {
          for (const filter of this.eqFilters) {
            const val = item[filter.column];
            if (val !== undefined && val !== filter.value) return false;
          }
          return true;
        });
      }

      if (this.orFilter) {
        const parts = this.orFilter.split(',');
        data = data.filter(item => {
          return parts.some(part => {
            const match = part.match(/(\w+)\.ilike\.(.+)/);
            if (match) {
              const col = match[1];
              const term = match[2].replace(/%/g, '').toLowerCase();
              const val = String(item[col] || '').toLowerCase();
              return val.includes(term);
            }
            return false;
          });
        });
      }

      if (this.sortColumn) {
        const col = this.sortColumn;
        const asc = this.sortAscending;
        data.sort((a, b) => {
          const valA = a[col];
          const valB = b[col];
          if (valA === undefined || valB === undefined) return 0;
          if (typeof valA === 'number' && typeof valB === 'number') {
            return asc ? valA - valB : valB - valA;
          }
          const strA = String(valA).toLowerCase();
          const strB = String(valB).toLowerCase();
          if (strA < strB) return asc ? -1 : 1;
          if (strA > strB) return asc ? 1 : -1;
          return 0;
        });
      }

      if (this.exactCount) {
        count = data.length;
      }

      if (this.rangeFrom !== null && this.rangeTo !== null) {
        data = data.slice(this.rangeFrom, this.rangeTo + 1);
      }

      return { data, error: null, count };
    }

    then(onfulfilled?: (value: any) => any, onrejected?: (reason: any) => any) {
      return this.execute().then(onfulfilled, onrejected);
    }
  }

  const mockAuth = {
    getMockSession() {
      if (typeof window === "undefined") return null;
      const isMockAdmin = localStorage.getItem("sb_mock_admin_session") === "true";
      const mockEmail = localStorage.getItem("sb_mock_user_email");
      
      if (isMockAdmin) {
        return {
          user: {
            email: "admin@primakara.ac.id",
            user_metadata: {
              full_name: "Admin Akademik"
            }
          }
        };
      } else if (mockEmail) {
        return {
          user: {
            email: mockEmail,
            user_metadata: {
              full_name: mockEmail.split("@")[0].toUpperCase(),
              nim: "2401020095"
            }
          }
        };
      }
      return null;
    },

    async getSession() {
      const session = this.getMockSession();
      return { data: { session }, error: null };
    },

    async getUser() {
      const session = this.getMockSession();
      return { data: { user: session ? session.user : null }, error: null };
    },

    onAuthStateChange(callback: (event: string, session: any) => void) {
      const session = this.getMockSession();
      setTimeout(() => {
        callback("SIGNED_IN", session);
      }, 0);

      return {
        data: {
          subscription: {
            unsubscribe: () => {}
          }
        }
      };
    },

    async signInWithPassword({ email, password }: any) {
      if (email === "admin@primakara.ac.id" && password === "admin123") {
        if (typeof window !== "undefined") {
          localStorage.setItem("sb_mock_admin_session", "true");
          localStorage.setItem("sb_mock_user_email", email);
        }
        const session = {
          user: {
            email,
            user_metadata: {
              full_name: "Admin Akademik"
            }
          }
        };
        return { data: { session, user: session.user }, error: null };
      }
      
      if (email && password && password.length >= 6) {
        if (typeof window !== "undefined") {
          localStorage.setItem("sb_mock_admin_session", "false");
          localStorage.setItem("sb_mock_user_email", email);
        }
        const session = {
          user: {
            email,
            user_metadata: {
              full_name: email.split("@")[0].toUpperCase(),
              nim: "2401020095"
            }
          }
        };
        return { data: { session, user: session.user }, error: null };
      }

      return { data: { session: null, user: null }, error: new Error("Kredensial salah atau password kurang dari 6 karakter.") };
    },

    async signOut() {
      if (typeof window !== "undefined") {
        localStorage.removeItem("sb_mock_admin_session");
        localStorage.removeItem("sb_mock_user_email");
      }
      return { error: null };
    },

    async updateUser(payload: any) {
      if (typeof window === "undefined") return { data: { user: null }, error: null };
      
      const email = payload.email || localStorage.getItem("sb_mock_user_email") || "mahasiswa@primakara.ac.id";
      const fullName = payload.data?.full_name || email.split("@")[0].toUpperCase();
      const nim = payload.data?.nim || "2401020095";
      
      localStorage.setItem("sb_mock_user_email", email);
      if (email.toLowerCase().startsWith("admin")) {
        localStorage.setItem("sb_mock_admin_session", "true");
      }
      
      const user = {
        email,
        user_metadata: {
          full_name: fullName,
          nim: nim
        }
      };
      
      return { data: { user }, error: null };
    }
  };

  return {
    auth: mockAuth,
    from(tableName: string) {
      return new MockQueryChain(tableName);
    }
  };
}

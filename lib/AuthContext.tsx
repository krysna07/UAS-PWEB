"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/lib/supabase";

interface AuthContextType {
  userEmail: string | null;
  fullName: string | null;
  userNim: string | null;
  isAdmin: boolean;
  isLoading: boolean;
  setUserEmail: React.Dispatch<React.SetStateAction<string | null>>;
  setFullName: React.Dispatch<React.SetStateAction<string | null>>;
  setUserNim: React.Dispatch<React.SetStateAction<string | null>>;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [userNim, setUserNim] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user?.email) {
          setUserEmail(user.email);
          setIsAdmin(user.email.toLowerCase().startsWith("admin"));
          setFullName(user.user_metadata?.full_name || null);
          setUserNim(user.user_metadata?.nim || null);
        } else {
          // Fallback to mock session
          const isMockAdmin = localStorage.getItem("sb_mock_admin_session") === "true";
          if (isMockAdmin) {
            setUserEmail("admin@primakara.ac.id");
            setIsAdmin(true);
            setFullName("Admin Akademik");
          } else {
            setUserEmail(null);
            setIsAdmin(false);
            setFullName(null);
            setUserNim(null);
          }
        }
      } catch (error) {
        // If Supabase is unconfigured or offline, fallback to mock session
        const isMockAdmin = localStorage.getItem("sb_mock_admin_session") === "true";
        if (isMockAdmin) {
          setUserEmail("admin@primakara.ac.id");
          setIsAdmin(true);
          setFullName("Admin Akademik");
        } else {
          setUserEmail(null);
          setIsAdmin(false);
          setFullName(null);
          setUserNim(null);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();

    // Auth state subscription (one time only)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      if (session?.user?.email) {
        setUserEmail(session.user.email);
        setIsAdmin(session.user.email.toLowerCase().startsWith("admin"));
        setFullName(session.user.user_metadata?.full_name || null);
        setUserNim(session.user.user_metadata?.nim || null);
      } else {
        const isMockAdmin = localStorage.getItem("sb_mock_admin_session") === "true";
        if (isMockAdmin) {
          setUserEmail("admin@primakara.ac.id");
          setIsAdmin(true);
          setFullName("Admin Akademik");
          setUserNim(null);
        } else {
          setUserEmail(null);
          setIsAdmin(false);
          setFullName(null);
          setUserNim(null);
        }
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ userEmail, fullName, userNim, isAdmin, isLoading, setUserEmail, setFullName, setUserNim, setIsAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

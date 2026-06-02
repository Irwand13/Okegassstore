import {
  createContext, useContext,
  useState, useEffect, useRef, ReactNode
} from "react";
import { Session } from "@supabase/supabase-js";
import { supabase, getProfile, Profile } from "@/lib/supabase";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  verified: boolean;
  balance: number;
  username?: string;
  avatar_url?: string | null;
  is_verified_seller?: boolean;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  register: (name: string, email: string, password: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function mapProfileToUser(
  supabaseUser: { id: string; email?: string },
  profile: Profile
): User {
  return {
    id:                 supabaseUser.id,
    name:               profile.full_name || profile.username || supabaseUser.email?.split("@")[0] || "User",
    email:              supabaseUser.email || "",
    avatar:             "👤",
    verified:           profile.is_verified_seller,
    balance:            profile.balance,
    username:           profile.username ?? undefined,
    avatar_url:         profile.avatar_url,
    is_verified_seller: profile.is_verified_seller,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]                   = useState<User | null>(null);
  const [profile, setProfile]             = useState<Profile | null>(null);
  const [session, setSession]             = useState<Session | null>(null);
  const [loading, setLoading]             = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // ✅ Cegah double call loadProfile
  const loadingProfileRef = useRef(false);

  const loadProfile = async (userId: string, email?: string) => {
    // Kalau sedang loading, skip
    if (loadingProfileRef.current) return;
    loadingProfileRef.current = true;

    try {
      const { data, error } = await getProfile(userId);
      if (error) console.error("❌ getProfile error:", error.message);

      if (data) {
        setProfile(data);
        setUser(mapProfileToUser({ id: userId, email }, data));
      } else {
        // Profile belum ada di DB
        setUser({
          id:       userId,
          name:     email?.split("@")[0] || "User",
          email:    email || "",
          avatar:   "👤",
          verified: false,
          balance:  0,
        });
      }
    } finally {
      loadingProfileRef.current = false;
    }
  };

  const refreshProfile = async () => {
    loadingProfileRef.current = false; // reset flag supaya bisa refresh paksa
    if (session?.user) {
      await loadProfile(session.user.id, session.user.email);
    }
  };

  // ─── CLEAR ALL STORAGE & COOKIES
  const clearAllStorage = () => {
    try {
      // Clear localStorage
      localStorage.clear();
      
      // Clear sessionStorage
      sessionStorage.clear();
      
      // Clear specific Supabase keys - clear dengan berbagai varian
      const keysToRemove = [
        'sb-yiqeybjphrkmfjcmgeix-auth-token',
        'supabase.auth.token',
        'auth.session',
        'auth.user',
        'SUPABASE_SESSION',
        'sb_' // prefix Supabase
      ];
      
      // Remove keys from localStorage
      Object.keys(localStorage).forEach(key => {
        if (keysToRemove.some(k => key.includes(k))) {
          localStorage.removeItem(key);
          console.log(`🗑️ Removed localStorage: ${key}`);
        }
      });
      
      // Remove keys from sessionStorage
      Object.keys(sessionStorage).forEach(key => {
        if (keysToRemove.some(k => key.includes(k))) {
          sessionStorage.removeItem(key);
          console.log(`🗑️ Removed sessionStorage: ${key}`);
        }
      });
      
      // Clear IndexedDB
      if (window.indexedDB) {
        try {
          const request = window.indexedDB.deleteDatabase('supabase');
          request.onsuccess = () => console.log("✅ IndexedDB cleared");
        } catch (e) {
          console.error("IndexedDB clear error:", e);
        }
      }
      
      // Clear semua cookies dengan berbagai cara
      document.cookie.split(";").forEach((c) => {
        const eqPos = c.indexOf("=");
        const name = eqPos > -1 ? c.substr(0, eqPos).trim() : c.trim();
        if (name) {
          // Clear dengan path /
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=Lax`;
          // Clear dengan domain
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;domain=${window.location.hostname};SameSite=Lax`;
          console.log(`🗑️ Cleared cookie: ${name}`);
        }
      });
      
      console.log("✅ COMPLETE: Semua storage, localStorage, sessionStorage, IndexedDB & cookies dihapus");
    } catch (error) {
      console.error("❌ Error clearing storage:", error);
    }
  };

  useEffect(() => {
    // ✅ Pakai HANYA onAuthStateChange — tidak perlu getSession terpisah
    // onAuthStateChange otomatis fire INITIAL_SESSION saat pertama mount
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("🔄 Auth event:", event);
        setSession(session);

        if (session?.user) {
          await loadProfile(session.user.id, session.user.email);
        } else {
          // Tidak ada session - clear all storage untuk clean state
          setUser(null);
          setProfile(null);
          // Jangan clear storage di sini - hanya clear saat logout manual
        }

        // Loading selesai setelah event pertama
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // ─── LOGIN
  const login = async (
    email: string,
    password: string
  ): Promise<{ error: string | null }> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    // onAuthStateChange akan handle set user & profile otomatis
    setShowAuthModal(false);
    return { error: null };
  };

  // ─── REGISTER
  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ error: string | null }> => {
    const username =
      name.toLowerCase().replace(/\s+/g, "_") +
      "_" +
      Date.now().toString().slice(-4);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name, username } },
    });

    if (error) return { error: error.message };
    setShowAuthModal(false);
    return { error: null };
  };

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setSession(null);
    clearAllStorage();
    // onAuthStateChange akan handle clear user & profile
  };

  return (
    <AuthContext.Provider
      value={{
        user, profile, session, loading,
        login, register, logout, signInWithGoogle, refreshProfile,
        showAuthModal, setShowAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth harus dipakai di dalam AuthProvider");
  return context;
}
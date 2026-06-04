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

  const loadingProfileRef = useRef(false);
  const mountedRef        = useRef(true);

  // ─── Load profile dengan timeout sendiri ─────────────────────
  const loadProfile = async (userId: string, email?: string) => {
    if (loadingProfileRef.current) return;
    loadingProfileRef.current = true;

    try {
      // Race antara getProfile vs timeout 20 detik
      const result = await Promise.race([
        getProfile(userId),
        new Promise<{ data: null; error: Error }>((resolve) =>
          setTimeout(
            () => resolve({ data: null, error: new Error("Profile timeout") }),
            20000
          )
        ),
      ]);

      const { data, error } = result;

      if (error && error.message !== "Profile timeout") {
        console.error("❌ getProfile error:", error.message);
      }

      if (!mountedRef.current) return;

      if (data) {
        setProfile(data);
        setUser(mapProfileToUser({ id: userId, email }, data));
      } else {
        // Gagal ambil profile — set user minimal dari session
        // TIDAK logout, user tetap login
        setUser({
          id:       userId,
          name:     email?.split("@")[0] || "User",
          email:    email || "",
          avatar:   "👤",
          verified: false,
          balance:  0,
        });
      }
    } catch (err) {
      console.error("loadProfile exception:", err);
      // Tetap set user minimal supaya tidak logout
      if (mountedRef.current) {
        setUser({
          id:     userId,
          name:   email?.split("@")[0] || "User",
          email:  email || "",
          avatar: "👤",
          verified: false,
          balance: 0,
        });
      }
    } finally {
      loadingProfileRef.current = false;
    }
  };

  const refreshProfile = async () => {
    loadingProfileRef.current = false;
    if (session?.user) {
      await loadProfile(session.user.id, session.user.email);
    }
  };

  // ─── Auth init ───────────────────────────────────────────────
  useEffect(() => {
    mountedRef.current = true;

    // Timeout 30 detik — hanya untuk stop spinner, TIDAK clear user
    const timeout = setTimeout(() => {
      if (mountedRef.current) {
        console.warn("⚠️ Auth init timeout — stop loading spinner");
        setLoading(false);
      }
    }, 30000);

    // Cek session existing
    supabase.auth.getSession().then(async ({ data: { session }, error }) => {
      if (!mountedRef.current) return;

      // Cancel timeout karena Supabase sudah respond
      clearTimeout(timeout);

      if (error) {
        console.error("getSession error:", error.message);
        setLoading(false);
        return;
      }

      setSession(session);

      if (session?.user) {
        await loadProfile(session.user.id, session.user.email);
      }

      if (mountedRef.current) setLoading(false);

    }).catch((err) => {
      console.error("getSession exception:", err);
      clearTimeout(timeout);
      if (mountedRef.current) setLoading(false);
    });

    // Listen perubahan auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        if (!mountedRef.current) return;

        // INITIAL_SESSION dihandle oleh getSession di atas
        if (event === "INITIAL_SESSION") return;

        console.log("🔄 Auth event:", event);

        setSession(newSession);

        if (newSession?.user) {
          // Reset flag supaya bisa load ulang saat login
          loadingProfileRef.current = false;
          await loadProfile(newSession.user.id, newSession.user.email);
        } else {
          // Logout — clear state
          setUser(null);
          setProfile(null);
        }

        if (mountedRef.current) setLoading(false);
      }
    );

    return () => {
      mountedRef.current = false;
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, []);

  // ─── LOGIN ───────────────────────────────────────────────────
  const login = async (
    email: string,
    password: string
  ): Promise<{ error: string | null }> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    setShowAuthModal(false);
    return { error: null };
  };

  // ─── REGISTER ────────────────────────────────────────────────
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

  // ─── GOOGLE LOGIN ─────────────────────────────────────────────
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
  };

  // ─── LOGOUT ──────────────────────────────────────────────────
  const logout = async () => {
    // Clear state dulu sebelum signOut
    setUser(null);
    setProfile(null);
    setSession(null);
    loadingProfileRef.current = false;

    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("signOut error:", err);
    }
    // onAuthStateChange akan fire SIGNED_OUT — tidak perlu hapus storage manual
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
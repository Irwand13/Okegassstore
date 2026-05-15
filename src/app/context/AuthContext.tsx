import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  verified: boolean;
  balance: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const login = (email: string, password: string) => {
    // Mock login - in real app would call API
    setUser({
      id: "1",
      name: "Budi Santoso",
      email: email,
      avatar: "👤",
      verified: email === "demo@okegass.com",
      balance: 150000,
    });
    setShowAuthModal(false);
  };

  const register = (name: string, email: string, password: string) => {
    // Mock register
    setUser({
      id: "1",
      name: name,
      email: email,
      avatar: "👤",
      verified: false,
      balance: 0,
    });
    setShowAuthModal(false);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, showAuthModal, setShowAuthModal }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

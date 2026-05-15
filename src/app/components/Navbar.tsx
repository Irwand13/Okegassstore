import { Link } from "react-router";
import { Menu, X, User, LogOut, Tag } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import AuthModal from "./AuthModal";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout, setShowAuthModal } = useAuth();

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[#111827] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#DC2626] to-[#EA580C] rounded-lg flex items-center justify-center text-2xl">
                🎮
              </div>
              <span style={{ fontFamily: 'var(--font-display)' }} className="text-2xl font-bold">
                OkeGass Store
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/topup"
                className="hover:text-[#DC2626] transition-colors duration-200"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Top Up
              </Link>
              <Link
                to="/marketplace"
                className="hover:text-[#DC2626] transition-colors duration-200"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Jual Beli Akun
              </Link>
              <Link
                to="/"
                className="hover:text-[#DC2626] transition-colors duration-200"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Bantuan
              </Link>
            </div>

            {/* Auth Buttons / User Menu */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <span className="text-2xl">{user.avatar}</span>
                    <span>{user.name}</span>
                  </button>
                  
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded-lg shadow-xl py-2">
                      <Link
                        to="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                      <Link
                        to="/marketplace/sell"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100"
                      >
                        <Tag className="w-4 h-4" />
                        Jual Akun
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                        }}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 w-full text-left text-red-600"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="px-6 py-2 hover:bg-white/10 rounded-lg transition-colors"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="px-6 py-2 bg-gradient-to-r from-[#DC2626] to-[#EA580C] rounded-lg hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Register
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#1F2937] border-t border-white/10">
            <div className="px-4 py-4 space-y-3">
              <Link
                to="/topup"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 hover:text-[#DC2626]"
              >
                Top Up
              </Link>
              <Link
                to="/marketplace"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 hover:text-[#DC2626]"
              >
                Jual Beli Akun
              </Link>
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 hover:text-[#DC2626]"
              >
                Bantuan
              </Link>
              
              {user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 hover:text-[#DC2626]"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/marketplace/sell"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 hover:text-[#DC2626]"
                  >
                    Jual Akun
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="block py-2 text-red-500 text-left w-full"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setShowAuthModal(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 bg-gradient-to-r from-[#DC2626] to-[#EA580C] rounded-lg"
                >
                  Login / Register
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
      
      <AuthModal />
    </>
  );
}

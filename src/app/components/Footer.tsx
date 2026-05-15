import { Link } from "react-router";
import { Instagram } from "lucide-react";
import { WhatsApp } from "@mui/icons-material";

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#DC2626] to-[#EA580C] rounded-lg flex items-center justify-center text-2xl">
                🎮
              </div>
              <span style={{ fontFamily: 'var(--font-display)' }} className="text-2xl font-bold">
                OkeGass
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Platform top up game dan jual beli akun terpercaya dengan sistem escrow 100% aman.
            </p>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/irwndd._" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#DC2626] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/vynurdiansyah" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#DC2626] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/dvalfn0" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#DC2626] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://api.whatsapp.com/send/?phone=6289667290516&text&type=phone_number&app_absent=0" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#DC2626] transition-colors">
                <WhatsApp className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Layanan */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)' }} className="text-lg font-bold mb-4">
              Layanan
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/topup" className="hover:text-[#DC2626] transition-colors">Top Up Game</Link></li>
              <li><Link to="/topup" className="hover:text-[#DC2626] transition-colors">Pulsa & Data</Link></li>
              <li><Link to="/topup" className="hover:text-[#DC2626] transition-colors">Token PLN</Link></li>
              <li><Link to="/topup" className="hover:text-[#DC2626] transition-colors">E-Wallet</Link></li>
              <li><Link to="/marketplace" className="hover:text-[#DC2626] transition-colors">Jual Beli Akun</Link></li>
            </ul>
          </div>

          {/* Bantuan */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)' }} className="text-lg font-bold mb-4">
              Bantuan
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-[#DC2626] transition-colors">Cara Order</a></li>
              <li><a href="#" className="hover:text-[#DC2626] transition-colors">Sistem Escrow</a></li>
              <li><a href="#" className="hover:text-[#DC2626] transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-[#DC2626] transition-colors">Hubungi Kami</a></li>
              <li><a href="#" className="hover:text-[#DC2626] transition-colors">Lapor Masalah</a></li>
            </ul>
          </div>

          {/* Extra */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)' }} className="text-lg font-bold mb-4">
              Informasi
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-[#DC2626] transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-[#DC2626] transition-colors">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:text-[#DC2626] transition-colors">Syarat & Ketentuan</a></li>
              <li><a href="#" className="hover:text-[#DC2626] transition-colors">Karir</a></li>
              <li><a href="#" className="hover:text-[#DC2626] transition-colors">Blog</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2026 OkeGass Store. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-400">Sistem berjalan normal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

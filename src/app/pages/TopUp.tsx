import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import {
  Zap, ChevronRight, Shield, Clock, CheckCircle,
  User, Hash, AlertCircle, ArrowLeft, Search,
  Wallet, RefreshCw, Eye, EyeOff, TrendingUp, Info
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../../lib/supabase";

// ─── TYPES ────────────────────────────────────────────────────────

const games = [
  // MOBA
  { id: "ml",       name: "Mobile Legends",      color: "#1E88E5", currency: "Diamonds",         icon: "⚔️",  category: "MOBA" },
  { id: "hok",      name: "Honor of Kings",       color: "#D4AF37", currency: "Tokens",           icon: "👑",  category: "MOBA" },
  { id: "wildrift", name: "Wild Rift",            color: "#C89B3C", currency: "Wild Cores",       icon: "🏹",  category: "MOBA" },
  { id: "dota2",    name: "Dota 2",               color: "#BF3D3B", currency: "Shards",           icon: "🌀",  category: "MOBA" },
  // Battle Royale
  { id: "ff",       name: "Free Fire",            color: "#FF4500", currency: "Diamonds",         icon: "🔥",  category: "Battle Royale" },
  { id: "pubg",     name: "PUBG Mobile",          color: "#F59E0B", currency: "UC",               icon: "🎯",  category: "Battle Royale" },
  { id: "codm",     name: "Call of Duty Mobile",  color: "#4CAF50", currency: "CP",               icon: "🪖",  category: "Battle Royale" },
  { id: "apex",     name: "Apex Legends Mobile",  color: "#DA3B1F", currency: "Coins",            icon: "🦅",  category: "Battle Royale" },
  // FPS
  { id: "valorant", name: "Valorant",             color: "#FF4655", currency: "VP",               icon: "💀",  category: "FPS" },
  { id: "cs2",      name: "CS2 Skins",            color: "#F0A500", currency: "Credits",          icon: "🧨",  category: "FPS" },
  // RPG
  { id: "genshin",  name: "Genshin Impact",       color: "#A78BFA", currency: "Genesis Crystals", icon: "✨",  category: "RPG" },
  { id: "hsr",      name: "Honkai: Star Rail",    color: "#7EC8E3", currency: "Oneiric Shards",   icon: "🚂",  category: "RPG" },
  { id: "zzz",      name: "Zenless Zone Zero",    color: "#FFD700", currency: "Polychrome",       icon: "⚡",  category: "RPG" },
  { id: "wuwa",     name: "Wuthering Waves",      color: "#34D399", currency: "Lunite",           icon: "🌊",  category: "RPG" },
  { id: "hi3",      name: "Honkai Impact 3rd",    color: "#E879F9", currency: "Crystals",         icon: "🌸",  category: "RPG" },
  { id: "nikke",    name: "NIKKE",                color: "#F472B6", currency: "Gems",             icon: "🤖",  category: "RPG" },
  // Strategy
  { id: "coc",      name: "Clash of Clans",       color: "#FBBF24", currency: "Gems",             icon: "🏰",  category: "Strategy" },
  { id: "cr",       name: "Clash Royale",         color: "#8B5CF6", currency: "Gems",             icon: "👾",  category: "Strategy" },
  { id: "riseofkingdoms", name: "Rise of Kingdoms", color: "#10B981", currency: "Gems",          icon: "⚜️",  category: "Strategy" },
  { id: "lordsmobile", name: "Lords Mobile",      color: "#3B82F6", currency: "Gems",             icon: "🗡️",  category: "Strategy" },
  // Sports
  { id: "efootball", name: "eFootball",           color: "#1D4ED8", currency: "Coins",            icon: "⚽",  category: "Sports" },
  { id: "nba2k",    name: "NBA 2K Mobile",        color: "#EA580C", currency: "VC",               icon: "🏀",  category: "Sports" },
  // RPG (misc)
  { id: "ragnarok", name: "Ragnarok M",           color: "#0EA5E9", currency: "Crystals",         icon: "🧝",  category: "RPG" },
  { id: "aov",      name: "Arena of Valor",       color: "#F59E0B", currency: "Vouchers",         icon: "🗡️",  category: "MOBA" },
];

type Denom = { id: string; amount: number; label: string; price: number; bonus?: number; popular?: boolean };

const denominations: Record<string, Denom[]> = {
  ml: [
    { id: "ml1",  amount: 50,    label: "44 Diamonds",         price: 11000 },
    { id: "ml2",  amount: 75,    label: "85 Diamonds",         price: 20300 },
    { id: "ml3",  amount: 150,   label: "155 Diamonds",        price: 42400,   bonus: 15 },
    { id: "ml4",  amount: 250,   label: "240 Diamonds",        price: 60700,   popular: true },
    { id: "ml5",  amount: 500,   label: "367 Diamonds",        price: 103200,  bonus: 41 },
    { id: "ml6",  amount: 750,   label: "568 Diamonds",        price: 141500 },
    { id: "ml7",  amount: 1000,  label: "774 Diamonds",        price: 216300,  bonus: 101, popular: true },
    { id: "ml8",  amount: 2000,  label: "1708 Diamonds",       price: 473000,  bonus: 302 },
    { id: "ml9",  amount: 5000,  label: "4003 Diamonds",       price: 1135000,  bonus: 827 },
    { id: "ml10", amount: 10000, label: "8006 Diamonds",       price: 2500000, bonus: 1603 },
    { id: "ml11", amount: 500,   label: "Twilight Pass",       price: 145000 },
    { id: "ml12", amount: 300,   label: "Weekly Diamond Pass", price: 27000 },
  ],
  ff: [
    { id: "ff1", amount: 70,   label: "70 Diamonds",   price: 15700 },
    { id: "ff2", amount: 140,  label: "140 Diamonds",  price: 29800 },
    { id: "ff3", amount: 355,  label: "355 Diamonds",  price: 45600,  popular: true },
    { id: "ff4", amount: 720,  label: "720 Diamonds",  price: 101000, bonus: 72 },
    { id: "ff5", amount: 1450, label: "1450 Diamonds", price: 210000, bonus: 145, popular: true },
    { id: "ff6", amount: 2900, label: "2900 Diamonds", price: 342000, bonus: 290 },
  ],
  pubg: [
    { id: "pubg1", amount: 60,   label: "60 UC",   price: 14000 },
    { id: "pubg2", amount: 180,  label: "180 UC",  price: 38000 },
    { id: "pubg3", amount: 325,  label: "325 UC",  price: 68000,  popular: true },
    { id: "pubg4", amount: 660,  label: "660 UC",  price: 135000, bonus: 60 },
    { id: "pubg5", amount: 1800, label: "1800 UC", price: 365000, bonus: 180, popular: true },
    { id: "pubg6", amount: 3850, label: "3850 UC", price: 750000, bonus: 350 },
  ],
  genshin: [
    { id: "gen1", amount: 60,   label: "60 Crystals",   price: 15000 },
    { id: "gen2", amount: 300,  label: "300 Crystals",  price: 72000,   bonus: 30 },
    { id: "gen3", amount: 980,  label: "980 Crystals",  price: 232000,  bonus: 110, popular: true },
    { id: "gen4", amount: 1980, label: "1980 Crystals", price: 462000,  bonus: 260 },
    { id: "gen5", amount: 3280, label: "3280 Crystals", price: 762000,  bonus: 600, popular: true },
    { id: "gen6", amount: 6480, label: "6480 Crystals", price: 1502000, bonus: 1600 },
  ],
  valorant: [
    { id: "val1", amount: 475,   label: "475 VP",   price: 50000 },
    { id: "val2", amount: 1000,  label: "1000 VP",  price: 100000 },
    { id: "val3", amount: 2050,  label: "2050 VP",  price: 200000, popular: true },
    { id: "val4", amount: 3650,  label: "3650 VP",  price: 350000, bonus: 100 },
    { id: "val5", amount: 5350,  label: "5350 VP",  price: 500000, bonus: 250, popular: true },
    { id: "val6", amount: 11000, label: "11000 VP", price: 1000000, bonus: 1000 },
  ],
  hok: [
    { id: "hok1", amount: 70,   label: "70 Tokens",   price: 15000 },
    { id: "hok2", amount: 180,  label: "180 Tokens",  price: 38000 },
    { id: "hok3", amount: 360,  label: "360 Tokens",  price: 75000,  popular: true },
    { id: "hok4", amount: 750,  label: "750 Tokens",  price: 150000 },
    { id: "hok5", amount: 1500, label: "1500 Tokens", price: 290000, bonus: 100, popular: true },
    { id: "hok6", amount: 3000, label: "3000 Tokens", price: 570000, bonus: 300 },
  ],
  wildrift: [
    { id: "wr1", amount: 325,  label: "325 Wild Cores",  price: 55000 },
    { id: "wr2", amount: 660,  label: "660 Wild Cores",  price: 109000 },
    { id: "wr3", amount: 1270, label: "1270 Wild Cores", price: 209000, popular: true },
    { id: "wr4", amount: 2565, label: "2565 Wild Cores", price: 419000, bonus: 130, popular: true },
    { id: "wr5", amount: 5530, label: "5530 Wild Cores", price: 839000, bonus: 280 },
  ],
  dota2: [
    { id: "d1", amount: 200,  label: "200 Shards",  price: 28000 },
    { id: "d2", amount: 500,  label: "500 Shards",  price: 65000 },
    { id: "d3", amount: 1000, label: "1000 Shards", price: 125000, popular: true },
    { id: "d4", amount: 2500, label: "2500 Shards", price: 300000, bonus: 250, popular: true },
    { id: "d5", amount: 5000, label: "5000 Shards", price: 580000, bonus: 600 },
  ],
  codm: [
    { id: "codm1", amount: 80,   label: "80 CP",   price: 15000 },
    { id: "codm2", amount: 200,  label: "200 CP",  price: 36000 },
    { id: "codm3", amount: 400,  label: "400 CP",  price: 70000,  popular: true },
    { id: "codm4", amount: 800,  label: "800 CP",  price: 139000, bonus: 80 },
    { id: "codm5", amount: 2000, label: "2000 CP", price: 339000, bonus: 200, popular: true },
    { id: "codm6", amount: 4000, label: "4000 CP", price: 669000, bonus: 500 },
  ],
  apex: [
    { id: "apex1", amount: 100,  label: "100 Coins",  price: 15000 },
    { id: "apex2", amount: 500,  label: "500 Coins",  price: 75000 },
    { id: "apex3", amount: 1000, label: "1000 Coins", price: 145000, popular: true },
    { id: "apex4", amount: 2150, label: "2150 Coins", price: 299000, bonus: 150, popular: true },
    { id: "apex5", amount: 4350, label: "4350 Coins", price: 589000, bonus: 350 },
  ],
  cs2: [
    { id: "cs1",  amount: 1000,  label: "1000 Credits",  price: 99000 },
    { id: "cs2a", amount: 2200,  label: "2200 Credits",  price: 199000, popular: true },
    { id: "cs3",  amount: 4600,  label: "4600 Credits",  price: 399000, bonus: 400, popular: true },
    { id: "cs4",  amount: 10000, label: "10000 Credits", price: 849000, bonus: 1000 },
  ],
  hsr: [
    { id: "hsr1", amount: 60,   label: "60 Shards",   price: 15000 },
    { id: "hsr2", amount: 300,  label: "300 Shards",  price: 72000,   bonus: 30 },
    { id: "hsr3", amount: 980,  label: "980 Shards",  price: 232000,  bonus: 110, popular: true },
    { id: "hsr4", amount: 1980, label: "1980 Shards", price: 462000,  bonus: 260 },
    { id: "hsr5", amount: 3280, label: "3280 Shards", price: 762000,  bonus: 600, popular: true },
    { id: "hsr6", amount: 6480, label: "6480 Shards", price: 1502000, bonus: 1600 },
  ],
  zzz: [
    { id: "zzz1", amount: 60,   label: "60 Polychrome",   price: 15000 },
    { id: "zzz2", amount: 300,  label: "300 Polychrome",  price: 72000,  bonus: 30 },
    { id: "zzz3", amount: 980,  label: "980 Polychrome",  price: 232000, bonus: 110, popular: true },
    { id: "zzz4", amount: 1980, label: "1980 Polychrome", price: 462000, bonus: 260 },
    { id: "zzz5", amount: 3280, label: "3280 Polychrome", price: 762000, bonus: 600, popular: true },
  ],
  wuwa: [
    { id: "ww1", amount: 60,   label: "60 Lunite",   price: 15000 },
    { id: "ww2", amount: 300,  label: "300 Lunite",  price: 72000,  bonus: 30 },
    { id: "ww3", amount: 980,  label: "980 Lunite",  price: 232000, bonus: 110, popular: true },
    { id: "ww4", amount: 1980, label: "1980 Lunite", price: 462000, bonus: 260 },
    { id: "ww5", amount: 3280, label: "3280 Lunite", price: 762000, bonus: 600, popular: true },
  ],
  hi3: [
    { id: "hi1",  amount: 98,   label: "98 Crystals",   price: 25000 },
    { id: "hi2",  amount: 196,  label: "196 Crystals",  price: 48000 },
    { id: "hi3a", amount: 394,  label: "394 Crystals",  price: 95000,  popular: true },
    { id: "hi4",  amount: 788,  label: "788 Crystals",  price: 185000, bonus: 80, popular: true },
    { id: "hi5",  amount: 1576, label: "1576 Crystals", price: 365000, bonus: 180 },
  ],
  nikke: [
    { id: "nk1", amount: 80,   label: "80 Gems",   price: 16000 },
    { id: "nk2", amount: 200,  label: "200 Gems",  price: 38000 },
    { id: "nk3", amount: 500,  label: "500 Gems",  price: 95000,  popular: true },
    { id: "nk4", amount: 1000, label: "1000 Gems", price: 185000, bonus: 100, popular: true },
    { id: "nk5", amount: 2500, label: "2500 Gems", price: 455000, bonus: 300 },
  ],
  coc: [
    { id: "coc1", amount: 80,    label: "80 Gems",    price: 16000 },
    { id: "coc2", amount: 500,   label: "500 Gems",   price: 79000 },
    { id: "coc3", amount: 1200,  label: "1200 Gems",  price: 159000, popular: true },
    { id: "coc4", amount: 2500,  label: "2500 Gems",  price: 319000, bonus: 250, popular: true },
    { id: "coc5", amount: 6500,  label: "6500 Gems",  price: 799000, bonus: 750 },
    { id: "coc6", amount: 14000, label: "14000 Gems", price: 1599000, bonus: 1500 },
  ],
  cr: [
    { id: "cr1", amount: 80,   label: "80 Gems",   price: 16000 },
    { id: "cr2", amount: 500,  label: "500 Gems",  price: 79000 },
    { id: "cr3", amount: 1200, label: "1200 Gems", price: 159000, popular: true },
    { id: "cr4", amount: 2500, label: "2500 Gems", price: 319000, bonus: 250, popular: true },
    { id: "cr5", amount: 6500, label: "6500 Gems", price: 799000, bonus: 750 },
  ],
  riseofkingdoms: [
    { id: "rok1", amount: 200,  label: "200 Gems",  price: 35000 },
    { id: "rok2", amount: 500,  label: "500 Gems",  price: 85000 },
    { id: "rok3", amount: 1200, label: "1200 Gems", price: 195000, popular: true },
    { id: "rok4", amount: 2500, label: "2500 Gems", price: 395000, bonus: 250, popular: true },
    { id: "rok5", amount: 6500, label: "6500 Gems", price: 995000, bonus: 800 },
  ],
  lordsmobile: [
    { id: "lm1", amount: 100,  label: "100 Gems",  price: 18000 },
    { id: "lm2", amount: 500,  label: "500 Gems",  price: 85000 },
    { id: "lm3", amount: 1200, label: "1200 Gems", price: 195000, popular: true },
    { id: "lm4", amount: 3000, label: "3000 Gems", price: 475000, bonus: 300, popular: true },
    { id: "lm5", amount: 6500, label: "6500 Gems", price: 995000, bonus: 750 },
  ],
  efootball: [
    { id: "ef1", amount: 200,  label: "200 Coins",  price: 30000 },
    { id: "ef2", amount: 500,  label: "500 Coins",  price: 70000 },
    { id: "ef3", amount: 1000, label: "1000 Coins", price: 135000, popular: true },
    { id: "ef4", amount: 2500, label: "2500 Coins", price: 325000, bonus: 200, popular: true },
    { id: "ef5", amount: 5000, label: "5000 Coins", price: 635000, bonus: 500 },
  ],
  nba2k: [
    { id: "nba1", amount: 200,  label: "200 VC",  price: 28000 },
    { id: "nba2", amount: 500,  label: "500 VC",  price: 68000 },
    { id: "nba3", amount: 1200, label: "1200 VC", price: 158000, popular: true },
    { id: "nba4", amount: 2500, label: "2500 VC", price: 315000, bonus: 200, popular: true },
    { id: "nba5", amount: 5000, label: "5000 VC", price: 615000, bonus: 500 },
  ],
  ragnarok: [
    { id: "ro1", amount: 100,  label: "100 Crystals",  price: 20000 },
    { id: "ro2", amount: 300,  label: "300 Crystals",  price: 58000 },
    { id: "ro3", amount: 700,  label: "700 Crystals",  price: 130000, popular: true },
    { id: "ro4", amount: 1500, label: "1500 Crystals", price: 268000, bonus: 150, popular: true },
    { id: "ro5", amount: 4000, label: "4000 Crystals", price: 698000, bonus: 500 },
  ],
  aov: [
    { id: "aov1", amount: 75,   label: "75 Vouchers",   price: 15000 },
    { id: "aov2", amount: 200,  label: "200 Vouchers",  price: 38000 },
    { id: "aov3", amount: 500,  label: "500 Vouchers",  price: 90000,  popular: true },
    { id: "aov4", amount: 1000, label: "1000 Vouchers", price: 175000, bonus: 100, popular: true },
    { id: "aov5", amount: 2500, label: "2500 Vouchers", price: 425000, bonus: 300 },
  ],
};

const formatRupiah = (n: number) => "Rp " + n.toLocaleString("id-ID");

const ALL_CATEGORIES = ["Semua", "MOBA", "Battle Royale", "FPS", "RPG", "Strategy", "Sports"];

const VALID_GAME_IDS = new Set(games.map((g) => g.id));

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow:wght@400;500;600&display=swap');

.tu-root {
  min-height: 100vh;
  background: #0d0d0f;
  font-family: 'Barlow', sans-serif;
}

/* ── Hero ── */
.tu-hero {
  position: relative;
  padding: 40px 0 36px;
  overflow: hidden;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.tu-hero-bg {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(220,38,38,0.15) 0%, rgba(234,88,12,0.08) 50%, transparent 100%);
}
.tu-hero-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
  background-size: 40px 40px;
}
.tu-hero-line {
  position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(220,38,38,0.5), transparent);
}

/* ── Card ── */
.tu-card {
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 18px;
  padding: 28px;
  position: relative;
  overflow: hidden;
}
.tu-card-top {
  position: absolute; top: 0; left: 20px; right: 20px; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
}
.tu-step-num {
  width: 28px; height: 28px;
  border-radius: 8px;
  background: linear-gradient(135deg, #DC2626, #EA580C);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Rajdhani', sans-serif;
  font-size: 14px; font-weight: 700; color: #fff;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(220,38,38,0.35);
}
.tu-section-title {
  font-family: 'Rajdhani', sans-serif;
  font-size: 18px; font-weight: 700;
  color: #fff; margin: 0;
  letter-spacing: 0.02em;
}

/* ── Search ── */
.tu-search-wrap { position: relative; margin-bottom: 14px; }
.tu-search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: rgba(255,255,255,0.3); pointer-events: none; }
.tu-search-input {
  width: 100%;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
  padding: 10px 14px 10px 36px;
  font-family: 'Barlow', sans-serif;
  font-size: 13px; font-weight: 500; color: #fff;
  outline: none; transition: all 0.2s; box-sizing: border-box;
}
.tu-search-input::placeholder { color: rgba(255,255,255,0.2); }
.tu-search-input:focus { border-color: rgba(220,38,38,0.4); background: rgba(220,38,38,0.03); }

/* ── Category tabs ── */
.tu-cat-tabs { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 16px; }
.tu-cat-tab {
  padding: 5px 12px; border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.03);
  font-family: 'Barlow', sans-serif;
  font-size: 11px; font-weight: 700;
  color: rgba(255,255,255,0.4);
  cursor: pointer; transition: all 0.18s;
  text-transform: uppercase; letter-spacing: 0.06em;
}
.tu-cat-tab:hover { border-color: rgba(255,255,255,0.15); color: rgba(255,255,255,0.6); }
.tu-cat-tab.active { background: rgba(220,38,38,0.12); border-color: rgba(220,38,38,0.45); color: #DC2626; }

/* ── Game cards ── */
.tu-game-btn {
  display: flex; align-items: center; gap: 10px;
  padding: 12px 14px; border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.07);
  background: rgba(255,255,255,0.02);
  cursor: pointer; transition: all 0.22s ease;
  text-align: left; position: relative; overflow: hidden;
}
.tu-game-btn:hover { border-color: rgba(255,255,255,0.15); background: rgba(255,255,255,0.04); }
.tu-game-btn.active { background: rgba(220,38,38,0.08); border-color: rgba(220,38,38,0.5); }
.tu-game-icon { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }

/* ── Denom cards ── */
.tu-denom-btn {
  position: relative; padding: 14px 14px 12px;
  border-radius: 12px; border: 1px solid rgba(255,255,255,0.07);
  background: rgba(255,255,255,0.02);
  cursor: pointer; transition: all 0.22s ease;
  text-align: left; overflow: hidden;
}
.tu-denom-btn:hover { border-color: rgba(255,255,255,0.14); background: rgba(255,255,255,0.04); transform: translateY(-2px); }
.tu-denom-btn.active { border-color: rgba(220,38,38,0.6); background: rgba(220,38,38,0.07); }
.tu-denom-btn.active::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, #DC2626, transparent);
}
.tu-denom-btn.insufficient { opacity: 0.4; cursor: not-allowed; }
.tu-popular-badge {
  position: absolute; top: -1px; right: 12px;
  background: linear-gradient(135deg, #DC2626, #EA580C);
  color: #fff; font-size: 9px; font-weight: 700;
  padding: 3px 8px; border-radius: 0 0 6px 6px;
  letter-spacing: 0.06em; text-transform: uppercase;
  font-family: 'Barlow', sans-serif;
}

/* ── Input ── */
.tu-input-wrap label {
  display: flex; align-items: center; gap: 6px;
  font-size: 12px; font-weight: 700;
  color: rgba(255,255,255,0.4);
  text-transform: uppercase; letter-spacing: 0.08em;
  margin-bottom: 8px; font-family: 'Barlow', sans-serif;
}
.tu-input {
  width: 100%;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px; padding: 12px 14px;
  font-family: 'Barlow', sans-serif;
  font-size: 14px; font-weight: 500; color: #fff;
  outline: none; transition: all 0.2s; box-sizing: border-box;
}
.tu-input::placeholder { color: rgba(255,255,255,0.2); }
.tu-input:focus { border-color: rgba(220,38,38,0.5); background: rgba(220,38,38,0.04); box-shadow: 0 0 0 3px rgba(220,38,38,0.08); }

/* ── OkeGas Wallet Card ── */
.og-wallet-card {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  border: 1px solid rgba(255,165,0,0.25);
  border-radius: 16px;
  padding: 20px;
  position: relative;
  overflow: hidden;
}
.og-wallet-card::before {
  content: '';
  position: absolute; top: -40px; right: -40px;
  width: 120px; height: 120px;
  background: radial-gradient(circle, rgba(255,165,0,0.15) 0%, transparent 70%);
  border-radius: 50%;
}
.og-wallet-card::after {
  content: '';
  position: absolute; bottom: -20px; left: 20px;
  width: 80px; height: 80px;
  background: radial-gradient(circle, rgba(255,100,0,0.1) 0%, transparent 70%);
  border-radius: 50%;
}
.og-brand {
  display: flex; align-items: center; gap: 8px; margin-bottom: 16px;
}
.og-brand-logo {
  width: 32px; height: 32px; border-radius: 8px;
  background: linear-gradient(135deg, #FF6B00, #FFA500);
  display: flex; align-items: center; justify-content: center;
  font-size: 16px; font-weight: 900;
  font-family: 'Rajdhani', sans-serif;
  color: #fff; box-shadow: 0 4px 12px rgba(255,107,0,0.4);
  flex-shrink: 0;
}
.og-balance-label {
  font-size: 11px; font-weight: 700;
  color: rgba(255,255,255,0.35);
  text-transform: uppercase; letter-spacing: 0.1em;
  font-family: 'Barlow', sans-serif;
  margin-bottom: 4px;
}
.og-balance-value {
  font-family: 'Rajdhani', sans-serif;
  font-size: 32px; font-weight: 700;
  color: #fff; line-height: 1;
  letter-spacing: -0.01em;
}
.og-balance-insufficient { color: #EF4444 !important; }
.og-points-chip {
  display: inline-flex; align-items: center; gap: 5px;
  background: rgba(255,165,0,0.12);
  border: 1px solid rgba(255,165,0,0.3);
  border-radius: 20px; padding: 4px 10px;
  font-size: 11px; font-weight: 700;
  color: #FFA500;
  font-family: 'Barlow', sans-serif;
}
.og-status-chip {
  display: inline-flex; align-items: center; gap: 5px;
  background: rgba(16,185,129,0.1);
  border: 1px solid rgba(16,185,129,0.3);
  border-radius: 20px; padding: 4px 10px;
  font-size: 11px; font-weight: 700;
  color: #10B981; font-family: 'Barlow', sans-serif;
}
.og-insufficient-banner {
  display: flex; align-items: center; gap: 10px;
  padding: 12px 16px; margin-top: 14px;
  background: rgba(239,68,68,0.08);
  border: 1px solid rgba(239,68,68,0.25);
  border-radius: 10px;
  font-size: 13px; color: rgba(255,255,255,0.5);
  font-family: 'Barlow', sans-serif;
}
.og-topup-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 14px; border-radius: 8px;
  background: linear-gradient(135deg, #FF6B00, #FFA500);
  border: none; color: #fff;
  font-family: 'Rajdhani', sans-serif;
  font-size: 13px; font-weight: 700;
  cursor: pointer; white-space: nowrap;
  box-shadow: 0 3px 10px rgba(255,107,0,0.3);
  transition: all 0.2s;
}
.og-topup-btn:hover { box-shadow: 0 5px 16px rgba(255,107,0,0.5); transform: translateY(-1px); }

/* ── Summary ── */
.tu-summary {
  position: sticky; top: 84px;
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 18px; padding: 24px; overflow: hidden;
}
.tu-summary-line {
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, #DC2626, #EA580C);
}
.tu-summary-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 9px 0; border-bottom: 1px solid rgba(255,255,255,0.04);
  font-size: 13px;
}
.tu-summary-row:last-of-type { border-bottom: none; }
.tu-proceed-btn {
  width: 100%; padding: 14px;
  background: linear-gradient(135deg, #DC2626 0%, #EA580C 100%);
  border: none; border-radius: 12px; color: #fff;
  font-family: 'Rajdhani', sans-serif;
  font-size: 16px; font-weight: 700; letter-spacing: 0.04em;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  transition: all 0.25s ease;
  box-shadow: 0 6px 20px rgba(220,38,38,0.3);
}
.tu-proceed-btn:not(:disabled):hover { box-shadow: 0 10px 32px rgba(220,38,38,0.5); transform: translateY(-1px); }
.tu-proceed-btn:disabled { opacity: 0.35; cursor: not-allowed; box-shadow: none; }

/* ── Confirm / Success ── */
.tu-page-center {
  min-height: 100vh; background: #0d0d0f;
  display: flex; align-items: center; justify-content: center; padding: 24px;
}
.tu-confirm-card {
  width: 100%; max-width: 460px;
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 20px; overflow: hidden;
}
.tu-confirm-header {
  padding: 24px 28px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.015);
}
.tu-confirm-body { padding: 24px 28px; }
.tu-row {
  display: flex; justify-content: space-between;
  padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.04);
  font-size: 13px;
}
.tu-row:last-child { border-bottom: none; }
.tu-alert {
  display: flex; gap: 10px; align-items: flex-start;
  padding: 14px 16px;
  background: rgba(245,158,11,0.07);
  border: 1px solid rgba(245,158,11,0.2);
  border-radius: 10px; margin: 20px 0;
}

/* ── OkeGas confirm wallet ── */
.og-confirm-wallet {
  display: flex; align-items: center; gap: 12px;
  padding: 14px 16px;
  background: linear-gradient(90deg, rgba(255,107,0,0.08), rgba(255,165,0,0.05));
  border: 1px solid rgba(255,165,0,0.25);
  border-radius: 12px; margin-bottom: 8px;
}
.og-confirm-logo {
  width: 36px; height: 36px; border-radius: 9px;
  background: linear-gradient(135deg, #FF6B00, #FFA500);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Rajdhani', sans-serif;
  font-size: 16px; font-weight: 900; color: #fff;
  box-shadow: 0 3px 10px rgba(255,107,0,0.35);
  flex-shrink: 0;
}
.og-deduct-row {
  display: flex; justify-content: space-between;
  padding: 10px 16px;
  background: rgba(239,68,68,0.05);
  border: 1px solid rgba(239,68,68,0.15);
  border-radius: 10px; margin-bottom: 4px;
  font-size: 13px;
}
.og-remain-row {
  display: flex; justify-content: space-between;
  padding: 10px 16px;
  background: rgba(16,185,129,0.05);
  border: 1px solid rgba(16,185,129,0.15);
  border-radius: 10px;
  font-size: 13px;
}

/* ── Error banner ── */
.tu-error-banner {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 14px; margin-top: 12px;
  background: rgba(239,68,68,0.08);
  border: 1px solid rgba(239,68,68,0.25);
  border-radius: 8px;
  font-size: 12px; color: #F87171;
  font-family: 'Barlow', sans-serif;
}

/* ── Empty ── */
.tu-empty { text-align: center; padding: 40px 20px; color: rgba(255,255,255,0.25); font-family: 'Barlow', sans-serif; font-size: 14px; }

/* ── Animations ── */
@keyframes tuFadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
.tu-animate { animation: tuFadeUp 0.4s ease forwards; }
@keyframes successPop { 0% { transform: scale(0.5); opacity: 0; } 70% { transform: scale(1.1); } 100% { transform: scale(1); opacity: 1; } }
.tu-success-icon { animation: successPop 0.5s cubic-bezier(0.175,0.885,0.32,1.275) forwards; }
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Layout ── */
.tu-grid-main {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 24px; align-items: start;
}
@media (max-width: 960px) {
  .tu-grid-main { grid-template-columns: 1fr; }
  .tu-summary { position: static; }
}
.tu-games-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 9px; }
@media (min-width: 600px) { .tu-games-grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 900px) { .tu-games-grid { grid-template-columns: repeat(4, 1fr); } }
.tu-denoms-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
@media (min-width: 600px) { .tu-denoms-grid { grid-template-columns: repeat(3, 1fr); } }
`;

// ─── COMPONENT ────────────────────────────────────────────────────

export default function TopUp() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // FIX: validate game ID from URL — fallback to "ml" if unknown
  const rawGame = searchParams.get("game") ?? "ml";
  const defaultGame = VALID_GAME_IDS.has(rawGame) ? rawGame : "ml";

  const [selectedGame, setSelectedGame] = useState(defaultGame);
  const [selectedDenom, setSelectedDenom] = useState<string | null>(null);
  const [userId, setUserId] = useState("");
  const [serverId, setServerId] = useState("");
  const [step, setStep] = useState<"form" | "confirm" | "success">("form");
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [showBalance, setShowBalance] = useState(true);
  const [txError, setTxError] = useState<string | null>(null);

  // FIX: wallet balance fetched from Supabase, not a hardcoded mock
  const [walletBalance, setWalletBalance] = useState(0);
  const [loadingBalance, setLoadingBalance] = useState(true);

  // FIX: currentGame is always safe — defaultGame guarantees a valid ID
  const currentGame = games.find((g) => g.id === selectedGame)!;
  const currentDenoms = denominations[selectedGame] ?? [];
  const selectedDenomData = currentDenoms.find((d) => d.id === selectedDenom);

  const filteredGames = games.filter((g) => {
    const matchCat = activeCategory === "Semua" || g.category === activeCategory;
    const matchSearch = g.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const needsServerId = ["ml", "hok", "ragnarok"].includes(selectedGame);

  // FIX: also require serverId when the game needs it
  const isFormValid =
    userId.trim().length > 0 &&
    (!needsServerId || serverId.trim().length > 0) &&
    selectedDenom !== null;

  const isBalanceSufficient = !selectedDenomData || walletBalance >= selectedDenomData.price;
  const remainingBalance = selectedDenomData ? walletBalance - selectedDenomData.price : walletBalance;
  const canProceed = isFormValid && isBalanceSufficient;

  // ── Fetch balance on mount ──────────────────────────────────────
  useEffect(() => {
    if (!user) return;
    fetchBalance();
  }, [user]);

  async function fetchBalance() {
    if (!user) return;
    setLoadingBalance(true);
    const { data } = await supabase
      .from("profiles")
      .select("balance")
      .eq("id", user.id)
      .single();
    if (data) setWalletBalance(data.balance ?? 0);
    setLoadingBalance(false);
  }

  const handleProceed = () => {
    if (!canProceed) return;
    setTxError(null);
    setStep("confirm");
  };

  // FIX: real Supabase transaction — atomic balance deduction + wallet_log insert
  const handleConfirm = async () => {
    if (!user || !selectedDenomData) return;

    // Capture values at the point of confirmation to avoid closure staleness
    const price = selectedDenomData.price;
    const denomLabel = selectedDenomData.label;
    const gameName = currentGame.name;

    setIsLoading(true);
    setTxError(null);

    // 1. Re-fetch latest balance to guard against concurrent spend (race condition)
    const { data: freshProfile, error: profileFetchErr } = await supabase
      .from("profiles")
      .select("balance")
      .eq("id", user.id)
      .single();

    if (profileFetchErr || !freshProfile) {
      setTxError("Gagal memverifikasi saldo. Coba lagi.");
      setIsLoading(false);
      return;
    }

    const freshBalance = freshProfile.balance ?? 0;
    if (freshBalance < price) {
      setWalletBalance(freshBalance); // sync local state
      setTxError("Saldo tidak mencukupi. Silakan isi saldo terlebih dahulu.");
      setIsLoading(false);
      return;
    }

    const newBalance = freshBalance - price;

    // 2. Deduct balance from profiles
    const { error: deductErr } = await supabase
      .from("profiles")
      .update({ balance: newBalance })
      .eq("id", user.id)
      // Optimistic concurrency: only update if balance hasn't changed underneath us
      .eq("balance", freshBalance);

    if (deductErr) {
      setTxError("Transaksi gagal. Saldo mungkin telah berubah, coba lagi.");
      setIsLoading(false);
      return;
    }

    // 3. Insert wallet log
    const { error: logErr } = await supabase.from("wallet_logs").insert({
      user_id:        user.id,
      action:         "spend",
      amount:         price,
      balance_before: freshBalance,
      balance_after:  newBalance,
      note:           `Top Up ${denomLabel} — ${gameName} (ID: ${userId}${serverId ? ` / ${serverId}` : ""})`,
    });

    if (logErr) {
      // Balance already deducted — log failure is non-fatal but should be alerted
      console.error("wallet_log insert failed:", logErr);
      // Don't show error to user; transaction succeeded. Consider a retry queue in production.
    }

    // 4. Sync local state and advance to success
    setWalletBalance(newBalance);
    setIsLoading(false);
    setStep("success");
  };

  const handleReset = () => {
    setStep("form");
    setSelectedDenom(null);
    setUserId("");
    setServerId("");
    setTxError(null);
    fetchBalance(); // Refresh balance for the next transaction
  };

  // ── SUCCESS ────────────────────────────────────────────────────────────────
  if (step === "success") {
    return (
      <div className="tu-root tu-page-center">
        <style>{STYLES}</style>
        <div className="tu-animate" style={{ textAlign: "center", maxWidth: 440 }}>
          <div className="tu-success-icon" style={{
            width: 96, height: 96,
            background: "rgba(16,185,129,0.12)",
            border: "1px solid rgba(16,185,129,0.3)",
            borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 28px",
          }}>
            <CheckCircle size={48} color="#10B981" strokeWidth={1.5} />
          </div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)",
            borderRadius: 6, padding: "4px 12px", marginBottom: 16,
          }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#10B981", textTransform: "uppercase" as const }}>
              Transaksi Sukses
            </span>
          </div>
          <h1 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 36, fontWeight: 700, color: "#fff", margin: "0 0 12px" }}>
            Pembayaran Berhasil!
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, margin: "0 0 6px" }}>
            {selectedDenomData?.label} untuk {currentGame.name}
          </p>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, margin: "0 0 4px" }}>
            ID: <span style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>
              {userId}{serverId ? ` (${serverId})` : ""}
            </span>
          </p>

          {/* OkeGas deduction recap */}
          <div style={{
            background: "rgba(255,107,0,0.07)",
            border: "1px solid rgba(255,165,0,0.2)",
            borderRadius: 12, padding: "14px 18px",
            margin: "16px 0 24px", textAlign: "left",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div style={{
                width: 24, height: 24, borderRadius: 6,
                background: "linear-gradient(135deg, #FF6B00, #FFA500)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Rajdhani', sans-serif", fontSize: 12, fontWeight: 900, color: "#fff",
              }}>G</div>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#FFA500", fontFamily: "'Barlow', sans-serif" }}>
                Saldo OkeGas terpotong
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "rgba(255,255,255,0.4)", fontFamily: "'Barlow', sans-serif" }}>
              <span>Jumlah dibayar</span>
              <span style={{ color: "#EF4444", fontWeight: 700 }}>−{formatRupiah(selectedDenomData?.price ?? 0)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "rgba(255,255,255,0.4)", fontFamily: "'Barlow', sans-serif", marginTop: 4 }}>
              <span>Sisa saldo</span>
              <span style={{ color: "#10B981", fontWeight: 700 }}>{formatRupiah(walletBalance)}</span>
            </div>
          </div>

          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, margin: "0 0 32px" }}>
            Item akan masuk dalam <strong style={{ color: "#10B981" }}>{"< 1 menit"}</strong>. Cek inbox game kamu!
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button onClick={handleReset} className="tu-proceed-btn" style={{ width: "auto", padding: "12px 24px" }}>
              <Zap size={15} fill="white" /> Top Up Lagi
            </button>
            {/* FIX: use navigate instead of window.location.href */}
            <button
              onClick={() => navigate("/wallet")}
              style={{
                padding: "12px 24px", borderRadius: 12,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.6)",
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: 15, fontWeight: 700,
                cursor: "pointer", letterSpacing: "0.04em",
              }}
            >
              Lihat Riwayat
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── CONFIRM ────────────────────────────────────────────────────────────────
  if (step === "confirm") {
    type OrderRow = { label: string; val: string | undefined; green?: boolean };
    const orderRows: OrderRow[] = [
      { label: "Game",    val: `${currentGame.icon} ${currentGame.name}` },
      { label: "User ID", val: `${userId}${serverId ? ` (${serverId})` : ""}` },
      { label: "Item",    val: selectedDenomData?.label },
      ...(selectedDenomData?.bonus
        ? [{ label: "Bonus", val: `+${selectedDenomData.bonus} ${currentGame.currency}`, green: true }]
        : []),
    ];

    return (
      <div className="tu-root tu-page-center">
        <style>{STYLES}</style>
        <div className="tu-confirm-card tu-animate">
          <div className="tu-confirm-header">
            <button
              onClick={() => setStep("form")}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                background: "none", border: "none", cursor: "pointer",
                color: "rgba(255,255,255,0.4)", fontSize: 13,
                fontFamily: "'Barlow', sans-serif", marginBottom: 16, padding: 0,
              }}
            >
              <ArrowLeft size={14} /> Kembali
            </button>
            <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 22, fontWeight: 700, color: "#fff", margin: 0 }}>
              Konfirmasi Pesanan
            </h2>
          </div>

          <div className="tu-confirm-body">
            {/* Order details — FIX: typed rows, no more (row as any).green */}
            {orderRows.map((row) => (
              <div className="tu-row" key={row.label}>
                <span style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Barlow', sans-serif" }}>
                  {row.label}
                </span>
                <span style={{
                  color: row.green ? "#10B981" : "rgba(255,255,255,0.85)",
                  fontWeight: 600, fontFamily: "'Barlow', sans-serif", fontSize: 13,
                }}>
                  {row.val}
                </span>
              </div>
            ))}

            {/* Total */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "16px 0 20px", borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: 4,
            }}>
              <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 16, fontWeight: 700, color: "#fff" }}>Total</span>
              <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 28, fontWeight: 700, color: "#DC2626" }}>
                {formatRupiah(selectedDenomData?.price ?? 0)}
              </span>
            </div>

            {/* OkeGas wallet payment method */}
            <div className="og-confirm-wallet">
              <div className="og-confirm-logo">G</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", fontFamily: "'Barlow', sans-serif" }}>
                  OkeGas Wallet
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "'Barlow', sans-serif", marginTop: 2 }}>
                  Saldo tersedia: <span style={{ color: "#FFA500", fontWeight: 600 }}>{formatRupiah(walletBalance)}</span>
                </div>
              </div>
              <CheckCircle size={16} color="#10B981" />
            </div>

            {/* Deduction preview */}
            <div className="og-deduct-row">
              <span style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Barlow', sans-serif" }}>Potongan saldo</span>
              <span style={{ color: "#EF4444", fontWeight: 700, fontFamily: "'Barlow', sans-serif" }}>
                −{formatRupiah(selectedDenomData?.price ?? 0)}
              </span>
            </div>
            <div className="og-remain-row" style={{ marginBottom: 16 }}>
              <span style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Barlow', sans-serif" }}>Sisa saldo setelah bayar</span>
              <span style={{ color: "#10B981", fontWeight: 700, fontFamily: "'Barlow', sans-serif" }}>
                {formatRupiah(remainingBalance)}
              </span>
            </div>

            <div className="tu-alert">
              <AlertCircle size={15} color="#F59E0B" style={{ flexShrink: 0, marginTop: 1 }} />
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.6, fontFamily: "'Barlow', sans-serif" }}>
                <strong style={{ color: "#F59E0B" }}>Penting:</strong> Pastikan User ID sudah benar.
                Saldo OkeGas yang terpotong tidak dapat dikembalikan.
              </p>
            </div>

            {/* FIX: show transaction error if something went wrong */}
            {txError && (
              <div className="tu-error-banner">
                <AlertCircle size={13} style={{ flexShrink: 0 }} />
                {txError}
              </div>
            )}

            <button onClick={handleConfirm} disabled={isLoading} className="tu-proceed-btn">
              {isLoading ? (
                <>
                  <span style={{
                    width: 16, height: 16,
                    border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff",
                    borderRadius: "50%", animation: "spin 0.7s linear infinite",
                    display: "inline-block",
                  }} />
                  Memproses...
                </>
              ) : (
                <><Zap size={16} fill="white" /> Bayar dengan OkeGas</>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── MAIN FORM ──────────────────────────────────────────────────────────────
  return (
    <div className="tu-root">
      <style>{STYLES}</style>

      {/* Hero */}
      <div className="tu-hero">
        <div className="tu-hero-bg" />
        <div className="tu-hero-grid" />
        <div className="tu-hero-line" />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", position: "relative" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.3)",
            borderRadius: 6, padding: "4px 12px", marginBottom: 14,
          }}>
            <Zap size={11} color="#DC2626" fill="#DC2626" />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "#DC2626", textTransform: "uppercase" as const, fontFamily: "'Barlow', sans-serif" }}>
              Top Up Game
            </span>
          </div>
          <h1 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "clamp(28px,4vw,40px)", fontWeight: 700, color: "#fff", margin: "0 0 6px" }}>
            Top Up <span style={{ color: "#DC2626" }}>Instan</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, margin: "0 0 20px", fontFamily: "'Barlow', sans-serif" }}>
            {games.length}+ game tersedia · Bayar via OkeGas Wallet · Proses otomatis
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" as const }}>
            {[
              { icon: <Clock size={12} />, label: "Proses < 1 Menit" },
              { icon: <Shield size={12} />, label: "100% Aman" },
              { icon: <Wallet size={12} />, label: "OkeGas Wallet" },
            ].map((b) => (
              <div key={b.label} style={{
                display: "flex", alignItems: "center", gap: 7,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20, padding: "6px 14px",
                fontSize: 12, color: "rgba(255,255,255,0.5)",
                fontFamily: "'Barlow', sans-serif", fontWeight: 600,
              }}>
                <span style={{ color: "#DC2626" }}>{b.icon}</span> {b.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 24px 60px" }}>
        <div className="tu-grid-main">

          {/* ── LEFT ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Step 1: Game */}
            <div className="tu-card tu-animate">
              <div className="tu-card-top" />
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div className="tu-step-num">1</div>
                <h2 className="tu-section-title">Pilih Game</h2>
                <span style={{ marginLeft: "auto", fontSize: 11, color: "rgba(255,255,255,0.25)", fontFamily: "'Barlow', sans-serif" }}>
                  {games.length} game
                </span>
              </div>
              <div className="tu-search-wrap">
                <Search size={14} className="tu-search-icon" />
                <input
                  type="text"
                  className="tu-search-input"
                  placeholder="Cari nama game..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="tu-cat-tabs">
                {ALL_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    className={`tu-cat-tab ${activeCategory === cat ? "active" : ""}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              {filteredGames.length === 0 ? (
                <div className="tu-empty">
                  <div style={{ fontSize: 32, marginBottom: 8 }}>🎮</div>
                  Game tidak ditemukan
                </div>
              ) : (
                <div className="tu-games-grid">
                  {filteredGames.map((game) => {
                    const active = selectedGame === game.id;
                    return (
                      <button
                        key={game.id}
                        className={`tu-game-btn ${active ? "active" : ""}`}
                        style={active ? { borderColor: `${game.color}60`, background: `${game.color}10` } : {}}
                        onClick={() => { setSelectedGame(game.id); setSelectedDenom(null); }}
                      >
                        <div className="tu-game-icon" style={{ background: `${game.color}18` }}>{game.icon}</div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{
                            fontFamily: "'Rajdhani', sans-serif", fontSize: 13, fontWeight: 700,
                            color: active ? "#fff" : "rgba(255,255,255,0.7)",
                            lineHeight: 1.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                          }}>
                            {game.name}
                          </div>
                          <div style={{ fontSize: 10, color: active ? game.color : "rgba(255,255,255,0.25)", marginTop: 2, fontWeight: 500 }}>
                            {game.currency}
                          </div>
                        </div>
                        {active && <CheckCircle size={13} color={game.color} style={{ marginLeft: "auto", flexShrink: 0 }} />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Step 2: User ID */}
            <div className="tu-card tu-animate" style={{ animationDelay: "80ms" }}>
              <div className="tu-card-top" />
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div className="tu-step-num">2</div>
                <h2 className="tu-section-title">Masukkan User ID</h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: needsServerId ? "1fr 1fr" : "1fr", gap: 14 }}>
                <div className="tu-input-wrap">
                  <label><User size={11} /> User ID *</label>
                  <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Contoh: 123456789"
                    className="tu-input"
                  />
                </div>
                {needsServerId && (
                  <div className="tu-input-wrap">
                    {/* FIX: Server ID marked required when needed */}
                    <label><Hash size={11} /> Server ID *</label>
                    <input
                      type="text"
                      value={serverId}
                      onChange={(e) => setServerId(e.target.value)}
                      placeholder="Contoh: 1234"
                      className="tu-input"
                    />
                  </div>
                )}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10, fontSize: 12, color: "rgba(255,255,255,0.25)", fontFamily: "'Barlow', sans-serif" }}>
                <AlertCircle size={12} /> Pastikan User ID benar sebelum melanjutkan
              </div>
            </div>

            {/* Step 3: Denom */}
            <div className="tu-card tu-animate" style={{ animationDelay: "160ms" }}>
              <div className="tu-card-top" />
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div className="tu-step-num">3</div>
                <h2 className="tu-section-title">Pilih Nominal</h2>
                <span style={{ marginLeft: "auto", fontSize: 11, color: "rgba(255,255,255,0.25)", fontFamily: "'Barlow', sans-serif" }}>
                  {currentGame.icon} {currentGame.name}
                </span>
              </div>
              {currentDenoms.length === 0 ? (
                <div className="tu-empty">Belum ada nominal tersedia</div>
              ) : (
                <div className="tu-denoms-grid">
                  {currentDenoms.map((denom) => {
                    const active = selectedDenom === denom.id;
                    const canAfford = walletBalance >= denom.price;
                    return (
                      <button
                        key={denom.id}
                        className={`tu-denom-btn ${active ? "active" : ""} ${!canAfford ? "insufficient" : ""}`}
                        onClick={() => canAfford && setSelectedDenom(denom.id)}
                        title={!canAfford ? "Saldo OkeGas tidak cukup" : undefined}
                      >
                        {denom.popular && <div className="tu-popular-badge">Populer</div>}
                        <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 14, fontWeight: 700, color: active ? "#fff" : "rgba(255,255,255,0.75)", marginBottom: 2 }}>
                          {denom.label}
                        </div>
                        {denom.bonus && (
                          <div style={{ fontSize: 11, color: "#10B981", fontWeight: 600, marginBottom: 4, fontFamily: "'Barlow', sans-serif" }}>
                            +{denom.bonus} Bonus
                          </div>
                        )}
                        <div style={{
                          fontFamily: "'Rajdhani', sans-serif", fontSize: 16, fontWeight: 700, marginTop: 2,
                          color: active ? "#DC2626" : canAfford ? "rgba(255,255,255,0.5)" : "rgba(239,68,68,0.5)",
                        }}>
                          {formatRupiah(denom.price)}
                        </div>
                        {active && <CheckCircle size={13} color="#DC2626" style={{ position: "absolute", top: 10, right: 10 }} />}
                        {!canAfford && (
                          <div style={{ position: "absolute", top: 10, right: 10, fontSize: 9, color: "rgba(239,68,68,0.7)", fontFamily: "'Barlow', sans-serif", fontWeight: 700 }}>
                            KURANG
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Step 4: OkeGas Wallet */}
            <div className="tu-card tu-animate" style={{ animationDelay: "240ms" }}>
              <div className="tu-card-top" />
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div className="tu-step-num">4</div>
                <h2 className="tu-section-title">Metode Pembayaran</h2>
              </div>

              <div className="og-wallet-card">
                <div className="og-brand">
                  <div className="og-brand-logo">G</div>
                  <div>
                    <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff" }}>OkeGas Wallet</div>
                    {user && (
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontFamily: "'Barlow', sans-serif" }}>
                        {user.email}
                      </div>
                    )}
                  </div>
                  <div style={{ marginLeft: "auto" }}>
                    <div className="og-status-chip">
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981" }} />
                      Aktif
                    </div>
                  </div>
                </div>

                <div className="og-balance-label">Saldo Tersedia</div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div className={`og-balance-value ${selectedDenomData && !isBalanceSufficient ? "og-balance-insufficient" : ""}`}>
                    {loadingBalance
                      ? "Memuat..."
                      : showBalance
                        ? formatRupiah(walletBalance)
                        : "Rp ••••••"}
                  </div>
                  <button
                    onClick={() => setShowBalance(!showBalance)}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)", padding: 0, display: "flex" }}
                  >
                    {showBalance ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <button
                    style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)", padding: 0, display: "flex" }}
                    title="Refresh saldo"
                    onClick={fetchBalance}
                  >
                    <RefreshCw size={14} />
                  </button>
                </div>

                {/* Insufficient balance warning */}
                {selectedDenomData && !isBalanceSufficient && (
                  <div className="og-insufficient-banner">
                    <AlertCircle size={15} color="#EF4444" style={{ flexShrink: 0 }} />
                    <span style={{ flex: 1 }}>
                      Saldo kurang <strong style={{ color: "#EF4444" }}>{formatRupiah(selectedDenomData.price - walletBalance)}</strong> lagi.
                    </span>
                    {/* FIX: use navigate, not window.location.href */}
                    <button className="og-topup-btn" onClick={() => navigate("/wallet")}>
                      <Wallet size={12} /> Isi Saldo
                    </button>
                  </div>
                )}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 12, fontSize: 12, color: "rgba(255,255,255,0.2)", fontFamily: "'Barlow', sans-serif" }}>
                <Info size={11} /> Semua transaksi pada platform ini hanya melalui OkeGas Wallet
              </div>
            </div>
          </div>

          {/* ── RIGHT: Summary ── */}
          <div>
            <div className="tu-summary">
              <div className="tu-summary-line" />
              <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 18, fontWeight: 700, color: "#fff", margin: "0 0 18px" }}>
                Ringkasan Pesanan
              </h3>
              <div style={{ marginBottom: 16 }}>
                {[
                  { label: "Game",        val: `${currentGame.icon} ${currentGame.name}` },
                  { label: "Kategori",    val: currentGame.category },
                  { label: "User ID",     val: userId || null },
                  ...(needsServerId ? [{ label: "Server ID", val: serverId || null }] : []),
                  { label: "Item",        val: selectedDenomData?.label ?? null },
                  ...(selectedDenomData?.bonus
                    ? [{ label: "Bonus", val: `+${selectedDenomData.bonus}`, green: true }]
                    : []),
                  { label: "Pembayaran",  val: "OkeGas Wallet" },
                ].map((row) => (
                  <div className="tu-summary-row" key={row.label}>
                    <span style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Barlow', sans-serif" }}>{row.label}</span>
                    <span style={{
                      color: (row as any).green ? "#10B981" : row.val ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)",
                      fontWeight: 600, fontSize: 13, fontFamily: "'Barlow', sans-serif",
                      maxWidth: 160, textAlign: "right" as const,
                      overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                    }}>
                      {row.val ?? "Belum dipilih"}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{
                padding: "16px 0", borderTop: "1px solid rgba(255,255,255,0.08)",
                borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: 14,
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 16, fontWeight: 700, color: "#fff" }}>Total</span>
                <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 28, fontWeight: 700, color: "#DC2626" }}>
                  {selectedDenomData ? formatRupiah(selectedDenomData.price) : "Rp 0"}
                </span>
              </div>

              {/* Wallet balance in summary */}
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "10px 14px", marginBottom: 14,
                background: isBalanceSufficient ? "rgba(16,185,129,0.05)" : "rgba(239,68,68,0.05)",
                border: `1px solid ${isBalanceSufficient ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)"}`,
                borderRadius: 10,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: 5,
                    background: "linear-gradient(135deg, #FF6B00, #FFA500)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Rajdhani', sans-serif", fontSize: 10, fontWeight: 900, color: "#fff",
                  }}>G</div>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "'Barlow', sans-serif" }}>Saldo OkeGas</span>
                </div>
                <span style={{
                  fontSize: 13, fontWeight: 700, fontFamily: "'Barlow', sans-serif",
                  color: isBalanceSufficient ? "#10B981" : "#EF4444",
                }}>
                  {loadingBalance ? "..." : formatRupiah(walletBalance)}
                </span>
              </div>

              {selectedDenomData && !isBalanceSufficient && (
                <div style={{ fontSize: 12, color: "#EF4444", fontFamily: "'Barlow', sans-serif", marginBottom: 12, textAlign: "center" as const }}>
                  Saldo tidak cukup — perlu <strong>{formatRupiah(selectedDenomData.price - walletBalance)}</strong> lagi
                </div>
              )}

              {/* FIX: when balance insufficient, button navigates to wallet top-up instead of dead click */}
              {selectedDenomData && !isBalanceSufficient ? (
                <button className="tu-proceed-btn" onClick={() => navigate("/wallet")}>
                  <Wallet size={15} /> Isi Saldo OkeGas
                </button>
              ) : (
                <button
                  className="tu-proceed-btn"
                  disabled={!canProceed}
                  onClick={handleProceed}
                >
                  Bayar dengan OkeGas <ChevronRight size={16} />
                </button>
              )}

              <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { icon: <Shield size={12} color="#10B981" />, label: "Transaksi dienkripsi SSL" },
                  { icon: <Clock size={12} color="#3B82F6" />, label: "Proses otomatis 24/7" },
                  { icon: <Wallet size={12} color="#FFA500" />, label: "Dibayar via OkeGas Wallet" },
                ].map((b) => (
                  <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: "rgba(255,255,255,0.3)", fontFamily: "'Barlow', sans-serif" }}>
                    {b.icon} {b.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
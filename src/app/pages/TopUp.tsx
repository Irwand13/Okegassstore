import { useState } from "react";
import { useSearchParams } from "react-router";
import {
  Zap, ChevronRight, Shield, Clock, CreditCard, Wallet,
  Smartphone, CheckCircle, User, Hash, AlertCircle, ArrowLeft, Search
} from "lucide-react";

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
  { id: "zbbr",     name: "Zula Mobile",          color: "#607D8B", currency: "Z Points",         icon: "🔫",  category: "Battle Royale" },

  // FPS / Shooter
  { id: "valorant", name: "Valorant",             color: "#FF4655", currency: "VP",               icon: "💀",  category: "FPS" },
  { id: "cs2",      name: "CS2 Skins",            color: "#F0A500", currency: "Credits",          icon: "🧨",  category: "FPS" },
  { id: "xdefiant", name: "XDefiant",             color: "#00B4D8", currency: "Credits",          icon: "🎮",  category: "FPS" },

  // RPG / Open World
  { id: "genshin",  name: "Genshin Impact",       color: "#A78BFA", currency: "Genesis Crystals", icon: "✨",  category: "RPG" },
  { id: "hsr",      name: "Honkai: Star Rail",    color: "#7EC8E3", currency: "Oneiric Shards",   icon: "🚂",  category: "RPG" },
  { id: "zzz",      name: "Zenless Zone Zero",    color: "#FFD700", currency: "Polychrome",       icon: "⚡",  category: "RPG" },
  { id: "wuwa",     name: "Wuthering Waves",      color: "#34D399", currency: "Lunite",           icon: "🌊",  category: "RPG" },
  { id: "hi3",      name: "Honkai Impact 3rd",    color: "#E879F9", currency: "Crystals",         icon: "🌸",  category: "RPG" },
  { id: "nikke",    name: "Goddess of Victory: NIKKE", color: "#F472B6", currency: "Gems",       icon: "🤖",  category: "RPG" },

  // Strategy
  { id: "coc",      name: "Clash of Clans",       color: "#FBBF24", currency: "Gems",             icon: "🏰",  category: "Strategy" },
  { id: "cr",       name: "Clash Royale",         color: "#8B5CF6", currency: "Gems",             icon: "👾",  category: "Strategy" },
  { id: "riseofkingdoms", name: "Rise of Kingdoms", color: "#10B981", currency: "Gems",          icon: "⚜️",  category: "Strategy" },
  { id: "lordsmobile", name: "Lords Mobile",      color: "#3B82F6", currency: "Gems",             icon: "🗡️",  category: "Strategy" },
  { id: "evony",    name: "Evony",                color: "#EF4444", currency: "Gems",             icon: "🛡️",  category: "Strategy" },

  // Sports & Racing
  { id: "efootball", name: "eFootball",           color: "#1D4ED8", currency: "Coins",            icon: "⚽",  category: "Sports" },
  { id: "nba2k",    name: "NBA 2K Mobile",        color: "#EA580C", currency: "VC",               icon: "🏀",  category: "Sports" },
  { id: "asphalt",  name: "Asphalt 9",            color: "#DC2626", currency: "Credits",          icon: "🏎️",  category: "Racing" },

  // Casual / Other
  { id: "ragnarok", name: "Ragnarok M",           color: "#0EA5E9", currency: "Crystals",         icon: "🧝",  category: "RPG" },
  { id: "aov",      name: "Arena of Valor",       color: "#F59E0B", currency: "Vouchers",         icon: "🗡️",  category: "MOBA" },
];

type Denom = { id: string; amount: number; label: string; price: number; bonus?: number; popular?: boolean };

const denominations: Record<string, Denom[]> = {
  ml: [
    { id: "ml1",  amount: 50,    label: "50 Diamonds",         price: 14000 },
    { id: "ml2",  amount: 75,    label: "75 Diamonds",         price: 20000 },
    { id: "ml3",  amount: 150,   label: "150 Diamonds",        price: 38000,   bonus: 15 },
    { id: "ml4",  amount: 250,   label: "250 Diamonds",        price: 60000,   popular: true },
    { id: "ml5",  amount: 500,   label: "500 Diamonds",        price: 115000,  bonus: 50 },
    { id: "ml6",  amount: 750,   label: "750 Diamonds",        price: 165000 },
    { id: "ml7",  amount: 1000,  label: "1000 Diamonds",       price: 210000,  bonus: 100, popular: true },
    { id: "ml8",  amount: 2000,  label: "2000 Diamonds",       price: 405000,  bonus: 200 },
    { id: "ml9",  amount: 5000,  label: "5000 Diamonds",       price: 990000,  bonus: 500 },
    { id: "ml10", amount: 10000, label: "10000 Diamonds",      price: 1950000, bonus: 1000 },
    { id: "ml11", amount: 500,   label: "Twilight Pass",       price: 65000 },
    { id: "ml12", amount: 300,   label: "Weekly Diamond Pass", price: 32000 },
  ],
  ff: [
    { id: "ff1", amount: 70,   label: "70 Diamonds",   price: 17000 },
    { id: "ff2", amount: 140,  label: "140 Diamonds",  price: 32000 },
    { id: "ff3", amount: 355,  label: "355 Diamonds",  price: 79000,  popular: true },
    { id: "ff4", amount: 720,  label: "720 Diamonds",  price: 155000, bonus: 72 },
    { id: "ff5", amount: 1450, label: "1450 Diamonds", price: 300000, bonus: 145, popular: true },
    { id: "ff6", amount: 2900, label: "2900 Diamonds", price: 590000, bonus: 290 },
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
  zbbr: [
    { id: "zb1", amount: 100, label: "100 Z Points", price: 18000 },
    { id: "zb2", amount: 300, label: "300 Z Points", price: 50000 },
    { id: "zb3", amount: 700, label: "700 Z Points", price: 110000, popular: true },
    { id: "zb4", amount: 1500, label: "1500 Z Points", price: 220000, bonus: 100 },
  ],
  cs2: [
    { id: "cs1", amount: 1000, label: "1000 Credits",  price: 99000 },
    { id: "cs2a", amount: 2200, label: "2200 Credits", price: 199000, popular: true },
    { id: "cs3", amount: 4600, label: "4600 Credits",  price: 399000, bonus: 400, popular: true },
    { id: "cs4", amount: 10000, label: "10000 Credits", price: 849000, bonus: 1000 },
  ],
  xdefiant: [
    { id: "xd1", amount: 500,  label: "500 Credits",  price: 55000 },
    { id: "xd2", amount: 1100, label: "1100 Credits", price: 109000, popular: true },
    { id: "xd3", amount: 2400, label: "2400 Credits", price: 219000, bonus: 100 },
    { id: "xd4", amount: 5000, label: "5000 Credits", price: 429000, bonus: 300, popular: true },
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
    { id: "hi1", amount: 98,  label: "98 Crystals",   price: 25000 },
    { id: "hi2", amount: 196, label: "196 Crystals",  price: 48000 },
    { id: "hi3a", amount: 394, label: "394 Crystals", price: 95000,  popular: true },
    { id: "hi4", amount: 788, label: "788 Crystals",  price: 185000, bonus: 80, popular: true },
    { id: "hi5", amount: 1576, label: "1576 Crystals", price: 365000, bonus: 180 },
  ],
  nikke: [
    { id: "nk1", amount: 80,  label: "80 Gems",   price: 16000 },
    { id: "nk2", amount: 200, label: "200 Gems",  price: 38000 },
    { id: "nk3", amount: 500, label: "500 Gems",  price: 95000,  popular: true },
    { id: "nk4", amount: 1000, label: "1000 Gems", price: 185000, bonus: 100, popular: true },
    { id: "nk5", amount: 2500, label: "2500 Gems", price: 455000, bonus: 300 },
  ],
  coc: [
    { id: "coc1", amount: 80,   label: "80 Gems",    price: 16000 },
    { id: "coc2", amount: 500,  label: "500 Gems",   price: 79000 },
    { id: "coc3", amount: 1200, label: "1200 Gems",  price: 159000, popular: true },
    { id: "coc4", amount: 2500, label: "2500 Gems",  price: 319000, bonus: 250, popular: true },
    { id: "coc5", amount: 6500, label: "6500 Gems",  price: 799000, bonus: 750 },
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
    { id: "rok1", amount: 200,  label: "200 Gems",   price: 35000 },
    { id: "rok2", amount: 500,  label: "500 Gems",   price: 85000 },
    { id: "rok3", amount: 1200, label: "1200 Gems",  price: 195000, popular: true },
    { id: "rok4", amount: 2500, label: "2500 Gems",  price: 395000, bonus: 250, popular: true },
    { id: "rok5", amount: 6500, label: "6500 Gems",  price: 995000, bonus: 800 },
  ],
  lordsmobile: [
    { id: "lm1", amount: 100,  label: "100 Gems",  price: 18000 },
    { id: "lm2", amount: 500,  label: "500 Gems",  price: 85000 },
    { id: "lm3", amount: 1200, label: "1200 Gems", price: 195000, popular: true },
    { id: "lm4", amount: 3000, label: "3000 Gems", price: 475000, bonus: 300, popular: true },
    { id: "lm5", amount: 6500, label: "6500 Gems", price: 995000, bonus: 750 },
  ],
  evony: [
    { id: "ev1", amount: 200,  label: "200 Gems",   price: 35000 },
    { id: "ev2", amount: 600,  label: "600 Gems",   price: 99000 },
    { id: "ev3", amount: 1500, label: "1500 Gems",  price: 235000, popular: true },
    { id: "ev4", amount: 3000, label: "3000 Gems",  price: 459000, bonus: 300, popular: true },
    { id: "ev5", amount: 7000, label: "7000 Gems",  price: 1049000, bonus: 800 },
  ],
  efootball: [
    { id: "ef1", amount: 200,  label: "200 Coins",  price: 30000 },
    { id: "ef2", amount: 500,  label: "500 Coins",  price: 70000 },
    { id: "ef3", amount: 1000, label: "1000 Coins", price: 135000, popular: true },
    { id: "ef4", amount: 2500, label: "2500 Coins", price: 325000, bonus: 200, popular: true },
    { id: "ef5", amount: 5000, label: "5000 Coins", price: 635000, bonus: 500 },
  ],
  nba2k: [
    { id: "nba1", amount: 200,  label: "200 VC",   price: 28000 },
    { id: "nba2", amount: 500,  label: "500 VC",   price: 68000 },
    { id: "nba3", amount: 1200, label: "1200 VC",  price: 158000, popular: true },
    { id: "nba4", amount: 2500, label: "2500 VC",  price: 315000, bonus: 200, popular: true },
    { id: "nba5", amount: 5000, label: "5000 VC",  price: 615000, bonus: 500 },
  ],
  asphalt: [
    { id: "as1", amount: 200,  label: "200 Credits",  price: 25000 },
    { id: "as2", amount: 600,  label: "600 Credits",  price: 70000 },
    { id: "as3", amount: 1500, label: "1500 Credits", price: 165000, popular: true },
    { id: "as4", amount: 3500, label: "3500 Credits", price: 375000, bonus: 300, popular: true },
    { id: "as5", amount: 8000, label: "8000 Credits", price: 829000, bonus: 800 },
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

const paymentMethods = [
  { id: "gopay",     name: "GoPay",                    emoji: "💚", category: "E-Wallet" },
  { id: "ovo",       name: "OVO",                      emoji: "💜", category: "E-Wallet" },
  { id: "dana",      name: "DANA",                     emoji: "💙", category: "E-Wallet" },
  { id: "shopeepay", name: "ShopeePay",                emoji: "🧡", category: "E-Wallet" },
  { id: "linkaja",   name: "LinkAja",                  emoji: "❤️", category: "E-Wallet" },
  { id: "bca",       name: "BCA Virtual Account",      emoji: "🏦", category: "Bank Transfer" },
  { id: "bni",       name: "BNI Virtual Account",      emoji: "🏦", category: "Bank Transfer" },
  { id: "mandiri",   name: "Mandiri Virtual Account",  emoji: "🏦", category: "Bank Transfer" },
  { id: "bri",       name: "BRI Virtual Account",      emoji: "🏦", category: "Bank Transfer" },
  { id: "qris",      name: "QRIS",                     emoji: "📱", category: "QR Code" },
  { id: "alfamart",  name: "Alfamart",                 emoji: "🏪", category: "Minimarket" },
  { id: "indomaret", name: "Indomaret",                emoji: "🏪", category: "Minimarket" },
];

const formatRupiah = (n: number) => "Rp " + n.toLocaleString("id-ID");

const ALL_CATEGORIES = ["Semua", "MOBA", "Battle Royale", "FPS", "RPG", "Strategy", "Sports", "Racing"];

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow:wght@400;500;600&display=swap');

.tu-root {
  min-height: 100vh;
  background: #0d0d0f;
  font-family: 'Barlow', sans-serif;
}

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

/* Search */
.tu-search-wrap {
  position: relative;
  margin-bottom: 14px;
}
.tu-search-icon {
  position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
  color: rgba(255,255,255,0.3); pointer-events: none;
}
.tu-search-input {
  width: 100%;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
  padding: 10px 14px 10px 36px;
  font-family: 'Barlow', sans-serif;
  font-size: 13px; font-weight: 500; color: #fff;
  outline: none;
  transition: all 0.2s;
  box-sizing: border-box;
}
.tu-search-input::placeholder { color: rgba(255,255,255,0.2); }
.tu-search-input:focus {
  border-color: rgba(220,38,38,0.4);
  background: rgba(220,38,38,0.03);
}

/* Category tabs */
.tu-cat-tabs {
  display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 16px;
}
.tu-cat-tab {
  padding: 5px 12px;
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.03);
  font-family: 'Barlow', sans-serif;
  font-size: 11px; font-weight: 700;
  color: rgba(255,255,255,0.4);
  cursor: pointer; transition: all 0.18s;
  text-transform: uppercase; letter-spacing: 0.06em;
}
.tu-cat-tab:hover {
  border-color: rgba(255,255,255,0.15);
  color: rgba(255,255,255,0.6);
}
.tu-cat-tab.active {
  background: rgba(220,38,38,0.12);
  border-color: rgba(220,38,38,0.45);
  color: #DC2626;
}

/* Game cards */
.tu-game-btn {
  display: flex; align-items: center; gap: 10px;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.07);
  background: rgba(255,255,255,0.02);
  cursor: pointer; transition: all 0.22s ease;
  text-align: left; position: relative; overflow: hidden;
}
.tu-game-btn:hover {
  border-color: rgba(255,255,255,0.15);
  background: rgba(255,255,255,0.04);
}
.tu-game-btn.active {
  background: rgba(220,38,38,0.08);
  border-color: rgba(220,38,38,0.5);
}
.tu-game-icon {
  width: 38px; height: 38px;
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; flex-shrink: 0;
}

/* Denom cards */
.tu-denom-btn {
  position: relative;
  padding: 14px 14px 12px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.07);
  background: rgba(255,255,255,0.02);
  cursor: pointer; transition: all 0.22s ease;
  text-align: left; overflow: hidden;
}
.tu-denom-btn:hover {
  border-color: rgba(255,255,255,0.14);
  background: rgba(255,255,255,0.04);
  transform: translateY(-2px);
}
.tu-denom-btn.active {
  border-color: rgba(220,38,38,0.6);
  background: rgba(220,38,38,0.07);
}
.tu-denom-btn.active::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, #DC2626, transparent);
}
.tu-popular-badge {
  position: absolute; top: -1px; right: 12px;
  background: linear-gradient(135deg, #DC2626, #EA580C);
  color: #fff; font-size: 9px; font-weight: 700;
  padding: 3px 8px; border-radius: 0 0 6px 6px;
  letter-spacing: 0.06em; text-transform: uppercase;
  font-family: 'Barlow', sans-serif;
}

/* Input */
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
.tu-input:focus {
  border-color: rgba(220,38,38,0.5);
  background: rgba(220,38,38,0.04);
  box-shadow: 0 0 0 3px rgba(220,38,38,0.08);
}

/* Payment */
.tu-pay-btn {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.07);
  background: rgba(255,255,255,0.02);
  cursor: pointer; transition: all 0.2s;
}
.tu-pay-btn:hover {
  border-color: rgba(255,255,255,0.14);
  background: rgba(255,255,255,0.04);
}
.tu-pay-btn.active {
  border-color: rgba(220,38,38,0.5);
  background: rgba(220,38,38,0.07);
}
.tu-cat-label {
  font-size: 10px; font-weight: 700;
  color: rgba(255,255,255,0.25);
  text-transform: uppercase; letter-spacing: 0.1em;
  display: flex; align-items: center; gap: 6px;
  margin-bottom: 8px; font-family: 'Barlow', sans-serif;
}

/* Summary */
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
  padding: 9px 0;
  border-bottom: 1px solid rgba(255,255,255,0.04);
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
.tu-proceed-btn:not(:disabled):hover {
  box-shadow: 0 10px 32px rgba(220,38,38,0.5);
  transform: translateY(-1px);
}
.tu-proceed-btn:disabled {
  opacity: 0.35; cursor: not-allowed; box-shadow: none;
}

/* Confirm / Success */
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
  padding: 10px 0;
  border-bottom: 1px solid rgba(255,255,255,0.04);
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

/* Empty state */
.tu-empty {
  text-align: center; padding: 40px 20px;
  color: rgba(255,255,255,0.25);
  font-family: 'Barlow', sans-serif;
  font-size: 14px;
}

@keyframes tuFadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
.tu-animate { animation: tuFadeUp 0.4s ease forwards; }

@keyframes successPop {
  0%   { transform: scale(0.5); opacity: 0; }
  70%  { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
}
.tu-success-icon { animation: successPop 0.5s cubic-bezier(0.175,0.885,0.32,1.275) forwards; }

.tu-grid-main {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 24px; align-items: start;
}
@media (max-width: 960px) {
  .tu-grid-main { grid-template-columns: 1fr; }
  .tu-summary { position: static; }
}

.tu-games-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 9px;
}
@media (min-width: 600px) {
  .tu-games-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (min-width: 900px) {
  .tu-games-grid { grid-template-columns: repeat(4, 1fr); }
}

.tu-denoms-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
@media (min-width: 600px) {
  .tu-denoms-grid { grid-template-columns: repeat(3, 1fr); }
}

.tu-pay-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}
@media (min-width: 600px) {
  .tu-pay-grid { grid-template-columns: repeat(3, 1fr); }
}
`;

export default function TopUp() {
  const [searchParams] = useSearchParams();
  const defaultGame = searchParams.get("game") || "ml";

  const [selectedGame, setSelectedGame] = useState(defaultGame);
  const [selectedDenom, setSelectedDenom] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [userId, setUserId] = useState("");
  const [serverId, setServerId] = useState("");
  const [step, setStep] = useState<"form" | "confirm" | "success">("form");
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const currentGame = games.find((g) => g.id === selectedGame)!;
  const currentDenoms = denominations[selectedGame] || [];
  const selectedDenomData = currentDenoms.find((d) => d.id === selectedDenom);
  const paymentCategories = [...new Set(paymentMethods.map((p) => p.category))];

  const filteredGames = games.filter((g) => {
    const matchCat = activeCategory === "Semua" || g.category === activeCategory;
    const matchSearch = g.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const needsServerId = selectedGame === "ml" || selectedGame === "hok" || selectedGame === "ragnarok";

  const handleProceed = () => {
    if (!userId || !selectedDenom || !selectedPayment) return;
    setStep("confirm");
  };

  const handleConfirm = () => {
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); setStep("success"); }, 2000);
  };

  const handleReset = () => {
    setStep("form");
    setSelectedDenom(null);
    setSelectedPayment(null);
    setUserId("");
    setServerId("");
  };

  // ─── SUCCESS ───────────────────────────────────────────────────────────────
  if (step === "success") {
    return (
      <div className="tu-root tu-page-center">
        <style>{STYLES}</style>
        <div className="tu-animate" style={{ textAlign: "center", maxWidth: 420 }}>
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
            ID: <span style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>{userId}{serverId ? ` (${serverId})` : ""}</span>
          </p>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, margin: "0 0 32px" }}>
            Item akan masuk dalam <strong style={{ color: "#10B981" }}>{"< 1 menit"}</strong>. Cek inbox game kamu!
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button onClick={handleReset} className="tu-proceed-btn" style={{ width: "auto", padding: "12px 24px" }}>
              <Zap size={15} fill="white" /> Top Up Lagi
            </button>
            <button
              onClick={() => window.location.href = "/profile"}
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

  // ─── CONFIRM ───────────────────────────────────────────────────────────────
  if (step === "confirm") {
    const payment = paymentMethods.find((p) => p.id === selectedPayment);
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
            {[
              { label: "Game", val: `${currentGame.icon} ${currentGame.name}` },
              { label: "User ID", val: `${userId}${serverId ? ` (${serverId})` : ""}` },
              { label: "Item", val: selectedDenomData?.label },
              ...(selectedDenomData?.bonus ? [{ label: "Bonus", val: `+${selectedDenomData.bonus} ${currentGame.currency}`, green: true }] : []),
              { label: "Metode Bayar", val: `${payment?.emoji} ${payment?.name}` },
            ].map((row) => (
              <div className="tu-row" key={row.label}>
                <span style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Barlow', sans-serif" }}>{row.label}</span>
                <span style={{
                  color: (row as any).green ? "#10B981" : "rgba(255,255,255,0.85)",
                  fontWeight: 600, fontFamily: "'Barlow', sans-serif", fontSize: 13,
                }}>
                  {row.val}
                </span>
              </div>
            ))}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "16px 0 0", borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: 4,
            }}>
              <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 16, fontWeight: 700, color: "#fff" }}>Total</span>
              <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 28, fontWeight: 700, color: "#DC2626" }}>
                {formatRupiah(selectedDenomData?.price || 0)}
              </span>
            </div>
            <div className="tu-alert">
              <AlertCircle size={15} color="#F59E0B" style={{ flexShrink: 0, marginTop: 1 }} />
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.6, fontFamily: "'Barlow', sans-serif" }}>
                <strong style={{ color: "#F59E0B" }}>Penting:</strong> Pastikan User ID sudah benar. Kesalahan ID tidak dapat dikembalikan.
              </p>
            </div>
            <button onClick={handleConfirm} disabled={isLoading} className="tu-proceed-btn">
              {isLoading ? (
                <>
                  <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" }} />
                  Memproses...
                </>
              ) : (
                <><Zap size={16} fill="white" /> Bayar Sekarang</>
              )}
            </button>
          </div>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // ─── MAIN FORM ─────────────────────────────────────────────────────────────
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
            {games.length}+ game tersedia · Proses otomatis · Harga terbaik · 100% aman
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" as const }}>
            {[
              { icon: <Clock size={12} />, label: "Proses < 1 Menit" },
              { icon: <Shield size={12} />, label: "100% Aman" },
              { icon: <CreditCard size={12} />, label: "12+ Metode Bayar" },
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

          {/* Left */}
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

              {/* Search */}
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

              {/* Category filter */}
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

              {/* Games grid */}
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
                        <div className="tu-game-icon" style={{ background: `${game.color}18` }}>
                          {game.icon}
                        </div>
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
                    <label><Hash size={11} /> Server ID</label>
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
                    return (
                      <button
                        key={denom.id}
                        className={`tu-denom-btn ${active ? "active" : ""}`}
                        onClick={() => setSelectedDenom(denom.id)}
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
                        <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 16, fontWeight: 700, color: active ? "#DC2626" : "rgba(255,255,255,0.5)", marginTop: 2 }}>
                          {formatRupiah(denom.price)}
                        </div>
                        {active && (
                          <CheckCircle size={13} color="#DC2626" style={{ position: "absolute", top: 10, right: 10 }} />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Step 4: Payment */}
            <div className="tu-card tu-animate" style={{ animationDelay: "240ms" }}>
              <div className="tu-card-top" />
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div className="tu-step-num">4</div>
                <h2 className="tu-section-title">Metode Pembayaran</h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {paymentCategories.map((cat) => (
                  <div key={cat}>
                    <div className="tu-cat-label">
                      {cat === "E-Wallet" && <Wallet size={11} />}
                      {cat === "Bank Transfer" && <CreditCard size={11} />}
                      {cat === "QR Code" && <Smartphone size={11} />}
                      {cat}
                    </div>
                    <div className="tu-pay-grid">
                      {paymentMethods.filter((p) => p.category === cat).map((pm) => {
                        const active = selectedPayment === pm.id;
                        return (
                          <button
                            key={pm.id}
                            className={`tu-pay-btn ${active ? "active" : ""}`}
                            onClick={() => setSelectedPayment(pm.id)}
                          >
                            <span style={{ fontSize: 18 }}>{pm.emoji}</span>
                            <span style={{ fontSize: 12, fontWeight: 600, color: active ? "#fff" : "rgba(255,255,255,0.55)", fontFamily: "'Barlow', sans-serif", flex: 1, textAlign: "left" as const }}>
                              {pm.name}
                            </span>
                            {active && <CheckCircle size={13} color="#DC2626" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Summary */}
          <div>
            <div className="tu-summary">
              <div className="tu-summary-line" />
              <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 18, fontWeight: 700, color: "#fff", margin: "0 0 18px" }}>
                Ringkasan Pesanan
              </h3>
              <div style={{ marginBottom: 16 }}>
                {[
                  { label: "Game", val: `${currentGame.icon} ${currentGame.name}` },
                  { label: "Kategori", val: currentGame.category },
                  { label: "User ID", val: userId || null },
                  { label: "Item", val: selectedDenomData?.label || null },
                  ...(selectedDenomData?.bonus ? [{ label: "Bonus", val: `+${selectedDenomData.bonus}`, green: true }] : []),
                  { label: "Pembayaran", val: paymentMethods.find((p) => p.id === selectedPayment)?.name || null },
                ].map((row) => (
                  <div className="tu-summary-row" key={row.label}>
                    <span style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Barlow', sans-serif" }}>{row.label}</span>
                    <span style={{
                      color: (row as any).green ? "#10B981" : row.val ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)",
                      fontWeight: 600, fontSize: 13, fontFamily: "'Barlow', sans-serif",
                      maxWidth: 160, textAlign: "right" as const, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                    }}>
                      {row.val || "Belum dipilih"}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{
                padding: "16px 0", borderTop: "1px solid rgba(255,255,255,0.08)",
                borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: 18,
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 16, fontWeight: 700, color: "#fff" }}>Total</span>
                <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 28, fontWeight: 700, color: "#DC2626" }}>
                  {selectedDenomData ? formatRupiah(selectedDenomData.price) : "Rp 0"}
                </span>
              </div>
              <button
                className="tu-proceed-btn"
                disabled={!userId || !selectedDenom || !selectedPayment}
                onClick={handleProceed}
              >
                Lanjut ke Pembayaran <ChevronRight size={16} />
              </button>
              <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { icon: <Shield size={12} color="#10B981" />, label: "Transaksi dienkripsi SSL" },
                  { icon: <Clock size={12} color="#3B82F6" />, label: "Proses otomatis 24/7" },
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
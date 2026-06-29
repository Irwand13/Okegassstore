# 🎮 OkeGass Store

> **Platform jual beli akun game & layanan digital terpercaya untuk gamer Indonesia.**

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Latest-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?logo=vercel)](https://vercel.com/)

---

## 📋 Daftar Isi

- [Tentang Proyek](#-tentang-proyek)
- [Fitur Utama](#-fitur-utama)
- [Tech Stack](#-tech-stack)
- [Struktur Proyek](#-struktur-proyek)
- [Halaman & Rute](#-halaman--rute)
- [Alur Pengguna](#-alur-pengguna)
- [Instalasi & Setup Lokal](#-instalasi--setup-lokal)
- [Konfigurasi Environment](#-konfigurasi-environment)
- [Supabase & Backend](#-supabase--backend)
- [Integrasi Pembayaran](#-integrasi-pembayaran)
- [Sistem Escrow](#-sistem-escrow)
- [Desain & Komponen UI](#-desain--komponen-ui)
- [Deployment](#-deployment)
- [Kontribusi](#-kontribusi)

---

## 🧩 Tentang Proyek

**OkeGass Store** adalah platform e-commerce digital yang dirancang khusus untuk komunitas gaming Indonesia. Platform ini menyediakan tiga layanan utama dalam satu aplikasi:

1. **Top Up Game** — isi ulang diamond, coin, dan mata uang in-game untuk game populer seperti Mobile Legends, Free Fire, PUBG Mobile, Genshin Impact, Valorant, dan lainnya.
2. **Layanan Digital** — pembelian pulsa, token PLN, dan isi saldo e-wallet (GoPay, OVO, DANA, dll).
3. **Marketplace Akun Game** — jual beli akun game secara aman menggunakan sistem **Escrow** — dana pembeli ditahan platform hingga proses transfer akun selesai.

### Filosofi Desain

> **"Gaming Energy + E-Commerce Trust + Indonesian Localization"**

Platform menggabungkan estetika gaming yang energetik dengan kepercayaan transaksi keuangan digital, sepenuhnya dilokalisasi untuk pengguna Indonesia.

---

## ✨ Fitur Utama

### 🎮 Top Up Game
- Mendukung 7+ game populer (ML, FF, PUBG, Genshin, Valorant, HoK, CoD Mobile)
- Pilihan paket diamond/coin yang variatif
- Form pengisian User ID & Server ID
- Kalkulasi harga real-time
- Konfirmasi pesanan sebelum pembayaran

### 📱 Layanan Digital
- **Pulsa & Data** — semua operator Indonesia (Telkomsel, Indosat, XL, dll)
- **Token PLN** — berbagai nominal, lengkap info kWh
- **E-Wallet** — GoPay, OVO, DANA, LinkAja, dan lainnya
- Semua layanan terintegrasi dengan API Digiflazz

### 🛒 Marketplace Akun Game
- Listing akun dengan detail lengkap: rank, heroes, skins, win rate, screenshot
- Filter berdasarkan game, harga, dan sorting
- Badge status: Tersedia, In Escrow, Terjual
- Sistem wishlist
- Review & rating penjual

### 🔒 Sistem Escrow
- Dana pembeli masuk ke rekening platform terlebih dahulu
- Seller menyerahkan detail akun setelah pembayaran dikonfirmasi
- Dana dilepas ke seller setelah buyer konfirmasi penerimaan
- Auto-complete dalam 3 hari jika tidak ada komplain

### 💬 Chat Real-time
- Komunikasi langsung antara buyer dan seller per transaksi
- Riwayat pesan tersimpan di database
- Notifikasi pesan baru

### 👛 Dompet Digital
- Saldo internal platform
- Riwayat transaksi lengkap (top up, belanja, refund, withdrawal)
- Integrasi Midtrans untuk top up saldo
- Penarikan saldo ke rekening bank

### 👤 Profil & Autentikasi
- Registrasi/login via Email & Password
- Login via Google OAuth
- Verifikasi KTP untuk seller (upload KTP + selfie)
- Dashboard statistik penjual
- Riwayat transaksi dan pesanan

---

## 🛠 Tech Stack

| Kategori | Teknologi |
|---|---|
| **Frontend Framework** | React 18.3.1 + TypeScript |
| **Build Tool** | Vite 6.x |
| **Styling** | Tailwind CSS 4.x |
| **UI Components** | shadcn/ui (Radix UI primitives) |
| **UI Library Tambahan** | MUI (Material UI) 7.x |
| **Routing** | React Router 7.x |
| **Animasi** | GSAP, Motion (Framer Motion) |
| **Backend / DB** | Supabase (PostgreSQL + Auth + Storage) |
| **Serverless Functions** | Supabase Edge Functions (Deno) |
| **Pembayaran** | Midtrans Snap (wallet top up) |
| **Layanan Digital** | Digiflazz API (pulsa, PLN, e-wallet) |
| **Deployment** | Vercel |
| **Package Manager** | pnpm |

---

## 📁 Struktur Proyek

```
Okegassstore/
├── src/
│   ├── app/
│   │   ├── App.tsx                    # Root component + RouterProvider
│   │   ├── Root.tsx                   # Layout wrapper (Navbar, Footer, AuthModal)
│   │   ├── routes.tsx                 # Definisi semua rute aplikasi
│   │   │
│   │   ├── components/
│   │   │   ├── AuthModal.tsx          # Modal login & register
│   │   │   ├── Navbar.tsx             # Navigasi utama (desktop + mobile)
│   │   │   ├── Footer.tsx             # Footer global
│   │   │   ├── figma/
│   │   │   │   └── ImageWithFallback.tsx
│   │   │   ├── home/                  # Komponen khusus halaman Home
│   │   │   │   ├── HeroSection.tsx    # Banner utama dengan animasi
│   │   │   │   ├── TrustBar.tsx       # Marquee indikator kepercayaan
│   │   │   │   ├── GameCards.tsx      # Grid game pilihan
│   │   │   │   ├── ServicesCallout.tsx # 3 kartu layanan digital
│   │   │   │   ├── EscrowBanner.tsx   # Banner penjelasan escrow
│   │   │   │   ├── FeaturedAccounts.tsx # Preview listing marketplace
│   │   │   │   └── Testimonials.tsx   # Carousel ulasan pengguna
│   │   │   └── ui/                    # Komponen shadcn/ui (40+ komponen)
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.tsx        # Global auth state, session, profile
│   │   │
│   │   └── pages/
│   │       ├── Home.tsx               # Halaman utama
│   │       ├── TopUp.tsx              # Top up game (4 tab)
│   │       ├── Marketplace.tsx        # Grid listing akun game
│   │       ├── ListingDetail.tsx      # Detail akun + proses beli
│   │       ├── SellAccount.tsx        # Form jual akun (4 langkah)
│   │       ├── Profile.tsx            # Dashboard pengguna
│   │       ├── Wallet.tsx             # Dompet digital
│   │       ├── ChatRoom.tsx           # Chat buyer-seller
│   │       ├── inbox.tsx              # Daftar percakapan
│   │       ├── pulsa.tsx              # Layanan digital (tab-based)
│   │       └── Bantuan.tsx            # Halaman bantuan / FAQ
│   │
│   ├── lib/
│   │   ├── supabase.ts                # Supabase client, types, semua fungsi DB
│   │   └── midtrans.ts                # Konfigurasi Midtrans
│   │
│   ├── imports/pasted_text/
│   │   └── okegass-store-ui-ux-summary.md  # Dokumentasi desain UI/UX
│   │
│   ├── img/                           # Aset gambar lokal
│   ├── styles/                        # CSS global & kustom
│   └── main.tsx                       # Entry point aplikasi
│
├── supabase/
│   ├── config.toml                    # Konfigurasi Supabase lokal
│   └── functions/                     # Edge Functions (Deno)
│       ├── midtrans-create/           # Buat transaksi Midtrans Snap
│       ├── midtrans-webhook/          # Tangkap notifikasi pembayaran Midtrans
│       ├── digiflazz-topup/           # Eksekusi pembelian layanan digital
│       ├── digiflazz-webhook/         # Tangkap callback Digiflazz
│       ├── topup-pre/                 # Pre-processing pesanan top up
│       └── topup-post/                # Post-processing setelah top up berhasil
│
├── dist/                              # Output build produksi
├── guidelines/
│   └── Guidelines.md                  # Panduan pengembangan
├── default_shadcn_theme.css           # Tema default shadcn/ui
├── package.json
├── pnpm-workspace.yaml
├── vite.config.ts
├── postcss.config.mjs
└── vercel.json                        # Konfigurasi deployment Vercel
```

---

## 🗺 Halaman & Rute

| Path | Komponen | Deskripsi |
|---|---|---|
| `/` | `Home` | Halaman utama dengan hero, game cards, testimonial |
| `/topup` | `TopUp` | Top up diamond/coin (tab: Game, Pulsa, PLN, E-Wallet) |
| `/layanandigital` | `LayananDigital` | Pulsa, PLN, e-wallet (support query `?tab=`) |
| `/marketplace` | `Marketplace` | Grid listing akun game + filter & search |
| `/marketplace/:id` | `ListingDetail` | Detail akun + proses pembelian via escrow |
| `/marketplace/sell` | `SellAccount` | Form multi-step untuk jual akun |
| `/profile` | `Profile` | Dashboard pengguna, riwayat, pengaturan |
| `/wallet` | `Wallet` | Saldo dompet + riwayat transaksi |
| `/chat` | `ChatRoom` | Daftar / room chat |
| `/chat/:chatId` | `ChatRoom` | Room chat spesifik per transaksi |
| `/inbox` | `inbox` | Kotak masuk semua percakapan |
| `/bantuan` | `Bantuan` | FAQ dan pusat bantuan |

---

## 🔄 Alur Pengguna

### Alur 1: Top Up Game
```
Beranda → Klik Game Card → /topup (game otomatis terpilih)
→ Pilih paket → Isi User ID + Server → Pilih metode bayar
→ Klik "Bayar" → Modal konfirmasi → Berhasil ✓
```

### Alur 2: Beli Akun (Marketplace)
```
Login → /marketplace → Filter game → Klik kartu akun
→ Halaman detail → "Beli via Escrow"
→ Dana masuk rekening bersama → Seller kirim detail akun
→ Buyer konfirmasi → Dana cair ke seller ✓
```

### Alur 3: Jual Akun
```
Login (akun terverifikasi KTP) → /marketplace/sell
→ Step 1: Pilih game
→ Step 2: Isi detail (rank, heroes, skins, deskripsi)
→ Step 3: Upload foto & tentukan harga
→ Step 4: Review & submit
→ Listing masuk antrian verifikasi (1–4 jam)
→ Tampil di marketplace ✓
```

### Alur 4: Top Up Saldo Dompet
```
/wallet → Klik "Top Up" → Masukkan nominal (min Rp 10.000)
→ Midtrans Snap popup → Pilih metode (transfer/QRIS/dll)
→ Bayar → Webhook diterima → Saldo bertambah ✓
```

---

## 🚀 Instalasi & Setup Lokal

### Prasyarat

- **Node.js** ≥ 18.x
- **pnpm** ≥ 8.x → `npm install -g pnpm`
- **Supabase CLI** (opsional, untuk jalankan backend lokal) → [docs](https://supabase.com/docs/guides/cli)

### Langkah Instalasi

```bash
# 1. Clone repositori
git clone https://github.com/Irwand13/Okegassstore.git
cd Okegassstore

# 2. Install dependensi
pnpm install

# 3. Salin dan isi file environment
cp .env.example .env
# → Edit .env (lihat seksi Konfigurasi Environment di bawah)

# 4. Jalankan development server
pnpm dev
```

Aplikasi akan berjalan di `http://localhost:5173`

### Build Produksi

```bash
pnpm build
# Output ada di folder dist/
```

---

## ⚙️ Konfigurasi Environment

Buat file `.env` di root proyek dengan variabel berikut:

```env
# ── Supabase ─────────────────────────────────────────────────────
VITE_SUPABASE_URL=https://xxxxxxxxxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ── Midtrans (Pembayaran Wallet Top Up) ──────────────────────────
# Gunakan Sandbox key untuk development
VITE_MIDTRANS_CLIENT_KEY=SB-Mid-client-xxxxxxxxxxxx
# Server key hanya untuk Edge Functions (jangan expose ke frontend!)

# ── Digiflazz (Pulsa, PLN, E-Wallet) ────────────────────────────
# Konfigurasi di Supabase Edge Function secrets, bukan di .env frontend
```

> ⚠️ **PENTING:** Jangan pernah memasukkan `MIDTRANS_SERVER_KEY` atau `DIGIFLAZZ_API_KEY` ke dalam `.env` frontend. Variabel rahasia tersebut hanya boleh disimpan di **Supabase Secrets** dan diakses dari Edge Functions.

### Menyimpan Secret di Supabase

```bash
supabase secrets set MIDTRANS_SERVER_KEY=Mid-server-xxxx
supabase secrets set DIGIFLAZZ_USERNAME=username_anda
supabase secrets set DIGIFLAZZ_API_KEY=api_key_anda
```

---

## 🗄 Supabase & Backend

### Tabel Database Utama

| Tabel | Deskripsi |
|---|---|
| `profiles` | Data pengguna: nama, username, saldo, rating, status verifikasi |
| `game_categories` | Daftar game yang tersedia (name, icon, color, sort_order) |
| `listings` | Iklan akun game: detail, harga, status, seller |
| `listing_tags` | Tag tambahan per listing |
| `orders` | Transaksi pembelian akun: status, platform fee, escrow |
| `reviews` | Ulasan buyer untuk seller setelah transaksi selesai |
| `wishlists` | Daftar akun yang di-wishlist pengguna |
| `notifications` | Notifikasi in-app per user |
| `wallet_logs` | Riwayat mutasi saldo (topup, spend, refund, withdrawal) |
| `topup_transactions` | Riwayat top up saldo via Midtrans |
| `chats` | Room chat per order (buyer ↔ seller) |
| `chat_messages` | Pesan individual dalam sebuah chat room |

### Status Order

```
waiting_payment → paid → processing → delivered → completed
                                               ↘ disputed → refunded
                                    ↘ cancelled
```

Platform fee dihitung **5%** dari harga listing, sehingga `seller_amount = price - platform_fee`.

### Edge Functions

| Function | Trigger | Fungsi |
|---|---|---|
| `midtrans-create` | POST dari frontend | Buat transaksi Snap, simpan ke `topup_transactions` |
| `midtrans-webhook` | POST dari Midtrans | Konfirmasi bayar, kredit saldo user |
| `digiflazz-topup` | POST dari frontend | Kirim request pembelian ke Digiflazz |
| `digiflazz-webhook` | POST dari Digiflazz | Update status pesanan setelah fulfillment |
| `topup-pre` | Internal | Validasi sebelum pesanan dibuat |
| `topup-post` | Internal | Finalisasi setelah pesanan berhasil |

### Autentikasi

- Email/password via Supabase Auth
- Google OAuth via Supabase Auth Provider
- Session disimpan di localStorage dengan auto-refresh token
- Context global: `AuthContext` menyediakan `user`, `profile`, `session`, `loading`

---

## 💳 Integrasi Pembayaran

### Midtrans (Top Up Saldo)

OkeGass Store menggunakan **Midtrans Snap** untuk top up saldo dompet internal.

**Alur:**
1. Frontend memanggil Edge Function `midtrans-create` dengan nominal top up
2. Edge Function membuat transaksi di Midtrans, menyimpan ke `topup_transactions` dengan status `pending`
3. Frontend menampilkan popup Snap Midtrans
4. Pengguna membayar (transfer, QRIS, kartu kredit, dll)
5. Midtrans mengirim webhook ke `midtrans-webhook`
6. Edge Function memverifikasi signature, mengkredit saldo di `profiles.balance`, dan mencatat di `wallet_logs`

> 📌 **Catatan:** Fitur top up aktif (`TOPUP_ENABLED = true`). Popup Snap tetap bisa diuji di UI, namun transaksi production memerlukan akun Midtrans yang sudah diverifikasi penuh.

### Digiflazz (Pulsa, PLN, E-Wallet)

Pembelian layanan digital diproses melalui **API Digiflazz** via Edge Functions untuk menjaga keamanan credential API.

---

## 🔐 Sistem Escrow

Escrow adalah fitur keamanan inti untuk transaksi marketplace:

```
┌──────────┐   Bayar   ┌─────────────────┐   Konfirmasi   ┌────────┐
│  BUYER   │ ────────▶ │ REKENING BERSAMA│ ─────────────▶ │ SELLER │
│          │           │   (OkeGass)     │                │        │
└──────────┘           └─────────────────┘                └────────┘
                              │
                    Jika ada sengketa
                              │
                    Tim mediasi OkeGass
```

**Statistik escrow (dari landing page):**
- 2.500+ akun terjual
- 0 kasus penipuan
- 100% dana aman

**Auto-complete:** Jika buyer tidak konfirmasi dalam **3 hari** setelah seller mengirim detail akun, transaksi otomatis dianggap selesai dan dana dicairkan ke seller.

---

## 🎨 Desain & Komponen UI

### Identitas Visual

| Elemen | Detail |
|---|---|
| **Warna Primer** | `#DC2626` (Merah) + `#EA580C` (Oranye) |
| **Background Utama** | `#0d0d0f` (Hitam gaming) |
| **Font Display** | Rajdhani (judul gaming, bold) |
| **Font Body** | Barlow / Nunito (teks biasa) |
| **Border Radius** | 10–20px (kartu), 50% (badge pill) |

### Warna Aksen per Game

| Game | Warna |
|---|---|
| Mobile Legends | `#1E88E5` Biru |
| Free Fire | `#EA580C` Oranye |
| PUBG Mobile | `#6366F1` Indigo |
| Genshin Impact | `#A78BFA` Ungu |
| Valorant | `#FF4655` Merah-Pink |
| Honor of Kings | `#D4AF37` Emas |

### Responsivitas

| Breakpoint | Layout |
|---|---|
| Desktop (≥1280px) | Grid 4 kolom, sidebar, hero 2-kolom |
| Tablet (768–1279px) | Grid 2–3 kolom, hamburger menu |
| Mobile (<768px) | Grid 1 kolom, semua full-width |

### Komponen Library

Proyek menggunakan **shadcn/ui** (40+ komponen berbasis Radix UI):

`Accordion` · `AlertDialog` · `Avatar` · `Badge` · `Button` · `Calendar` · `Card` · `Carousel` · `Checkbox` · `Command` · `Dialog` · `Drawer` · `DropdownMenu` · `Form` · `Input` · `Label` · `Pagination` · `Popover` · `Progress` · `RadioGroup` · `ScrollArea` · `Select` · `Separator` · `Sheet` · `Sidebar` · `Skeleton` · `Slider` · `Switch` · `Table` · `Tabs` · `Textarea` · `Toast (Sonner)` · `Tooltip` · dan lainnya

---

## 🚢 Deployment

Proyek dikonfigurasi untuk deploy ke **Vercel**.

### Vercel (Frontend)

File `vercel.json` sudah dikonfigurasi untuk SPA routing:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

**Langkah deploy:**
1. Push ke GitHub
2. Connect repo di [vercel.com](https://vercel.com)
3. Set environment variables di Vercel Dashboard (sama dengan `.env`)
4. Deploy otomatis setiap push ke `main`

### Supabase Edge Functions

```bash
# Login ke Supabase CLI
supabase login

# Link ke proyek
supabase link --project-ref <project-ref>

# Deploy semua functions
supabase functions deploy

# Atau deploy satu function
supabase functions deploy midtrans-create
```

---

## 🤝 Kontribusi

Pull request sangat diterima! Untuk perubahan besar, harap buka issue terlebih dahulu untuk mendiskusikan apa yang ingin diubah.

### Panduan Pengembangan

1. Fork repositori ini
2. Buat branch fitur: `git checkout -b feature/nama-fitur`
3. Commit perubahan: `git commit -m 'feat: tambah fitur X'`
4. Push ke branch: `git push origin feature/nama-fitur`
5. Buat Pull Request

### Konvensi Commit

Gunakan format [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: tambah fitur baru
fix: perbaiki bug
docs: update dokumentasi
style: format kode (tanpa perubahan logika)
refactor: refaktor kode
chore: update dependensi, konfigurasi
```

---

## 📄 Lisensi

Lihat file [ATTRIBUTIONS.md](./ATTRIBUTIONS.md) untuk informasi lisensi komponen pihak ketiga yang digunakan dalam proyek ini.

---

<div align="center">

**Dibuat dengan santuy untuk komunitas gaming Indonesia**

[GitHub](https://github.com/Irwand13/Okegassstore) · [Laporkan Bug](https://github.com/Irwand13/Okegassstore/issues) · [Request Fitur](https://github.com/Irwand13/Okegassstore/issues)

</div>
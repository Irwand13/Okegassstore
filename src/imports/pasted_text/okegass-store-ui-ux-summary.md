# 🎮 OkeGass Store – UI/UX Design Summary

## 📸 VISUAL OVERVIEW

### Design Philosophy
**"Gaming Energy + E-Commerce Trust + Indonesian Localization"**

Platform yang menggabungkan keseruan gaming dengan keamanan transaksi kelas finansial.

---

## 🎨 DESIGN IDENTITY

### Color Story
```
HERO:      Red (#DC2626) + Orange (#EA580C) gradient
           → Energetic, attention-grabbing, gaming vibe

TRUST:     Dark Navy (#111827) + White
           → Professional, secure, premium

ACCENT:    Game-specific colors (ML Blue, FF Orange, etc.)
           → Visual organization, brand recognition
```

### Typography Hierarchy
```
DISPLAY:   Rajdhani (Gaming bold feel)
           "TOP UP GAME TERMURAH!"
           56–72px, ultra-bold

HEADINGS:  Rajdhani bold
           Section titles: 32–36px

BODY:      Nunito (Clean, readable)
           14–16px, comfortable reading

LABELS:    Nunito bold uppercase
           12–13px, condensed spacing
```

---

## 📱 KEY SCREENS (14 Main Sections)

### 1. **Navbar** – Always Visible
- Logo + brand name
- 3 main nav links (desktop)
- Auth buttons: Login/Register or User dropdown (Profile, Sell, Logout)
- Mobile hamburger menu
- Dark background, red accents

### 2. **Hero Section** – Homepage First Fold
- Gradient red-to-orange background with pattern overlay
- Left: Big title "TOP UP GAME TERMURAH!" + 2 CTA buttons
- Right: Animated game icons orbiting (6 games)
- Stats: "2.5 Juta+ Transaksi", "150K+ Pengguna", "< 1 Menit"

### 3. **Trust Bar** – Scrolling Confidence Indicators
- Dark background, marquee animation
- "⚡ Proses Instan · 🔒 100% Aman · 📱 24/7 Layanan · ..."

### 4. **Game Cards Grid** – "Pilih Game Favorit"
- 4-column grid (7 games + 1 CTA for "Game Lainnya")
- Each: colored icon, name, currency, hover lift effect
- Clickable → jumps to topup page for that game

### 5. **Services Callout** – 3 Feature Cards
- Pulsa & Data (📱 blue), PLN Token (⚡ orange), E-Wallet (💳 green)
- Each has description + colored CTA button
- "Semua Kebutuhan Digital" theme

### 6. **Escrow Banner** – Green Trust Highlight
- "Jual Beli Akun – 100% Aman dengan Escrow"
- Explains escrow protection
- Stats: "2.500+ Akun Terjual", "0 Kasus Penipuan", "100% Dana Aman"
- Clickable for step-by-step escrow flow

### 7. **Featured Accounts** – "Akun Unggulan"
- 3-column grid of top marketplace listings
- Each shows: game, title, stats (rank/heroes/skins), seller info, price, status
- Preview of marketplace platform

### 8. **Testimonials Carousel** – Social Proof
- Auto-rotating, 4-second interval
- Single card visible: avatar, 5-star rating, quote, author, game
- 5 dots below for manual navigation

### 9. **Top Up Page** – 4 Tabs Interface
**Tab 1 – Game:**
- Left sidebar: Game selector (7 options, active highlighted)
- Right main: Game header banner, packages grid, form, summary

**Tab 2 – Pulsa:**
- Operator selector (Telkomsel, Indosat, XL, etc.)
- Nominal grid, phone input, price

**Tab 3 – PLN:**
- Meter ID input
- 6 nominal options (20K–1M with kWh info)

**Tab 4 – E-Wallet:**
- E-wallet provider selector (GoPay, OVO, DANA, etc.)
- Phone, nominal, summary

All tabs have:
- Form inputs with focus glow
- Real-time price calculation
- Summary card with total + CTA button
- Confirm modal before payment

### 10. **Marketplace Page** – Account Grid + Filters
- Filter bar: search input, game dropdown, sort options
- Grid: 3 columns (desktop) of account cards
- Each card: game banner, title, 3-stat boxes, tags, seller info, price, status
- Click → detail modal
- Status badges: ✅ Available, 🔒 Escrow, ✗ Sold

**Detail Modal:**
- Escrow green banner (clickable for flow info)
- Seller profile card
- All account details
- "Beli via Escrow" button

### 11. **Sell Account Page** – 3-Tier Gate
**If not logged in:**
- Icon (🔐) + "Login Diperlukan"
- CTA to login

**If logged in but not KTP verified:**
- Icon (📋) + "Verifikasi KTP Diperlukan"
- Checklist: KTP scan, selfie with KTP, phone number
- CTA to profile verification

**If verified:**
- Form with fields:
  * Game select *
  * Title *
  * Description
  * Rank, Heroes, Skins
  * Screenshot upload (dashed border)
  * Price *
  * Yellow warning box (important rules)
  * Submit button

**Success State:**
- Congratulations page
- "Listing Berhasil!"
- "Sedang diverifikasi 1-4 jam..."
- Back to marketplace CTA

### 12. **Profile Page** – User Dashboard
**Header Card (dark gradient):**
- Avatar emoji, name, email
- Verified/unverified KTP badge
- Right: "Saldo" + green amount + "+ Top Up Saldo" button

**3 Tabs:**

**Ringkasan (Overview):**
- 4 stat cards: Total Transaksi, Game Favorit, Rating (if seller), Accounts Sold (if seller)

**Riwayat (History):**
- Transaction list rows: icon, description, ID, date, amount (red), status badge
- Sortable/filterable

**Pengaturan (Settings):**
- Forms: name, email, phone
- If not verified: Upload boxes (KTP, Selfie) + "Ajukan Verifikasi" button
- Save + Logout buttons

### 13. **Auth Modal** – Login & Register
**Header (gradient red-orange):**
- Logo + tagline

**Tab toggle:**
- "Masuk" | "Daftar"

**Login Form:**
- Email input
- Password input (with 👁️ toggle)
- Submit button
- Demo credentials hint (blue box)

**Register Form:**
- Name input (new field)
- Email, password
- Submit button

**Shared:**
- "atau" divider
- "🔵 Lanjutkan dengan Google" button
- Error message handling (red box)

### 14. **Footer** – Site Navigation + Info
- 4 columns: Brand info + socials, Layanan links, Bantuan links, Extra
- Bottom bar: Copyright + "🟢 Sistem berjalan normal" status indicator

---

## 🎭 COMPONENT LIBRARY HIGHLIGHTS

### Buttons
```
Primary:     Red (#DC2626) bg, white text, Rajdhani bold
             Hover: Darker + lift 4px + glow shadow
             Active: Press down effect

Secondary:   Red border, transparent/light bg, red text
             Hover: Fill background

Ghost:       No bg, gray text, hover underline

Disabled:    50% opacity, not-allowed cursor
```

### Cards
```
Base:        White bg, 1px gray border, 20px border-radius
             Soft shadow: 0 4px 12px rgba(0,0,0,0.08)

Hover:       Lift 6px, shadow grows to 0 12px 24px
             Duration: 0.22s ease

States:      Error (red border + glow), Focus (blue border)
```

### Form Inputs
```
Default:     2px gray border, 12px padding, 10px border-radius

Focus:       Border → red (#DC2626)
             Glow: 0 0 0 3px rgba(220,38,38,0.12)

Error:       Border → red (#FF5C6E), red help text below
             Glow: red-tinted

Filled:      Slight background tint (opacity 5%)
```

### Badges
```
Tag:         Light colored bg (e.g., #FEF2F2), dark text
             12px padding, 20px border-radius (full pill)

Status:      Available (green), Escrow (amber), Sold (gray)
             White text, dark bg

Verified:    Blue accent, white checkmark "✔️"
```

---

## 🎬 ANIMATIONS & MICRO-INTERACTIONS

```
Hover Effects:
  - Buttons:      0.18s color + shadow + scale
  - Cards:        0.22s lift + shadow
  - Nav links:    Underline animation
  - Buttons:      Glow effect on focus inputs

Transitions:
  - Modal open:   Fade + scale, 0.25s ease
  - Tab switch:   Instant visual update
  - Carousel:     Fade between cards, 0.4s ease
  - Scroll in:    Fade + slide-up on viewport entry

Continuous:
  - Pulse dot:    Opacity blink, 2s infinite
  - Marquee:      Scroll left infinitely
  - Orbit icons:  Subtle float/scale on hover
```

---

## 📐 RESPONSIVE DESIGN

| Breakpoint | Grid | Layout |
|-----------|------|--------|
| **Desktop** (1280px+) | 4 cols | Full nav, 2-col hero, sidebars |
| **Tablet** (768–1279px) | 2–3 cols | Hamburger menu, stacked hero |
| **Mobile** (< 768px) | 1 col | Full-width, all stacked |

Key changes:
- Hamburger nav on tablets/mobile
- Hero becomes single column
- All grids collapse to 1 column
- Modals: full-screen with padding on mobile

---

## 🎯 USER FLOWS

### Flow 1: New User → Top Up Game
```
1. Land on homepage
2. See game cards section
3. Click "Mobile Legends"
4. Redirected to /topup with ML selected
5. Choose package (e.g., "112 Diamond")
6. Enter User ID + Server ID
7. Select payment method (e.g., GoPay)
8. Click "Bayar Sekarang"
9. Confirm in modal
10. Success toast: "Pesanan Berhasil!"
11. Form resets, ready for another order
```

### Flow 2: Registered User → Buy Account
```
1. Click "Jual Beli Akun" in navbar
2. See marketplace grid
3. Filter/search for "Mobile Legends"
4. Click account card
5. See detail modal with escrow info
6. Click "Beli via Escrow"
7. Info: "Dana masuk Rekening Bersama..."
8. Future: Payment gateway pops
9. Success confirmation
```

### Flow 3: KTP-Verified User → Sell Account
```
1. Login with verified account
2. Click user dropdown → "Jual Akun"
3. Redirected to /marketplace/sell
4. Fill form: game, title, description, rank, heroes, skins, price
5. Upload 3+ screenshots
6. Click "Pasang Iklan Sekarang"
7. Success page: "Listing Berhasil!"
8. Listing sent to review (1-4 hours)
9. Appears in marketplace → buyers can see
```

---

## 🎨 VISUAL PALETTE (Tailwind-Compatible)

```
Reds/Oranges:
  - #DC2626 (primary red)
  - #B91C1C (dark red)
  - #EA580C (orange)
  - #FDE68A (yellow highlight)

Grays:
  - #111827 (very dark, navbar)
  - #1F2937 (dark gray)
  - #6B7280 (medium gray)
  - #E5E7EB (light border)
  - #FFFFFF (white)

Game Accent Colors:
  - ML: #1E88E5 (blue)
  - FF: #EA580C (orange)
  - PUBG: #3949AB (dark blue)
  - Genshin: #7B2FFF (purple)
  - Valorant: #FF4655 (red)
  - COD: #166534 (green)
  - AOV: #B45309 (amber)

Status:
  - Available: #10B981 (green)
  - Escrow: #FBBF24 (amber)
  - Sold: #6B7280 (gray)
  - Error: #FF5C6E (red)
```

---

## 📋 FIGMA FILE STRUCTURE (Recommended)

```
Pages:
  ├── Brand Guide (colors, typography, icons)
  ├── Components (buttons, cards, inputs, badges)
  ├── Homepage
  ├── Top Up (Game, Pulsa, PLN, EWallet)
  ├── Marketplace
  ├── Sell Account
  ├── Profile
  ├── Auth Modal
  └── Responsive (mobile, tablet versions)

Components (nested):
  ├── Button (primary, secondary, ghost, states)
  ├── Card (game, account, service)
  ├── Input (text, select, error, focus)
  ├── Badge (tag, status)
  ├── Modal (login, confirm, detail)
  ├── Navigation (navbar, tabs)
  └── Icons (games, status, actions)
```

---

## 🎤 DESIGN TONE

- **Energetic** – Bold colors, large typography, gaming emojis
- **Trustworthy** – Escrow explanation, security badges, verified checkmarks
- **Accessible** – Clear labels, good contrast, readable fonts
- **Indonesian** – Bahasa Indonesia, local payment methods, relevant content
- **Mobile-first** – Thumb-friendly buttons, readable on small screens

---

## ✅ QUALITY CHECKLIST

- [ ] All 4 states of buttons (default, hover, active, disabled)
- [ ] Input states (default, focus, error, filled)
- [ ] Dark mode support (dark navbar/footer, light cards)
- [ ] Touch-friendly: buttons ≥ 44px tap targets
- [ ] Contrast: WCAG AA minimum on text
- [ ] Spacing: Consistent 8px / 16px / 24px grid
- [ ] Responsive: 3 breakpoints tested
- [ ] Micro-interactions: Hover + focus states smooth

---

**Ready for Figma AI Design Generation! 🚀**
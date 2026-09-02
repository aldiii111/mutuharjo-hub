# DESIGN SYSTEM – SMK Muhammadiyah 1 Sukoharjo

## 1. Palette (OKLCH – formal, kontras tinggi)

| Token | OKLCH (Light) | OKLCH (Dark) | Use |
|-------|---------------|--------------|-----|
| `--color-primary` | oklch(0.6112 0.1217 248.9572) | oklch(0.6576 0.1208 252.0832) | Brand biru utama – tombol CTA, link utama, badge aktif |
| `--color-primary-foreground` | oklch(1 0 0) | oklch(1 0 0) | Text pada primary |
| `--color-secondary` | oklch(0.9122 0.0111 243.6627) | oklch(0.9774 0.0042 236.4961) | Background hover, secondary surface |
| `--color-secondary-foreground` | oklch(0.4186 0.0133 235.1330) | oklch(0.3046 0.0023 247.9001) | Text pada secondary |
| `--color-accent` | oklch(0.5098 0.1320 257.5458) | oklch(0.5098 0.1320 257.5458) | Aksen (chart-1) – highlight statistik |
| `--color-background` | oklch(0.9581 0 0) | oklch(0.1776 0 0) | Latar umum – putih hangat (light) / navy gelap (dark) |
| `--color-surface` | oklch(0.9774 0.0042 236.4961) | oklch(0.2638 0.0024 247.9155) | Card, modal, panel admin |
| `--color-surface-foreground` | oklch(0.2022 0.0110 151.1628) | oklch(0.9755 0.0045 258.3245) | Text pada surface |
| `--color-muted` | oklch(0.9209 0.0128 244.2626) | oklch(0.2171 0.0025 247.9411) | Disabled / placeholder |
| `--color-muted-foreground` | oklch(0.6027 0.0062 211.0375) | oklch(0.7559 0.0125 239.9659) | Text muted |
| `--color-border` | oklch(0.8840 0.0067 208.7806) | oklch(0.3506 0.0066 248.0169) | Garis pemisah |
| `--color-danger` | oklch(0.5471 0.1943 27.3250) | oklch(0.6368 0.2078 25.3313) | Error, validasi gagal, status "Ditolak" |
| `--color-danger-foreground` | oklch(1 0 0) | oklch(1 0 0) | Text pada danger |
| `--color-success` | oklch(0.5498 0.1400 145.0000) | oklch(0.6600 0.1550 145.0000) | Success, notifikasi positif, status "Terverifikasi" |
| `--color-success-foreground` | oklch(1 0 0) | oklch(1 0 0) | Text pada success |
| `--color-ring` | oklch(0.68 0.12 215) | oklch(0.75 0.12 215) | Focus ring |

> **Perbaikan v1.1 (lihat audit konsistensi):**
> - `--color-danger` (light) sebelumnya `oklch(0.1931 0.0037 164.6298)` — lightness
>   dan chroma terlalu rendah, hasilnya nyaris hitam dan tidak terbaca sebagai
>   sinyal bahaya. Diganti dengan hue/chroma yang sama seperti versi dark
>   (hue 25–27, chroma ~0.19–0.21, merah asli), lightness disesuaikan untuk kontras
>   di atas background terang.
> - `--color-success` sebelumnya identik dengan `--color-accent`
>   (`oklch(0.5098 0.1320 257.5458)`, biru) di light **maupun** dark mode — dua
>   status berbeda tidak bisa dibedakan secara visual, dan tidak ada adaptasi
>   dark-mode sama sekali. Diganti ke hijau (hue 145) dengan nilai dark yang
>   dihitung ulang, bukan disalin dari light.
> - `--color-accent` sengaja **tidak diubah** — tetap biru, dipakai khusus untuk
>   highlight statistik/label premium, kini jelas berbeda dari `--color-success`.

## 2. Typography (font‑stack)

```css
/* Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=DM+Sans:wght@400;500;700&display=swap');

:root {
  --font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;
  --font-body: var(--font-sans);
  --font-heading: 'DM Sans', var(--font-sans);
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", "Courier New", monospace;
}
```

> **Perbaikan v1.1:** sebelumnya `--font-heading` di-assign ke Plus Jakarta Sans
> yang sama dengan `--font-body`, sehingga DM Sans diimpor tapi tidak pernah
> dipakai (dead import) dan hierarki heading vs body jadi datar (cuma dibedakan
> ukuran/weight). Sekarang DM Sans dipakai khusus untuk `h1`–`h3` dan elemen
> angka besar (statistik hero, nomor pendaftaran), Plus Jakarta Sans tetap
> dipakai untuk body — memberi karakter tanpa melanggar aturan "formal,
> institutional" di §6.

| Element | Font | Size | Line‑height | Weight |
|---------|------|------|------------|--------|
| `h1` | `--font-heading` | 2.625rem (42 px) | 1.2 | 700 |
| `h2` | `--font-heading` | 2.25rem (36 px) | 1.3 | 700 |
| `h3` | `--font-heading` | 1.875rem (30 px) | 1.4 | 600 |
| `body` | `--font-body` | 1rem (16 px) | 1.6 | 400 |
| `small` | `--font-body` | 0.875rem (14 px) | 1.6 | 400 |

## 3. Spacing & Layout (8‑px grid)

```css
:root {
  --space-0: 0px;
  --space-1: 4px;   /* 0.5 × 8 */
  --space-2: 8px;   /* 1 × 8 */
  --space-3: 12px;  /* 1.5 × 8 */
  --space-4: 16px;  /* 2 × 8 */
  --space-5: 24px;  /* 3 × 8 */
  --space-6: 32px;  /* 4 × 8 */
  --space-8: 48px;  /* 6 × 8 */
  --space-10: 80px; /* 10 × 8 */
}
```

- **Container max‑width**: `1280px` → centered, auto‑margin.
- **Gutters**: `--space-5` (24 px) horizontally between columns.
- **Vertical rhythm dalam satu section**: gunakan kelipatan `--space-4` (16 px).
- **Vertical rhythm antar section** (landing page, halaman panjang): gunakan
  `--space-8` (48 px) sampai `--space-10` (80 px) — lihat `ui-context.md` §4.
  Jangan pakai `--space-4`/`--space-6` untuk jarak antar section besar, itu
  disediakan untuk jarak antar elemen di dalam satu section.

## 4. Radius & Shadow (soft, subtle)

```css
:root {
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;

  /* Light‑mode subtle shadow */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.12);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.15);
}
```

## 5. Components (Tailwind‑compatible classes)

### Button (primary & secondary)
```html
<button class="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary transition-colors duration-200">
  CTA Primary
</button>

<button class="px-4 py-2 rounded-md border border-primary text-primary hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-primary transition-colors duration-200">
  CTA Secondary
</button>
```

### Card (surface + border)
```html
<div class="bg-surface rounded-lg shadow-sm border border-border p-5">
  <h3 class="font-heading text-lg mb-2">Card Title</h3>
  <p class="text-muted">Deskripsi singkat</p>
</div>
```

### Input (form‑wizard)
```html
<label class="block text-sm font-medium mb-1" for="nama">Nama Lengkap</label>
<input id="nama" name="nama" type="text" class="w-full rounded-md border border-border bg-background px-3 py-2 text-body focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Tuliskan nama Anda" />
```

### Badge status (danger / success — konsumsi token yang sudah diperbaiki)
```html
<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-danger/10 text-danger">
  Ditolak
</span>

<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
  Terverifikasi
</span>
```
> Dipakai di Panel Admin (Fitur #8) untuk status `PendaftarPPDB.status` dan
> `KonfirmasiBayar.status`. Lihat `ui-context.md` §5 untuk mapping prop
> `Badge` → varian shadcn.

### Navbar (sticky, transparent on top → solid on scroll)
```html
<header class="sticky top-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
  <nav class="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
    <a href="/" class="text-primary font-heading text-xl">SMK Mutuharjo</a>
    <ul class="flex space-x-6">
      <li><a href="/tentang" class="text-body hover:text-primary transition-colors">Tentang</a></li>
      <li><a href="/ppdb" class="text-body hover:text-primary transition-colors">PPDB</a></li>
      <li><a href="/blud" class="text-body hover:text-primary transition-colors">BLUD</a></li>
      <li><a href="/mitra-industri" class="text-body hover:text-primary transition-colors">Mitra Industri</a></li>
      <li><a href="/berita" class="text-body hover:text-primary transition-colors">Berita</a></li>
    </ul>
  </nav>
</header>
```
> **Catatan:** "Tentang" dan "Berita" ditambahkan ke nav utama — sebelumnya hanya
> ada 3 link (PPDB, BLUD, Mitra Industri) padahal situs juga punya halaman profil
> sekolah dan berita tanpa jalur navigasi eksplisit.

### Footer (logo kompetisi + link legal)
```html
<footer class="bg-background border-t border-border py-6 mt-12">
  <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
    <div>
      <img src="/images/logo/kompetisi/jhic.png" alt="JHIC 2.0" class="h-8 mb-2" />
      <p class="text-muted text-sm">© 2026 SMK Mutuharjo. All rights reserved.</p>
    </div>
    <nav class="space-y-2">
      <a href="/kebijakan-privasi" class="text-body hover:text-primary transition-colors block">Kebijakan Privasi</a>
      <a href="/syarat-ketentuan" class="text-body hover:text-primary transition-colors block">Syarat & Ketentuan</a>
    </nav>
    <div class="flex space-x-4">
      <a href="https://wa.me/6281234567890" class="text-body hover:text-primary transition-colors"><svg class="h-6 w-6" /* Lucide WhatsApp */></svg></a>
      <!-- add other social icons -->
    </div>
  </div>
</footer>
```

### Hero Section (Flat Solid + Visual Marker)
- **Konsep Aesthetic**: Flat Solid Surfaces dengan Clean Grid (Prinsip Rams #10: *Less, but better* — *Be Different, Not Better-Looking*).
- **Section Marker**: Garis vertikal tipis `1px` (`w-[2px] bg-primary rounded-full h-8 mr-3`) di samping eyebrow text sebagai aksen geometris orisinal dan visual anchor.
- **Tekstur Background**: Latar belakang menggunakan *subtle dot pattern* atau *grid lines 1px low-opacity* (`bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:16px_16px]`), BUKAN warna polos mati dan BUKAN dekorasi dashed/circle/cutout yang ramai.
- **Visual Hierarchy**: Focal point yang jelas mengarah ke CTA utama (`bg-primary text-primary-foreground`) dan CTA sekunder (`border border-border bg-surface`).

## 6. Anti‑Patterns (strictly disallowed)
- **Gradien warna neon** – hanya flat warna solid.
- **Emojis** sebagai ikon atau teks utama.
- **Playful "clay‑morphism"** – tidak ada shadow‑blur/blur‑background.
- **Skeleton loaders** – gunakan placeholder sederhana dengan background‑muted.
- **Rounded‑corner radius > 12 px** – jaga konsistensi pada `--radius-lg` (kecuali badge/pill indikator status kecil).
- **Dekorasi Dashed/Cutout Berlebihan di Hero** – dilarang meniru dashed borders / circle cutouts acak; jaga estetika institusional yang tenang (*unobtrusive*).
- **Hover‑only interaction** tanpa focus state – harus ada `focus-visible`.
- **Dark‑mode only** – harus support **both** light & dark, dan setiap token wajib
  punya nilai dark yang benar-benar dihitung ulang, bukan disalin dari light
  (lihat catatan perbaikan `--color-success` di §1).

## 7. Accessibility (WCAG AAA where feasible)
- Contrast ≥ 4.5 : 1 pada teks, ≥ 3 : 1 pada elemen UI non‑teks.
- Fokus yang jelas (`focus-visible:ring-2`).
- `prefers‑reduced‑motion` menjaga semua animasi ≤ 150 ms.
- Semua ikon SVG mempunyai `aria‑label` atau `title`.
- Form mempunyai label yang terkait dengan `for`/`id`.
- Setiap kali token warna di §1 diubah, verifikasi ulang rasio kontras aktual
  (bukan hanya asumsi) — terutama `danger`/`success` di atas `surface` dan
  `background`, sebelum dipakai di komponen.

## 8. Iconography (consistent set)
Gunakan **Heroicons** (outline) atau **Lucide** (outline) – semua ber‑stroke 2 px, warna `currentColor`. Contoh import (React):
```js
import { Home, Phone } from 'lucide-react';
```

## 9. Interaction Details (micro‑motions)
- **Button press**: opacity 0.9 → 1 dalam 150 ms.
- **Link hover**: warna `text-primary` → `text-primary/80`.
- **Card lift**: `transform: translateY(-2px)` on hover, `transition: transform 0.2s`.
- **Form error**: shake ≈ 0.3 s, `animation: shake 0.3s ease-in-out`.
- Respect `prefers‑reduced‑motion` – non‑essential animasi dimatikan, termasuk
  autoplay carousel testimoni (lihat `ui-context.md` §6).

## 10. Responsive Breakpoints (Tailwind style)
| Breakpoint | Min‑width |
|------------|----------|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

## 11. Token Export (Tailwind config snippet)
```js
// tailwind.config.js (v4 style – OKLCH native)
module.exports = {
  content: ['./frontend/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        muted: 'var(--color-muted)',
        border: 'var(--color-border)',
        danger: 'var(--color-danger)',
        success: 'var(--color-success)',
        ring: 'var(--color-ring)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
      },
    },
  },
  plugins: [],
};
```

**OKLCH Token Cheat Sheet (Light / Dark) — v1.1**

| Token | Light | Dark |
|-------|-------|------|
| `--color-primary` | oklch(0.6112 0.1217 248.9572) | oklch(0.6576 0.1208 252.0832) |
| `--color-secondary` | oklch(0.9122 0.0111 243.6627) | oklch(0.9774 0.0042 236.4961) |
| `--color-accent` | oklch(0.5098 0.1320 257.5458) | oklch(0.5098 0.1320 257.5458) |
| `--color-background` | oklch(0.9581 0 0) | oklch(0.1776 0 0) |
| `--color-background-foreground` | oklch(0.3134 0.0234 253.6270) | oklch(0.7905 0.0126 259.8241) |
| `--color-surface` | oklch(0.9774 0.0042 236.4961) | oklch(0.2638 0.0024 247.9155) |
| `--color-muted` | oklch(0.9209 0.0128 244.2626) | oklch(0.2171 0.0025 247.9411) |
| `--color-border` | oklch(0.8840 0.0067 208.7806) | oklch(0.3506 0.0066 248.0169) |
| `--color-danger` | oklch(0.5471 0.1943 27.3250) | oklch(0.6368 0.2078 25.3313) |
| `--color-danger-foreground` | oklch(1 0 0) | oklch(1 0 0) |
| `--color-success` | oklch(0.5498 0.1400 145.0000) | oklch(0.6600 0.1550 145.0000) |
| `--color-ring` | oklch(0.6112 0.1217 248.9572) | oklch(0.6576 0.1208 252.0832) |

> Seluruh token menggunakan format OKLCH supaya konsisten dengan Tailwind v4 native. Untuk polyfill di browser lama, konversi ke hex sebelum deploy. **Sebelum deploy, jalankan pengecekan kontras aktual (bukan hanya baca angka OKLCH) untuk pasangan `danger`/`success` di atas `background` dan `surface`, di kedua mode.**

## 12. Reference in `ui-context.md`
`ui-context.md` merujuk file ini (`design-system/master.md`) untuk meng‑sync semua tim.

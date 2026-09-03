<!--
╔══════════════════════════════════════════════════════════════════════════╗
║  AGENT INSTRUCTION — FILE INI AGENT-EDITABLE                           ║
║                                                                          ║
║  Ketika user minta "ganti warna", "ganti tema", "ubah gaya visual",     ║
║  atau "ganti font" → edit bagian yang relevan di file ini.              ║
║                                                                          ║
║  CARA TERCEPAT GANTI TEMA (via tweakcn.com):                            ║
║  1. Buka tweakcn.com → pilih/kustomisasi tema                           ║
║  2. Copy output CSS yang dihasilkan                                      ║
║  3. Di globals.css frontend, replace HANYA blok ═══ THEME ZONE ═══     ║
║     (jangan replace seluruh file — animasi & custom utils di luar zone) ║
║  4. Verifikasi: --destructive hue 20-35 (merah), --success hue 130-155  ║
║     (hijau) — ini kontrak dari foundation.md §F2                        ║
║  5. Update tabel token di §V1 file ini agar dokumentasi tetap sinkron   ║
║                                                                          ║
║  WAJIB cross-check setelah mengedit:                                    ║
║  1. Anti-pattern font di foundation.md §F9                              ║
║  2. Kontras WCAG aktual untuk token yang berubah                        ║
║  3. Dark mode — setiap token DIHITUNG ULANG, bukan disalin dari light   ║
║                                                                          ║
║  JANGAN edit: foundation.md, components.md (kecuali jika user minta)   ║
╚══════════════════════════════════════════════════════════════════════════╝
-->

# VISUAL STYLE — Mutuharjo Hub
> **Layer 1b — Agent-Editable Style Values**
> Fondasi tak-berubah ada di → [`foundation.md`](./foundation.md)
> Pola komponen ada di → [`components.md`](./components.md)

---

## V1. Color Tokens (shadcn/ui + tweakcn Standard)

> **Versi aktif**: v2.0 (refactor September 2026 — shadcn-compatible naming)
> Token mengikuti konvensi shadcn/ui: **tanpa prefix `--color-`**. Tailwind v4 membaca via `@theme inline` di `globals.css §V7`.
> Setiap perubahan token wajib update tabel ini DAN reflect ke `globals.css` frontend.

### Light Mode (`:root`)

| CSS Variable | OKLCH Value | Tailwind Class | Catatan |
|-------------|------------|---------------|---------|
| `--background` | `oklch(0.9581 0 0)` | `bg-background` | Off-white hangat |
| `--foreground` | `oklch(0.3134 0.0234 253.6270)` | `text-foreground` | |
| `--card` | `oklch(0.9774 0.0042 236.4961)` | `bg-card` | Card, modal |
| `--card-foreground` | `oklch(0.2022 0.0110 151.1628)` | `text-card-foreground` | |
| `--popover` | `oklch(0.9774 0.0042 236.4961)` | `bg-popover` | Dropdown |
| `--popover-foreground` | `oklch(0.2022 0.0110 151.1628)` | `text-popover-foreground` | |
| `--primary` | `oklch(0.6112 0.1217 248.9572)` | `bg-primary` | Brand biru |
| `--primary-foreground` | `oklch(1 0 0)` | `text-primary-foreground` | Putih |
| `--secondary` | `oklch(0.9122 0.0111 243.6627)` | `bg-secondary` | Background hover |
| `--secondary-foreground` | `oklch(0.4186 0.0133 235.1330)` | `text-secondary-foreground` | |
| `--muted` | `oklch(0.9209 0.0128 244.2626)` | `bg-muted` | |
| `--muted-foreground` | `oklch(0.6027 0.0062 211.0375)` | `text-muted-foreground` | |
| `--accent` | `oklch(0.5098 0.1320 257.5458)` | `bg-accent` | Highlight statistik |
| `--accent-foreground` | `oklch(0.2022 0.0110 151.1628)` | `text-accent-foreground` | |
| `--border` | `oklch(0.8840 0.0067 208.7806)` | `border-border` | |
| `--input` | `oklch(0.8840 0.0067 208.7806)` | `border-input` | Border input form |
| `--ring` | `oklch(0.68 0.12 215)` | `ring-ring` | Focus ring |
| `--destructive` | `oklch(0.5471 0.1943 27.3250)` | `bg-destructive` | **Merah asli** — error/ditolak |
| `--destructive-foreground` | `oklch(1 0 0)` | `text-destructive-foreground` | Putih |
| `--success` | `oklch(0.5498 0.1400 145.0000)` | `bg-success` | **Hijau asli** — custom token |
| `--success-foreground` | `oklch(1 0 0)` | `text-success-foreground` | Putih |
| `--radius` | `0.75rem` | — | Base radius (12px = radius-lg) |

### Dark Mode (`.dark`)

| CSS Variable | OKLCH Value | Catatan |
|-------------|------------|---------|
| `--background` | `oklch(0.1776 0 0)` | Navy gelap |
| `--foreground` | `oklch(0.7905 0.0126 259.8241)` | |
| `--card` | `oklch(0.2638 0.0024 247.9155)` | |
| `--card-foreground` | `oklch(0.9755 0.0045 258.3245)` | |
| `--popover` | `oklch(0.2638 0.0024 247.9155)` | |
| `--popover-foreground` | `oklch(0.9755 0.0045 258.3245)` | |
| `--primary` | `oklch(0.6576 0.1208 252.0832)` | Sedikit lebih terang |
| `--primary-foreground` | `oklch(1 0 0)` | |
| `--secondary` | `oklch(0.9774 0.0042 236.4961)` | |
| `--secondary-foreground` | `oklch(0.3046 0.0023 247.9001)` | |
| `--muted` | `oklch(0.2171 0.0025 247.9411)` | |
| `--muted-foreground` | `oklch(0.7559 0.0125 239.9659)` | |
| `--accent` | `oklch(0.5098 0.1320 257.5458)` | Sama dengan light |
| `--accent-foreground` | `oklch(0.9755 0.0045 258.3245)` | |
| `--border` | `oklch(0.3506 0.0066 248.0169)` | |
| `--input` | `oklch(0.3506 0.0066 248.0169)` | |
| `--ring` | `oklch(0.75 0.12 215)` | |
| `--destructive` | `oklch(0.6368 0.2078 25.3313)` | Merah asli dark |
| `--destructive-foreground` | `oklch(1 0 0)` | |
| `--success` | `oklch(0.6600 0.1550 145.0000)` | Hijau asli dark |
| `--success-foreground` | `oklch(1 0 0)` | |

### Changelog Token

| Versi | Perubahan | Alasan |
|-------|-----------|--------|
| v1.0 | Nilai awal, prefix `--color-*` | Awal project |
| v1.1 | `danger` light: lightness 0.19→0.54, hue biru→27. `success`: dari biru → hijau hue 145. | `danger` nyaris hitam; `success` tak bisa dibedakan dari `accent` |
| v2.0 | **Rename semua token ke shadcn/tweakcn standard** (tanpa prefix `--color-`, `--surface`→`--card`, `--danger`→`--destructive`). Tambah `--foreground`, `--input`, `--popover`. `--radius` jadi satu nilai base. | Kompatibel dengan shadcn/ui components & tweakcn output |

> **Panduan saat ganti palette via tweakcn**: pastikan setelah paste output tweakcn, `--destructive` masih di hue 20–35 (merah) dan `--success` di hue 130–155 (hijau). Jika tweakcn menimpa nilainya, restore manual. Ini kontrak dari `foundation.md §F2`.

---

## V2. Typography Values

> Font family boleh diganti agent. Wajib cross-check daftar font terlarang di `foundation.md §F9` sebelum mengganti.

### Font Stack Aktif

```css
/* Google Fonts — import di globals.css */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');
```

```css
/* Di :root globals.css */
--font-sans:    'Plus Jakarta Sans', system-ui, sans-serif;
--font-heading: 'DM Sans', var(--font-sans);
--font-mono:    ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
```

**Rasionale font aktif:**
- **Plus Jakarta Sans** (body): Hangat, profesional, nyaman untuk teks panjang. Bukan font AI-generic.
- **DM Sans** (heading): Sedikit lebih geometric, memberi kontras hierarki jelas dari body.
- Keduanya tidak masuk daftar "overused AI template font" (Inter/Geist/Space Grotesk).

### Skala Ukuran (Tailwind classes)

| Element | Tailwind Class | Size / Weight / Leading |
|---------|---------------|------------------------|
| `h1` (halaman biasa) | `text-4xl font-bold leading-tight font-heading` | 36px / 700 / 1.3 |
| `h1` (hero landing) | `text-5xl lg:text-7xl font-bold leading-tight tracking-tight font-heading` | ≥40px mobile / ≥72px desktop |
| `h2` | `text-3xl font-semibold leading-snug font-heading` | 30px / 600 / 1.35 |
| `h3` | `text-2xl font-semibold leading-normal font-heading` | 24px / 600 / 1.4 |
| `body` | `text-base leading-relaxed` | 16px / 400 / 1.6 |
| `small` | `text-sm leading-relaxed` | 14px / 400 / 1.6 |
| `caption` | `text-xs text-muted-foreground` | 12px / 400 / 1.5 |

---

## V3. Radius & Shadow

### Border Radius

```css
/* Di globals.css, di dalam :root */
--radius: 0.75rem;  /* Base = 12px (radius-lg) */

/* @theme inline akan men-derive: */
/* --radius-sm: calc(var(--radius) - 6px)  = 6px  */
/* --radius-md: calc(var(--radius) - 4px)  = 8px  */
/* --radius-lg: var(--radius)              = 12px — nilai MAKSIMUM elemen besar */
/* --radius-xl: calc(var(--radius) + 4px)  = 16px — hanya badge/pill kecil */
```

> Cukup ubah satu nilai `--radius` → semua elemen ikut otomatis.

### Box Shadow

```css
/* Di globals.css, di dalam :root */
--shadow-color:   oklch(0 0 0);
--shadow-opacity: 0.08;
--shadow-sm:  0 1px 3px 0px oklch(0 0 0 / 0.08);
--shadow-md:  0 4px 6px -1px oklch(0 0 0 / 0.12);
--shadow-lg:  0 10px 15px -1px oklch(0 0 0 / 0.15);
```

> Shadow harus tetap subtle. Dilarang drop shadow besar/blur seperti claymorphism — lihat anti-pattern `foundation.md §F9`.

---

## V4. Aesthetic Concept & Workflow tweakcn

> Bagian ini mendeskripsikan karakter visual aktif dan cara menggantinya.

**Versi aktif**: Flat Solid Institutional

- **Filosofi**: Flat Solid Surfaces, Clean Grid — "Less, but better". Berbeda karena *purposeful*, bukan *decorative*.
- **Background texture**: Subtle dot pattern di Hero (`bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px]`) — bukan polos mati, bukan dekorasi ramai.
- **Section marker**: Garis vertikal tipis 1px (`w-[2px] h-8 bg-primary rounded-full`) di samping eyebrow text.
- **Navbar style**: Floating pill — `fixed top-6 z-50`, `rounded-full`, `backdrop-blur-md`.
- **Tone**: Dingin-netral (biru-abu).

### Workflow Ganti Tema via tweakcn

```
1. Buka tweakcn.com
2. Pilih tema dari gallery atau kustomisasi manual
   - Sesuaikan: primary color, border radius, fonts
   - Preview di editor interaktif tweakcn
3. Klik "Copy CSS" / "Export"
4. Di frontend/app/globals.css, replace HANYA blok THEME ZONE:
   ╔═════════════════════════════════╗
   ║    ═══ THEME ZONE START ═══    ║  ← cari marker ini
   ╠═════════════════════════════════╣
   ║  :root { ... }                  ║
   ║  .dark { ... }                  ║  ← replace seluruh bagian ini
   ╠═════════════════════════════════╣
   ║    ═══ THEME ZONE END ═══      ║  ← sampai sini
   ╚═════════════════════════════════╝
5. WAJIB verifikasi setelah paste:
   - --destructive: hue harus 20-35 (merah)
   - --success: hue harus 130-155 (hijau)
   - --radius: nilai maksimum 0.75rem (12px) untuk elemen besar
   - font: tidak ada Inter / Geist / Space Grotesk (cek foundation.md §F9)
6. Update tabel token di visual-style.md §V1 agar dokumentasi sinkron
7. Verifikasi kontras WCAG aktual untuk --destructive & --success
```

### Changelog Aesthetic

| Versi | Perubahan | Alasan |
|-------|-----------|--------|
| v1.0 | Flat Solid Institutional (aktif) | Pilihan awal sesuai brief institusional |

---

## V5. Micro-motion Specs

| Interaksi | Efek | Durasi | Easing |
|-----------|------|--------|--------|
| Button press | `opacity: 0.9 → 1` | 150ms | `ease-in-out` |
| Link hover | `color → text-primary/80` | 150ms | `ease-in-out` |
| Card hover lift | `translateY(-2px)` | 200ms | `ease-out` |
| Form error | `shake` keyframe | 300ms | `ease-in-out` |
| Dropdown open | `opacity 0→1` + `translateY(-4px→0)` | 150ms | `ease-out` |

> Semua animasi ≤ 150ms dan wajib dimatikan via `prefers-reduced-motion` (sudah ada di globals.css §V7).

---

## V6. Tailwind Config (Tailwind v4 — @theme inline approach)

> **Tailwind v4 tidak butuh `tailwind.config.js` untuk token warna** — semua lewat `@theme inline` di `globals.css`. Tapi jika masih pakai `tailwind.config.ts`, gunakan referensi ke CSS variables:

```ts
// frontend/tailwind.config.ts — MINIMAL, hanya untuk non-color config
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./frontend/**/*.{js,jsx,ts,tsx}'],
  darkMode: ['class'],  // dark mode via .dark class (next-themes)
  // Warna & radius TIDAK perlu didefinisikan di sini —
  // semua sudah di-expose via @theme inline di globals.css
}

export default config
```

> Jika menggunakan shadcn/ui CLI (`npx shadcn@latest add`), dia akan membuat `components.json` yang menunjuk ke `globals.css` sebagai source CSS — pastikan `"cssVariables": true` di `components.json`.

---

## V7. Globals CSS Template (tweakcn-compatible)

> Ini adalah **template lengkap** `frontend/app/globals.css`.
> Ketika Anda mendapat output dari tweakcn, paste ke dalam blok **THEME ZONE** saja.
> Bagian di luar THEME ZONE (imports, @theme inline, @layer base, animasi) tetap.

```css
/* ═══════════════════════════════════════════════════════════════
   MUTUHARJO HUB — globals.css
   Stack: Next.js 15 + Tailwind v4 + shadcn/ui
   ═══════════════════════════════════════════════════════════════ */

/* 1. Tailwind v4 core */
@import "tailwindcss";
@import "tw-animate-css";

/* 2. shadcn/ui Tailwind plugin (jika dipakai) */
/* @import "shadcn/tailwind.css"; */

/* 3. Font import — update jika font diganti di visual-style.md §V2 */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');

/* 4. Dark mode variant via .dark class (next-themes) */
@custom-variant dark (&:is(.dark *));


/* ═══════════════════════════════════════════════════════════════
   ═══ THEME ZONE START ═══
   Blok ini AMAN untuk di-replace dengan output dari tweakcn.com.
   Jangan ubah apapun di luar blok ini.
   Setelah paste dari tweakcn, WAJIB verifikasi:
   - --destructive: hue 20-35 (merah asli)
   - --success: hue 130-155 (hijau asli) — TAMBAHKAN jika tweakcn tidak generate
   - --font-sans/--font-heading: tidak ada Inter/Geist/Space Grotesk
   - --radius: tidak melebihi 0.75rem untuk elemen besar
   ═══════════════════════════════════════════════════════════════ */

:root {
  /* Color tokens — shadcn/ui naming convention */
  --background:          oklch(0.9581 0 0);
  --foreground:          oklch(0.3134 0.0234 253.6270);
  --card:                oklch(0.9774 0.0042 236.4961);
  --card-foreground:     oklch(0.2022 0.0110 151.1628);
  --popover:             oklch(0.9774 0.0042 236.4961);
  --popover-foreground:  oklch(0.2022 0.0110 151.1628);
  --primary:             oklch(0.6112 0.1217 248.9572);
  --primary-foreground:  oklch(1 0 0);
  --secondary:           oklch(0.9122 0.0111 243.6627);
  --secondary-foreground:oklch(0.4186 0.0133 235.1330);
  --muted:               oklch(0.9209 0.0128 244.2626);
  --muted-foreground:    oklch(0.6027 0.0062 211.0375);
  --accent:              oklch(0.5098 0.1320 257.5458);
  --accent-foreground:   oklch(0.2022 0.0110 151.1628);
  --border:              oklch(0.8840 0.0067 208.7806);
  --input:               oklch(0.8840 0.0067 208.7806);
  --ring:                oklch(0.68 0.12 215);

  /* Status tokens — KONTRAK: destructive=merah, success=hijau */
  --destructive:             oklch(0.5471 0.1943 27.3250);   /* merah, hue 27 */
  --destructive-foreground:  oklch(1 0 0);
  --success:                 oklch(0.5498 0.1400 145.0000);  /* hijau, hue 145 */
  --success-foreground:      oklch(1 0 0);

  /* Sidebar tokens (untuk admin panel) */
  --sidebar:                    oklch(0.9663 0.0080 98.8792);
  --sidebar-foreground:         oklch(0.3590 0.0051 106.6524);
  --sidebar-primary:            oklch(0.6112 0.1217 248.9572);
  --sidebar-primary-foreground: oklch(1 0 0);
  --sidebar-accent:             oklch(0.9122 0.0111 243.6627);
  --sidebar-accent-foreground:  oklch(0.4186 0.0133 235.1330);
  --sidebar-border:             oklch(0.8840 0.0067 208.7806);
  --sidebar-ring:               oklch(0.68 0.12 215);

  /* Typography */
  --font-sans:    'Plus Jakarta Sans', system-ui, sans-serif;
  --font-heading: 'DM Sans', var(--font-sans);
  --font-mono:    ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;

  /* Radius — satu nilai base, derived di @theme inline */
  --radius: 0.75rem;

  /* Shadow composables */
  --shadow-color:   oklch(0 0 0);
  --shadow-opacity: 0.08;
  --shadow-sm:  0 1px 3px 0px oklch(0 0 0 / 0.08);
  --shadow-md:  0 4px 6px -1px oklch(0 0 0 / 0.12);
  --shadow-lg:  0 10px 15px -1px oklch(0 0 0 / 0.15);

  /* Spacing base */
  --spacing: 0.25rem;
}

.dark {
  --background:          oklch(0.1776 0 0);
  --foreground:          oklch(0.7905 0.0126 259.8241);
  --card:                oklch(0.2638 0.0024 247.9155);
  --card-foreground:     oklch(0.9755 0.0045 258.3245);
  --popover:             oklch(0.2638 0.0024 247.9155);
  --popover-foreground:  oklch(0.9755 0.0045 258.3245);
  --primary:             oklch(0.6576 0.1208 252.0832);
  --primary-foreground:  oklch(1 0 0);
  --secondary:           oklch(0.9774 0.0042 236.4961);
  --secondary-foreground:oklch(0.3046 0.0023 247.9001);
  --muted:               oklch(0.2171 0.0025 247.9411);
  --muted-foreground:    oklch(0.7559 0.0125 239.9659);
  --accent:              oklch(0.5098 0.1320 257.5458);
  --accent-foreground:   oklch(0.9755 0.0045 258.3245);
  --border:              oklch(0.3506 0.0066 248.0169);
  --input:               oklch(0.3506 0.0066 248.0169);
  --ring:                oklch(0.75 0.12 215);
  --destructive:             oklch(0.6368 0.2078 25.3313);
  --destructive-foreground:  oklch(1 0 0);
  --success:                 oklch(0.6600 0.1550 145.0000);
  --success-foreground:      oklch(1 0 0);
  --sidebar:                    oklch(0.2357 0.0024 67.7077);
  --sidebar-foreground:         oklch(0.8074 0.0142 93.0137);
  --sidebar-primary:            oklch(0.6576 0.1208 252.0832);
  --sidebar-primary-foreground: oklch(1 0 0);
  --sidebar-accent:             oklch(0.2171 0.0025 247.9411);
  --sidebar-accent-foreground:  oklch(0.9755 0.0045 258.3245);
  --sidebar-border:             oklch(0.3506 0.0066 248.0169);
  --sidebar-ring:               oklch(0.75 0.12 215);
  --font-sans:    'Plus Jakarta Sans', system-ui, sans-serif;
  --font-heading: 'DM Sans', var(--font-sans);
  --font-mono:    ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
  --radius: 0.75rem;
}

/* ═══ THEME ZONE END ═══ */


/* ═══════════════════════════════════════════════════════════════
   @theme inline — Bridge CSS variables ke Tailwind v4 utilities
   JANGAN edit bagian ini kecuali ada token baru yang ditambahkan.
   ═══════════════════════════════════════════════════════════════ */
@theme inline {
  /* Colors */
  --color-background:           var(--background);
  --color-foreground:           var(--foreground);
  --color-card:                 var(--card);
  --color-card-foreground:      var(--card-foreground);
  --color-popover:              var(--popover);
  --color-popover-foreground:   var(--popover-foreground);
  --color-primary:              var(--primary);
  --color-primary-foreground:   var(--primary-foreground);
  --color-secondary:            var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted:                var(--muted);
  --color-muted-foreground:     var(--muted-foreground);
  --color-accent:               var(--accent);
  --color-accent-foreground:    var(--accent-foreground);
  --color-border:               var(--border);
  --color-input:                var(--input);
  --color-ring:                 var(--ring);
  --color-destructive:          var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-success:              var(--success);          /* custom — non-shadcn */
  --color-success-foreground:   var(--success-foreground);
  --color-sidebar:              var(--sidebar);
  --color-sidebar-foreground:   var(--sidebar-foreground);
  --color-sidebar-primary:      var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent:       var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border:       var(--sidebar-border);
  --color-sidebar-ring:         var(--sidebar-ring);

  /* Font */
  --font-sans:    var(--font-sans);
  --font-heading: var(--font-heading);
  --font-mono:    var(--font-mono);

  /* Radius — derived dari satu --radius base */
  --radius-sm: calc(var(--radius) - 6px);   /* 6px */
  --radius-md: calc(var(--radius) - 4px);   /* 8px */
  --radius-lg: var(--radius);               /* 12px */
  --radius-xl: calc(var(--radius) + 4px);   /* 16px */

  /* Shadow */
  --shadow-sm: var(--shadow-sm);
  --shadow-md: var(--shadow-md);
  --shadow-lg: var(--shadow-lg);
}


/* ═══════════════════════════════════════════════════════════════
   @layer base — global element defaults
   ═══════════════════════════════════════════════════════════════ */
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
    font-family: var(--font-sans);
  }
  h1, h2, h3 {
    font-family: var(--font-heading);
  }
}


/* ═══════════════════════════════════════════════════════════════
   Animations & Keyframes
   ═══════════════════════════════════════════════════════════════ */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25%       { transform: translateX(-4px); }
  75%       { transform: translateX(4px); }
}

/* Reduced motion — WAJIB */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

*Dokumen ini selalu disync dengan implementasi aktual di `frontend/app/globals.css`. Setiap perubahan nilai di sini WAJIB direfleksikan ke file tersebut — atau lakukan sebaliknya (paste dari tweakcn lalu update tabel di §V1).*

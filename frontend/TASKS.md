# FRONTEND TASKS & GUIDELINES — Mutuharjo Hub

Dokumen ini berisi daftar tugas terperinci, alur kerja, spesifikasi komponen, dan kriteria penyelesaian (*Definition of Done*) khusus untuk **Frontend Developer (Dev FE)** pada aplikasi **Mutuharjo Hub (SMK Muhammadiyah 1 Sukoharjo)**.

> **Dokumen Induk:** [`context/AGENTS.md`](../context/AGENTS.md), [`context/mvp.md`](../context/mvp.md), [`context/architecture.md`](../context/architecture.md), [`context/code-standards.md`](../context/code-standards.md), [`context/master.md`](../context/master.md), [`context/ui-context.md`](../context/ui-context.md).

---

## 1. Peran & Spesifikasi Teknis Frontend

- **Penanggung Jawab**: Frontend Developer (Dev FE)
- **Framework & Stack**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4 (OKLCH Tokens), Shadcn UI primitives, `lucide-react`, `react-hook-form`, `zod`, `@mutuharjo/shared`.
- **Subdomain Strategy**: Next.js Middleware (`frontend/middleware.ts`) memetakan `ppdb.smkmuh1-skh.sch.id` secara internal ke `app/ppdb-subdomain/`.
- **Aturan Ketat Kode (v1.2)**:
  1. **Strict No `any`**: Dilarang keras menggunakan tipe `any`. Seluruh data/state harus terdefinisi tipe TypeScript-nya atau menggunakan `<T = unknown>`.
  2. **Strict No Slash Comments**: Dilarang keras menulis komentar baris `//` atau `/* */` di dalam file kode sumber (`.ts`, `.tsx`, `.js`, `.jsx`).
  3. **Kepatuhan AGENTS.md**: Semua "Aturan Keras" di `AGENTS.md` (konsistensi Navbar/Footer tunggal, logo brand, tipografi hero, kontrol carousel, dll) wajib diterapkan di setiap komponen dan halaman.

---

## 2. Struktur Komponen & Folder Frontend

```
frontend/
├── app/
│   ├── (main)/                   # Route group domain utama (smkmuh1-skh.sch.id)
│   │   ├── page.tsx              # Landing Page utama (F7)
│   │   ├── tentang/page.tsx      # Profil Sekolah
│   │   ├── ppdb/page.tsx         # Halaman Informasi PPDB (F1)
│   │   ├── blud/                 # Showcase BLUD (F3)
│   │   ├── mitra-industri/       # Direktori Mitra (F4)
│   │   ├── berita/               # Berita & Prestasi (F7)
│   │   └── jurusan/[slug]/       # Detail Jurusan (F7)
│   ├── ppdb-subdomain/           # Subdomain route (ppdb.smkmuh1-skh.sch.id)
│   │   ├── page.tsx              # Form Wizard 4-Step PPDB
│   │   ├── konfirmasi/page.tsx   # Konfirmasi Pembayaran Manual & WA (F2)
│   │   └── status/page.tsx       # Cek Status Pendaftaran Real-time
│   ├── admin/                    # Panel Admin UI (F8)
│   │   ├── login/page.tsx        # Login Admin
│   │   └── dashboard/page.tsx    # Dashboard & AdminTaskSummary
│   ├── layout.tsx                # RootLayout (Fonts, TopLoaderBar, globals.css)
│   ├── sitemap.ts                # Dynamic Sitemap SEO (F9)
│   └── robots.ts                 # Robots.txt (F9)
├── components/
│   ├── ui/                       # Shadcn UI primitives (lowercase: button.tsx, card.tsx, dst)
│   └── features/                 # Feature-specific components (PascalCase):
│       ├── layout/               # Layout components utama (Navbar.tsx, Footer.tsx)
│       ├── ppdb/                 # Stepper.tsx, FormStep1..4.tsx, ReviewCard.tsx
│       ├── blud/                 # ProdukCard.tsx, ProdukDetailModal.tsx
│       ├── mitra/                # MitraCard.tsx, JurusanFilterChips.tsx
│       ├── chatbot/              # ChatWidget.tsx, ChatBubble.tsx, TypingIndicator.tsx
│       ├── admin/                # AdminTaskSummary.tsx, DataTable.tsx
│       └── forms/                # Input.tsx, Select.tsx, FileUpload.tsx
├── data/                         # File seed JSON statis (mitra.json, jurusan.json, dst)
├── lib/                          # Utility helper (`cn()`, apiClient, Zod schemas)
└── middleware.ts                 # Subdomain Host Rewrite Middleware
```

---

## 3. Rincian Task Per-Sprint (Phase 0 s.d. Phase 6)

### Sprint 1: Fondasi Frontend & Subdomain Middleware (Phase 0)

* [x] **Task 1.1 — Setup Monorepo Workspace**: Menyiapkan linkage package `@mutuharjo/shared`.
* [x] **Task 1.2 — Setup Next.js 15 App Router & Token Desain**: Inisialisasi Next.js 15, Tailwind v4 OKLCH tokens v1.1 di `app/globals.css`, font `Plus Jakarta Sans` + `DM Sans` di `app/layout.tsx`, dan helper `cn()`.
* [x] **Task 1.3 — Middleware Subdomain Host Rewrite**: Implementasi `frontend/middleware.ts` untuk memetakan permintaan `ppdb.smkmuh1-skh.sch.id` secara internal ke `app/ppdb-subdomain/`.
* [x] **Task 1.4 — Layout Utama & Komponen Dasar**: Buat komponen `Navbar` (termasuk link "Tentang" & "Berita"), `Footer` (menampilkan **5 Logo Kompetisi Wajib**: JHIC, Kemenag, Muhammadiyah, Sponsor, Media), `TopLoaderBar` (`ajaxify-progress-bar` di `RootLayout`), dan `Container` terpusat (`max-w-7xl`). (Note: Navbar & Footer telah disentralisasi di `app/(main)/layout.tsx` sesuai aturan AGENTS.md).

### Sprint 2: Core Subdomain PPDB & Landing Page (Phase 1 & 2)

* [ ] **Task 2.1 — Halaman Informasi PPDB (`/ppdb`)**: Buat halaman informasi pendaftaran di domain utama (jadwal, syarat, biaya Rp100.000, infografis timeline 5 tahap) + CTA ke subdomain.
* [ ] **Task 2.2 — Form Wizard 4-Step Subdomain (`ppdb.*`)**: Buat form bertahap (Step 1 Data Diri, Step 2 Ortu, Step 3 Pilihan 6 Jurusan CoE, Step 4 Review & Checklist berkas fisik) menggunakan Zod + React Hook Form + Shadcn UI. (Note: Gunakan layout vertikal sesuai aturan AGENTS.md).
* [ ] **Task 2.3 — Autosave Draft & Bukti Pendaftaran PDF**: Integrasi `localStorage` autosave antar-step agar data tidak hilang saat refresh, serta buat komponen unduh PDF "Bukti Pendaftaran".
* [ ] **Task 2.4 — Halaman Konfirmasi Pembayaran & Cek Status**: Buat halaman `ppdb.*/konfirmasi` (info rekening & form upload bukti) dan `ppdb.*/status` (real-time status pendaftaran).
* [ ] **Task 2.10 — Landing Page — Hero & PPDB Schedule Teaser (F7)**: Bangun `HeroSection` (headline, CTA "Daftar PPDB" ke `/ppdb`, statistik, dot-pattern) dan `PpdbScheduleTeaser` (ringkasan 3 langkah + CTA). Pastikan skala tipografi hero besar dan berani.
* [ ] **Task 2.11 — Landing Page — Jurusan, Testimoni, Kerjasama Industri (F7)**: Bangun `JurusanGrid`, `TestimoniCarousel` (reduced motion support & wajib ada kontrol visual), dan `MitraLogoGrid`.
* [ ] **Task 2.12 — Halaman Detail Jurusan (`/jurusan/[slug]`)**: Dynamic route detail per jurusan (deskripsi lengkap, keunggulan, mitra DUDI terkait) dari `jurusan.json`.
* [ ] **Task 2.13 — Landing Page — Berita & Fasilitas (F7)**: Bangun `BeritaGrid` (1 artikel featured + 2 kecil) dan `FasilitasStrip` (list ikon horizontal).

### Sprint 3: Interactive Features, Chatbot & Panel Admin (Phase 3 & 4)

* [ ] **Task 3.1 — Halaman Showcase BLUD (`/blud`)**: Buat grid kartu produk Teaching Factory dengan filter chips jurusan, detail modal, CTA WhatsApp, dan empty state.
* [ ] **Task 3.2 — Halaman Direktori Mitra PKL (`/mitra-industri`)**: Buat list kartu mitra DUDI per jurusan + CTA WhatsApp Admin BKK, dan empty state.
* [ ] **Task 3.3 — Component Floating Chatbot Widget**: Buat panel chat slide-up di pojok kanan bawah, quick replies, `TypingIndicator` saat menunggu respons Layer 2 (Gemini), dan tombol Eskalasi WA Admin.
* [ ] **Task 3.4 — UI Panel Admin (`/admin`)**: Buat halaman Login (`/admin/login`), Dashboard (`/admin/dashboard`) dengan `AdminTaskSummary` di atas Data Table (Shadcn `Table`), dan modal CRUD.

### Sprint 4: Technical SEO & Polish UI/UX (Phase 5 & 6)

* [ ] **Task 4.1 — Technical SEO Implementation**: Buat `app/sitemap.ts` (dinamis URL publik), `app/robots.ts` (block `/admin/*`), metadata `generateMetadata()` per route, dan alt text gambar.
* [ ] **Task 4.2 — Audit Aksesibilitas & Polish UI/UX**: Verifikasi kontras ≥4.5:1, `focus-visible` rings, ARIA labels, transisi micro-animation ≤150ms, dan pengujian responsif 375px–1440px.
* [ ] **Task 4.6 — Audit Lighthouse & Penyiapan Pitch Deck FE**: Jalankan Audit Lighthouse (SEO ≥90, Performance ≥80) dan siapkan visual screenshot untuk slide deck.

---

## 4. Definition of Done (DoD) Frontend

1. Seluruh komponen dibuat tanpa tipe `any` dan tanpa komentar slash (`//`).
2. Semua warna konsisten mengonsumsi token OKLCH dari `app/globals.css`.
3. Komponen layout (Navbar/Footer) terpusat di `layout.tsx`, diimplementasikan sekali, tidak disalin ulang per halaman.
4. Logo brand di Navbar wajib ikon `school` + teks "SMK Mutuharjo", logo sponsor/kompetisi hanya ada di Footer.
5. Rasio kontras teks ≥ 4.5:1 terverifikasi. Token `danger`/`success` wajib merujuk ke token yang sudah disesuaikan.
6. Komponen carousel/horizontal scroll harus memiliki navigasi yang eksplisit (arrows/dots).
7. Gambar di halaman menggunakan foto asli atau placeholder dengan keterangan jelas, dilarang mengambil (`hotlink`) asal dari internet.
8. Lighthouse score: SEO ≥ 90, Performance ≥ 80.

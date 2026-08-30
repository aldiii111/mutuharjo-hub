# UI CONTEXT – SMK Muhammadiyah 1 Sukoharjo (Mutuharjo Hub)

> **Referensi utama:** [`design-system/master.md`](../../design-system/master.md) — token warna, tipografi, spacing, shadow, radius, komponen dasar, anti-patterns, aksesibilitas, ikonografi, interaksi, breakpoint, dan konfigurasi Tailwind.
> File ini hanya **mengindeks & menyesuaikan** rule di master agar langsung siap pakai tim FE.
>
> **v1.1** — token `danger`/`success`, path folder komponen, dan mapping prop
> Toast/Badge ke primitive shadcn sudah diperbaiki mengikuti audit konsistensi.
> Lihat catatan di §2 dan §5.

---

## 1. Design Philosophy
- **Formal · Institutional · Trustworthy** — identitas SMK Muhammadiyah 1 Sukoharjo.
- **Anti‑cliché**: *no gradient neon, no playful claymorphism, no emojis, no fake testimonials, no bento grids tanpa keperluan*.
- **Content‑first**: warna & ornamen hanya mendukung hierarki informasi, bukan bisu visual.
- **WCAG AAA** untuk teks utama, AA untuk UI non‑teks — diverifikasi dengan kalkulasi kontras aktual, bukan asumsi dari nilai OKLCH saja.
- **Reduced‑motion first**: animasi opsional ≤150 ms, non‑essential (termasuk autoplay carousel) dimatikan otomatis saat `prefers-reduced-motion` aktif.

---

## 2. Color System (token → usage)

| Semantic token | Master | Usage FE |
|----------------|--------|----------|
| `primary` | oklch(0.6112 0.1217 248.9572) | Tombol CTA utama, link utama, badge jurusan aktif |
| `secondary` | oklch(0.9122 0.0111 243.6627) | Background hover, secondary surface |
| `accent` | oklch(0.5098 0.1320 257.5458) | Highlight statistik, ikon "premium", label kompetisi |
| `background` | oklch(0.9581 0 0) | `<body>`, section utama |
| `surface` | oklch(0.9774 0.0042 236.4961) | Card, modal, panel admin |
| `muted` | oklch(0.9209 0.0128 244.2626) | Placeholder input, disabled, teks sekunder |
| `border` | oklch(0.8840 0.0067 208.7806) | Border card, input, tabel |
| `danger` | oklch(0.5471 0.1943 27.3250) | Error form, toast gagal, status **"Ditolak"** (`PendaftarPPDB.status`, `KonfirmasiBayar.status`) |
| `success` | oklch(0.5498 0.1400 145.0000) | Toast sukses, status **"Terverifikasi"** |
| `ring` | oklch(0.6112 0.1217 248.9572) | Focus ring |

> **Perbaikan v1.1:** `danger` sebelumnya bernilai nyaris hitam (lightness 0.19,
> chroma nyaris nol) sehingga status "Ditolak" di Panel Admin tidak terlihat
> sebagai error. `success` sebelumnya identik dengan `accent` (sama-sama biru,
> juga sama persis di dark mode). Nilai baru diambil dari `master.md` §1 — jangan
> pakai nilai lama yang mungkin masih ter-cache di file CSS lokal siapa pun.

> **Dark mode**: semua token switch lewat `.dark` class (lihat `master.md`). Setiap
> token — termasuk `danger` dan `success` — punya nilai dark yang dihitung ulang
> secara terpisah, bukan disalin dari light.

---

## 3. Typography (font‑stack & scale)

```css
/* Sudah di-import di globals.css */
--font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;
--font-body: var(--font-sans);
--font-heading: 'DM Sans', var(--font-sans);
```

| Role | Class (Tailwind) | Size / Weight / Line‑height |
|------|------------------|----------------------------|
| `h1` | `text-4xl font-bold leading-tight font-heading` | 36 px / 700 / 1.3 |
| `h2` | `text-3xl font-semibold leading-snug font-heading` | 30 px / 600 / 1.35 |
| `h3` | `text-2xl font-semibold leading-normal font-heading` | 24 px / 600 / 1.4 |
| `body` | `text-base leading-relaxed` | 16 px / 400 / 1.6 |
| `small` | `text-sm leading-relaxed` | 14 px / 400 / 1.6 |
| `caption` | `text-xs text-muted` | 12 px / 400 / 1.5 |

> **Perbaikan v1.1:** `--font-heading` sebelumnya sama dengan `--font-body`
> (Plus Jakarta Sans keduanya), membuat impor DM Sans jadi dead code dan hierarki
> heading terasa datar. Sekarang DM Sans dipakai khusus untuk heading (`h1`–`h3`)
> dan disarankan juga untuk angka statistik besar di Hero (lihat §6), sementara
> Plus Jakarta Sans tetap jadi font body agar teks panjang (form, deskripsi jurusan)
> tetap nyaman dibaca.

> Hindari **Inter / Geist / Space Grotesk** — sudah dipakai terlalu banyak di template AI.

---

## 4. Spacing & Layout Grid
- **Unit dasar**: 8 px (`--space-2`).
- **Gutters vertikal *dalam* satu section**: `space-y-4` (16 px) antar elemen kecil; `space-y-6` (24 px) antar block besar dalam section yang sama.
- **Gutters vertikal *antar* section pada landing page**: gunakan `--space-8` (48px) sampai `--space-10` (80px) — lihat `master.md` §3. Jangan pakai `space-y-4`/`space-y-6` untuk pemisah antar section, halaman akan terasa terlalu padat untuk 7+ section berbeda konteks.
- **Container**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
- **Grid kolom**: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5` (24 px) — **hanya untuk konten yang memang cocok jadi grid seragam** (mis. Produk BLUD). Untuk Jurusan, Berita, dan Fasilitas, lihat catatan layout per section di §6 — jangan menyeragamkan semua section jadi grid 3 kolom yang sama.

---

## 5. Component Library (ready-to-use patterns)

| Komponen | File / Path | Props kunci |
|----------|-------------|------------|
| `Button` | `components/ui/button.tsx` | `variant="primary" \| "secondary" \| "outline" \| "ghost"`, `size="sm" \| "md" \| "lg"`, `loading?`, `disabled?` |
| `Card` | `components/ui/card.tsx` | `hover?`, `bordered?`, `padding?` |
| `Input` | `components/features/forms/Input.tsx` | `label`, `error?`, `helperText?`, `iconLeft?`, `iconRight?` |
| `Select` | `components/features/forms/Select.tsx` | `options`, `placeholder`, `error?` |
| `FileUpload` | `components/features/forms/FileUpload.tsx` | `accept`, `maxSizeMB`, `preview?` |
| `Modal` | `components/ui/modal.tsx` | `open`, `onClose`, `title`, `size="sm" \| "md" \| "lg" \| "xl"` |
| `Table` | `components/ui/table.tsx` | `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableCell` (Admin panel data tables) |
| `Badge` | `components/ui/badge.tsx` | `variant="default" \| "success" \| "warning" \| "danger" \| "info"`, `dot?` |
| `Toast` | `components/ui/toast.tsx` | `type="success" \| "error" \| "info"`, `message`, `duration?` |
| `Stepper` | `components/features/ppdb/Stepper.tsx` | `steps: string[]`, `current: number`, `completed: number[]` |
| `ChatWidget` | `components/features/chatbot/ChatWidget.tsx` | `trigger`, `prefillMessage?` |

> **Perbaikan v1.1 — path folder:** `Stepper` dan `ChatWidget` sebelumnya ditulis
> di `components/ppdb/...` dan `components/chatbot/...` (tanpa segmen `features`),
> tidak sinkron dengan struktur resmi di `code-standards.md`
> (`components/features/{domain}/...`). Sudah disamakan di atas.

> **Perbaikan v1.1 — penamaan file `components/ui/`:** file di folder ini di-generate
> otomatis oleh `npx shadcn@latest add ...` dalam lowercase (`button.tsx`,
> `card.tsx`, dst) — ini **pengecualian yang disengaja** dari aturan PascalCase umum
> di `code-standards.md` §6, bukan pelanggaran. Komponen di luar `components/ui/`
> (termasuk semua yang ada di `components/features/`) tetap wajib PascalCase.

> **Perbaikan v1.1 — mapping variant `Toast`/`Badge` ke shadcn:** komponen bawaan
> Radix/shadcn untuk Toast hanya punya `variant="default" | "destructive"` — bukan
> `type="success"|"error"|"info"` seperti yang didokumentasikan di atas. Prop custom
> di tabel ini **wajib dibungkus** lewat `cva` di atas primitive shadcn asli (sesuai
> `code-standards.md` §2C), memetakan setiap varian ke token warna yang sesuai:
> `success` → `bg-success/10 text-success`, `danger`/`error` → `bg-danger/10
> text-danger`, dst. Jangan asumsikan prop ini otomatis tersedia begitu
> `shadcn add toast badge` dijalankan.

> Semua komponen **harus** extend style di `master.md` (warna, radius, shadow, focus-visible). Jika perlu override → buat file override di `components/ui/overrides/`.

---

## 6. Layout Patterns (per halaman)

| Halaman | Struktur utama (section order) | Catatan visual |
|---------|--------------------------------|----------------|
| **Landing (F7)** | Hero (headline + CTA "Daftar PPDB" ke `/ppdb` + statistik) → **Jadwal & Cara Daftar (ringkas, 3 langkah + CTA)** → Program Keahlian (6 jurusan) → Testimoni (carousel) → Kerjasama Industri (logo grid) → Berita (3 kartu) → Fasilitas (strip ikon) → Footer | Hero Flat Solid dengan visual anchor: garis vertikal tipis `1px` (`w-[2px] bg-primary`) sebagai section marker di kiri + `bg-dot-pattern`. Section "Jadwal & Cara Daftar" **ditambahkan** — sebelumnya jalur konversi utama (PPDB) hanya tersirat lewat link navbar, tidak ada titik keputusan eksplisit sebelum pengunjung scroll melewati statistik/jurusan/testimoni. Jangan seragamkan semua section jadi grid 3 kolom: Program Keahlian layak layout lebih menonjol (bukan kartu identik dengan Berita), Fasilitas cukup strip ikon horizontal (kontennya terlalu singkat untuk kartu bershadow). |
| **PPDB Info** | Hero info → Timeline 5 tahap → Syarat & Biaya → CTA ke subdomain | Timeline pakai `border-l-primary` + `absolute` dot. |
| **Subdomain Form** | Stepper (4 step, dengan `aria-current="step"` dan indikator step yang belum lengkap) → Form per step (2 kolom desktop / 1 kolom mobile) → Review → Submit | `localStorage` draft per step; `focus-visible` ring primary. |
| **BLUD Showcase** | Filter jurusan (chips) → Grid kartu produk (3 kolom) → Detail modal | Card hover lift 2 px, border primary saat focus. Sediakan empty state eksplisit bila filter tidak menghasilkan produk. |
| **Direktori Mitra** | Filter chips → List kartu mitra (logo + bidang) → CTA WA | Logo fallback `Building2` icon. Empty state eksplisit bila filter kosong. |
| **Chatbot FAQ** | Floating button (kanan bawah) → Panel slide-up → Bubble chat (rule‑based / gemini / fallback) | Tombol "Hubungi Admin" selalu visible. Tampilkan typing indicator eksplisit saat menunggu respons Layer 2 (Gemini, bisa sampai 3 detik) agar tidak terasa freeze. Autoplay/animasi non-esensial dimatikan saat `prefers-reduced-motion`. |
| **Admin Dashboard** | Sidebar (collapsible) → Header (user + logout) → Widget ringkasan tugas ("X pembayaran menunggu verifikasi") → Content area (table / card grid) | Sidebar width `w-64` collapsed `w-16`. Widget ringkasan ditambahkan sebagai entry point berbasis tugas, bukan cuma tabel generik yang harus disaring manual. |
| **404 / 500** | Minimal center card: ilustrasi SVG + teks + CTA "Kembali ke Beranda" | Tidak pakai emoji. |

---

## 7. Domain‑Specific Components

| Fiturnya | Komponen khusus | Keterangan |
|----------|----------------|------------|
| **F1 PPDB** | `Stepper`, `FormStep1..4`, `ReviewCard`, `NomorPendaftaranDisplay` | Progress bar `w-full h-1 bg-muted` + `bg-primary` width % step. |
| **F2 Konfirmasi Bayar** | `PaymentInfoCard`, `UploadBukti`, `WaRedirectButton` | QR code rekening opsional (generate via API). |
| **F3 BLUD** | `ProdukCard`, `ProdukDetailModal`, `JurusanFilterChips` | Gambar `object-cover aspect-[4/3]`. |
| **F4 Mitra** | `MitraCard`, `JurusanFilterChips`, `WaCtaButton` | Logo `object-contain h-12 bg-muted rounded`. |
| **F5 Chatbot** | `ChatBubble`, `QuickReplyChips`, `EscalationButton`, `TypingIndicator` | Layer 1 rule‑based < 100 ms; Layer 2 Gemini ≤ 3 s — `TypingIndicator` wajib tampil selama menunggu Layer 2. |
| **F6 Eskalasi WA** | `WaButton` (reuse di Chatbot, Kontak, Mitra) | `href="https://wa.me/6281234567890?text=..."` dynamic. |
| **F7 Landing** | `HeroSection`, `PpdbScheduleTeaser`, `JurusanGrid`, `TestimoniCarousel`, `MitraLogoGrid`, `BeritaGrid`, `FasilitasStrip`, `Footer` | `PpdbScheduleTeaser` (baru) menampilkan ringkasan 3 langkah + CTA menuju `/ppdb`. Footer **wajib** 5 logo kompetisi (JHIC, Kemenag, Muhammadiyah, Sponsor, Media). |
| **F8 Admin** | `Sidebar`, `AdminTaskSummary`, `DataTable`, `CrudModal`, `StatusBadge`, `ImageUploadZone` | `AdminTaskSummary` (baru) — widget ringkasan tugas verifikasi di atas tabel. Tabel pakai `Table` component + `tanstack-table` (sorting, pagination). |
| **F9 SEO** | `Metadata` per route (generateMetadata), `Sitemap`, `Robots` | `og:image` pakai template hero + judul. |
| **F10 Load Test** | N/A (dokumentasi) | Hasil load test dimasukkan ke slide deck. |

---

## 8. Voice & Copy Tone (Indonesia formal‑hangat)

| Prinsip | Contoh (benar) | Contoh (salah) |
|---------|-----------|-----------|
| **Sapa resmi tapi ramah** | "Selamat datang di SMK Mutuharjo." | "Halo! Selamat datang ya 😊" |
| **Jelas & singkat** | "Biaya pendaftaran Rp100.000." | "Untuk biaya pendaftarannya kami tetapkan sebesar seratus ribu rupiah." |
| **Aktif, bukan pasif** | "Kami verifikasi pembayaran dalam 1×24 jam." | "Pembayaran akan diverifikasi dalam 1×24 jam." |
| **Hindari jargon teknis** | "Unggah bukti transfer (maks 2 MB, JPG/PNG/WebP)." | "Upload file bukti transfer dengan ukuran maksimal 2 megabytes, format JPEG, PNG, atau WebP." |
| **Tidak pakai em-dash panjang** | "PPDB dibuka 1 Juli – 31 Agustus." | "PPDB dibuka 1 Juli — 31 Agustus." |
| **Tidak pakai "It's not X, it's Y"** | "Formulir ini untuk pendaftaran baru." | "Ini bukan formulir lama, ini formulir baru." |

---

## 9. Accessibility Checklist (wajib di‑review setiap PR)

- [ ] Semua teks kontras ≥ 4.5:1 (light) / ≥ 4.5:1 (dark) — **dihitung aktual**, bukan diasumsikan dari nilai OKLCH.
- [ ] Elemen interaktif punya `focus-visible:ring-2 focus-visible:ring-primary`.
- [ ] Form label terhubung (`htmlFor` / `id`).
- [ ] Error message di‑`aria-describedby` ke input.
- [ ] Ikon dekoratif `aria-hidden="true"`, ikon fungsional punya `aria-label`.
- [ ] `prefers-reduced-motion` → matikan animasi non‑essential (termasuk autoplay carousel testimoni).
- [ ] Skip link "Lewati ke konten utama" di awal `<body>`.
- [ ] Landmark: `<header>`, `<main>`, `<footer>`, `<nav aria-label="...">`.
- [ ] Stepper PPDB punya `aria-current="step"` dan indikasi visual step yang error/belum lengkap.
- [ ] Empty state (BLUD, Mitra filter) mengarahkan aksi berikutnya, bukan cuma "tidak ada data".
- [ ] Responsive test: 375 px, 768 px, 1024 px, 1440 px.
- [ ] Dark mode test manual (toggle OS).

---

## 10. Anti‑Patterns (dilarang keras)

| Pola | Alasan | Ganti dengan |
|------|--------|--------------|
| Gradient neon / purple‑pink | Terlihat AI‑generated, tidak formal | Flat color token |
| Emoji sebagai ikon/bullet | Tidak scalable, inkonsisten cross‑platform | Heroicons / Lucide SVG |
| Pure white background (#FFFFFF) | Terlalu klinis, kontras tajam | Token `background` (warm off-white) |
| Rainbow coloring (banyak warna acak) | Memecah visual hierarchy | Hanya primary + accent + netral |
| Drop shadows besar / blur | Claymorphism, heavy | Subtle `--shadow-sm/md` |
| 3 feature cards in a row tanpa konteks | Template SaaS generik | Grid yang responsif & bermakna sesuai sifat kontennya (lihat §6) |
| Liquid glass / glassmorphism | Performa & aksesibilitas buruk | Solid surface + border |
| Em dashes (—) panjang | Copy pattern AI | Gunakan strip `-` atau `–` (en dash) |
| Inter / Geist / Space Grotesk | Overused di template AI | **Plus Jakarta Sans** (body) + **DM Sans** (heading) |
| Colored left stripe pada card | Visual noise | Border `border-primary` tipis jika perlu |
| Fake testimonials (nama palsu) | Etika & kepercayaan | Testimoni asli alumni |
| Bento grids tanpa alasan fungsional | Hype trend | Grid biasa `gap-5` |
| Terminal window UI | Tidak cocok sekolah | Card biasa |
| Soft corner radius > 12px | Tidak konsisten | `--radius-lg` (12px) max |
| Token warna dark mode disalin dari light | Bukan dark mode sungguhan | Hitung ulang tiap token untuk dark (lihat perbaikan `success` di §2) |
| Radial orbs / dot grids / sparkle icons | Visual clutter | Tidak dipakai |
| Animated arrows / hover animations berlebih | Ganggu fokus | Micro‑motion ≤150 ms saja |
| No TOS / Privacy Policy | Legal requirement | Footer link wajib |
| Hover‑only interaction tanpa focus | Aksesibilitas | Selalu `focus-visible` |

---

## 11. Iconography & Imagery Treatment

- **Ikon sistem**: Lucide (outline, stroke 2px, `currentColor`).
- **Logo jurusan**: SVG transparan, `h-12 w-auto`, diletakkan di `public/images/jurusan/`.
- **Logo mitra**: SVG/PNG transparan, `h-12 w-auto object-contain`, fallback `Building2`.
- **Foto produk / berita / testimoni**: aspect ratio 4:3, `object-cover`, compress WebP ≤ 150 KB.
- **Placeholder**: `bg-muted animate-pulse` (tanpa skeleton library).
- **Logo kompetisi (footer)**: 5 file SVG, `h-8`, `grayscale hover:grayscale-0 transition`.

---

## 12. Implementation Notes (FE)

1. **Tailwind config** sudah ada di `master.md` §11 — copy ke `frontend/tailwind.config.js`.
2. **globals.css** import font + CSS variables (`:root` + `.dark`).
3. **Component primitives** dibuat di `components/ui/` (lowercase, konvensi shadcn — lihat §5) → gunakan `class-variance-authority` (cva) untuk variant, termasuk mapping `success`/`danger`/`warning`/`info` untuk Toast & Badge.
4. **Form wizard** pakai `react-hook-form` + `zod` (validasi di `lib/validations.ts`).
5. **Chatbot** state lokal (React context) + API `/api/chatbot`, dengan `TypingIndicator` saat menunggu Layer 2.
6. **Admin panel** pakai `tanstack-table` + server‑side pagination, plus `AdminTaskSummary` sebagai entry point.
7. **Image upload** → `POST /api/upload` (Sharp → WebP, max 2 MB).
8. **Subdomain middleware** sudah di `frontend/middleware.ts` (lihat `architecture.md`).
9. **SEO**: `generateMetadata` di setiap `page.tsx`, `sitemap.ts` & `robots.ts` di root `app/`.
10. **Testing**: `npm run lint`, `npm run typecheck`, `npm run test` (jest + rtl) sebelum PR.

---

## 13. Handoff Checklist (sebelum merge ke `main`)

- [ ] Semua halaman pakai token dari `master.md` (tidak ada hard‑coded hex).
- [ ] Token `danger`/`success` yang dipakai sudah versi v1.1 (bukan nilai lama yang mungkin masih ter-cache).
- [ ] Dark mode manual test pass — termasuk verifikasi tiap token dark benar-benar dihitung ulang.
- [ ] Lighthouse ≥ 90 (Performance, Accessibility, Best Practices, SEO).
- [ ] Load test autocannon ≥ 100 req/s, p99 < 500 ms (domain utama & subdomain).
- [ ] Semua form validasi client & server jalan.
- [ ] 5 logo kompetisi tampil di footer semua halaman.
- [ ] Tidak ada anti‑pattern dari §10.
- [ ] Dokumentasi komponen baru di `components/ui/README.md`.

---

## 14. Authentic Data Registry (Data Otentik Mutuharjo)

> **Catatan Tim FE & Content**: Semua komponen UI wajib mengonsumsi data otentik di bawah ini. *Dilarang keras menggunakan data palsu/lorem ipsum/fake placeholder*.

### A. Profil & Legitimasi Resmi
- **Nama Resmi**: SMK Muhammadiyah 1 Sukoharjo (SMK Mutuharjo)
- **Status Keunggulan**: SMK Center of Excellence (CoE) & SMK Pusat Keunggulan (PK) Kemendikbudristek
- **Akreditasi**: Terakreditasi A (Unggul)
- **Usia / Milad**: 33 Tahun Berkarya (Milad ke-33)
- **Motto / Tagline**: *"SMK Berkemajuan, Disiplin, Cerdas, Sukses"*

### B. 6 Program Keahlian (Jurusan) & Mitra DUDI Nyata
| Kode | Nama Jurusan | Keunggulan Spesifik | Mitra Industri Utama (DUDI) |
| :--- | :--- | :--- | :--- |
| **TSM** | Teknik Sepeda Motor | Bengkel resmi & kelas industri service Yamaha | Yamaha Indonesia Manufacture (YIM) |
| **TJKT** | Teknik Jaringan Komputer & Telekomunikasi | Praktik jaringan, IT operator, cloud, & Mikrotik | PT. Mitra Akses Globalindo |
| **TP** | Teknik Pemesinan | Teaching Factory (1 siswa 1 alat) produksi pesanan industri | Mitra Industri Manufaktur Solo Raya |
| **TKR** | Teknik Kendaraan Ringan | Budaya industri otomotif & perawatan kendaraan | PT. Daihatsu (Pintar Bersama Daihatsu) |
| **PPLG** | Pengembangan Perangkat Lunak & Gim | Pembuatan aplikasi Android, web, & software engineer | PT. GIT Solution (Amikom Jogja) |
| **TE** | Teknik Elektronika | Otomasi industri, mekatronika, & sistem kontrol | Industri Elektronika & Pertambangan |

### C. Testimoni Alumni Otentik (Carousel F7)
1. **Yusuf Azriel** — *SABHARA POLRES SUKOHARJO*
   > *"Di sinilah saya dibekali bukan cuma ilmu kecerdasan akademik semata, tapi juga ilmu agar saya bisa selalu berada di jalan yang benar agar selamat baik di dunia maupun akhirat kelak."*
2. **Deva Rafinda** — *PT. PAMAPERSADA NUSANTARA*
   > *"Disinilah saya diajarkan bagaimana menjadi pribadi yang memiliki sikap mandiri, bertanggung jawab dan kompeten untuk menghadapi kerasnya persaingan di dunia kerja saat ini."*
3. **Nagasa Waka** — *PT. AISIN INDONESIA*
   > *"Terima kasih SMK Muhammadiyah 1 Sukoharjo yang telah banyak memberikan pelajaran kepada saya, tentang ilmu pengetahuan, keterampilan, kedisiplinan dan tentunya ilmu agama islam."*
4. **Jane Watkins** — *PT. KAYABA INDONESIA*
   > *"Dengan pembiasaan budaya industri dan kerja serta ketaatan akan ilmu agama yang diterapkan di SMK Muhammadiyah 1 Sukoharjo memberikan dampak besar bagi para alumni untuk bisa bekerja di Industri."*

### D. Statistik Kunci & Fasilitas Otentik
- **Keamanan**: 120 Titik CCTV Terintegrasi
- **Konektivitas**: Free Wi-Fi di Setiap Ruang Kelas
- **Sertifikasi Internasional**: Mikrotik Academy (MTCNA)
- **Sertifikasi Profesi**: LSP-P1 Lisensi BNSP
- **Fasilitas Praktik**: Bengkel Standar Industri & Lab Komputer Lengkap

### E. Berita & Prestasi Terbaru (Update 2026)
- **Prestasi Cyber**: Juara 1 LKS Kabupaten Sukoharjo Bidang *Cyber Security 2026*
- **Prestasi Nasional**: Medali Perak OlympicAD VIII Makassar 2026
- **Kemitraan Industri**: Training Motivasi Kerja Kolaborasi bersama PT. Konimex
- **Pengembangan Kurikulum**: Workshop MGMP Pintar Bersama Daihatsu Se-Solo Raya

---

*File ini living document — update tiap sprint review. Semua perubahan design system **wajib** update `master.md` terlebih dahulu, lalu sync ke sini.*

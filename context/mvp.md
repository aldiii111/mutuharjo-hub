# MVP Plan – Mutuharjo Hub (SMK Muhammadiyah 1 Sukoharjo)

> **Dokumen Acuan:** `project-overview.md` &amp; `architecture.md`
> **Identitas Resmi:** SMK Muhammadiyah 1 Sukoharjo (SMK Mutuharjo)
> **Nama Produk:** Mutuharjo Hub

> **v1.1** — menambahkan task eksplisit untuk membangun section-section Landing
> Page (F7) dan halaman detail jurusan di Sprint 2. Sebelumnya `architecture.md`
> menyebut "Landing Page" sebagai fokus Sprint 2, tapi tidak ada task granular
> untuk itu di dokumen ini — hanya Navbar/Footer (Task 1.4). Lihat audit
> konsistensi untuk detail.

---

## 1. Visi &amp; Tujuan Utama
Membangun platform web resmi **SMK Muhammadiyah 1 Sukoharjo (Mutuharjo Hub)** modern, responsif, berkinerja tinggi, dan ramah SEO, beserta portal pendaftaran PPDB interaktif di **subdomain (`ppdb.smkmuh1-skh.sch.id`)**. System mendukung fitur modern seperti Showcase BLUD Teaching Factory, Direktori Mitra Industri, serta Chatbot FAQ Hybrid (Rule-Based + Gemini API).

---

## 2. Tim &amp; Pembagian Peran Monorepo
Struktur repositori menggunakan monorepo flat (`frontend/`, `backend/`, `shared/`).

- **Frontend Developer** (1 orang - Dev FE): UI/UX, Next.js 15 App Router, Subdomain Middleware, Client Components, OKLCH Design System, SEO Metadata, Integration
- **Backend Developer 1** (1 orang - Dev BE-1): Express.js 5 API, Authentication (Session Cookie + Bcrypt), Database PostgreSQL + Prisma v6, PPDB Flow &amp; Pembayaran WA
- **Backend Developer 2** (1 orang - Dev BE-2): Content Services (Berita, BLUD, Mitra), Chatbot Hybrid (Rule-based + Gemini), File Upload Sharp (WebP)

---

## 3. Scope Fitur MVP (10 Fitur Final)

- **F1 - Form Pendaftaran Multi-Step PPDB** | Subdomain (`ppdb.*`) | Owner: Dev FE + Dev BE-1
- **F2 - Konfirmasi Pembayaran Manual + WA** | Subdomain (`ppdb.*`) | Owner: Dev FE + Dev BE-1
- **F3 - Showcase Produk/Jasa BLUD** | Domain Utama (`/blud`) | Owner: Dev FE + Dev BE-2
- **F4 - Direktori Mitra PKL per Jurusan** | Domain Utama (`/mitra-industri`) | Owner: Dev FE + Dev BE-2
- **F5 - Chatbot FAQ Hybrid (Rule-based + Gemini)** | Floating Widget (All Pages) | Owner: Dev FE + Dev BE-2
- **F6 - Tombol Eskalasi WA Admin** | Reusable Component | Owner: Dev FE
- **F7 - Landing Page &amp; Design System** | Domain Utama (`/`) | Owner: Dev FE
- **F8 - Panel Admin CRUD Sederhana** | Domain Utama (`/admin`) | Owner: Dev FE + Dev BE-1
- **F9 - Technical SEO Dasar** | Domain Utama (`sitemap`, `robots`) | Owner: Dev FE
- **F10 - Load Test &amp; Benchmark Performa** | VPS Production | Owner: Dev BE-1 + Dev BE-2

---

## 4. Stack Teknis &amp; Database PostgreSQL (Prisma)

### Stack utama:
- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, **Shadcn UI** + Radix UI Primitives, Tailwind CSS (OKLCH Tokens), Lucide Icons.
- **Backend**: Express.js 5 + TypeScript, `connect-pg-simple` (Session Store), Bcrypt, Sharp.
- **Database**: **PostgreSQL** + Prisma ORM v6 (`^6.4.1`).

### Skema Prisma (`backend/prisma/schema.prisma`):
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model PendaftarPPDB {
  id               String           @id @default(uuid())
  nomorPendaftaran String           @unique
  namaLengkap      String
  nisn             String
  tempatLahir      String
  tanggalLahir     DateTime
  jenisKelamin     String
  asalSekolah      String
  alamat           String
  namaOrtuWali     String
  noHpOrtuWali     String
  pekerjaanOrtu    String?
  pilihanJurusan1  String
  pilihanJurusan2  String?
  status           String           @default("baru") // baru | terverifikasi | diterima | ditolak
  pembayaran       KonfirmasiBayar?
  createdAt        DateTime         @default(now())
  updatedAt        DateTime         @updatedAt
}

model KonfirmasiBayar {
  id           String        @id @default(uuid())
  pendaftarId  String        @unique
  pendaftar    PendaftarPPDB @relation(fields: [pendaftarId], references: [id])
  namaPengirim String
  nominal      Int
  buktiUrl     String?
  status       String        @default("menunggu") // menunggu | terverifikasi | ditolak
  catatanAdmin String?
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
}

model ProdukBLUD {
  id            String   @id @default(uuid())
  nama          String
  deskripsi     String
  jurusan       String
  gambarUrl     String
  estimasiHarga String?
  isActive      Boolean  @default(true)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model Berita {
  id          String    @id @default(uuid())
  judul       String
  slug        String    @unique
  ringkasan   String
  konten      String
  gambarUrl   String?
  isPublished Boolean   @default(false)
  publishedAt DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Admin {
  id           String   @id @default(uuid())
  username     String   @unique
  passwordHash String
  createdAt    DateTime @default(now())
}

model ChatLog {
  id        String   @id @default(uuid())
  sessionId String
  message   String
  answer    String
  source    String   // rule-based | gemini | fallback
  createdAt DateTime @default(now())
}

model UploadedFile {
  id        String   @id @default(uuid())
  filename  String
  url       String
  category  String
  entityId  String?
  createdAt DateTime @default(now())
}
```

---

## 5. Rincian Sprint &amp; Task Breakdown Terperinci Tim (4 Minggu / 4 Sprints)

Target pengerjaan dibagi menjadi **4 Sprint Intensif (4 Minggu)** yang mencakup **Phase 0 s.d. Phase 6**:
- **Sprint 1 (Minggu 1 / Hari 1–4)** = **Phase 0** (Foundation &amp; Monorepo Architecture)
- **Sprint 2 (Minggu 2 / Hari 5–9)** = **Phase 1 &amp; 2** (PPDB Subdomain &amp; Core Content Services)
- **Sprint 3 (Minggu 3 / Hari 10–13)** = **Phase 3 &amp; 4** (Interactive Features, Chatbot &amp; Panel Admin)
- **Sprint 4 (Minggu 4 / Hari 14–16)** = **Phase 5 &amp; 6** (Technical SEO, Load Test, VPS Deploy &amp; Demo Prep)

---

### Sprint 1: Fondasi Arsitektur, Monorepo &amp; Database (Phase 0 — Hari 1–4)

- **Task 1.1** (All Devs | Est: 3h) – **Inisialisasi Monorepo Flat**: Buat struktur folder `frontend/`, `backend/`, `shared/`, serta setup TypeScript, ESLint, dan Prettier global.
- **Task 1.2** (Dev FE | Est: 5h) – **Setup Frontend Next.js 15 App Router & Token Desain**: Inisialisasi `frontend/` dengan Next.js 15, Shadcn UI (`npx shadcn@latest init`), Tailwind CSS v4 OKLCH tokens (**termasuk nilai `--color-danger` dan `--color-success` versi diperbaiki v1.1 — lihat `design-system/master.md` §1**), font `Plus Jakarta Sans` + `DM Sans`, dan verifikasi kontras aktual untuk token `danger`/`success` sebelum lanjut ke task berikutnya.
- **Task 1.3** (Dev FE | Est: 3h) – **Middleware Subdomain Host Rewrite**: Implementasi `frontend/middleware.ts` untuk memetakan permintaan `ppdb.smkmuh1-skh.sch.id` secara internal ke `app/ppdb-subdomain/`.
- **Task 1.4** (Dev FE | Est: 4h) – **Layout Utama &amp; Komponen Dasar**: Buat komponen `Navbar` (termasuk link "Tentang" &amp; "Berita"), `Footer` (menampilkan **5 Logo Kompetisi Wajib**: JHIC, Kemenag, Muhammadiyah, Sponsor, Media), `TopLoaderBar` (`ajaxify-progress-bar` di `RootLayout`), dan `Container` terpusat (`max-w-7xl`).
- **Task 1.5** (Dev BE-1 | Est: 4h) – **Setup Express 5 Server**: Inisialisasi Express.js 5 TypeScript di `backend/` dan tipe bersama `shared/types/api.types.ts` (`ApiResponse\<T\>` &amp; `PaginatedResponse\<T\>`).
- **Task 1.6** (Dev BE-1 | Est: 5h) – **Integrasi Prisma ORM v6 PostgreSQL**: Tulis `schema.prisma` utuh untuk 7 model (`PendaftarPPDB`, `KonfirmasiBayar`, `ProdukBLUD`, `Berita`, `Admin`, `ChatLog`, `UploadedFile`), lalu jalankan `npx prisma migrate dev` menggunakan Prisma v6 (`^6.4.1`).
- **Task 1.7** (Dev BE-1 | Est: 4h) – **Setup Auth Session Admin**: Inisialisasi Express session dengan `connect-pg-simple` (PostgreSQL store), Bcrypt password hashing, dan `requireAdminSession` middleware.
- **Task 1.8** (Dev BE-2 | Est: 4h) – **Endpoint Upload Media (`POST /api/upload`)**: Buat endpoint penanganan upload file via Multer, kompresi otomatis ke WebP via Sharp (max 2MB), dan pencatatan ke model `UploadedFile`.
- **Task 1.9** (Dev BE-2 | Est: 5h) – **Pembuatan File Seed Data JSON (`frontend/data/` & `backend/prisma/seed/`)**: Buat 10 file seed (`mitra.json`, `jurusan.json`, `testimoni.json`, `produk-blud.json`, `berita.json`, `rekening.json`, `wa-admin.json`, logo kompetisi di `frontend/data/`, serta `admin.json` di `backend/prisma/seed/`) serta script `prisma db seed`.
- **Task 1.10** (Dev BE-1 &amp; BE-2 | Est: 2h) – **Sanitasi CORS &amp; Health Check**: Setup middleware CORS untuk domain &amp; subdomain, serta buat endpoint `GET /api/health`.

---

### Sprint 2: Core Subdomain PPDB, Landing Page &amp; Feature Services (Phase 1 &amp; 2 — Hari 5–9)

- **Task 2.1** (Dev FE | Est: 4h) – **Halaman Informasi PPDB (`/ppdb`)**: Buat halaman informasi pendaftaran di domain utama (jadwal, syarat, biaya Rp 100.000, infografis timeline 5 tahap) + tombol CTA "Daftar Sekarang" ke subdomain.
- **Task 2.2** (Dev FE | Est: 6h) – **Form Wizard 4-Step Subdomain (`ppdb.*`)**: Buat form bertahap (Step 1 Data Diri, Step 2 Ortu, Step 3 Pilihan 6 Jurusan CoE, Step 4 Review &amp; Checklist berkas fisik) menggunakan Zod + React Hook Form + Shadcn UI, dengan `aria-current="step"` dan indikasi visual step yang belum lengkap/error.
- **Task 2.3** (Dev FE | Est: 4h) – **Autosave Draft &amp; Bukti Pendaftaran PDF**: Integrasi `localStorage` autosave antar-step agar data tidak hilang saat refresh, serta buat komponen cetak/unduh PDF "Bukti Pendaftaran".
- **Task 2.4** (Dev FE | Est: 4h) – **Halaman Konfirmasi Pembayaran &amp; Cek Status**: Buat halaman `ppdb.*/konfirmasi` (info rekening &amp; form upload bukti) dan `ppdb.*/status` (real-time status pendaftaran).
- **Task 2.5** (Dev BE-1 | Est: 5h) – **Endpoint Submit PPDB (`POST /api/ppdb`)**: Validasi Zod (NISN 10 digit, No HP 08xx), cek keunikan NISN, dan generate nomor pendaftaran unik `SPMB-2026-XXXX`.
- **Task 2.6** (Dev BE-1 | Est: 3h) – **Endpoint Detail PPDB (`GET /api/ppdb/:nomorPendaftaran`)**: Ambil data status pendaftaran calon siswa berdasarkan nomor pendaftaran unik.
- **Task 2.7** (Dev BE-1 | Est: 4h) – **Endpoint Konfirmasi Bayar (`POST /api/pembayaran` &amp; `GET /api/pembayaran/:nomorPendaftaran`)**: Simpan data pembayaran (bukti opsional/non-blocking) &amp; relasikan 1-to-1 dengan `PendaftarPPDB`.
- **Task 2.8** (Dev BE-2 | Est: 4h) – **Endpoint Showcase BLUD (`GET /api/blud` &amp; `GET /api/blud/:id`)**: Ambil list produk/jasa Teaching Factory dengan filter query `jurusan`.
- **Task 2.9** (Dev BE-2 | Est: 3h) – **Endpoint Berita Landing (`GET /api/berita?limit=3`)**: Ambil 3 artikel berita terbaru yang sudah dipublikasikan (`isPublished: true`).
- **Task 2.10** (Dev FE | Est: 6h) – **Landing Page — Hero & Jadwal/Cara Daftar (F7)** *(baru, v1.1)*: Bangun `HeroSection` (headline, CTA "Daftar PPDB" ke `/ppdb`, statistik jumlah jurusan/siswa/alumni, dot-pattern background) dan `PpdbScheduleTeaser` (ringkasan 3 langkah + CTA), sesuai wireframe di `project-overview.md` Fitur #7 dan pola visual di `ui-context.md` §6. Ini titik konversi utama landing page — sebelumnya tidak punya section eksplisit, hanya tersirat lewat link navbar.
- **Task 2.11** (Dev FE | Est: 6h) – **Landing Page — Jurusan, Testimoni, Kerjasama Industri (F7)** *(baru, v1.1)*: Bangun `JurusanGrid` (data dari `jurusan.json`, layout tidak seragam dengan grid Berita — lihat `ui-context.md` §6), `TestimoniCarousel` (autoplay nonaktif otomatis saat `prefers-reduced-motion`), dan `MitraLogoGrid`/kerjasama industri.
- **Task 2.12** (Dev FE | Est: 3h) – **Halaman Detail Jurusan (`/jurusan/[slug]`)** *(baru, v1.1)*: Dynamic route detail per jurusan (deskripsi lengkap, keunggulan, mitra DUDI terkait) dari `jurusan.json`, dituju dari klik kartu di `JurusanGrid`.
- **Task 2.13** (Dev FE | Est: 4h) – **Landing Page — Berita & Fasilitas (F7)** *(baru, v1.1)*: Bangun `BeritaGrid` (1 artikel featured + N kecil, dari `GET /api/berita?limit=3`) dan `FasilitasStrip` (list ikon horizontal, bukan kartu — kontennya terlalu singkat untuk kartu bershadow, lihat `ui-context.md` §6), lengkapi empty state bila data berita belum ada.

---

### Sprint 3: Interactive Features, Chatbot &amp; Panel Admin (Phase 3 &amp; 4 — Hari 10–13)

- **Task 3.1** (Dev FE | Est: 4h) – **Halaman Showcase BLUD (`/blud`)**: Buat grid kartu produk Teaching Factory dengan filter chips jurusan (`TSM`, `TJKT`, `TP`, `TKR`, `PPLG`, `TE`), detail modal, CTA WhatsApp, dan empty state saat filter tidak menghasilkan produk.
- **Task 3.2** (Dev FE | Est: 3h) – **Halaman Direktori Mitra PKL (`/mitra-industri`)**: Buat list kartu mitra DUDI per jurusan + CTA "Tanya PKL ke Sekolah" via WhatsApp Admin BKK, dan empty state saat filter kosong.
- **Task 3.3** (Dev FE | Est: 5h) – **Component Floating Chatbot Widget**: Buat panel chat slide-up di pojok kanan bawah, bubble chat, quick replies, `TypingIndicator` saat menunggu respons Layer 2 (Gemini, bisa sampai 3 detik), dan tombol Eskalasi WA Admin.
- **Task 3.4** (Dev FE | Est: 7h) – **UI Panel Admin (`/admin`)**: Buat halaman Login (`/admin/login`), Dashboard Sidebar (`/admin/dashboard`) dengan `AdminTaskSummary` (widget ringkasan jumlah pembayaran/pendaftaran menunggu verifikasi) sebagai entry point di atas Data Table (Shadcn `Table`), dan modal CRUD. Badge status memakai token `danger`/`success` versi diperbaiki.
- **Task 3.5** (Dev BE-1 | Est: 3h) – **Endpoint Auth Admin (`POST /api/auth/login` &amp; `POST /api/auth/logout`)**: Validasi kredensial admin (Bcrypt) dan manajemen session cookie.
- **Task 3.6** (Dev BE-1 | Est: 4h) – **Endpoint Status Verification (`PATCH /api/admin/ppdb/:id` &amp; `PATCH /api/admin/pembayaran/:id`)**: Admin update status PPDB dan status pembayaran.
- **Task 3.7** (Dev BE-1 | Est: 5h) – **Endpoint CRUD Berita &amp; BLUD (`/api/admin/berita` &amp; `/api/admin/blud`)**: Endpoint Tambah/Edit/Hapus berita dan produk BLUD terproteksi session admin.
- **Task 3.8** (Dev BE-2 | Est: 5h) – **Endpoint Chatbot Hybrid (`POST /api/chatbot`)**: Implementasi Layer 1 (Rule-based keyword match `lib/faq-data.ts`), Layer 2 (Gemini API fallback + Rekomendasi Jurusan), dan simpan log ke `ChatLog`.

---

### Sprint 4: Technical SEO, Load Test, Deploy &amp; Demo Prep (Phase 5 &amp; 6 — Hari 14–16)

- **Task 4.1** (Dev FE | Est: 4h) – **Technical SEO Implementation**: Buat `app/sitemap.ts` (dinamis URL publik, termasuk `/jurusan/[slug]`), `app/robots.ts` (block `/admin/*`), metadata `generateMetadata()` per route, dan audit alt text gambar.
- **Task 4.2** (Dev FE | Est: 4h) – **Audit Aksesibilitas &amp; Polish UI/UX**: Pastikan rasio kontras &ge;4.5:1 (verifikasi aktual, bukan cuma review Task 1.2), `focus-visible` rings, ARIA labels pada ikon, transisi micro-animation &le;150ms, dan pengujian responsif 375px–1440px.
- **Task 4.3** (Dev BE-1 | Est: 4h) – **Konfigurasi Server Nginx &amp; SSL**: Konfigurasi Nginx Server Block untuk domain utama (`smkmuh1-skh.sch.id`) dan subdomain (`ppdb.smkmuh1-skh.sch.id`), reverse proxy ke port Express (5000) &amp; Next.js (3000), serta setup SSL Certbot.
- **Task 4.4** (Dev BE-1 | Est: 3h) – **Deployment VPS &amp; PM2**: Devisi instance PM2 untuk memantau Express &amp; Next.js, pastikan PostgreSQL connection pool limit terkonfigurasi di `DATABASE_URL`.
- **Task 4.5** (Dev BE-2 | Est: 4h) – **Uji Beban (Load Test) `autocannon`**: Jalankan `autocannon -c 50 -d 30` untuk Domain Utama &amp; Subdomain PPDB. Pastikan throughput &ge;100 req/sec &amp; latency p99 &lt; 500ms.
- **Task 4.6** (Dev BE-2 &amp; Dev FE | Est: 5h) – **Audit Lighthouse &amp; Penyiapan Pitch Deck**: Jalankan Audit Lighthouse (SEO &ge;90, Performance &ge;80), dokumentasikan grafik performa, dan finalisasi slide deck presentasi lomba.

---

## 6. Risiko &amp; Mitigasi

- **PostgreSQL Connection Limit Exceeded** – Dampak: Database error 500 saat trafik tinggi | Mitigasi: Gunakan Prisma connection pool limit di `DATABASE_URL` (`?connection_limit=20`)
- **DNS Subdomain Belum Ready** – Dampak: Subdomain PPDB tidak bisa diakses | Mitigasi: Gunakan fallback route `/ppdb/daftar` pada domain utama
- **Gemini API Rate Limit / Quota Exceeded** – Dampak: Chatbot gagal menjawab | Mitigasi: Layer 1 Rule-based menangani &ge;80% FAQ; jika error, fallback otomatis ke tombol WA Admin
- **Upload Bukti Pembayaran Gagal** – Dampak: Pendaftaran PPDB terhambat | Mitigasi: Form konfirmasi bersifat non-blocking; user tetap bisa submit &amp; kirim bukti via WA
- **Landing page dikerjakan tergesa-gesa** *(baru, v1.1)* – Dampak: F7 (satu dari 10 fitur MVP) berisiko jadi "sisipan" di akhir sprint karena sebelumnya tidak punya task eksplisit | Mitigasi: Task 2.10–2.13 sekarang eksplisit di Sprint 2, dialokasikan 19h total, sejajar prioritasnya dengan Form Wizard PPDB

---

## 7. Definition of Done (DoD)

- [ ] Seluruh 10 Fitur Final berfungsi di staging (`localhost:3000` &amp; `ppdb.localhost:3000`) dan production.
- [ ] Database **PostgreSQL** berhasil dikoneksikan via Prisma ORM dengan migration bersih.
- [ ] Subdomain PPDB berjalan via Next.js Middleware rewrite tanpa memisah codebase/database.
- [ ] Autentikasi Admin (Session Cookie) terproteksi dengan aman.
- [ ] Chatbot FAQ menjawab via Rule-based dan Fallback Gemini tanpa crash, dengan typing indicator saat Layer 2.
- [ ] `sitemap.xml` dan `robots.txt` valid, Lighthouse SEO score &ge; 90.
- [ ] Uji beban `autocannon` mencapai &ge; 100 req/sec dengan latency p99 &lt; 500ms.
- [ ] 5 Logo Kompetisi wajib tampil di footer semua halaman.
- [ ] Seluruh section Landing Page (F7) — Hero, Jadwal & Cara Daftar, Jurusan, Testimoni, Kerjasama Industri, Berita, Fasilitas — tampil sesuai `project-overview.md` Fitur #7, bukan cuma Navbar/Footer.
- [ ] Halaman `/jurusan/[slug]` dapat diakses dari klik kartu jurusan di landing page.
- [ ] Token warna `danger`/`success` versi diperbaiki (v1.1) terpakai konsisten di seluruh badge status.

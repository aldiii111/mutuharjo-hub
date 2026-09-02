# CODE STANDARDS & GUIDELINES — Mutuharjo Hub

Dokumen ini berisi standar penulisan kode (*coding standards*) yang wajib dipatuhi oleh seluruh pengembang pada repositori **Mutuharjo Hub (SMK Muhammadiyah 1 Sukoharjo)**.

> **v1.1** — menambahkan pengecualian penamaan file untuk `components/ui/` dan
> memperjelas path folder komponen fitur, mengikuti audit konsistensi terhadap
> `ui-context.md`.

---

## 1. Monorepo & Struktur Folder

Repositori menggunakan struktur **Monorepo Flat**:
```
school-web-contest/
├── frontend/             # Next.js 15 (App Router)
│   ├── app/               # Routes & Pages
│   │   ├── (main)/        # Route group domain utama (smkmuh1-skh.sch.id)
│   │   │   ├── blud/             # Showcase BLUD (F3)
│   │   │   ├── berita/           # Berita & Agenda (F7)
│   │   │   ├── galeri/           # Galeri Foto
│   │   │   ├── jurusan/          # Daftar Jurusan & Detail (F7)
│   │   │   ├── kebijakan-privasi/# Kebijakan Privasi (Legal)
│   │   │   ├── kontak/           # Hubungi Kami
│   │   │   ├── mitra-industri/   # Direktori Mitra (F4)
│   │   │   ├── ppdb/             # Halaman Informasi PPDB (F1)
│   │   │   ├── profil/           # Sejarah, Visi Misi, Keunggulan, Prestasi
│   │   │   └── syarat-ketentuan/ # Syarat & Ketentuan (Legal)
│   │   ├── ppdb-subdomain/ # Subdomain route folder (ppdb.smkmuh1-skh.sch.id) — folder fisik, BUKAN route group
│   │   │   ├── konfirmasi/       # Konfirmasi Pembayaran
│   │   │   └── status/           # Cek Status Pendaftaran
│   │   └── admin/          # Panel Admin UI (F8)
│   │       ├── dashboard/        # Dashboard Admin
│   │       └── login/            # Login Admin
│   ├── components/        # Component primitives & feature components
│   │   ├── ui/             # Shadcn UI primitives (button.tsx, card.tsx, dialog.tsx, input.tsx, dst — lowercase, lihat §2.C)
│   │   └── features/       # Feature-specific components, PascalCase, per domain:
│   │       ├── layout/      # Layout components utama (Navbar.tsx, Footer.tsx)
│   │       ├── ppdb/        # Stepper.tsx, FormStep1.tsx, ReviewCard.tsx
│   │       ├── blud/        # ProdukCard.tsx, ProdukDetailModal.tsx
│   │       ├── mitra/       # MitraCard.tsx
│   │       ├── chatbot/     # ChatWidget.tsx, ChatBubble.tsx, TypingIndicator.tsx
│   │       ├── admin/       # AdminTaskSummary.tsx, DataTable.tsx
│   │       └── forms/       # Input.tsx, Select.tsx, FileUpload.tsx
│   ├── data/              # Static JSON seed files (mitra.json, jurusan.json, etc.)
│   ├── lib/                # FE Utilities, lib/utils.ts (cn helper), Zod schemas, FAQ data
│   └── middleware.ts       # Next.js Subdomain Host Rewrite Middleware
├── backend/               # Express.js 5 + TypeScript
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── services/       # Business logic & Prisma queries
│   │   ├── middlewares/    # Auth, Session, Upload, Validation
│   │   ├── routes/         # API route definitions
│   │   └── index.ts        # Server entry point
│   ├── prisma/             # Schema, seed (admin.json), & migrations (PostgreSQL)
│   └── uploads/            # Physical file uploads (served by Nginx/Express)
└── shared/                # Shared TypeScript types & contracts
    └── types/              # API response interfaces, Enums
```

> **Perbaikan v1.1:** sebelumnya `ui-context.md` §5 mendaftarkan `Stepper` di
> `components/ppdb/Stepper.tsx` dan `ChatWidget` di `components/chatbot/ChatWidget.tsx`
> — tanpa segmen `features/`, tidak sinkron dengan struktur di atas. Path yang benar
> sudah dicontohkan langsung di pohon folder ini per-domain, dan `ui-context.md`
> sudah disamakan.

---

## 2. Standar Frontend (Next.js 15 & React)

### A. Server Components vs Client Components
- Gunakan **Server Components** secara default untuk halaman landing, detail jurusan, dan berita (SSR/SSG untuk performa & SEO).
- Gunakan Directive `'use client'` HANYA pada komponen yang membutuhkan interaktivitas:
  - Form Wizard PPDB & state management (`react-hook-form`).
  - Interactive Filter Chips (BLUD & Mitra).
  - Modal Popups, Toast notifications, Stepper.
  - Floating Chatbot Widget (`ChatWidget.tsx`).
  - Global Top Loading Progress Bar (`TopLoaderBar.tsx` / `ajaxify-progress-bar`).

### B. Design System & CSS
- Semua warna **WAJIB** mengonsumsi CSS variables / OKLCH Tokens dari `design-system/master.md` (`bg-primary`, `text-surface`, `border-border`, `bg-danger`, `bg-success`, dll — versi token sudah diperbaiki di v1.1, jangan pakai nilai lama yang mungkin masih ter-cache).
- **DILARANG HARDBOUND HEX COLOR** (misal `#ffffff` atau `#000000` secara langsung di className).
- Font family: `Plus Jakarta Sans` (`--font-body`, teks umum) dan `DM Sans` (`--font-heading`, `h1`–`h3` serta angka statistik besar).
- Radius maksimal pada container/card: `rounded-lg` (12px / `--radius-lg`).

### C. Standar Penggunaan Shadcn UI & Tailwind CSS
- **Inisialisasi CLI**: Gunakan `npx shadcn@latest init` dengan konfigurasi OKLCH CSS Variables.
- **Komponen Primitive**: Ditambahkan via CLI ke `frontend/components/ui/` (`npx shadcn@latest add button card dialog input select table badge toast`).
- **Pengecualian penamaan file di `components/ui/`**: file hasil generate CLI
  memakai lowercase (`button.tsx`, `card.tsx`, `table.tsx`, dst) — ini konvensi
  bawaan shadcn dan **sengaja tidak di-rename** ke PascalCase, supaya tetap
  kompatibel dengan `shadcn add`/`shadcn diff` saat update di kemudian hari.
  Aturan PascalCase di §6 berlaku untuk **semua komponen di luar `components/ui/`**,
  termasuk seluruh isi `components/features/`.
- **Utilitas `cn()`**: Semua penambahan dynamic class **WAJIB** menggunakan helper `cn()` dari `frontend/lib/utils.ts`:
  ```ts
  import { clsx, type ClassValue } from 'clsx';
  import { twMerge } from 'tailwind-merge';

  export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }
  ```
- **Kustomisasi Variant**: Gunakan `cva` (*Class Variance Authority*) untuk mengelola varian warna (`primary`, `secondary`, `destructive`, `outline`) dan ukuran (`sm`, `md`, `lg`).
- **Wajib untuk Toast & Badge**: primitive bawaan shadcn/Radix hanya punya
  `variant="default"|"destructive"` untuk Toast, bukan `type="success"|"error"|"info"`
  seperti yang didokumentasikan di `ui-context.md` §5. Bungkus primitive tersebut
  dengan layer `cva` custom yang memetakan tiap varian aplikasi (`success`,
  `danger`, `warning`, `info`) ke token warna yang sesuai — jangan asumsikan prop
  ini otomatis tersedia begitu `shadcn add toast badge` dijalankan.

### D. Form & Validasi Client-Side
- Semua form (PPDB, Konfirmasi Bayar) **WAJIB** di-validasi menggunakan **Zod** + **React Hook Form**.
- Pesan error validasi harus informatif dan ditampilkan di bawah elemen input terkait dengan atribut `aria-describedby`.

### E. Aksesibilitas (WCAG AAA)
- Semua elemen tombol/link interaktif harus memiliki `focus-visible:ring-2 focus-visible:ring-primary`.
- Semua ikon SVG harus menyertakan `aria-label` atau `aria-hidden="true"`.
- Semua gambar (`<Image />` Next.js) **WAJIB** menyertakan teks `alt` yang deskriptif.
- Rasio kontras token warna (terutama `danger`/`success` di atas `surface`/`background`)
  **wajib diverifikasi aktual** saat token pertama kali di-setup (Task 1.2), bukan
  ditunda sampai audit aksesibilitas di Sprint 4 — supaya tidak perlu styling ulang
  komponen yang sudah terlanjur dibangun di atas token yang salah.

---

## 3. Standar Backend (Express.js 5 & TypeScript)

### A. Pola Controller - Service
- **Controller**: Bertanggung jawab menerima request HTTP, memvalidasi input via Zod, memanggil service layer, dan mengirim HTTP Response.
- **Service**: Tempat bisnis logika dan operasi database Prisma PostgreSQL. Controller tidak boleh langsung memanggil `prisma.model.findMany()` secara acak.

### B. Handling Error & Middleware
- Gunakan `try-catch` terpusat atau error handler middleware.
- Jangan biarkan unhandled promise rejection meruntuhkan server Express.
- Selalu kembalikan HTTP Status Code yang tepat:
  - `200 OK` / `201 Created` untuk sukses.
  - `400 Bad Request` untuk validasi gagal.
  - `401 Unauthorized` / `403 Forbidden` untuk masalah autentikasi admin.
  - `404 Not Found` untuk resource tidak ditemukan.
  - `500 Internal Server Error` untuk kegagalan tak terduga.

### C. Upload Gambar & Keamanan File
- Endpoint `/api/upload` menerima file via Multer.
- Kompres semua gambar masukan menjadi format **WebP** menggunakan **Sharp** dengan batas maksimum ukuran 2MB.
- Sanitasi nama file sebelum disimpan ke disk untuk mencegah Path Traversal attack.

---

## 4. API Contract, Client & Shared Types

### A. Format Respon API
Seluruh respon API backend **WAJIB** membungkus payload menggunakan tipe generik `ApiResponse<T>` yang didefinisikan di `shared/types/api.types.ts`:

```ts
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

### B. Integrasi API Client & Global Top Loader (`ajaxify-progress-bar`)
- Semua komunikasi HTTP frontend ke backend **WAJIB** menggunakan wrapper `apiClient` di `frontend/lib/api-client.ts`.
- `apiClient` secara otomatis memicu `startTopLoader()` saat permintaan `GET`, `POST`, `PUT`, `DELETE` dimulai, dan `stopTopLoader()` saat respons diterima (atau error).
- Menggunakan penghitung konkurensi request (`activeRequests`) agar bar pemuatan `ajaxify-progress-bar` tetap aktif selama ada request yang berjalan.

Contoh respon sukses:
```json
{
  "success": true,
  "data": {
    "nomorPendaftaran": "SPMB-2026-0042",
    "namaLengkap": "Ahmad Dahlan"
  },
  "message": "Pendaftaran berhasil disimpan"
}
```

Contoh respon error:
```json
{
  "success": false,
  "error": "NISN ini sudah terdaftar di sistem",
  "message": "Gagal menyimpan pendaftaran"
}
```

---

## 5. Standar Database (PostgreSQL & Prisma v6)

1. **Versi & Provider**: Prisma ORM v6 (`^6.4.1`) dengan `provider = "postgresql"` pada `datasource db` di `schema.prisma`.
2. **Naming Conventions**:
   - Nama Model Prisma: `PascalCase` (contoh: `PendaftarPPDB`, `ProdukBLUD`, `Berita`).
   - Nama Field Prisma: `camelCase` (contoh: `nomorPendaftaran`, `pilihanJurusan1`, `createdAt`).
3. **Migration Rules**:
   - Selalu gunakan `npx prisma migrate dev --name <deskripsi_singkat>` saat mengubah schema di environment pengembangan.
   - Jangan pernah mengedit file migration yang sudah ter-commit di `prisma/migrations/` secara manual.

---

## 6. Konvensi Penamaan (Naming Conventions)

| Subjek | Konvensi | Contoh |
|---|---|---|
| Komponen React (`components/features/`) | `PascalCase` | `Stepper.tsx`, `ChatWidget.tsx`, `ProdukCard.tsx` |
| Komponen primitive (`components/ui/`) | `lowercase` (pengecualian, konvensi bawaan shadcn — lihat §2.C) | `button.tsx`, `card.tsx`, `table.tsx` |
| Route File / Directory | `kebab-case` | `app/(main)/blud/page.tsx`, `app/sitemap.ts` |
| Utilities / Helper File | `kebab-case` | `lib/faq-data.ts`, `lib/validations.ts` |
| Variabel & Fungsi | `camelCase` | `handleSubmit()`, `nomorPendaftaran`, `isLoading` |
| Constant & Env Vars | `SNAKE_CASE_UPPER` | `DATABASE_URL`, `NEXT_PUBLIC_ADMIN_WA_NUMBER` |
| Types & Interfaces | `PascalCase` | `PendaftarPPDBProps`, `ApiResponse<T>` |

---

## 7. Git & Commit Message Conventions

Format pesan commit mengikuti standar **Conventional Commits**:
```
<type>: <deskripsi singkat dalam bahasa indonesia atau inggris>
```

Tipe commit yang diizinkan:
- `feat`: Penambahan fitur baru (contoh: `feat: tambah form wizard step 3 ppdb`).
- `fix`: Perbaikan bug/error (contoh: `fix: perbaiki validasi nisn 10 digit`).
- `docs`: Perubahan atau penambahan dokumentasi (contoh: `docs: update arsitektur ke postgresql`).
- `style`: Perubahan format tampilan / CSS tanpa mengubah logika (contoh: `style: penyesuaian margin footer`).
- `refactor`: Restrukturisasi kode tanpa mengubah fungsionalitas (contoh: `refactor: ekstrak hook useFormWizard`).
- `chore`: Tugas pemeliharaan build, paket, atau konfigurasi (contoh: `chore: install connect-pg-simple`).

---

## 8. Aturan Ketat Type Safety & Clean Code (Strict Rules)

1. **DILARANG MENGGUNAKAN TIPE `any` (`no-explicit-any`)**:
   - Seluruh kode pada `shared/`, `frontend/`, dan `backend/` **DILARANG KERAS** menggunakan tipe `any` (termasuk `T = any`, `(data: any)`, atau `Record<string, any>`).
   - Gunakan tipe data spesifik, interfaces, generics (`<T = unknown>`), atau `unknown` dengan type narrowing / type guard.

2. **DILARANG MENGGUNAKAN KOMENTAR BARIS SLASH (`no-slash-comments`)**:
   - **DILARANG KERAS** menulis komentar baris tunggal (`//`) atau komentar multi-baris (`/* ... */`) di dalam file kode sumber (`.ts`, `.tsx`, `.js`, `.jsx`).
   - Kode sumber harus ditulis secara *self-documenting* melalui penamaan variabel, fungsi, tipe, dan komponen yang jelas, intuitif, serta deskriptif.


# BACKEND TASKS & GUIDELINES — Mutuharjo Hub

Dokumen ini berisi daftar tugas terperinci, spesifikasi API endpoint, skema database Prisma, penanganan error, dan kriteria penyelesaian (*Definition of Done*) khusus untuk **Backend Developer 1 (Dev BE-1)** dan **Backend Developer 2 (Dev BE-2)** pada repositori **Mutuharjo Hub (SMK Muhammadiyah 1 Sukoharjo)**.

> **Dokumen Induk:** [`context/mvp.md`](../context/mvp.md), [`context/architecture.md`](../context/architecture.md), [`context/code-standards.md`](../context/code-standards.md), [`shared/types/api.types.ts`](../shared/types/api.types.ts).

---

## 1. Peran & Pembagian Kerja Backend

- **Backend Developer 1 (Dev BE-1)**: Express.js 5 API, Session Cookie (`connect-pg-simple`) + Bcrypt Authentication, PostgreSQL + Prisma ORM v6 (`^6.4.1`) (7 Model DB), PPDB Submission Flow, Status Update, Nginx Server Block, & PM2 Deployment.
- **Backend Developer 2 (Dev BE-2)**: Content Services (Berita, BLUD, Mitra), File Upload Endpoint (`POST /api/upload`) kompresi WebP via Sharp (max 2MB), Chatbot FAQ Hybrid (Layer 1 Rule-based + Layer 2 Gemini API), File Seed Data JSON (`backend/prisma/seed/`), CORS Sanitization, & Uji Beban `autocannon`.

- **Aturan Ketat Kode (v1.2)**:
  1. **Strict No `any`**: Dilarang keras menggunakan tipe `any`. Seluruh respon HTTP wajib membungkus payload dengan `ApiResponse<T>` atau `PaginatedResponse<T>`.
  2. **Strict No Slash Comments**: Dilarang keras menulis komentar baris `//` atau `/* */` di dalam file kode sumber (`.ts`, `.js`).

---

## 2. Skema Database Prisma (`backend/prisma/schema.prisma`)

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
  status           String           @default("baru")
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
  status       String        @default("menunggu")
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
  source    String
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

## 3. Daftar Lengkap 20 API Routes & Contract

### Public Routes
| Method | Route | Output Interface | Controller / Service |
|---|---|---|---|
| `POST` | `/api/ppdb` | `ApiResponse<{ nomorPendaftaran: string }>` | PPDBController.submit |
| `GET` | `/api/ppdb/:nomorPendaftaran` | `ApiResponse<PendaftarPPDB>` | PPDBController.getByNomor |
| `POST` | `/api/pembayaran` | `ApiResponse<KonfirmasiBayar>` | PembayaranController.submit |
| `GET` | `/api/pembayaran/:nomorPendaftaran` | `ApiResponse<KonfirmasiBayar>` | PembayaranController.getByNomor |
| `GET` | `/api/blud` | `ApiResponse<ProdukBLUD[]>` | BLUDController.getAll |
| `GET` | `/api/blud/:id` | `ApiResponse<ProdukBLUD>` | BLUDController.getById |
| `GET` | `/api/berita?limit=3` | `ApiResponse<Berita[]>` | BeritaController.getLatest |
| `POST` | `/api/chatbot` | `ApiResponse<{ answer: string, source: string }>` | ChatbotController.ask |
| `POST` | `/api/upload` | `ApiResponse<UploadedFile>` | UploadController.uploadMedia |
| `GET` | `/api/health` | `ApiResponse<{ status: string, timestamp: string }>` | HealthController.check |

### Admin Routes (Session Protected via `requireAdminSession`)
| Method | Route | Output Interface | Controller / Service |
|---|---|---|---|
| `POST` | `/api/auth/login` | `ApiResponse<{ username: string }>` | AuthController.login |
| `POST` | `/api/auth/logout` | `ApiResponse<null>` | AuthController.logout |
| `GET` | `/api/admin/ppdb` | `PaginatedResponse<PendaftarPPDB>` | AdminPPDBController.getAll |
| `PATCH` | `/api/admin/ppdb/:id` | `ApiResponse<PendaftarPPDB>` | AdminPPDBController.updateStatus |
| `GET` | `/api/admin/pembayaran` | `PaginatedResponse<KonfirmasiBayar>` | AdminPembayaranController.getAll |
| `PATCH` | `/api/admin/pembayaran/:id` | `ApiResponse<KonfirmasiBayar>` | AdminPembayaranController.updateStatus |
| `POST/PUT/DELETE` | `/api/admin/berita` | `ApiResponse<Berita>` | AdminBeritaController.crud |
| `POST/PUT/DELETE` | `/api/admin/blud` | `ApiResponse<ProdukBLUD>` | AdminBLUDController.crud |

---

## 4. Rincian Task Per-Sprint (Phase 0 s.d. Phase 6)

### Sprint 1: Fondasi Backend, PostgreSQL & Auth (Phase 0)

* [x] **Task 1.1 — Setup Monorepo Workspace**: Menyiapkan linkage package `@mutuharjo/shared`. (Owner: All Devs)
* [ ] **Task 1.5 — Setup Express 5 Server**: Inisialisasi Express.js 5 TypeScript di `backend/` dan routing dasar. (Owner: Dev BE-1)
* [ ] **Task 1.6 — Integrasi Prisma ORM v6 PostgreSQL**: Tulis `schema.prisma` utuh untuk 7 model dan jalankan `npx prisma migrate dev` menggunakan Prisma v6 (`^6.4.1`). (Owner: Dev BE-1)
* [ ] **Task 1.7 — Setup Auth Session Admin**: Inisialisasi Express session dengan `connect-pg-simple`, Bcrypt hashing, dan `requireAdminSession` middleware. (Owner: Dev BE-1)
* [ ] **Task 1.8 — Endpoint Upload Media (`POST /api/upload`)**: Buat endpoint Multer, kompresi WebP via Sharp (max 2MB), dan pencatatan ke `UploadedFile`. (Owner: Dev BE-2)
* [ ] **Task 1.9 — Pembuatan File Seed Data JSON & Prisma Seed**: Buat 10 file seed (`mitra.json`, `jurusan.json`, `testimoni.json`, `produk-blud.json`, `berita.json`, `rekening.json`, `wa-admin.json`, logo kompetisi di `frontend/data/`, serta `admin.json` di `backend/prisma/seed/`) serta script `prisma db seed`. (Owner: Dev BE-2)
* [ ] **Task 1.10 — Sanitasi CORS & Health Check**: Setup middleware CORS domain & subdomain, serta buat endpoint `GET /api/health`. (Owner: Dev BE-1 & BE-2)

### Sprint 2: Feature Services & Content API (Phase 1 & 2)

* [ ] **Task 2.5 — Endpoint Submit PPDB (`POST /api/ppdb`)**: Validasi Zod (NISN 10 digit, No HP 08xx), cek keunikan NISN, dan generate nomor pendaftaran unik `SPMB-2026-XXXX`. (Owner: Dev BE-1)
* [ ] **Task 2.6 — Endpoint Detail PPDB (`GET /api/ppdb/:nomorPendaftaran`)**: Ambil data status pendaftaran calon siswa. (Owner: Dev BE-1)
* [ ] **Task 2.7 — Endpoint Konfirmasi Bayar (`POST /api/pembayaran` & `GET /api/pembayaran/:nomorPendaftaran`)**: Simpan data pembayaran & relasikan 1-to-1 dengan `PendaftarPPDB`. (Owner: Dev BE-1)
* [ ] **Task 2.8 — Endpoint Showcase BLUD (`GET /api/blud` & `GET /api/blud/:id`)**: Ambil list produk/jasa Teaching Factory dengan filter query `jurusan`. (Owner: Dev BE-2)
* [ ] **Task 2.9 — Endpoint Berita Landing (`GET /api/berita?limit=3`)**: Ambil 3 artikel berita terbaru dipublikasikan (`isPublished: true`). (Owner: Dev BE-2)

### Sprint 3: Interactive Features, Chatbot & Panel Admin API (Phase 3 & 4)

* [ ] **Task 3.5 — Endpoint Auth Admin (`POST /api/auth/login` & `/api/auth/logout`)**: Validasi kredensial admin (Bcrypt) dan manajemen session cookie. (Owner: Dev BE-1)
* [ ] **Task 3.6 — Endpoint Status Verification (`PATCH /api/admin/ppdb/:id` & `PATCH /api/admin/pembayaran/:id`)**: Admin update status PPDB dan pembayaran. (Owner: Dev BE-1)
* [ ] **Task 3.7 — Endpoint CRUD Berita & BLUD (`/api/admin/berita` & `/api/admin/blud`)**: Endpoint CRUD terproteksi session admin. (Owner: Dev BE-1)
* [ ] **Task 3.8 — Endpoint Chatbot Hybrid (`POST /api/chatbot`)**: Implementasi Layer 1 (Rule-based keyword match `lib/faq-data.ts`), Layer 2 (Gemini API fallback + Rekomendasi Jurusan), dan simpan log ke `ChatLog`. (Owner: Dev BE-2)

### Sprint 4: Nginx, Load Test & PM2 Deploy (Phase 5 & 6)

* [ ] **Task 4.3 — Konfigurasi Server Nginx & SSL**: Setup Nginx Server Block untuk domain utama & subdomain, reverse proxy ke port Express (5000) & Next.js (3000), serta SSL Certbot. (Owner: Dev BE-1)
* [ ] **Task 4.4 — Deployment VPS & PM2**: Devisi instance PM2 untuk Express & Next.js, pastikan connection pool limit `DATABASE_URL` (`?connection_limit=20`). (Owner: Dev BE-1)
* [ ] **Task 4.5 — Uji Beban (Load Test) `autocannon`**: Jalankan `autocannon -c 50 -d 30` untuk Domain Utama & Subdomain PPDB. Pastikan throughput ≥100 req/sec & latency p99 <500ms. (Owner: Dev BE-2)

---

## 5. Definition of Done (DoD) Backend

1. Seluruh controller dan service ditulis tanpa tipe `any` dan tanpa komentar slash (`//`).
2. `curl http://localhost:5000/api/health` mengembalikan `200 OK`.
3. Schema Prisma valid (`npx prisma validate`) dan migration berjalan bersih di PostgreSQL.
4. Uji beban `autocannon` mencapai ≥100 req/sec dengan latency p99 <500ms untuk Domain Utama dan Subdomain PPDB, serta terdokumentasi dengan baik.

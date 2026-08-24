# Architecture – SMK Muhammadiyah 1 Sukoharjo (Mutuharjo Hub)

## 1. Keputusan Arsitektur Kunci (Locked)
| Aspek | Keputusan | Alasan |
|-------|-----------|--------|
| **Monorepo** | Flat: `frontend/` + `backend/` + `shared/` | Simpel, tidak memerlukan tooling ekstra untuk tim 3 orang siswa |
| **Frontend** | Next.js 15 (App Router) | SSR/SSG, SEO‑friendly, dukungan subdomain via middleware |
| **Backend** | Express.js 5 + TypeScript | Ringan, mudah dipelajari, cocok untuk API REST |
| **Database** | SQLite (WAL mode) + Prisma ORM | Zero‑config, satu file, cukup untuk < 1 000 concurrent users |
| **Session Store** | `better-sqlite3-session-store` (Express session) | Persist sesi di DB, tidak hilang saat restart |
| **File Upload** | Local disk (`backend/uploads/`) served langsung oleh Nginx | Gratis, cepat, tanpa ketergantungan cloud |
| **Subdomain PPDB** | Next.js Middleware hostname rewrite (`ppdb.*`) | Satu codebase, design system & cookie yang sama |
| **Auth** | Express session cookie + bcrypt | Simpel, cukup untuk panel admin |
| **API Contract** | `ApiResponse<T>` generic wrapper (shared types) | Type‑safe FE ↔ BE communication |
| **Design System** | Token OKLCH, Plus Jakarta Sans & DM Sans, anti‑cliché rules (see `design-system/master.md`) | Konsistensi visual, aksesibilitas, dark‑mode |

---

## 2. Subdomain Strategy (Next.js Middleware)
```ts
// frontend/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  if (hostname.startsWith('ppdb.')) {
    const url = request.nextUrl.clone()
    url.pathname = `/ppdb-subdomain${url.pathname}`
    return NextResponse.rewrite(url)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|uploads).*)'],
}
```
*Result:* `ppdb.smkmuh1-skh.sch.id/` → `app/(ppdb-subdomain)/...` (Form Wizard, Konfirmasi, Status). `smkmuh1-skh.sch.id/ppdb` tetap menjadi halaman **info**.

---

## 3. Nginx Configuration (Production)
```nginx
# nginx/mutuharjo.conf
server {
    listen 80;
    server_name smkmuh1-skh.sch.id www.smkmuh1-skh.sch.id;
    location /uploads/ { alias /var/www/mutuharjo/backend/uploads/; expires 30d; }
    location /api/ { proxy_pass http://127.0.0.1:5000; }
    location / { proxy_pass http://127.0.0.1:3000; }
}

server {
    listen 80;
    server_name ppdb.smkmuh1-skh.sch.id;
    location /uploads/ { alias /var/www/mutuharjo/backend/uploads/; expires 30d; }
    location /api/ { proxy_pass http://127.0.0.1:5000; }
    location / { proxy_pass http://127.0.0.1:3000; }
}
```
*Catatan:* Kedua server block **share** database & file system sehingga data konsisten.

---

## 4. Database Schema (Prisma + SQLite)
```prisma
// backend/prisma/schema.prisma

generator client { provider = "prisma-client-js" }

datasource db { provider = "sqlite" url = env("DATABASE_URL") }

model PendaftarPPDB {
  id               String   @id @default(uuid())
  nomorPendaftaran String   @unique
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
  status           String   @default("baru") // baru | terverifikasi | diterima | ditolak
  pembayaran       KonfirmasiBayar?
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
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
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
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

model LogbookEntry {
  id             String   @id @default(uuid())
  namaSiswa      String
  kelasJurusan   String
  instansi       String
  tanggal        DateTime
  jamMulai       String
  jamSelesai     String
  kegiatan       String
  uraianKegiatan String
  fotoUrl        String?
  isContoh       Boolean  @default(false)
  createdAt      DateTime @default(now())
}

model Berita {
  id          String   @id @default(uuid())
  judul       String
  slug        String   @unique
  ringkasan   String
  konten      String
  gambarUrl   String?
  isPublished Boolean  @default(false)
  publishedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Admin {
  id           String @id @default(uuid())
  username     String @unique
  passwordHash String
  createdAt    DateTime @default(now())
}

model ChatLog {
  id        String   @id @default(uuid())
  sessionId String
  message   String
  answer    String
  source    String   // rule‑based | gemini | fallback
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
*Catatan:* Semua model sudah **WA‑compatible**; `UploadedFile` dipakai oleh endpoint `/api/upload`.

---

## 5. API Contract (Shared Types)
```ts
// shared/types/api.types.ts
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: { page: number; limit: number; total: number; totalPages: number }
}
```
### Endpoint Overview (25 routes)
| Method | Route | Purpose |
|---|---|---|
| **Public** |||
| `POST` | `/api/ppdb` | Submit pendaftaran, generate nomor unik |
| `GET`  | `/api/ppdb/:nomor` | Cek status pendaftaran |
| `POST` | `/api/pembayaran` | Simpan konfirmasi bayar (upload bukti optional) |
| `GET`  | `/api/pembayaran/:nomor` | Cek status pembayaran |
| `GET`  | `/api/blud` | List produk BLUD (filter jurusan) |
| `GET`  | `/api/blud/:id` | Detail produk |
| `GET`  | `/api/berita?limit=3` | Ambil berita terbaru untuk landing |
| `GET`  | `/api/logbook` | List entri PKL (filter, pagination) |
| `POST` | `/api/logbook` | Simpan entri PKL baru |
| `DELETE`| `/api/logbook/:id` | Hapus entri (admin) |
| `POST` | `/api/chatbot` | Chatbot request (rule‑based → Gemini fallback) |
| `POST` | `/api/upload` | Upload gambar/file (category) |
| `GET`  | `/api/health` | Health‑check |
| **Admin (session protected)** |||
| `POST` | `/api/auth/login` | Login admin (bcrypt) |
| `POST` | `/api/auth/logout` | Logout |
| `POST/PUT/DELETE` | `/api/admin/berita` | CRUD berita |
| `POST/PUT/DELETE` | `/api/admin/blud` | CRUD produk BLUD |
| `PATCH` | `/api/admin/ppdb/:id` | Update status PPDB |
| `PATCH` | `/api/admin/pembayaran/:id` | Update status pembayaran |
| `DELETE`| `/api/admin/logbook/:id` | Hapus entri logbook |

---

## 6. Data Seed Requirements (Wajib Sebelum Phase 1)
| Item | Contoh File | Keterangan |
|------|-------------|------------|
| **Mitra PKL** | `frontend/data/mitra.json` | Minimal 6 (1 per jurusan), ideal 12+ |
| **Deskripsi Jurusan** | `data/jurusan.json` | 6 jurusan, singkat + lengkap |
| **Testimoni Alumni** | `data/testimoni.json` | ≥4 real alumni |
| **Produk BLUD** | `data/produk-blud.json` | 6 produk (1 per jurusan) |
| **Berita / Artikel** | `data/berita.json` | ≥3, dengan `slug` & `publishedAt` |
| **Contoh Logbook** | `data/logbook-contoh.json` | 2‑3 entri, `isContoh:true` |
| **Admin Default** | `data/admin.json` | `{ "username": "admin", "password": "<plain>" }` (hashed via seed) |
| **5 Logo Kompetisi** | `public/images/logo/kompetisi/` | PNG/SVG, transparent |
| **Rekening PPDB** | `data/rekening.json` | { bank, nomor, atasNama, nominal } |
| **Nomor WA Admin** | `data/wa-admin.json` | `{ "number": "6281234567890" }` |
| **Gemini API Key (opt)** | `.env` `GEMINI_API_KEY` | untuk fallback chatbot |

---

## 7. Design System (Ringkas)
- **Palette**: OKLCH tokens dari `design-system/master.md` (`primary`, `secondary`, `accent`, `background`, `surface`, `muted`, `danger`, `success`, `ring`).
- **Typography**: Plus Jakarta Sans (heading & body) + DM Sans, ukuran h1–h3, body, small, caption.
- **Spacing**: 8 px grid (`--space-2 = 8px`).
- **Radius**: max `--radius-lg = 12px`.
- **Shadows**: subtle (`--shadow-sm/md/lg`).
- **Components**: Button, Card, Input, Select, FileUpload, Modal, Table, Badge, Toast, Stepper, ChatWidget – semua berada di `components/ui/` dan mengikuti token.
- **Anti‑Patterns** (dilarang keras): gradient neon, emoji, glass‑morphism, excessive shadows, bento‑grid tanpa alasan, emoticon, dll. (lihat `ui-context.md` §10‑§12).
- **Accessibility**: WCAG AAA where feasible, focus‑visible ring, contrast ≥ 4.5:1, `prefers-reduced-motion`, ARIA labels on icons, skip‑link, landmarks.
- **Interaction**: micro‑motion ≤ 150 ms, button press opacity, card lift `translateY(-2px)`, form shake on error.

---

## 8. Sprint Timeline (8 Weeks) – Menggabungkan Opencode & Claude
| Sprint | Minggu | Fokus | Deliverables Utama |
|-------|-------|------|-------------------|
| **Phase 0** | 1 | Foundation | Monorepo, Prisma schema, Next.js + Express running, middleware, design tokens, PM2 config |
| **Phase 1** | 2‑3 | PPDB Core (subdomain) | 4‑step wizard, nomor pendaftaran, konfirmasi pembayaran, WA integration |
| **Phase 2** | 3‑4 | Domain‑main Core | Landing page, BLUD showcase, Direktori Mitra, Jurusan pages, SEO config |
| **Phase 3** | 4‑5 | Interactive Features | Logbook tabs, Chatbot (rule‑based + Gemini), WA escalation button |
| **Phase 4** | 5‑6 | Admin Panel | Login, Dashboard, CRUD Berita & BLUD, PPDB & pembayaran verification, Logbook moderation |
| **Phase 5** | 6‑7 | Polish & Deploy | Load test (`autocannon`), Lighthouse ≥ 90, image optimisation, SSL via Nginx |
| **Phase 6** | 8 | Buffer & Demo Prep | Bug fixes, final seeding, pitch‑deck, mentor sign‑off |

---

## 9. Definition of Done (Automated + Manual)
### Automated Checks
- `curl http://localhost:5000/api/health` → 200 OK
- `npm run build` (frontend) – no SSR errors
- `npx prisma validate` – schema valid
- Load test `autocannon -c 50 -d 30 https://smkmuh1-skh.sch.id` & subdomain → ≥100 req/s, p99 < 500 ms
- Lighthouse SEO ≥ 90, Performance ≥ 80 (both domains)
### Manual Checks
- End‑to‑end PPDB flow (info → subdomain → submit → konfirmasi → status)
- Admin login, dashboard CRUD, status update
- Chatbot answers FAQ (layer 1) & fallback Gemini (layer 2) without crash
- Responsiveness: 375 px, 768 px, 1280 px+; dark‑mode toggle
- 5 logo kompetisi tampil di semua footer
- Form validation (NISN 10 digit, HP 08xx, future dates blocked)
- Upload limits: max 2 MB, JPG/PNG/WebP → WebP conversion via Sharp
- Accessibility audit (focus rings, aria‑labels, contrast)

---

## 10. Risiko & Mitigasi
| Risiko | Dampak | Mitigasi |
|--------|--------|----------|
| DNS subdomain belum ready | PPDB tidak dapat diakses | Fallback route `/ppdb/daftar` pada domain utama |
| Gemini rate‑limit | Chatbot fallback tidak tersedia | Rule‑based layer 1 menjawab ≥ 80 % FAQ; fallback UI static message + WA button |
| SQLite write lock under load | Slow response | WAL mode (`PRAGMA journal_mode=WAL`) di‑prisma, dan batch insert pada logbook |
| VPS RAM terbatas (1‑2 GB) | Next.js + Express mepet | Static generation where possible, image compression, limit PM2 to 1 instance each |
| Tim tidak aktif | Fitur terlambat | Prioritas: Phase 1 → Phase 2 → Phase 3 → Phase 4, dan mock API stubs untuk FE unblock |

---

## 11. Open Issues & Next Steps
- **Domain DNS** – konfirmasi final domain & subdomain before deployment.
- **Gemini API Key** – dapatkan & masukkan ke `.env`.
- **VPS Specs** – finalisasi RAM/CPU, pastikan port 80/443 open.
- **Data Seed** – tim FE/BE kumpulkan file JSON sesuai tabel di atas.
- **Testing Framework** – Jest + React Testing Library (frontend) & Supertest (backend).

---

*Semua tim diharapkan mengacu pada file ini, `design-system/master.md`, dan `ui-context.md` untuk konsistensi visual serta aksesibilitas.*
# Current Issues & Data Seed Dependency Analysis

Dokumen ini mencatat isu-isu berjalan serta analisis pemetaan **Data Seed Requirements** yang wajib disiapkan sebelum pengerjaan Phase 1 (PPDB Core). Setiap data seed memiliki keterkaitan langsung dengan komponen UI dan fitur backend tertentu.

---

## 1. Analisis Keterikatan Data Seed (10 Item Wajib)

Berikut adalah pemetaan lengkap antara berkas data seed yang disiapkan dengan komponen/fitur yang membutuhkan data tersebut:

| No | Berkas / Asset Seed | Fitur & Komponen yang Membutuhkan | Dampak Jika Data Belum Diisi / Kosong | Status |
|---|---|---|---|---|
| 1 | **`frontend/data/mitra.json`**<br>(Minimal 6 mitra PKL) | - **Fitur #4**: Halaman Direktori Mitra PKL (`/mitra-industri`) | Halaman direktori mitra menampilkan empty state. | `[ ] Pending` |
| 2 | **`frontend/data/jurusan.json`**<br>(6 program keahlian) | - **Fitur #7**: Section Program Keahlian Landing Page (`/`)<br>- **Fitur #1**: Step 3 Pilihan Jurusan di Subdomain PPDB (`ppdb.*`)<br>- **Fitur #5**: Context prompt Chatbot FAQ & Rekomendasi Jurusan | Kartu jurusan di landing page tidak muncul; form PPDB Step 3 tidak bisa merender kartu pilihan jurusan. | `[ ] Pending` |
| 3 | **`frontend/data/testimoni.json`**<br>(≥4 testimoni alumni) | - **Fitur #7**: Section Testimoni Alumni Carousel pada Landing Page (`/`) | Carousel testimoni alumni di landing page tidak dapat merender kutipan alumni otentik. | `[ ] Pending` |
| 4 | **`frontend/data/produk-blud.json`**<br>(≥6 produk/jasa CoE) | - **Fitur #3**: Halaman Showcase BLUD Teaching Factory (`/blud`)<br>- **Fitur #8**: Panel Admin Manajemen Produk BLUD | Grid produk BLUD menampilkan empty state ("Produk unggulan sedang disiapkan"). | `[ ] Pending` |
| 5 | **`frontend/data/berita.json`**<br>(≥3 berita/artikel) | - **Fitur #7**: Section Berita Terbaru pada Landing Page (`/`)<br>- **Fitur #8**: Panel Admin CRUD Berita | Section berita terbaru di landing page tersembunyi atau menggunakan data fallback. | `[ ] Pending` |
| 6 | **`backend/prisma/seed/admin.json`**<br>(Kredensial admin default) | - **Fitur #8**: Authentikasi Login Panel Admin (`/admin/login`) & Script Seeding PostgreSQL Backend | Admin sekolah tidak bisa login ke dashboard untuk memverifikasi data PPDB dan konfirmasi bayar. | `[ ] Pending` |
| 7 | **`5 Logo Kompetisi`**<br>(`frontend/public/images/logo/kompetisi/`) | - **Fitur #7**: Footer Komponen Utama di semua halaman (Domain Utama & Subdomain PPDB) | Footer melanggar syarat kelengkapan wajib kompetisi (JHIC, Kemenag, Muhammadiyah, Sponsor, Media). | `[ ] Pending` |
| 8 | **`frontend/data/rekening.json`**<br>(Info rekening & biaya) | - **Fitur #2**: Halaman Konfirmasi Pembayaran di Subdomain (`ppdb.*/konfirmasi`) | Calon siswa tidak dapat melihat nomor rekening bank penerima & nominal pembayaran Rp 100.000. | `[ ] Pending` |
| 9 | **`frontend/data/wa-admin.json`**<br>(Nomor HP Admin WA) | - **Fitur #2**: Redirect WhatsApp Konfirmasi Bayar<br>- **Fitur #4**: Tombol CTA "Tanya PKL via WA"<br>- **Fitur #5 & #6**: Tombol Floating Eskalasi WA Admin | Tombol WhatsApp tidak dapat membuka `wa.me` secara dinamis dengan nomor admin sekolah yang valid. | `[ ] Pending` |
| 10 | **`GEMINI_API_KEY`**<br>(di `backend/.env`) | - **Fitur #5**: Layer 2 Fallback Chatbot FAQ (AI Generative Response) | Chatbot hanya mengandalkan Layer 1 (Rule-Based). Jika keyword miss, fallback ke pesan statis + WA. | `[ ] Optional` |

---

## 2. Isu Teknis & Tindak Lanjut

1. **Subdomain Middleware Local Testing & App Directory Alignment**:
   - **Isu**: Browser `localhost` tidak otomatis mendukung subdomain tanpa konfigurasi `/etc/hosts` (`ppdb.localhost:3000`), dan folder subdomain harus dinamakan `app/ppdb-subdomain/` (bukan Route Group `app/(ppdb-subdomain)/`) agar rewrite middleware `url.pathname = '/ppdb-subdomain${url.pathname}'` tidak menghasilkan 404.
   - **Tindak Lanjut**: Dokumentasikan cara setting `/etc/hosts` untuk pengembang (`127.0.0.1 ppdb.localhost`), dan pastikan folder fisik `app/ppdb-subdomain/` digunakan di frontend.

2. **Koneksi Database PostgreSQL**:
   - **Isu**: Backend berpindah dari SQLite ke PostgreSQL.
   - **Tindak Lanjut**: Pastikan instance PostgreSQL berjalan lokal atau via Docker (`docker run -d --name mutuharjo-pg -e POSTGRES_PASSWORD=postgres -p 5432:5432 postgres:16-alpine`), dan jalankan `npx prisma db push` / `npx prisma migrate dev`.

3. **Status Harmonisasi Blueprint (.context)**:
   - **Status**: `[x] Selesai (Harmonized)`. Seluruh 7 dokumen blueprint telah 100% diselaraskan (routing subdomain, schema Prisma 7 model, endpoint API 20 routes, CSS variable `--shadow-xl`, dan pengamanan seed `admin.json`).
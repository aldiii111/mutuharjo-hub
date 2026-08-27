# SPESIFIKASI DETAIL — 10 FITUR FINAL
## Mutuharjo Hub — Website SMK Muhammadiyah 1 Sukoharjo

> **Aturan penamaan:** "Mutuharjo Hub" adalah nama produk/project. Untuk seluruh
> konten yang merepresentasikan identitas resmi sekolah ke publik (profil sekolah,
> logo, footer, judul halaman, metadata SEO) WAJIB memakai nama resmi
> **"SMK Muhammadiyah 1 Sukoharjo"** atau bentuk singkatnya **"SMK Mutuharjo"** —
> bukan "Mutuharjo Hub". Lihat `design-system/master.md` bagian 1 untuk aturan lengkap.

> **⚠️ CATATAN PENTING SOAL WIREFRAME:** Setiap sketsa ASCII di dokumen ini adalah
> **ilustrasi kasar untuk menjelaskan struktur & urutan elemen saja** — BUKAN desain
> final. Tata letak, warna, jenis komponen (kartu vs tabel vs list), spacing, dan
> detail visual lainnya **boleh dan SEHARUSNYA disesuaikan lebih lanjut oleh tim
> UI/UX** mengikuti design system (`design-system/master.md`) untuk menghasilkan pengalaman
> yang lebih menarik dan matang. Anggap wireframe di sini sebagai "kerangka fungsi",
> bukan "cetak biru visual".

Setiap fitur ditulis dengan format konsisten: Konsep → Alur Pengguna → Wireframe →
Data Model → API Routes → Validasi/Edge Case → Integrasi → Definition of Done.

---

# FITUR #1 — Form Pendaftaran Multi-Step PPDB (di Subdomain)

## Konsep
di **subdomain `ppdb.smkmuh1-skh.sch.id`**, terpisah dari domain utama — namun berbagi
codebase, database, dan design system yang sama (lihat `architecture.md` bagian
Subdomain Strategy untuk detail teknis).

## Alur Pengguna (Lintas Domain → Subdomain)
1. Calon siswa buka domain utama `smkmuh1-skh.sch.id`, klik menu **"PPDB"** di navbar
2. Tiba di `smkmuh1-skh.sch.id/ppdb` — halaman **informasi saja** (jadwal, syarat,
   biaya, penjelasan alur SPMB 5 tahap dalam bentuk infografis/timeline), TIDAK ADA
   form di halaman ini
3. Klik tombol besar **"Daftar Sekarang"** → pindah halaman (link biasa `<a href>`,
   BUKAN client-side navigation karena berpindah domain) ke `ppdb.smkmuh1-skh.sch.id`
4. Tiba di subdomain, langsung masuk ke **Step 1 dari 4** form wizard
5. **Step 1 — Data Diri Calon Siswa:** Nama lengkap, NISN, Tempat & Tanggal lahir,
   Jenis kelamin, Asal sekolah, Alamat
6. **Step 2 — Data Orang Tua/Wali:** Nama ayah/ibu/wali, No. HP aktif (untuk WhatsApp),
   Pekerjaan (opsional)
7. **Step 3 — Pilihan Jurusan:** Pilih 1 jurusan utama dari 6 pilihan (kartu visual
   dengan ikon per jurusan), opsional pilihan cadangan
8. **Step 4 — Review & Submit:** Tampilkan ringkasan semua data yang diisi + checklist
   berkas fisik yang wajib dibawa saat verifikasi ke sekolah (KK, Akta Kelahiran,
   Piagam prestasi jika ada) → tombol "Daftar Sekarang"
9. Setelah submit, sistem generate **Nomor Pendaftaran** unik (format `SPMB-2026-XXXX`)
10. Redirect (masih di subdomain) ke halaman "Bukti Pendaftaran" — tampilkan nomor
    pendaftaran + tombol unduh/cetak (PDF sederhana) → lanjut otomatis ke halaman
    Konfirmasi Pembayaran (Fitur #2), masih di subdomain yang sama
11. Progress disimpan otomatis ke `localStorage` browser di tiap step — kalau halaman
    ter-refresh tidak sengaja, data tidak hilang, baru dikirim ke server saat submit final
12. Header/footer di subdomain tetap memakai **logo, warna, dan font yang identik**
    dengan domain utama (bagian dari design system bersama) — plus link kecil
    "Kembali ke Website Utama" di header, supaya pengguna tidak merasa "terdampar"
    di situs asing

## Wireframe (Halaman Info di Domain Utama)
```
+---------------------------------------+
|  [Navbar Domain Utama]                 |
|  Informasi PPDB                        |
|  - Jadwal pendaftaran                  |
|  - Syarat & berkas yang dibutuhkan     |
|  - Alur SPMB (timeline 5 tahap)        |
|  - Biaya pendaftaran                   |
|                                         |
|         [ Daftar Sekarang -> ]         |
|      (tombol ini pindah ke subdomain)  |
+---------------------------------------+
```
*(Wireframe ilustratif — tata letak & gaya infografis alur dapat dirancang lebih
menarik oleh tim UI/UX, misal timeline visual interaktif alih-alih teks biasa)*

## Wireframe (Form Wizard di Subdomain)
```
+---------------------------------------+
|  * - o - o - o   (progress step 1/4)  |
|  Data Diri Calon Siswa                 |
|  Nama Lengkap    [______________]      |
|  NISN            [______________]      |
|  Tempat Lahir    [______________]      |
|  Tanggal Lahir   [tgl____________]     |
|  Jenis Kelamin   ( ) L  ( ) P          |
|  Asal Sekolah    [______________]      |
|  Alamat          [______________]      |
|                                         |
|              [ Lanjut -> ]             |
+---------------------------------------+
```
*(Wireframe ilustratif — Step 2-4 mengikuti pola visual serupa dengan field berbeda;
desain progress indicator, gaya input field, dan transisi antar-step bebas
disesuaikan tim UI/UX untuk pengalaman yang lebih halus)*

## Data Model
```prisma
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
```

## API Routes
| Method | Route | Fungsi |
|---|---|---|
| `POST` | `/api/ppdb` | Submit pendaftaran final, generate nomor pendaftaran, simpan ke DB |
| `GET` | `/api/ppdb/:nomorPendaftaran` | Cek status pendaftaran |

## Validasi & Edge Cases
| Kasus | Penanganan |
|---|---|
| NISN bukan 10 digit angka | Validasi format real-time (zod), tolak lanjut ke step berikutnya |
| No HP bukan format Indonesia (08xx) | Validasi format, pesan error jelas |
| NISN sudah pernah terdaftar | Cek di server saat submit, tampilkan: "NISN ini sudah terdaftar, gunakan menu Cek Pendaftaran" |
| User tutup browser di tengah pengisian | Data tersimpan di localStorage, saat buka lagi form terisi otomatis dari draft terakhir |
| Field wajib kosong | Block tombol "Lanjut", highlight field yang kosong |
| User bookmark langsung `ppdb.smkmuh1-skh.sch.id` tanpa lewat halaman info | Tetap diizinkan masuk (tidak wajib lewat domain utama dulu), tapi tersedia link "Pelajari alur PPDB" mengarah balik ke domain utama untuk konteks |

## Integrasi
Setelah submit sukses, `nomorPendaftaran` dipakai sebagai referensi otomatis ke
Fitur #2 (Konfirmasi Pembayaran), masih dalam subdomain yang sama.

## Definition of Done
- [ ] Halaman info PPDB di domain utama tampil lengkap dengan tombol ke subdomain
- [ ] Tombol "Daftar Sekarang" berhasil membawa pengguna ke subdomain
- [ ] 4 step form berjalan lancar dengan progress indicator jelas
- [ ] Data tersimpan draft di localStorage antar step
- [ ] Nomor pendaftaran ter-generate unik dan tidak duplikat
- [ ] Validasi semua field bekerja sebelum submit final
- [ ] Halaman Bukti Pendaftaran bisa diunduh/dicetak
- [ ] Branding (logo, warna, font) di subdomain identik dengan domain utama

---

# FITUR #2 — Konfirmasi Pembayaran Manual + WhatsApp (di Subdomain)

## Konsep
Melengkapi tahap "Konfirmasi Pembayaran" di alur SPMB asli — di mana halaman
"Informasi Pembayaran" versi lama berstatus "Sedang Dalam Perbaikan" — dengan solusi
yang jelas dan terhubung otomatis ke WhatsApp admin. Fitur ini tetap berada di
**subdomain** yang sama dengan Fitur #1.

## Alur Pengguna
1. Setelah submit form PPDB (Fitur #1), otomatis diarahkan ke
   `ppdb.smkmuh1-skh.sch.id/konfirmasi?no=SPMB-2026-XXXX`
2. Halaman menampilkan info metode pembayaran yang jelas: nomor rekening, nominal
   (Rp 100.000), nama penerima
3. Form konfirmasi: Nomor Pendaftaran (auto-terisi), Nama Pengirim Transfer, Nominal
   Transfer, Upload Bukti Transfer (gambar)
4. Klik "Kirim Konfirmasi" → data tersimpan → otomatis membuka WhatsApp (`wa.me`)
   dengan pesan pre-filled: *"Halo Admin, saya [nama] dengan nomor pendaftaran
   [nomor] sudah transfer Rp[nominal], bukti terlampir di sistem."*
5. Status berubah jadi **"Menunggu Verifikasi"**, terlihat saat calon siswa cek status
   di `ppdb.smkmuh1-skh.sch.id/status?no=SPMB-2026-XXXX`
6. Admin verifikasi manual via panel admin (Fitur #9, di **domain utama**), update
   status jadi "Terverifikasi" atau "Ditolak"

## Wireframe
```
+---------------------------------------+
|  Konfirmasi Pembayaran                 |
|  No. Pendaftaran: SPMB-2026-0042       |
|                                         |
|  Info Rekening                         |
|  Bank X - 123456789 a.n Yayasan        |
|  Nominal: Rp 100.000                   |
|                                         |
|  Nama Pengirim   [______________]      |
|  Nominal         [______________]      |
|  Upload Bukti    [Pilih File]          |
|                                         |
|         [ Kirim Konfirmasi ]           |
|    (otomatis buka WhatsApp setelah)    |
+---------------------------------------+
```
*(Wireframe ilustratif — tim UI/UX bebas mengubah tata letak, misal menampilkan QR
code rekening atau preview gambar bukti sebelum submit, untuk pengalaman yang lebih baik)*

## Data Model
```prisma
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
```

## API Routes
| Method | Route | Fungsi |
|---|---|---|
| `POST` | `/api/pembayaran` | Simpan konfirmasi pembayaran baru |
| `GET` | `/api/pembayaran/:nomorPendaftaran` | Cek status pembayaran |
| `PATCH` | `/api/admin/pembayaran/:id` | Admin update status (dari domain utama) |

## Validasi & Edge Cases
| Kasus | Penanganan |
|---|---|
| Nomor pendaftaran tidak ditemukan | Tampilkan pesan error, arahkan ke halaman Cek Pendaftaran |
| Upload bukti gagal (koneksi putus) | Tetap izinkan submit tanpa bukti, tampilkan catatan: "Anda bisa kirim bukti menyusul via WhatsApp" |
| Submit konfirmasi 2x untuk nomor sama | Update data yang sudah ada (bukan buat duplikat), field `@unique` di `pendaftarId` mencegah ini otomatis |

## Integrasi
Terhubung langsung ke `PendaftarPPDB` (Fitur #1) via relasi 1-1. Status yang diupdate
admin (Fitur #9 di domain utama) langsung tercermin saat calon siswa cek status di subdomain
— karena keduanya berbagi 1 database yang sama.

## Definition of Done
- [ ] Info rekening tampil jelas (mengisi celah halaman lama yang rusak)
- [ ] Upload bukti berfungsi, opsional/non-blocking jika gagal
- [ ] Tombol WhatsApp otomatis terbuka dengan pesan pre-filled benar
- [ ] Status pembayaran terlihat oleh calon siswa di halaman status subdomain

---

# FITUR #3 — Showcase Produk/Jasa Teaching Factory (BLUD)

## Konsep
Mengisi kekosongan total kategori Promosi BLUD dengan showcase aktivitas Teaching
Factory yang sudah nyata berjalan (bukan sistem jual-beli formal), berdasarkan data
publik yang sudah ada (deskripsi jurusan, galeri foto).

## Alur Pengguna
1. Pengunjung buka `smkmuh1-skh.sch.id/blud` — grid kartu produk/jasa per jurusan
2. Filter dropdown jurusan di atas grid (client-side)
3. Klik kartu → halaman detail `/blud/[id]`: foto besar, deskripsi lengkap, jurusan
   asal, estimasi (jika ada)
4. Tombol **"Tanya Ketersediaan via WhatsApp"** — pesan pre-filled: *"Halo, saya
   tertarik dengan [nama produk/jasa], apakah masih tersedia?"*
5. Data diinput/dikelola admin sekolah lewat panel admin (Fitur #9)

## Wireframe
```
+-----------+-----------+-----------+
| [Foto]     | [Foto]     | [Foto]     |
| Servis     | Produk     | Instalasi  |
| Motor      | Pemesinan  | Jaringan   |
| TSM        | TP         | TJKT       |
| [Lihat >]  | [Lihat >]  | [Lihat >]  |
+-----------+-----------+-----------+
Filter: [Semua Jurusan v]
```
*(Wireframe ilustratif — jumlah kolom grid, gaya kartu, dan animasi filter bebas
disesuaikan tim UI/UX; di mobile bisa jadi 1-2 kolom sesuai kebutuhan responsif)*

## Data Model
```prisma
model ProdukBLUD {
  id              String   @id @default(uuid())
  nama            String
  deskripsi       String
  jurusan         String
  gambarUrl       String
  estimasiHarga   String?  // teks bebas, misal "Mulai dari Rp150.000" - bukan harga fix transaksional
  isActive        Boolean  @default(true)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

## API Routes
| Method | Route | Fungsi |
|---|---|---|
| `GET` | `/api/blud?jurusan=` | List produk, filter opsional |
| `GET` | `/api/blud/:id` | Detail 1 produk |
| `POST/PUT/DELETE` | `/api/admin/blud` | CRUD oleh admin (Fitur #9) |

## Validasi & Edge Cases
| Kasus | Penanganan |
|---|---|
| Belum ada produk sama sekali | Tampilkan empty state: "Produk unggulan sedang disiapkan, nantikan segera!" |
| Gambar gagal dimuat | Tampilkan placeholder gambar default per kategori jurusan |

## Integrasi
Gambar memakai sistem upload reusable (kategori `produk`), dikelola lewat Fitur #9.

## Definition of Done
- [ ] Grid produk tampil rapi dengan filter jurusan berfungsi
- [ ] Halaman detail per produk lengkap dengan CTA WhatsApp
- [ ] Empty state tersedia jika data belum ada
- [ ] Admin bisa tambah/edit/hapus produk via panel admin

---

# FITUR #4 — Direktori Mitra PKL per Jurusan

## Konsep
Mengubah pendekatan dari "job board lowongan real-time" (data tidak bisa diakses)
menjadi direktori mitra industri yang sudah publik, dengan jalur kontak ke sekolah
(bukan langsung ke partner).

## Alur Pengguna
1. Pengunjung buka `smkmuh1-skh.sch.id/mitra-industri` — grid/list mitra industri per jurusan
2. Filter jurusan (client-side, dari `data/mitra.json`)
3. Tiap kartu: logo/nama mitra, jurusan terkait, bidang kerja sama singkat
4. Tombol **"Tanya PKL ke Sekolah"** — buka WhatsApp ke koordinator BKK dengan pesan
   pre-filled: *"Halo, saya ingin tanya soal PKL di [nama mitra] untuk jurusan
   [jurusan]"*

## Wireframe
```
Filter: [Semua Jurusan v]

+---------------------------------------+
| PT Daihatsu               [TKR]        |
| Praktik kerja & budaya industri        |
| otomotif                               |
|              [Tanya PKL via WA ->]     |
+---------------------------------------+
| PT Git Solution            [PPLG]      |
| Pembuatan aplikasi Android              |
|              [Tanya PKL via WA ->]     |
+---------------------------------------+
```
*(Wireframe ilustratif — bisa dikembangkan jadi grid logo besar dengan hover detail,
bukan list vertikal sederhana seperti sketsa di atas)*

## Data Model (JSON Statis — BUKAN Database)
```json
// data/mitra.json
[
  {
    "id": "1",
    "nama": "PT Daihatsu",
    "jurusan": "TKR",
    "bidangKerjaSama": "Praktik kerja & budaya industri otomotif",
    "logoUrl": "/images/mitra/daihatsu.png"
  }
]
```

## API Routes
Tidak ada — data dibaca langsung dari file JSON di komponen halaman (import langsung),
sesuai prinsip menjaga halaman ini tetap ringan/cepat.

## Validasi & Edge Cases
| Kasus | Penanganan |
|---|---|
| Filter tidak menemukan hasil | Tampilkan: "Belum ada mitra untuk jurusan ini saat ini" |
| Logo mitra tidak tersedia | Fallback ke ikon generik bangunan/pabrik |

## Integrasi
Data mitra menjadi etalase publik mitra industri yang sudah bekerja sama dengan
sekolah per jurusan, dengan jalur kontak terpusat ke koordinator BKK.

## Definition of Done
- [ ] List mitra tampil dengan filter jurusan berfungsi
- [ ] Tombol WhatsApp mengarah ke kontak sekolah (bukan ke mitra langsung)

---

# FITUR #5 — Chatbot FAQ Hybrid (Rule-Based + Gemini Fallback)

## Konsep
Chatbot dengan scope terbatas & fokus (FAQ seputar sekolah), meniru pola yang
terbukti berhasil di benchmark juara 1 JHIC — bukan mencoba menjawab segalanya.
Kapabilitas rekomendasi jurusan (menggantikan fitur Quiz) terintegrasi di sini.

## Alur Pengguna
1. Widget floating (ikon chat) muncul di pojok kanan bawah, di semua halaman (domain
   utama maupun subdomain PPDB)
2. Klik ikon → panel chat terbuka, pesan pembuka otomatis dari bot: *"Halo! Saya
   asisten virtual SMK Mutuharjo. Tanya seputar PPDB, jurusan, atau info sekolah ya!"*
3. User ketik pertanyaan → kirim
4. **Layer 1 (Rule-based):** sistem cek keyword pertanyaan terhadap `lib/faq-data.ts`
   — kalau ada match, jawab instan tanpa API call
5. **Layer 2 (Fallback Gemini, opsional):** kalau tidak ada match di Layer 1, kirim
   pertanyaan ke Gemini API dengan system prompt berisi seluruh FAQ + deskripsi 6
   jurusan sebagai context
6. **Kapabilitas rekomendasi jurusan:** kalau pertanyaan mengandung kata kunci minat
   ("suka", "minat", "cocok jurusan apa", dll) → bot merespons dengan 2-3 pertanyaan
   ringan balik, lalu memberi rekomendasi jurusan + alasan singkat berdasarkan jawaban
7. **Kalau Gemini API gagal/limit habis:** fallback ke jawaban default — *"Maaf, saya
   belum bisa jawab pertanyaan itu"* — dan tombol eskalasi WA (Fitur #7) otomatis
   muncul lebih menonjol (Fitur #6)

## Wireframe
```
                          +-------------------+
                          | Asisten SMK        |
                          | Mutuharjo    [x]   |
                          +-------------------+
                          | Bot: Halo! Tanya    |
                          | seputar PPDB...     |
                          |                     |
                          |      User: Biaya    |
                          |      daftar berapa? |
                          |                     |
                          | Bot: Biaya daftar   |
                          | Rp100.000...        |
                          +-------------------+
                          | [Ketik pesan...] [>]|
                          | [ Hubungi Admin ]   |
                          +-------------------+
                                        (icon float)
```
*(Wireframe ilustratif — posisi widget, warna bubble chat, animasi buka/tutup panel
bebas dirancang tim UI/UX; boleh juga ditambah avatar bot atau efek typing indicator
untuk pengalaman lebih hidup)*

## Data Structure (Rule-Based FAQ)
```ts
// lib/faq-data.ts
export const faqData = [
  {
    keywords: ["ppdb", "daftar", "pendaftaran"],
    answer: "Pendaftaran PPDB dibuka mulai [tanggal]. Kamu bisa daftar langsung di halaman PPDB kami!"
  },
  {
    keywords: ["biaya", "bayar", "uang pendaftaran"],
    answer: "Biaya pendaftaran sebesar Rp100.000, bisa dibayar via transfer bank."
  }
  // ... isi lengkap dengan FAQ jurusan, jadwal, syarat, dll
];
```

## API Routes
| Method | Route | Fungsi |
|---|---|---|
| `POST` | `/api/chatbot` | Terima `{ message }`, return `{ answer, source }` (rule-based / gemini / fallback) |

## Validasi & Edge Cases
| Kasus | Penanganan |
|---|---|
| Gemini API error/rate limit | Catch error, langsung fallback ke jawaban default, JANGAN crash widget |
| Pesan kosong | Disable tombol kirim sampai ada teks |
| Histori percakapan terlalu panjang | Batasi tampilan ke 20 pesan terakhir agar tidak berat |
| Pertanyaan di luar topik sekolah | Rule-based tidak match → fallback jujur: "Informasi saya terbatas seputar sekolah" |

## Integrasi
Terhubung ke Fitur #6 (tombol eskalasi) sebagai bagian dari panel widget yang sama.

## Definition of Done
- [ ] Widget muncul konsisten di semua halaman (domain utama & subdomain)
- [ ] Layer 1 rule-based menjawab FAQ umum dengan akurat
- [ ] Fallback ke Gemini berjalan tanpa crash jika API gagal
- [ ] Kapabilitas rekomendasi jurusan berfungsi untuk pertanyaan minat/kepribadian
- [ ] Tombol eskalasi WA muncul saat bot tidak bisa menjawab

---

# FITUR #6 — Tombol Eskalasi ke WhatsApp Admin

## Konsep
Jalur cepat ke manusia ketika chatbot tidak bisa membantu — komponen UI murni,
reuse di beberapa tempat.

## Alur Pengguna
1. **Dari dalam widget chatbot (Fitur #5):** tombol "Hubungi Admin" selalu terlihat
   di bagian bawah panel chat
2. **Dari halaman Kontak:** tombol besar mandiri "Chat Admin via WhatsApp"
3. Klik → buka `wa.me` dengan nomor admin, pesan pre-filled kontekstual

## Wireframe
Tombol sederhana, ikon WhatsApp + teks "Hubungi Admin".
*(Wireframe ilustratif — warna, ukuran, dan posisi tombol bebas disesuaikan tim
UI/UX mengikuti design system, selama tetap mudah ditemukan pengguna)*

## Data Model & API
Tidak perlu — murni komponen UI yang mengambil nomor admin dari environment variable
(`NEXT_PUBLIC_ADMIN_WA_NUMBER`), bukan hardcode di banyak file.

## Validasi & Edge Cases
| Kasus | Penanganan |
|---|---|
| Nomor admin berubah di kemudian hari | Cukup update 1 env variable, tidak perlu ubah kode di banyak tempat |

## Integrasi
Dipakai di Fitur #5 (chatbot) dan halaman Kontak.

## Definition of Done
- [ ] Tombol berfungsi di kedua lokasi (widget chatbot & halaman Kontak)
- [ ] Pesan pre-filled sesuai konteks masing-masing lokasi

---

# FITUR #7 — Landing Page & Design System

## Konsep
Landing page baru yang memperbaiki menu mati & celah keamanan dari situs lama,
mengadopsi pola yang terbukti efektif dari benchmark (statistik hero, storytelling
partner), dengan identitas visual sendiri (anti-cliché, lihat Constitution 2.4).

## Alur Pengguna (Struktur Halaman, Single Scroll)
1. **Hero Section:** headline utama + CTA "Daftar PPDB" (mengarah ke `/ppdb` info,
   BUKAN langsung ke subdomain) + statistik (jumlah Jurusan, Siswa Aktif, Alumni)
2. **Section Program Keahlian:** 6 kartu jurusan (TSM, TJKT, TP, TKR, PPLG, TE),
   klik → halaman detail `/jurusan/[slug]`
3. **Section Testimoni Alumni:** 4 testimoni asli (data dari web lama)
4. **Section Kerjasama Industri:** logo partner + deskripsi singkat kolaborasi
5. **Section Berita Terbaru:** grid 3 artikel terbaru (opsional load dari database)
6. **Section Fasilitas:** Wifi, CCTV, Lab Komputer, Bengkel
7. **Footer:** menu lengkap, kontak, sosial media, **5 logo wajib kompetisi**, link
   Syarat & Ketentuan + Kebijakan Privasi

## Wireframe (Struktur Section, Bukan Detail Visual)
```
+-----------------------------------------+
|  [Navbar sticky + CTA Daftar PPDB]       |
+-----------------------------------------+
|  HERO: Headline + Statistik              |
+-----------------------------------------+
|  PROGRAM KEAHLIAN (6 kartu)              |
+-----------------------------------------+
|  TESTIMONI ALUMNI (4 kutipan)            |
+-----------------------------------------+
|  KERJASAMA INDUSTRI (logo grid)          |
+-----------------------------------------+
|  BERITA TERBARU (3 kartu)                |
+-----------------------------------------+
|  FASILITAS (4 poin ikon)                 |
+-----------------------------------------+
|  FOOTER (menu + kontak + 5 logo)         |
+-----------------------------------------+
```
*(Wireframe ilustratif — ini hanya urutan section, BUKAN desain final. Tim UI/UX
bebas menentukan gaya visual tiap section: layout grid vs carousel, animasi scroll,
komposisi gambar, dsb — selama tetap sesuai design system anti-cliché)*

## Data Model
Sebagian besar konten statis/hardcoded di komponen. Opsional terhubung ke database
untuk Berita (model `Berita`, dikelola via Fitur #8).

## API Routes
| Method | Route | Fungsi |
|---|---|---|
| `GET` | `/api/berita?limit=3` | Ambil berita terbaru untuk section landing page (opsional) |

## Validasi & Edge Cases
| Kasus | Penanganan |
|---|---|
| Belum ada berita di database | Sembunyikan section "Berita Terbaru" sepenuhnya, atau tampilkan artikel default statis |
| Gambar testimoni/partner gagal dimuat | Sediakan fallback gambar placeholder |

## Integrasi
Halaman ini adalah pusat navigasi ke semua fitur lain, termasuk halaman info PPDB
(Fitur #1) yang menjadi jembatan ke subdomain pendaftaran.

## Definition of Done
- [ ] Semua section tampil sesuai urutan, responsive mobile
- [ ] Semua menu navigasi berfungsi (tidak ada lagi link mati)
- [ ] Footer lengkap dengan 5 logo wajib + halaman legal
- [ ] Sesuai design system anti-cliché

---

# FITUR #8 — Panel Admin CRUD Sederhana

## Konsep
Memungkinkan guru/panitia sekolah mengelola konten tanpa perlu developer, dengan
autentikasi session sederhana (bukan JWT + refresh token). Panel ini berada di
**domain utama**, tapi karena berbagi 1 database yang sama, admin bisa mengelola
data yang masuk dari subdomain PPDB juga.

## Alur Pengguna
1. Admin buka `smkmuh1-skh.sch.id/admin/login` → isi username & password → submit
2. Sistem validasi terhadap tabel `Admin` (password di-hash via bcrypt) → jika benar,
   set session cookie → redirect ke `/admin/dashboard`
3. Dashboard menampilkan **sidebar menu**: Berita, Produk BLUD, Data PPDB, Konfirmasi
   Pembayaran
4. **Berita & Produk BLUD:** CRUD penuh (Tambah/Edit/Hapus) dengan form + upload gambar
5. **Data PPDB & Konfirmasi Pembayaran:** lihat list + update status saja
6. Tombol Logout di header → hapus session cookie → redirect ke login

## Wireframe
```
+--------+------------------------------+
| Sidebar | Kelola Produk BLUD  [+Tambah]|
| Berita  | +--------------------------+ |
| BLUD    | | Nama | Jurusan | Aksi     | |
| PPDB    | | Servis Motor | TSM | E/H  | |
| Bayar   | | Aplikasi X | PPLG | E/H   | |
| [Logout]| +--------------------------+ |
+--------+------------------------------+
```
*(Wireframe ilustratif — layout dashboard, warna sidebar, dan gaya tabel bebas
disesuaikan tim UI/UX; boleh dibuat lebih modern dengan card summary di atas tabel)*

## Data Model
```prisma
model Admin {
  id           String   @id @default(uuid())
  username     String   @unique
  passwordHash String
  createdAt    DateTime @default(now())
}
```

## API Routes
| Method | Route | Fungsi |
|---|---|---|
| `POST` | `/api/auth/login` | Validasi kredensial, set session |
| `POST` | `/api/auth/logout` | Hapus session |
| `POST/PUT/DELETE` | `/api/admin/berita`, `/api/admin/blud` | CRUD masing-masing resource |
| `PATCH` | `/api/admin/ppdb/:id`, `/api/admin/pembayaran/:id` | Update status |

Pengecekan sesi admin diterapkan pada rute halaman `/admin/*` via Next.js Middleware / Guard, dan pada rute API `/api/admin/*` via Express Middleware (`requireAdminSession`).

## Validasi & Edge Cases
| Kasus | Penanganan |
|---|---|
| Akses `/admin/dashboard` tanpa login | Redirect otomatis ke `/admin/login` |
| Password salah berkali-kali | Untuk skala lomba, boleh dilewati dulu; tambahkan rate limit jika waktu cukup |

## Integrasi
Titik kontrol data untuk Fitur #3 (BLUD), #1-#2 (lihat/verifikasi
data PPDB dari subdomain — mungkin lewat 1 database bersama), dan Fitur #7 (kelola berita).

## Definition of Done
- [ ] Login/logout berfungsi dengan session sederhana
- [ ] CRUD Berita & Produk BLUD lengkap
- [ ] Admin bisa update status PPDB & Pembayaran (data dari subdomain terlihat di sini)
- [ ] Semua route admin terproteksi dari akses tanpa login

---

# FITUR #9 — Technical SEO Dasar

## Konsep
Memastikan website mudah ditemukan di mesin pencari.

## Implementasi (Bukan Alur Interaktif, Konfigurasi Teknis)
1. `app/sitemap.ts` — generate otomatis daftar seluruh URL publik domain utama
   (landing, jurusan, BLUD, mitra-industri). **Subdomain PPDB SENGAJA TIDAK dimasukkan** ke
   sitemap utama karena bersifat transaksional, bukan konten yang perlu terindeks
2. `app/robots.ts` — izinkan crawling halaman publik domain utama, KECUALI `/admin/*`
3. Setiap halaman punya `generateMetadata()` unik: title, description, Open Graph image
4. Semantic HTML: hanya 1 tag `<h1>` per halaman, semua gambar punya `alt` text deskriptif

## Data Model & API
Tidak ada — murni konfigurasi file.

## Validasi & Edge Cases
| Kasus | Penanganan |
|---|---|
| Halaman dinamis (misal `/blud/[id]`) belum ada di sitemap | Sitemap harus generate URL dinamis juga dengan query ke database saat build/request |

## Definition of Done
- [ ] `sitemap.xml` bisa diakses dan berisi semua halaman publik domain utama
- [ ] `robots.txt` valid dan benar mengecualikan halaman privat
- [ ] Skor Lighthouse SEO 90+
- [ ] Semua gambar punya alt text

---

# FITUR #10 — Load Test & Dokumentasi Performa

## Konsep
Bukti nyata kestabilan website untuk kriteria Final Day (bobot 40%) — dikerjakan
menjelang deadline.

## Alur Kerja Tim (Bukan Fitur User-Facing)
1. Setelah semua fitur dideploy ke VPS, jalankan load test **untuk KEDUA domain**
   (utama dan subdomain PPDB terpisah, karena keduanya punya karakteristik trafik
   berbeda — PPDB berpotensi lebih ramai saat periode pendaftaran):
   ```
   autocannon -c 50 -d 30 https://smkmuh1-skh.sch.id
   autocannon -c 50 -d 30 https://ppdb.smkmuh1-skh.sch.id
   ```
2. Screenshot hasil kedua tes: requests/sec, latency p50/p99, error rate
3. Jalankan Lighthouse audit untuk halaman utama di kedua domain
4. Kalau skor rendah, cek bottleneck (gambar belum compress, query N+1, dsb)
5. Dokumentasikan hasil di halaman "Uji Performa & Hasil Analisis" (deck Final Day)

## Data Model & API
Tidak ada — deliverable dokumentasi.

## Definition of Done
- [ ] Load test dijalankan untuk domain utama DAN subdomain PPDB, terdokumentasi
- [ ] Lighthouse audit dijalankan untuk halaman utama di kedua domain
- [ ] Jika ada skor rendah, sudah dilakukan minimal 1 iterasi optimasi
- [ ] Hasil siap dimasukkan ke slide "Uji Performa & Hasil Analisis"

---

# RINGKASAN KETERHUBUNGAN ANTAR FITUR

```
DOMAIN UTAMA (smkmuh1-skh.sch.id)
  Landing Page (7) --+-- /ppdb (info) --[tombol Daftar Sekarang]--> SUBDOMAIN
                      +-- BLUD Showcase (3)
                      +-- Direktori Mitra (4)
                      +-- Chatbot (5) --> Eskalasi WA (6)
                      +-- Panel Admin (8) -- mengelola data (1)(2)(3)(7)

SUBDOMAIN (ppdb.smkmuh1-skh.sch.id) -- 1 proses & 1 DB yang sama dengan domain utama
  Form Multi-Step (1) --> Konfirmasi Bayar (2) --> Cek Status

SEO (9) & Load Test (10) -- diterapkan di kedua domain, dikerjakan terakhir
```
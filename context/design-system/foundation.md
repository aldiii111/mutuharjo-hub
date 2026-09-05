<!--
╔══════════════════════════════════════════════════════════════════════════╗
║  AGENT INSTRUCTION — BACA SEBELUM APAPUN                               ║
║                                                                          ║
║  File ini adalah FONDASI (Layer 0). DILARANG KERAS diedit tanpa          ║
║  perintah eksplisit dari user berupa: "ubah fondasi [nama aturan]".      ║
║                                                                          ║
║  Ketika user minta "ganti warna", "ganti tema", atau "ubah gaya":        ║
║  → Edit visual-style.md (bukan file ini).                                ║
║                                                                          ║
║  Ketika user minta "tambah komponen" atau "ubah layout":                 ║
║  → Edit components.md (bukan file ini).                                  ║
║                                                                          ║
║  Seluruh isi file ini adalah NON-NEGOTIABLE untuk identitas,             ║
║  aksesibilitas, dan integritas institusional website sekolah.            ║
╚══════════════════════════════════════════════════════════════════════════╝
-->

# FONDASI DESIGN SYSTEM — Mutuharjo Hub
> **Layer 0 — Fondasi Tak-Berubah**
> Nilai konkret warna/font/radius ada di → [`visual-style.md`](./visual-style.md)
> Pola komponen & halaman ada di → [`components.md`](./components.md)

---

## F1. Design Philosophy (Identitas Brand)

Situs ini adalah website **resmi institusi pendidikan**. Bukan startup, bukan SaaS, bukan portofolio kreatif.

- **Formal · Institutional · Trustworthy** — setiap keputusan visual harus memperkuat kepercayaan calon siswa, orang tua, dan mitra industri.
- **Anti-cliché**: tidak ada gradient neon, tidak ada claymorphism playful, tidak ada emoji sebagai elemen UI, tidak ada data/testimoni palsu.
- **Content-first**: ornamen visual hanya mendukung hierarki informasi — tidak pernah menjadi fokus sendiri.
- **Reduced-motion first**: animasi bersifat opsional, ≤ 150 ms, dan non-essential animation **wajib dimatikan** saat `prefers-reduced-motion: reduce` aktif.

---

## F2. Semantic Token Contract

Nama-nama token semantik berikut adalah **kontrak permanen**. Nilai OKLCH konkretnya ada di `visual-style.md §V1` dan boleh berubah — tapi nama dan fungsinya tidak boleh berubah.

> **Konvensi penting**: Token mengikuti standar **shadcn/ui** (tanpa prefix `color-`, tanpa prefix `--color-`). Tailwind v4 mengaksesnya lewat `@theme inline` di `globals.css` — lihat `visual-style.md §V7`. Komponen mengkonsumsi via class Tailwind: `bg-primary`, `text-muted-foreground`, dst.

| CSS Variable | Tailwind Class | Fungsi Semantik | Catatan Penting |
|-------------|---------------|----------------|-----------------|
| `--background` | `bg-background` / `text-background` | `<body>`, section utama | Bukan pure white (#FFF) — warm off-white |
| `--foreground` | `text-foreground` | Teks default di atas background | |
| `--primary` | `bg-primary` / `text-primary` | Brand biru utama — CTA, link utama, badge aktif | Wajib kontras ≥ 4.5:1 di atas `background` |
| `--primary-foreground` | `text-primary-foreground` | Teks di atas elemen `primary` | Hampir selalu putih |
| `--secondary` | `bg-secondary` / `text-secondary` | Background hover, secondary surface | Tone netral, bukan warna kontras |
| `--secondary-foreground` | `text-secondary-foreground` | Teks di atas `secondary` | |
| `--accent` | `bg-accent` / `text-accent` | Highlight statistik, label kompetisi, ikon premium | **Beda dari `success`** — jangan gabungkan |
| `--accent-foreground` | `text-accent-foreground` | Teks di atas `accent` | |
| `--card` | `bg-card` | Card, modal, panel admin | Sedikit lebih terang dari `background` |
| `--card-foreground` | `text-card-foreground` | Teks di atas `card` | |
| `--popover` | `bg-popover` | Dropdown, tooltip, popover | |
| `--popover-foreground` | `text-popover-foreground` | Teks di atas `popover` | |
| `--muted` | `bg-muted` | Placeholder, disabled, background ringan | |
| `--muted-foreground` | `text-muted-foreground` | Teks sekunder, caption, label lemah | |
| `--border` | `border-border` | Border card, input, tabel, divider | |
| `--input` | `border-input` | Border khusus input form | |
| `--ring` | `ring-ring` | Focus ring | Biasanya sama dengan `primary` |
| `--destructive` | `bg-destructive` / `text-destructive` | Error form, toast gagal, status "Ditolak" | **Harus merah asli** — hue 20–35, bukan hitam/biru |
| `--destructive-foreground` | `text-destructive-foreground` | Teks di atas `destructive` | Hampir selalu putih |
| `--success` | `bg-success` / `text-success` | Toast sukses, status "Terverifikasi" | **Harus hijau asli** — hue 130–155, beda dari `accent` |
| `--success-foreground` | `text-success-foreground` | Teks di atas `success` | Hampir selalu putih |

> **KONTRAK DESTRUCTIVE/SUCCESS**: Token `--destructive` WAJIB terasa sebagai "bahaya/merah" dan `--success` WAJIB terasa sebagai "aman/hijau" — terlepas dari skema warna yang dipilih. Jangan pernah assign `--destructive` ke biru/hitam atau `--success` ke biru/ungu.

> **Note untuk agent**: `--success` adalah token **custom non-shadcn** (shadcn tidak punya token ini secara default). Wajib di-expose lewat `@theme inline { --color-success: var(--success); }` di `globals.css` agar bisa dipakai sebagai class Tailwind `bg-success`.

---

## F3. Spacing & Layout Principles (8px Grid)

Sistem spacing menggunakan grid 8px. Aturan ini **tidak berubah** ketika gaya visual berganti.

### Skala spacing

| Token | Nilai | Multiplier |
|-------|-------|-----------|
| `--space-0` | 0px | — |
| `--space-1` | 4px | 0.5× |
| `--space-2` | 8px | 1× |
| `--space-3` | 12px | 1.5× |
| `--space-4` | 16px | 2× |
| `--space-5` | 24px | 3× |
| `--space-6` | 32px | 4× |
| `--space-8` | 48px | 6× |
| `--space-10` | 80px | 10× |

### Aturan ritme vertikal

- **Dalam satu section** (antar elemen kecil): `space-y-4` (16px)
- **Dalam satu section** (antar block besar): `space-y-6` (24px)
- **Antar section besar** (landing page, halaman panjang): `--space-8` (48px) sampai `--space-10` (80px)
- **Dilarang** memakai `space-4`/`space-6` sebagai pemisah antar section besar — halaman akan terasa terlalu padat

### Container

- **Max-width**: `1280px` (Tailwind: `max-w-7xl`), centered, auto-margin
- **Padding horizontal**: `px-4 sm:px-6 lg:px-8`
- **Gutters antar kolom**: `gap-5` (24px)

---

## F4. Typography Hierarchy Rules

Hierarki tipografi berikut adalah **kontrak — tidak berubah ketika font family berganti**. Font family konkret ada di `visual-style.md`.

| Element | Role | Rule |
|---------|------|------|
| `h1` | Heading utama halaman | `font-heading`, ≥ 2.25rem (36px), weight 700, `leading-tight` |
| `h2` | Heading section | `font-heading`, ≥ 1.875rem (30px), weight 600–700, `leading-snug` |
| `h3` | Sub-heading, judul card | `font-heading`, ≥ 1.5rem (24px), weight 600, `leading-normal` |
| `body` | Teks paragraf utama | `font-body`, 1rem (16px), weight 400, `leading-relaxed` |
| `small` | Label, metadata | `font-body`, 0.875rem (14px), weight 400 |
| `caption` | Keterangan gambar, hint | `font-body`, 0.75rem (12px), muted |

**Aturan tambahan:**
- `h1` di hero landing page minimal `text-4xl` mobile / `text-6xl` desktop, `leading-tight`, `tracking-tight` — hero butuh *presence* lebih besar dari h1 halaman biasa.
- `font-heading` WAJIB berbeda family dari `font-body` — jangan pakai font yang sama untuk keduanya (akan membuat hierarki terasa datar).
- Semua nilai heading menggunakan `font-heading`; teks panjang (form, deskripsi, paragraf) menggunakan `font-body`.

---

## F5. Accessibility Requirements (WCAG)

Aturan aksesibilitas berikut berlaku **tanpa pengecualian**, terlepas dari tema warna yang dipilih.

### Kontras warna

- Teks utama: rasio kontras **≥ 4.5:1** (WCAG AA, target AAA)
- Elemen UI non-teks (border, ikon): rasio kontras **≥ 3:1**
- Token `--destructive`/`--success` di atas `--background` dan `--card` — **wajib dihitung aktual** setiap kali nilainya berubah, bukan diasumsikan dari nilai OKLCH

### Focus & keyboard

- Semua elemen interaktif wajib punya `focus-visible:ring-2 focus-visible:ring-primary`
- Tidak boleh ada interaksi hover-only tanpa focus state yang setara
- Keyboard navigation harus bisa menjangkau semua fungsi UI

### Reduced motion

- Non-essential animations (carousel autoplay, transisi dekoratif) **wajib dimatikan** saat `prefers-reduced-motion: reduce`
- Semua animasi ≤ 150 ms

### Semantic HTML

- Satu `<h1>` per halaman
- Landmark wajib: `<header>`, `<main>`, `<footer>`, `<nav aria-label="...">`
- Skip link "Lewati ke konten utama" di awal `<body>`
- Form: label `htmlFor`/`id` terhubung; error di-`aria-describedby` ke input
- Ikon dekoratif: `aria-hidden="true"`; ikon fungsional: `aria-label` wajib
- Stepper PPDB: `aria-current="step"`, indikasi visual step error/belum lengkap

### Empty state

- Filter hasil kosong (BLUD, Mitra) harus punya pesan yang mengarahkan aksi berikutnya — bukan hanya "tidak ada data"

### Checklist per PR/halaman

- [ ] Semua teks kontras ≥ 4.5:1 (light dan dark) — **dihitung aktual**
- [ ] Elemen interaktif: `focus-visible:ring-2`
- [ ] Form label terhubung ke input
- [ ] Error message: `aria-describedby`
- [ ] Ikon: `aria-hidden` atau `aria-label`
- [ ] `prefers-reduced-motion` mematikan animasi non-essential
- [ ] Skip link ada di `<body>`
- [ ] Landmark HTML5 lengkap
- [ ] Responsive test: 375px, 768px, 1024px, 1440px
- [ ] Dark mode manual test (toggle OS)

---

## F6. Layout Patterns per Halaman

Urutan section dan struktur layout per halaman berikut **tidak boleh berubah tanpa sprint review**. Ini adalah arsitektur informasi, bukan pilihan gaya.

| Halaman | Struktur Section (urutan) | Catatan Kritis |
|---------|---------------------------|----------------|
| **Landing (F7)** | Hero → Jadwal & Cara Daftar (3 langkah + CTA) → Program Keahlian (6 jurusan) → Testimoni Carousel → Kerjasama Industri → Berita (3 kartu) → Fasilitas (strip ikon) → Footer | Hero: focal point ke CTA "Daftar PPDB". Program Keahlian: hierarki (1 unggulan besar + sisanya), **bukan** grid 3 kolom identik. Fasilitas: strip ikon horizontal — konten terlalu singkat untuk kartu bershadow. |
| **PPDB Info** | Hero info → Timeline 5 tahap → Syarat & Biaya → CTA ke subdomain | Timeline: Layout zigzag diizinkan di desktop dengan fallback vertikal di mobile. |
| **Subdomain Form** | Stepper (4 step) → Form per step (2 kol desktop / 1 kol mobile) → Review → Submit | `localStorage` draft per step. Stepper: vertikal, ikon/nomor kiri + garis penghubung. |
| **BLUD Showcase** | Filter chips (jurusan) → Grid produk (3 kol) → Detail modal | Empty state jika filter kosong. |
| **Direktori Mitra** | Filter chips → List kartu mitra → CTA WA | Logo fallback `Building2`. Empty state eksplisit. |
| **Chatbot FAQ** | Floating button (kanan bawah) → Panel slide-up → Bubble chat | `TypingIndicator` wajib saat menunggu Layer 2 (Gemini, ≤ 3 detik). Tombol "Hubungi Admin" selalu visible. |
| **Admin Dashboard** | Sidebar (collapsible) → Header → Widget ringkasan tugas → Content area | Sidebar: `w-64` / collapsed `w-16`. Widget ringkasan di atas tabel — entry point berbasis tugas. |
| **404 / 500** | Center card: ilustrasi SVG + teks + CTA "Kembali ke Beranda" | Tidak ada emoji. |

**Aturan layout lintas halaman:**
- Carousel / horizontal-scroll **wajib** punya kontrol next/prev yang terlihat (tombol panah minimal) — tidak boleh hanya `overflow-x-auto` tanpa affordansi
- Timeline/stepper **diizinkan** menggunakan layout zigzag (kiri-kanan alternating) untuk Desktop asalkan memiliki *fallback* vertikal *single-column* (nomor di kiri, konten di kanan) pada layar Mobile/Tablet.
- Jangan seragamkan semua section jadi grid 3 kolom identik — ikuti catatan per halaman di atas

---

## F7. Iconography Rules

- **Set ikon**: Lucide (outline, stroke 2px, `currentColor`) — gunakan konsisten di seluruh situs
- Heroicons (outline) diizinkan sebagai alternatif jika Lucide tidak punya ikon yang sesuai
- Semua ikon SVG fungsional wajib `aria-label` atau `<title>`
- Ikon dekoratif wajib `aria-hidden="true"`
- Import contoh (React): `import { Home, Phone } from 'lucide-react';`
- Ukuran standar: `h-5 w-5` (inline), `h-6 w-6` (standalone/navigasi)

---

## F8. Copy & Voice Tone

Bahasa situs: **Indonesia formal-hangat**. Bukan bahasa gaul, bukan bahasa birokrasi kaku.

| Prinsip | Benar | Salah |
|---------|-------|-------|
| Sapa resmi tapi ramah | "Selamat datang di SMK Mutuharjo." | "Halo! Selamat datang ya 😊" |
| Jelas & singkat | "Biaya pendaftaran Rp100.000." | "Untuk biaya pendaftarannya kami tetapkan sebesar seratus ribu rupiah." |
| Aktif, bukan pasif | "Kami verifikasi pembayaran dalam 1×24 jam." | "Pembayaran akan diverifikasi dalam 1×24 jam." |
| Hindari jargon teknis | "Unggah bukti transfer (maks 2 MB, JPG/PNG/WebP)." | "Upload file bukti transfer dengan ukuran maksimal 2 megabytes." |
| Tanda baca benar | "PPDB dibuka 1 Juli – 31 Agustus." | "PPDB dibuka 1 Juli — 31 Agustus." (em-dash dilarang) |

---

## F9. Anti-Patterns (Dilarang Keras)

Daftar ini **dikunci permanen**. Tidak ada pengecualian kecuali ada catatan "Pengecualian" eksplisit.

### Visual

| Pola Terlarang | Alasan | Pengganti |
|----------------|--------|-----------|
| Gradient neon / purple-pink | Terlihat AI-generated, tidak formal | Flat color token |
| Glassmorphism / liquid glass | Performa & aksesibilitas buruk | Solid surface + border |
| **Pengecualian Navbar**: `backdrop-blur-md` ringan diizinkan pada Navbar floating pill | — | — |
| Drop shadow besar/blur | Claymorphism | Subtle `--shadow-sm/md` |
| Rounded corner radius > 12px | Tidak konsisten | `--radius-lg` (12px) max — kecuali badge/pill kecil |
| Dekorasi dashed/cutout acak di Hero | Visual noise, tidak institusional | Subtle dot pattern atau garis tipis |
| Colored left stripe pada card | Visual noise | Border `border-primary` tipis jika perlu |
| Radial orbs / sparkle icons | Visual clutter | Tidak dipakai |
| Bento grids tanpa alasan fungsional | Hype trend, bukan konten | Grid biasa `gap-5` |
| Terminal window UI | Tidak cocok sekolah | Card biasa |
| 3 feature cards identik untuk semua section | Template SaaS generik | Grid sesuai sifat konten (lihat F6) |

### Tipografi & Font

| Pola Terlarang | Alasan | Pengganti |
|----------------|--------|-----------|
| **Inter** | Overused di template AI | Plus Jakarta Sans (body) atau alternatif yang disetujui |
| **Geist** | Overused di template AI | — |
| **Space Grotesk** | Overused di template AI | — |
| Font body == Font heading | Hierarki datar | Dua font berbeda untuk heading dan body |

> **Note untuk agent**: Ketika mengganti font di `visual-style.md`, wajib cross-check daftar font terlarang di atas sebelum commit.

### Konten & Data

| Pola Terlarang | Alasan | Pengganti |
|----------------|--------|-----------|
| Emoji sebagai ikon/bullet | Tidak scalable, inkonsisten cross-platform | Heroicons / Lucide SVG |
| Testimoni palsu / nama fiktif | Etika & kepercayaan institusional | Testimoni alumni otentik (lihat F10) |
| Foto hotlink dari internet | Tidak stabil, bisa DMCA | Placeholder `bg-muted` + komentar TODO |
| Lorem ipsum sebagai konten final | Tidak profesional | Data otentik dari F10 |
| Logo sponsor/kompetisi sebagai logo situs | Membingungkan identitas brand | Logo sekolah di header dan footer; logo partner di footer warna asli |
| Pure white background (#FFFFFF) | Terlalu klinis | Token `background` (warm off-white) |
| Rainbow coloring (banyak warna acak) | Memecah visual hierarchy | Primary + accent + netral |

### Aksesibilitas

| Pola Terlarang | Alasan | Pengganti |
|----------------|--------|-----------|
| Hover-only interaction tanpa focus | Aksesibilitas keyboard | Selalu `focus-visible` |
| Dark mode token = copy dari light | Bukan dark mode sungguhan | Hitung ulang tiap token |
| `em-dash` (—) panjang di copy | Copy pattern AI | Strip `-` atau en dash `–` |
| No TOS / Privacy Policy | Legal requirement | Footer link wajib |

---

## F10. Authentic Data Registry

> Data di bawah ini adalah **sumber kebenaran tunggal** untuk konten otentik sekolah.
> **Dilarang** mengganti dengan data palsu, lorem ipsum, atau placeholder tanpa komentar `{/* TODO */}`.

### A. Profil & Legitimasi Resmi

- **Nama Resmi**: SMK Muhammadiyah 1 Sukoharjo (SMK Mutuharjo)
- **Status Keunggulan**: SMK Center of Excellence (CoE) & SMK Pusat Keunggulan (PK) Kemendikbudristek
- **Akreditasi**: Terakreditasi A (Unggul)
- **Usia / Milad**: 33 Tahun Berkarya (Milad ke-33)
- **Motto / Tagline**: *"SMK Berkemajuan, Disiplin, Cerdas, Sukses"*

### B. 6 Program Keahlian (Jurusan) & Mitra DUDI

| Kode | Nama Jurusan | Keunggulan Spesifik | Mitra Industri Utama (DUDI) |
|:-----|:-------------|:--------------------|:----------------------------|
| **TSM** | Teknik Sepeda Motor | Bengkel resmi & kelas industri service Yamaha | Yamaha Indonesia Manufacture (YIM) |
| **TJKT** | Teknik Jaringan Komputer & Telekomunikasi | Praktik jaringan, IT operator, cloud, & Mikrotik | PT. Mitra Akses Globalindo |
| **TP** | Teknik Pemesinan | Teaching Factory (1 siswa 1 alat) produksi pesanan industri | Mitra Industri Manufaktur Solo Raya |
| **TKR** | Teknik Kendaraan Ringan | Budaya industri otomotif & perawatan kendaraan | PT. Daihatsu (Pintar Bersama Daihatsu) |
| **PPLG** | Pengembangan Perangkat Lunak & Gim | Pembuatan aplikasi Android, web, & software engineer | PT. GIT Solution (Amikom Jogja) |
| **TE** | Teknik Elektronika | Otomasi industri, mekatronika, & sistem kontrol | Industri Elektronika & Pertambangan |

### C. Testimoni Alumni Otentik (Carousel Landing)

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

## F11. Navbar & Footer — Satu Implementasi, Semua Halaman

- **Navbar** dan **Footer** HANYA ada **satu implementasi** — di `app/layout.tsx` (atau layout per route group). Dilarang menulis ulang markup header/nav dari nol per halaman.
- **Logo**: gunakan logo sekolah (file di `public/images/logo/`) pada header dan footer. Dilarang memakai logo sponsor/partner/kompetisi sebagai logo situs utama.
- **Logo kompetisi** (JHIC, Kemenag, Muhammadiyah, Sponsor, Media): HANYA di footer, tampil dengan warna asli.
- Sebelum menandai halaman "selesai": **bandingkan label nav, nama brand, warna, radius** dengan halaman lain yang sudah jadi — harus terasa dari satu situs yang sama.

---

*File ini adalah **living document** dengan satu syarat: **isi hanya boleh bertambah (klarifikasi/presisi), tidak boleh dihapus atau dilonggarkan** tanpa diskusi eksplisit dengan user.*

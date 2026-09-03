# AGENTS.md — Mutuharjo Hub (SMK Muhammadiyah 1 Sukoharjo)

Dokumen ini dibaca setiap agent (Antigravity, dan tool AI lain yang kompatibel)
sebelum mulai kerja di workspace ini. Isinya aturan keras (non-negotiable) +
pointer ke dokumen detail. Jangan duplikasi isi dokumen lain di sini — rujuk pakai
`@path/file.md`, jangan tempel ulang.

## Identitas Proyek
Website resmi SMK Muhammadiyah 1 Sukoharjo ("Mutuharjo Hub"). Formal, institutional,
trustworthy — sekolah kejuruan berbasis Islam, BUKAN startup/SaaS playful. Stack:
Next.js 15 App Router + TypeScript, Tailwind CSS (OKLCH tokens), shadcn/ui, Express.js 5
+ Prisma + PostgreSQL backend. Detail lengkap arsitektur: `@architecture.md`.

## Dokumen Rujukan (baca sebelum implementasi apa pun)

### Design System (v2.0 — 3 Layer)
- `@context/design-system/foundation.md` — 🔒 **FONDASI DIKUNCI.** Prinsip brand, semantic
  token contract, 8px grid, WCAG, layout per halaman, iconography, voice & tone,
  anti-patterns lengkap, data otentik sekolah. **Dilarang diedit** kecuali ada
  perintah eksplisit "ubah fondasi [nama aturan]".
- `@context/design-system/visual-style.md` — ✏️ **AGENT-EDITABLE.** Nilai OKLCH konkret,
  font family, radius, shadow, aesthetic concept, micro-motion, Tailwind config,
  globals.css template. Edit file ini ketika user minta ganti warna/tema/font.
  Setelah edit, wajib re-verifikasi kontras WCAG (`foundation.md §F5`).
- `@context/design-system/components.md` — 📦 Pola komponen (props, markup, domain
  components, checklist handoff). Edit jika ada komponen baru.
- `@context/master.md` — Index/navigasi ke 3 layer di atas.
- `@context/ui-context.md` — Living summary untuk tim FE (quick reference harian).

### Konteks Proyek Lainnya
- `@context/code-standards.md` — struktur folder, konvensi penamaan, pola Server/Client
  Component, standar API.
- `@context/project-overview.md` — spesifikasi lengkap 10 fitur (alur pengguna, data model,
  API routes, DoD per fitur).
- `@context/mvp.md` — breakdown task per sprint, termasuk task Landing Page (2.10–2.13) yang
  wajib dikerjakan utuh, bukan cuma Navbar/Footer.

## ATURAN KERAS — Konsistensi Lintas Halaman

Situs ini dibangun halaman per halaman oleh agent yang bisa saja tidak "ingat" konteks
sesi sebelumnya (lihat batasan Antigravity soal context reset antar sesi). Karena itu,
aturan berikut WAJIB dicek ulang setiap kali membuat/mengedit halaman, bukan cuma sekali
di awal:

1. **Navbar dan Footer HANYA ada satu implementasi**, ditaruh di `app/layout.tsx` (atau
   layout per route group), dan di-*reuse* di semua halaman lewat Next.js layout
   nesting. **Dilarang keras** menulis ulang markup header/nav dari nol per halaman —
   ini penyebab utama draft sebelumnya (hasil tool lain) punya 4 identitas brand
   berbeda-beda di 6 halaman yang seharusnya satu situs.
2. **Logo & nama brand di header wajib identik persis di semua halaman**: ikon
   `school` (Material Symbols, filled) + teks "SMK Mutuharjo". **Jangan pernah**
   memakai logo sponsor/partner/kompetisi (JHIC, Kemenag, dll) sebagai logo situs —
   logo-logo itu HANYA boleh muncul di footer, kecil, grayscale. Ini bug nyata yang
   pernah terjadi di draft sebelumnya — jangan diulang.
3. Sebelum menandai sebuah halaman "selesai", **buka ulang halaman lain yang sudah
   jadi** dan bandingkan: label nav, nama brand, warna, radius, spacing rhythm harus
   terasa berasal dari situs yang sama. Kalau ada perbedaan, perbaiki — jangan
   anggap "halaman ini kan beda konteks" sebagai alasan.
4. Komponen yang dipakai di lebih dari satu halaman (Button, Card, Badge, WaButton,
   FilterChips, dll) **wajib dibuat sekali** di `components/ui/` atau
   `components/features/` sesuai `@code-standards.md`, lalu di-*import* — bukan
   ditulis ulang inline setiap kali dipakai.

## ATURAN KERAS — Kualitas Visual (bukan cuma "benar", tapi "enak dilihat")

5. **Skala tipografi hero harus berani, bukan timid.** H1 di hero landing minimal
   `text-4xl` mobile / `text-6xl` desktop, `leading-tight`, `tracking-tight`. Jangan
   pakai skala heading standar §2 `master.md` (36px) untuk headline hero utama — itu
   ukuran untuk h1 halaman biasa, hero butuh presence lebih besar.
6. **Semua carousel/horizontal-scroll wajib punya kontrol next/prev yang terlihat**
   (tombol panah minimal, dot indicator opsional) — jangan cuma `overflow-x-auto`
   diam-diam tanpa afordansi, pengguna tidak akan tahu ada konten lain di sana.
7. **Elemen bertahap/berurutan (timeline SPMB, stepper form) pakai layout vertikal
   single-column** (ikon/nomor di kiri + garis penghubung, konten di kanan, stack ke
   bawah). **Jangan** pakai layout zigzag kiri-kanan alternating — itu fragile dan
   gampang pecah di breakpoint sempit.
8. **Jangan seragamkan semua section jadi grid 3 kolom identik.** Ikuti catatan
   layout per section di `@context/design-system/foundation.md §F6` — Program
   Keahlian butuh hierarki (1 unggulan besar + sisanya kecil), Fasilitas cukup
   strip ikon horizontal, bukan kartu besar bershadow untuk konten satu baris.
9. Token warna `danger` dan `success` WAJIB merah dan hijau asli —
   lihat `@context/design-system/visual-style.md §V1` untuk nilai aktual.
   Jangan improvisasi nilai warna sendiri untuk status/error/success.
10. Gambar: **tidak boleh hotlink/scrape gambar dari internet ke kode produksi.**
    Untuk foto yang belum tersedia (gedung sekolah, bengkel, siswa), buat placeholder
    jelas dengan komentar `{/* TODO: ganti dengan foto asli — [deskripsi] */}` dan
    styling `bg-muted` — JANGAN pakai URL gambar acak dari luar sebagai isi final.

## Checklist Sebelum Commit / Selesai Task

- [ ] Header & footer di halaman ini identik dengan halaman lain yang sudah ada
- [ ] Tidak ada logo sponsor/kompetisi dipakai sebagai logo situs
- [ ] Semua warna pakai token dari `@design-system/master.md`, tidak ada hex hardcode
- [ ] Kontras warna `danger`/`success` sudah benar (bukan hitam/kembar dengan accent)
- [ ] Komponen berulang sudah jadi component reuse, bukan copy-paste markup
- [ ] Carousel/scroll horizontal punya kontrol terlihat
- [ ] Timeline/stepper pakai layout vertikal, bukan zigzag
- [ ] Responsive test: 375px, 768px, 1280px
- [ ] `prefers-reduced-motion` mematikan animasi non-esensial

## Design System v2.0 — Aturan Agent (PENTING)

> [!IMPORTANT]
> Design system dipecah menjadi 3 layer sejak v2.0. Ketika user meminta perubahan,
> agent WAJIB tahu layer mana yang boleh disentuh:

| User Minta | Yang Boleh Diedit | Yang DILARANG Diedit |
|------------|------------------|---------------------|
| "Ganti warna / tema / font / radius" | `visual-style.md` | `foundation.md`, `components.md` |
| "Tambah / ubah komponen" | `components.md`, file komponen FE | `foundation.md` |
| "Buat halaman baru" | File halaman FE + update `components.md` | Urutan section di `foundation.md §F6` |
| "Ubah aturan aksesibilitas" | *(butuh izin eksplisit user)* `foundation.md` | — |

**Protokol wajib setelah edit `visual-style.md`:**
1. Cross-check font baru dengan daftar font terlarang di `foundation.md §F9`
2. Verifikasi kontras WCAG aktual untuk token yang berubah (khususnya `danger`/`success`)
3. Pastikan token dark mode DIHITUNG ULANG — bukan copy dari light mode

## Anti-Pattern (ringkasan — daftar lengkap di `@context/design-system/foundation.md §F9`)
Gradient neon, emoji sebagai ikon, glassmorphism, skeleton shimmer loader, radius
>12px, testimoni/data palsu, grid 3-kolom generik untuk semua jenis konten, font
Inter/Geist/Space Grotesk (pakai font yang disetujui di `visual-style.md §V2`),
hover-only tanpa focus, dark mode token copy dari light.

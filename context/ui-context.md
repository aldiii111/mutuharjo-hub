# UI Context — SMK Mutuharjo Hub

> **v2.0 — Dokumen ini adalah living summary** untuk tim FE yang butuh referensi cepat.
> Sejak v2.0, aturan lengkap ada di 3 layer terpisah di `context/design-system/`.
> File ini hanya merangkum hal yang paling sering dicek harian, plus pointer ke layer yang tepat.

---

## Quick Reference (untuk tim FE)

| Butuh apa? | Buka di mana? |
|------------|---------------|
| Token warna konkret (OKLCH) | [`design-system/visual-style.md §V1`](./design-system/visual-style.md) |
| Font family & ukuran heading | [`design-system/visual-style.md §V2`](./design-system/visual-style.md) |
| Radius, shadow, animasi | [`design-system/visual-style.md §V3, V5`](./design-system/visual-style.md) |
| globals.css template | [`design-system/visual-style.md §V7`](./design-system/visual-style.md) |
| Tailwind config snippet | [`design-system/visual-style.md §V6`](./design-system/visual-style.md) |
| Daftar komponen & props | [`design-system/components.md §C1`](./design-system/components.md) |
| HTML markup referensi (Button, Card, dll.) | [`design-system/components.md §C3`](./design-system/components.md) |
| Komponen per fitur (F1–F10) | [`design-system/components.md §C2`](./design-system/components.md) |
| Checklist sebelum merge | [`design-system/components.md §C5`](./design-system/components.md) |
| Prinsip aksesibilitas (WCAG) | [`design-system/foundation.md §F5`](./design-system/foundation.md) |
| Anti-patterns lengkap | [`design-system/foundation.md §F9`](./design-system/foundation.md) |
| Data otentik sekolah (testimoni, jurusan, dll.) | [`design-system/foundation.md §F10`](./design-system/foundation.md) |
| Layout per halaman (urutan section) | [`design-system/foundation.md §F6`](./design-system/foundation.md) |
| Identitas brand & filosofi | [`design-system/foundation.md §F1`](./design-system/foundation.md) |

---

## Checklist Aksesibilitas (Ringkasan Harian)

Checklist lengkap ada di `foundation.md §F5`. Ini versi ringkas untuk review cepat:

- [ ] Kontras teks ≥ 4.5:1 — **dihitung aktual**, bukan diasumsikan dari nilai OKLCH
- [ ] Semua elemen interaktif punya `focus-visible:ring-2 focus-visible:ring-primary`
- [ ] Form: `htmlFor`/`id` terhubung; error di-`aria-describedby`
- [ ] Ikon dekoratif: `aria-hidden="true"` — ikon fungsional: `aria-label` wajib
- [ ] `prefers-reduced-motion` mematikan animasi non-essential
- [ ] Skip link "Lewati ke konten utama" di awal `<body>`
- [ ] Landmark HTML5: `<header>`, `<main>`, `<footer>`, `<nav aria-label="...">`
- [ ] Stepper: `aria-current="step"`, indikasi visual step error/belum lengkap
- [ ] Carousel: tombol prev/next wajib terlihat
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] Dark mode: manual test (toggle OS)

---

## Color System — Ringkasan Penggunaan

Nilai OKLCH lengkap ada di `visual-style.md §V1`. Ini mapping penggunaan di komponen:

| Token | Contoh Penggunaan di Komponen |
|-------|------------------------------|
| `primary` | Tombol CTA, link utama, badge aktif, focus ring, dot timeline |
| `secondary` | Background hover, secondary surface, filter chips inactive |
| `accent` | Highlight statistik hero, label kompetisi, ikon premium |
| `background` | `<body>`, section utama |
| `surface` | Card, modal, panel admin, dropdown |
| `muted` | Placeholder input, disabled, skeleton background |
| `muted-foreground` | Caption, label lemah, teks sekunder |
| `border` | Border card, input, tabel, divider |
| `danger` | Error form, toast gagal, Badge status "Ditolak" (`PendaftarPPDB.status`, `KonfirmasiBayar.status`) |
| `success` | Toast sukses, Badge status "Terverifikasi" |
| `ring` | Focus ring semua elemen interaktif |

> ⚠️ `danger` = **merah asli** (bukan hitam/biru). `success` = **hijau asli** (bukan biru/identik dengan `accent`). Ini kontrak dari `foundation.md §F2`.

---

## Layout Anti-Patterns (Pengingat Harian)

Detail lengkap di `foundation.md §F9`. Ini yang paling sering salah:

| Salah | Benar |
|-------|-------|
| Semua section jadi grid 3 kolom identik | Ikuti layout per section — `foundation.md §F6` |
| Carousel/scroll horizontal tanpa tombol nav | Tombol prev/next wajib terlihat |
| Timeline/stepper zigzag statis (tanpa fallback) | Zigzag diizinkan di desktop, wajib vertikal di mobile |
| Navbar/footer ditulis ulang per halaman | Satu implementasi di `app/layout.tsx` |
| Logo sponsor dipakai sebagai logo situs di header | Logo sekolah di header dan footer; sponsor warna asli di footer |
| Hero h1 pakai ukuran heading biasa | Hero butuh `text-5xl lg:text-7xl` — lihat `foundation.md §F4` |

---

## Implementation Stack

| Area | Tool / Pattern |
|------|----------------|
| Framework | Next.js 15 App Router + TypeScript |
| Styling | Tailwind CSS v4 (OKLCH tokens) + shadcn/ui |
| Form | `react-hook-form` + `zod` |
| Table (admin) | `tanstack-table` + server-side pagination |
| Component variants | `class-variance-authority` (cva) |
| Image processing | Sharp → WebP, max 2 MB |
| Chatbot | React context + `/api/chatbot` |
| Subdomain routing | `frontend/middleware.ts` |

---

*Dokumen ini living document — update tiap sprint review. Perubahan design system **wajib** update `design-system/visual-style.md` (untuk nilai) atau `design-system/foundation.md` (untuk aturan) terlebih dahulu, baru sync summary ke sini.*

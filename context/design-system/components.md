<!--
╔══════════════════════════════════════════════════════════════════════════╗
║  AGENT INSTRUCTION — LAYER 2 (KOMPONEN & POLA HALAMAN)                 ║
║                                                                          ║
║  File ini mendokumentasikan pola komponen dan implementasi halaman.     ║
║  Edit file ini ketika:                                                   ║
║  - Ada komponen baru yang ditambahkan                                   ║
║  - Ada perubahan props/API komponen                                     ║
║  - Ada pola halaman baru                                                 ║
║                                                                          ║
║  JANGAN ubah struktur semantik HTML komponen yang sudah ada tanpa       ║
║  alasan aksesibilitas/fungsional — hanya gaya visual (class Tailwind)   ║
║  yang boleh disesuaikan mengikuti perubahan di visual-style.md.         ║
║                                                                          ║
║  Fondasi kaku (WCAG, spacing, layout per halaman) ada di foundation.md  ║
║  Nilai warna/font/radius ada di visual-style.md                         ║
╚══════════════════════════════════════════════════════════════════════════╝
-->

# COMPONENT PATTERNS — Mutuharjo Hub
> **Layer 2 — Pola Komponen & Halaman**
> Fondasi tak-berubah → [`foundation.md`](./foundation.md)
> Nilai visual (warna/font/radius) → [`visual-style.md`](./visual-style.md)

---

## C1. Component Library Map

> Path mengikuti konvensi dari `code-standards.md`. File di `components/ui/` lowercase (konvensi shadcn — pengecualian yang disengaja dari PascalCase). File di `components/features/` wajib PascalCase.

| Komponen | File / Path | Props Kunci |
|----------|-------------|-------------|
| `Button` | `components/ui/button.tsx` | `variant="primary" \| "secondary" \| "outline" \| "ghost"`, `size="sm" \| "md" \| "lg"`, `loading?`, `disabled?` |
| `Card` | `components/ui/card.tsx` | `hover?`, `bordered?`, `padding?` |
| `Input` | `components/features/forms/Input.tsx` | `label`, `error?`, `helperText?`, `iconLeft?`, `iconRight?` |
| `Select` | `components/features/forms/Select.tsx` | `options`, `placeholder`, `error?` |
| `FileUpload` | `components/features/forms/FileUpload.tsx` | `accept`, `maxSizeMB`, `preview?` |
| `Modal` | `components/ui/modal.tsx` | `open`, `onClose`, `title`, `size="sm" \| "md" \| "lg" \| "xl"` |
| `Table` | `components/ui/table.tsx` | `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableCell` |
| `Badge` | `components/ui/badge.tsx` | `variant="default" \| "success" \| "warning" \| "destructive" \| "info"`, `dot?` |
| `Toast` | `components/ui/toast.tsx` | `type="success" \| "error" \| "info"`, `message`, `duration?` |
| `Stepper` | `components/features/ppdb/Stepper.tsx` | `steps: string[]`, `current: number`, `completed: number[]` |
| `ChatWidget` | `components/features/chatbot/ChatWidget.tsx` | `trigger`, `prefillMessage?` |

> **Catatan shadcn**: Komponen di `components/ui/` di-generate oleh `npx shadcn@latest add ...` dalam lowercase — bukan pelanggaran PascalCase, ini pengecualian yang disengaja. Semua komponen di `components/features/` tetap wajib PascalCase.

> **Mapping variant `Toast`/`Badge` ke shadcn**: primitive shadcn hanya punya `variant="default" | "destructive"`. Prop custom di tabel ini **wajib dibungkus** lewat `cva` di atas primitive shadcn — memetakan `success` → `bg-success/10 text-success`, `destructive`/`error` → `bg-destructive/10 text-destructive`. Jangan asumsikan prop ini otomatis tersedia begitu `shadcn add toast badge` dijalankan.

---

## C2. Domain-Specific Components (per Fitur)

| Fitur | Komponen Khusus | Keterangan |
|-------|----------------|------------|
| **F1 PPDB Form** | `Stepper`, `FormStep1..4`, `ReviewCard`, `NomorPendaftaranDisplay` | Progress bar: `w-full h-1 bg-muted` + `bg-primary` width %. `localStorage` draft per step. |
| **F2 Konfirmasi Bayar** | `PaymentInfoCard`, `UploadBukti`, `WaRedirectButton` | QR code rekening opsional (generate via API). |
| **F3 BLUD** | `ProdukCard`, `ProdukDetailModal`, `JurusanFilterChips` | Gambar `object-cover aspect-[4/3]`. Empty state jika filter kosong. |
| **F4 Mitra** | `MitraCard`, `JurusanFilterChips`, `WaCtaButton` | Logo `object-contain h-12 bg-muted rounded`. Empty state eksplisit. |
| **F5 Chatbot** | `ChatBubble`, `QuickReplyChips`, `EscalationButton`, `TypingIndicator` | Layer 1 rule-based < 100ms; Layer 2 Gemini ≤ 3s — `TypingIndicator` wajib selama tunggu Layer 2. |
| **F6 Eskalasi WA** | `WaButton` (reuse di Chatbot, Kontak, Mitra) | `href="https://wa.me/6281234567890?text=..."` dynamic. |
| **F7 Landing** | `HeroSection`, `PpdbScheduleTeaser`, `JurusanGrid`, `TestimoniCarousel`, `MitraLogoGrid`, `BeritaGrid`, `FasilitasStrip`, `Footer` | `PpdbScheduleTeaser`: 3 langkah + CTA menuju `/ppdb`. Footer: 5 logo kompetisi (JHIC, Kemenag, Muhammadiyah, Sponsor, Media). |
| **F8 Admin** | `Sidebar`, `AdminTaskSummary`, `DataTable`, `CrudModal`, `StatusBadge`, `ImageUploadZone` | `AdminTaskSummary`: widget ringkasan verifikasi di atas tabel. Tabel: `Table` + `tanstack-table` (sorting, pagination). |
| **F9 SEO** | `Metadata` per route (`generateMetadata`), `Sitemap`, `Robots` | `og:image` pakai template hero + judul. |
| **F10 Load Test** | N/A | Dokumentasi hasil load test di slide deck. |

---

## C3. HTML Patterns (Markup Referensi)

> Markup di bawah ini adalah **pola semantik** — struktur HTML-nya stabil. Class Tailwind-nya mengikuti token di `visual-style.md` dan boleh berubah ketika gaya visual berganti.

### Button

```html
<!-- Primary -->
<button class="px-4 py-2 rounded-md bg-primary text-primary-foreground
               hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary
               transition-colors duration-150">
  CTA Primary
</button>

<!-- Secondary / Outline -->
<button class="px-4 py-2 rounded-md border border-primary text-primary
               hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-primary
               transition-colors duration-150">
  CTA Secondary
</button>
```

### Card

```html
<div class="bg-card rounded-lg shadow-sm border border-border p-5">
  <h3 class="font-heading text-xl font-semibold mb-2">Card Title</h3>
  <p class="text-muted-foreground text-sm">Deskripsi singkat konten.</p>
</div>
```

### Input (Form)

```html
<label class="block text-sm font-medium mb-1" for="nama">Nama Lengkap</label>
<input
  id="nama" name="nama" type="text"
  class="w-full rounded-md border border-border bg-background px-3 py-2
         text-base focus:outline-none focus:ring-2 focus:ring-primary"
  placeholder="Tuliskan nama Anda"
/>
<!-- Error state -->
<p id="nama-error" class="mt-1 text-sm text-destructive" aria-live="polite">
  Nama wajib diisi.
</p>
```

### Badge Status

```html
<!-- Destructive / Ditolak -->
<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full
             text-xs font-medium bg-destructive/10 text-destructive">
  Ditolak
</span>

<!-- Success / Terverifikasi -->
<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full
             text-xs font-medium bg-success/10 text-success">
  Terverifikasi
</span>
```

> Dipakai di Panel Admin (F8) untuk `PendaftarPPDB.status` dan `KonfirmasiBayar.status`.

### Navbar (Floating Pill)

```html
<div class="fixed top-6 z-50 w-full px-4 flex justify-center pointer-events-none">
  <header class="pointer-events-auto flex h-16 w-full max-w-5xl items-center
                 justify-between gap-8 rounded-full border border-border
                 bg-background/90 px-6 shadow-md backdrop-blur-md">
    <!-- Logo: gambar sekolah saja, tanpa teks brand di markup -->
    <a href="/" class="flex shrink-0 items-center transition-opacity hover:opacity-80">
      <img
        src="/images/logo/Logo-smkmutuharjo-web-272.png"
        alt="Logo SMK Mutuharjo"
        class="h-10 w-auto object-contain"
      />
    </a>
    <!-- Nav links -->
    <ul class="hidden md:flex items-center space-x-6">
      <li><a href="/" class="text-sm hover:text-primary transition-colors">Beranda</a></li>
      <li class="group relative">
        <span class="text-sm cursor-pointer hover:text-primary">Profil ▾</span>
        <!-- Dropdown: Sejarah, Visi & Misi, Keunggulan, Prestasi, Galeri -->
      </li>
      <li class="group relative">
        <span class="text-sm cursor-pointer hover:text-primary">Program & Kemitraan ▾</span>
        <!-- Dropdown: Jurusan, Mitra Industri, Produk BLUD -->
      </li>
      <li class="group relative">
        <span class="text-sm cursor-pointer hover:text-primary">Informasi ▾</span>
        <!-- Dropdown: Berita & Agenda, Kontak -->
      </li>
      <li>
        <a href="/ppdb" class="text-sm hover:text-primary transition-colors">Info PPDB</a>
      </li>
    </ul>
    <!-- Mobile menu button -->
    <button
      class="md:hidden p-2 rounded-md hover:bg-secondary focus-visible:ring-2 focus-visible:ring-primary"
      aria-label="Buka menu navigasi"
    >
      <!-- Hamburger icon (Lucide Menu) -->
    </button>
  </header>
</div>
```

> **Aturan kritis Navbar**: Logo gambar tanpa teks redundan. Link "Info PPDB" sejajar sebagai navigasi biasa — tidak ditonjolkan berlebihan sebagai CTA terpisah. Navbar selalu dari `app/layout.tsx`, tidak ditulis ulang per halaman.

### Footer

```html
<footer class="bg-background border-t border-border py-8 mt-12">
  <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8">
    <!-- Kolom 1: Info sekolah -->
    <div>
      <img
        src="/images/logo/Logo-smkmutuharjo-web-272.png"
        alt="Logo SMK Mutuharjo"
        class="h-10 w-auto object-contain mb-4"
      />
      <p class="font-heading font-semibold text-sm mb-1">SMK Muhammadiyah 1 Sukoharjo</p>
      <p class="text-muted-foreground text-xs leading-relaxed">
        Jl. ... [alamat] <br />Sukoharjo, Jawa Tengah
      </p>
      <p class="text-muted-foreground text-xs mt-3">© 2026 SMK Mutuharjo. All rights reserved.</p>
    </div>
    <!-- Kolom 2: Link legal -->
    <nav aria-label="Footer navigation" class="space-y-2">
      <a href="/kebijakan-privasi" class="text-sm hover:text-primary transition-colors block">
        Kebijakan Privasi
      </a>
      <a href="/syarat-ketentuan" class="text-sm hover:text-primary transition-colors block">
        Syarat & Ketentuan
      </a>
    </nav>
    <!-- Kolom 3: Logo kompetisi (warna asli, bukan logo situs) -->
    <div class="flex flex-wrap items-center gap-4">
      <!-- 5 logo: JHIC, Kemenag, Muhammadiyah, Sponsor, Media -->
      <img src="/images/logo/kompetisi/jhic.png" alt="JHIC 2.0"
           class="h-8 w-auto" />
      <!-- TODO: tambah 4 logo lainnya -->
    </div>
  </div>
</footer>
```

### Hero Section

```html
<section
  class="relative bg-background pt-32 pb-20 overflow-hidden
         bg-[radial-gradient(var(--border)_1px,transparent_1px)]
         [background-size:16px_16px]"
>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Eyebrow dengan section marker -->
    <div class="flex items-center gap-3 mb-6">
      <div class="w-[2px] h-8 bg-primary rounded-full" aria-hidden="true"></div>
      <span class="text-sm font-medium text-primary uppercase tracking-wide">
        SMK Center of Excellence
      </span>
    </div>
    <!-- Headline -->
    <h1 class="text-5xl lg:text-7xl font-bold font-heading leading-tight tracking-tight
               text-foreground max-w-4xl mb-6">
      SMK Berkemajuan,<br />Disiplin, Cerdas, Sukses
    </h1>
    <!-- Sub-headline -->
    <p class="text-lg text-muted-foreground max-w-2xl mb-10">
      SMK Muhammadiyah 1 Sukoharjo — Sekolah Pusat Keunggulan berbasis industri dan nilai Islam.
    </p>
    <!-- CTA group -->
    <div class="flex flex-wrap gap-4">
      <a href="/ppdb"
         class="px-6 py-3 rounded-md bg-primary text-primary-foreground font-semibold
                hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary
                transition-colors">
        Daftar PPDB
      </a>
      <a href="/program"
         class="px-6 py-3 rounded-md border border-border bg-card text-foreground
                font-semibold hover:bg-secondary focus-visible:ring-2 focus-visible:ring-primary
                transition-colors">
        Lihat Program
      </a>
    </div>
  </div>
</section>
```

### Timeline (PPDB — Vertikal Single-Column)

```html
<!-- Wajib vertikal — jangan zigzag. Lihat foundation.md §F6 -->
<ol class="relative border-l border-primary/30 ml-4 space-y-8">
  <li class="relative pl-8">
    <!-- Dot marker -->
    <span class="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-primary
                 ring-2 ring-background" aria-hidden="true"></span>
    <span class="text-xs font-medium text-primary uppercase tracking-wide">Tahap 1</span>
    <h3 class="font-heading font-semibold text-lg mt-1">Pendaftaran Online</h3>
    <p class="text-sm text-muted-foreground mt-1">1 Juli – 31 Agustus 2026</p>
    <p class="text-sm mt-2">Isi formulir di subdomain pendaftaran dengan data diri lengkap.</p>
  </li>
  <!-- Ulangi untuk tahap 2–5 -->
</ol>
```

### Carousel (dengan kontrol wajib)

```html
<!-- Kontrol next/prev WAJIB terlihat — tidak boleh hanya overflow-x-auto diam-diam -->
<div class="relative">
  <div id="carousel-track" class="overflow-x-hidden">
    <ul class="flex gap-5 transition-transform duration-300">
      <!-- Slide items -->
    </ul>
  </div>
  <!-- Tombol kontrol -->
  <button
    id="carousel-prev"
    class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4
           p-2 rounded-full bg-card border border-border shadow-sm
           hover:bg-secondary focus-visible:ring-2 focus-visible:ring-primary transition"
    aria-label="Slide sebelumnya"
  >
    <!-- Lucide ChevronLeft -->
  </button>
  <button
    id="carousel-next"
    class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4
           p-2 rounded-full bg-card border border-border shadow-sm
           hover:bg-secondary focus-visible:ring-2 focus-visible:ring-primary transition"
    aria-label="Slide berikutnya"
  >
    <!-- Lucide ChevronRight -->
  </button>
</div>
```

---

## C4. Implementation Notes

1. **Tailwind config**: Sync selalu dengan nilai di `visual-style.md §V6` — copy ke `frontend/tailwind.config.js`.
2. **globals.css**: Template lengkap ada di `visual-style.md §V7` — import font + CSS variables (`:root` + `.dark`).
3. **Component primitives**: `components/ui/` (lowercase, konvensi shadcn). Gunakan `class-variance-authority` (cva) untuk variant — termasuk mapping `success`/`destructive`/`warning`/`info` untuk Toast & Badge (lihat C1).
4. **Form wizard**: `react-hook-form` + `zod` (validasi di `lib/validations.ts`). Draft per step disimpan ke `localStorage`.
5. **Chatbot state**: React context + API `/api/chatbot`. `TypingIndicator` wajib tampil selama menunggu Layer 2 (Gemini).
6. **Admin panel**: `tanstack-table` + server-side pagination. `AdminTaskSummary` sebagai entry point di atas tabel.
7. **Image upload**: `POST /api/upload` (Sharp → WebP, max 2 MB).
8. **Subdomain middleware**: `frontend/middleware.ts` — subdomain routing sudah dikonfigurasi.
9. **SEO**: `generateMetadata` di setiap `page.tsx`, `sitemap.ts` & `robots.ts` di root `app/`.
10. **Testing**: `npm run lint`, `npm run typecheck`, `npm run test` (jest + rtl) sebelum PR.

---

## C5. Handoff Checklist (Sebelum Merge ke `main`)

- [ ] Semua halaman pakai token dari `visual-style.md` — tidak ada hard-coded hex.
- [ ] Token `--destructive`/`--success` yang dipakai sudah v2.0+ (merah & hijau asli, bukan biru).
- [ ] Dark mode manual test pass — tiap token dark dihitung ulang (bukan copy light).
- [ ] Lighthouse ≥ 90 (Performance, Accessibility, Best Practices, SEO).
- [ ] Load test autocannon ≥ 100 req/s, p99 < 500ms (domain utama & subdomain).
- [ ] Semua form validasi client & server berjalan.
- [ ] 5 logo kompetisi tampil di footer semua halaman (warna asli).
- [ ] Tidak ada anti-pattern dari `foundation.md §F9`.
- [ ] Header & footer identik di semua halaman (satu implementasi dari `layout.tsx`).
- [ ] Tidak ada logo sponsor/partner dipakai sebagai logo situs di header.
- [ ] Dokumentasi komponen baru di `components/ui/README.md`.
- [ ] Carousel punya tombol prev/next yang terlihat.
- [ ] Timeline/stepper pakai layout vertikal (bukan zigzag).
- [ ] Responsive test: 375px, 768px, 1024px, 1440px.
- [ ] Semua elemen interaktif punya `focus-visible`.

---

*Dokumen ini adalah living document — update setiap sprint review atau ketika ada komponen baru.*

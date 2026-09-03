# Design System — SMK Mutuharjo Hub

> **v2.0 — Dokumen ini adalah index.** Sejak v2.0, design system dipecah menjadi 3 layer
> terpisah agar fondasi UX/aksesibilitas tidak ikut tergeser saat gaya visual diubah.
> Semua konten lama sudah dimigrasikan ke file baru — tidak ada duplikasi.

---

## Navigasi Design System

| Layer | File | Status | Isi |
|-------|------|--------|-----|
| **Layer 0 — Fondasi** | [`design-system/foundation.md`](./design-system/foundation.md) | 🔒 Dikunci | Prinsip brand, semantic token contract, 8px grid, tipografi hierarchy, WCAG, layout per halaman, iconography, voice & tone, anti-patterns, data otentik sekolah |
| **Layer 1b — Visual Style** | [`design-system/visual-style.md`](./design-system/visual-style.md) | ✏️ Agent-editable | Nilai OKLCH konkret (light + dark), font family, radius, shadow, aesthetic concept, micro-motion specs, Tailwind config, globals.css template |
| **Layer 2 — Komponen** | [`design-system/components.md`](./design-system/components.md) | 📦 Semi-stabil | Component map, domain-specific components, HTML markup patterns, implementation notes, handoff checklist |

---

## Cara Membaca (untuk Agent)

- **User minta ganti warna / tema / font?** → Buka dan edit [`design-system/visual-style.md`](./design-system/visual-style.md). Jangan sentuh `foundation.md`.
- **User minta tambah komponen / ubah layout halaman?** → Buka [`design-system/components.md`](./design-system/components.md) untuk referensi pola, lalu implementasi.
- **Mau tahu aturan aksesibilitas / anti-patterns / data otentik sekolah?** → Buka [`design-system/foundation.md`](./design-system/foundation.md).
- **Aturan agent lengkap?** → Lihat `AGENTS.md` di root project.

---

## Kenapa 3 Layer?

File ini (dan `ui-context.md`) sebelumnya mencampur dua hal berbeda dalam satu dokumen flat:
1. **Fondasi tak-berubah** — prinsip WCAG, spacing rhythm, semantic HTML, anti-patterns
2. **Pilihan gaya** — nilai warna OKLCH, font, radius, shadow

Ketika agent diminta "ganti gaya", dia harus baca semua dokumen dan berisiko menggeser aturan fondasi secara tidak sengaja. Pemisahan 3 layer menyelesaikan masalah ini.

---

*File ini tidak berisi aturan — hanya navigasi. Semua aturan ada di 3 file di `design-system/`.*

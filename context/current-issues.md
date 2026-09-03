# Current Issues & Backend Notes

## Backend Revisi: Kebutuhan Schema Baru
Untuk mengakomodasi halaman dinamis baru (Galeri & Prestasi), tim backend perlu menambahkan dua model ke Prisma Schema:
1. `Model Prestasi` (id, judul, deskripsi, tahun, tingkat, imageUrl, createdAt, updatedAt)
2. `Model Galeri` (id, judul, tipe [enum: FOTO, VIDEO], url_media, createdAt, updatedAt)

*Catatan: Sementara backend belum ada, frontend menggunakan data mock (JSON).*

## Penyatuan Struktur (MVP vs Halaman Pendukung)
1. **Halaman Pendukung Statis**: Halaman `/profil/sejarah`, `/profil/visi-misi`, `/profil/keunggulan`, dan `/kontak` telah dimasukkan ke dalam arsitektur resmi sebagai halaman statis yang memuat JSON lokal.
2. **Navigasi Global**: `Navbar` tidak dimodifikasi menjadi dropdown kompleks demi mematuhi aturan `AGENTS.md`. Setiap halaman profil akan tetap berada di foldernya masing-masing, namun integrasi navigasinya dikendalikan secara lokal pada halaman tersebut atau via link sederhana, memastikan tidak ada bentrokan dengan komponen utama.
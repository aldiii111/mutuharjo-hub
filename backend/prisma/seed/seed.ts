import { PrismaClient } from "@prisma/client"
import * as fs from "node:fs/promises"
import * as path from "node:path"
import process from "node:process"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

interface ProdukBludItem {
  nama: string
  deskripsi: string
  jurusan: string
  gambarUrl?: string
  estimasiHarga?: string
}

interface BeritaItem {
  id: number
  judul: string
  slug: string
  publishedAt?: string
  kategori?: string
  gambar?: string
  deskripsiSingkat: string
  highlight?: string[]
}

async function main(): Promise<void> {
  const passwordHash = await bcrypt.hash("admin123", 12)
  await prisma.admin.upsert({
    where: { username: "admin" },
    update: { passwordHash },
    create: {
      username: "admin",
      passwordHash,
    },
  })

  const bludPath = path.resolve("../frontend/data/dynamic/produk-blud.json")
  try {
    const bludRaw = await fs.readFile(bludPath, "utf-8")
    const bludData = JSON.parse(bludRaw) as { produk_blud: ProdukBludItem[] }

    for (const item of bludData.produk_blud) {
      const existing = await prisma.produkBLUD.findFirst({
        where: { nama: item.nama },
      })
      if (!existing) {
        await prisma.produkBLUD.create({
          data: {
            nama: item.nama,
            deskripsi: item.deskripsi,
            jurusan: item.jurusan,
            gambarUrl: item.gambarUrl ?? "/assets/images/placeholder-blud.webp",
            estimasiHarga: item.estimasiHarga ?? null,
            isActive: true,
          },
        })
      }
    }
  } catch (err: unknown) {
    console.warn("Skip produk-blud seed:", err instanceof Error ? err.message : err)
  }

  const beritaPath = path.resolve("../frontend/data/dynamic/berita.json")
  try {
    const beritaRaw = await fs.readFile(beritaPath, "utf-8")
    const beritaData = JSON.parse(beritaRaw) as { berita: BeritaItem[] }

    for (const item of beritaData.berita) {
      const kontenText = item.highlight && item.highlight.length > 0
        ? `${item.deskripsiSingkat}\n\nHighlight:\n- ${item.highlight.join("\n- ")}`
        : item.deskripsiSingkat

      await prisma.berita.upsert({
        where: { slug: item.slug },
        update: {
          judul: item.judul,
          ringkasan: item.deskripsiSingkat,
          konten: kontenText,
          gambarUrl: item.gambar ?? null,
          isPublished: true,
          publishedAt: item.publishedAt ? new Date(item.publishedAt) : new Date(),
        },
        create: {
          judul: item.judul,
          slug: item.slug,
          ringkasan: item.deskripsiSingkat,
          konten: kontenText,
          gambarUrl: item.gambar ?? null,
          isPublished: true,
          publishedAt: item.publishedAt ? new Date(item.publishedAt) : new Date(),
        },
      })
    }
  } catch (err: unknown) {
    console.warn("Skip berita seed:", err instanceof Error ? err.message : err)
  }

  console.log("Database seeding completed successfully.")
}

main()
  .catch((e: unknown) => {
    console.error("Seeding failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

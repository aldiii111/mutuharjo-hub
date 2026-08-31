import { prisma } from "../lib/prisma.js"
import type { CreatePpdbDto } from "../lib/ppdb.schema.js"

export async function generateNomorPendaftaran(): Promise<string> {
    const lastPendaftar = await prisma.pendaftarPPDB.findFirst({
        orderBy: { createdAt: "desc", },
        select: { nomorPendaftaran: true },
    })
    if (!lastPendaftar) {
        return "SPMB-2026-0001"
    }
    const parts = lastPendaftar.nomorPendaftaran.split("-")
    const lastSequenceString = parts[2]
    const lastSequence = Number(lastSequenceString)

    if (Number.isNaN(lastSequence)) {
        return "SPMB-2026-0001"
    }

    const nextSequence = (lastSequence + 1).toString().padStart(4, "0")
    return `SPMB-2026-${nextSequence}`
}

export async function checkNisnExists(nisn: string): Promise<boolean> {
    const pendaftar = await prisma.pendaftarPPDB.findFirst({
        where: { nisn },
        select: { id: true },
    })
    return Boolean(pendaftar)
}

export async function createPendaftar(data: CreatePpdbDto): Promise<string> {
    const nomorPendaftaran = await generateNomorPendaftaran()

    const pendaftar = await prisma.pendaftarPPDB.create({
        data: {
            namaLengkap: data.namaLengkap,
            nisn: data.nisn,
            tempatLahir: data.tempatLahir,
            tanggalLahir: data.tanggalLahir,
            jenisKelamin: data.jenisKelamin,
            asalSekolah: data.asalSekolah,
            alamat: data.alamat,
            namaOrtuWali: data.namaOrtuWali,
            noHpOrtuWali: data.noHpOrtuWali,
            pekerjaanOrtu: data.pekerjaanOrtu,
            pilihanJurusan1: data.pilihanJurusan1,
            pilihanJurusan2: data.pilihanJurusan2,
            nomorPendaftaran,
            status: "baru",
        },
        select: {
            nomorPendaftaran: true,
        },
    })

    return pendaftar.nomorPendaftaran
}
import { prisma } from "../lib/prisma.js"
import { CreatePembayaranDto } from "../lib/pembayaran.schema.js"

export async function findPendaftarByNomor(nomorPendaftaran: string) {
    const pendaftar = await prisma.pendaftarPPDB.findUnique({
        where: { nomorPendaftaran },
        select: {
            id: true
        }
    })
    return pendaftar
}

export async function upsertKonfirmasiBayar(pendaftarId: string, data: CreatePembayaranDto) {
    const konfirmasiBayar = await prisma.konfirmasiBayar.upsert({
        where: {
            pendaftarId
        },
        create: {
            pendaftarId,
            namaPengirim: data.namaPengirim,
            nominal: data.nominal,
            buktiUrl: data.buktiUrl,
            status: "menunggu",
        },
        update: {
            namaPengirim: data.namaPengirim,
            nominal: data.nominal,
            buktiUrl: data.buktiUrl
        }

    })
    return konfirmasiBayar

}

export async function getKonfirmasiBayarByNomor(nomorPendaftaran: string) {
    const pendaftar = await prisma.pendaftarPPDB.findUnique({
        where: { nomorPendaftaran },
        select: {
            id: true
        }
    });

    if (!pendaftar) {
        return null
    }
    return await prisma.konfirmasiBayar.findUnique({
        where: { pendaftarId: pendaftar.id },
    })
}

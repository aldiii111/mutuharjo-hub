import { Prisma } from "@prisma/client";
import type { UpdateBeritaDto, CreateProdukDto, UpdateProdukDto, UpdatePembayaranStatusDto, CreateBeritaDto } from "../lib/admin.schema.js";
import { prisma } from "../lib/prisma.js";

export async function updatePpdbStatus(id: string, status: string) {
    return await prisma.pendaftarPPDB.update({
        where: { id },
        data: { status }
    })
}

export async function updatePembayaranStatus(id: string, data: UpdatePembayaranStatusDto) {
    return await prisma.konfirmasiBayar.update({
        where: { id },
        data: { status: data.status, catatanAdmin: data.catatanAdmin }
    })
}

export async function createBerita(data: CreateBeritaDto) {
    try {
        const slug = data.judul.toLowerCase().replace(/\s+/g, '-');
        return await prisma.berita.create({
            data: {
                ...data,
                slug
            }
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            throw new Error("Judul artikel ini sudah pernah ada.")
        }
        throw error
    }
}

export async function updateBerita(id: string, data: UpdateBeritaDto) {
    try {
        let slug;
        if (data.judul) {
            slug = data.judul.toLowerCase().replace(/\s+/g, '-');
        }
        return await prisma.berita.update({
            where: { id },
            data: {
                ...data,
                ...(slug && { slug })
            }
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            throw new Error("Judul artikel ini sudah pernah ada.")
        }
        throw error;
    }
}

export async function deleteBerita(id: string): Promise<void> {
    await prisma.berita.delete({
        where: { id }
    })
}

export async function createProdukBlud(data: CreateProdukDto) {
    return await prisma.produkBLUD.create({
        data
    });
}

export async function updateProdukBlud(id: string, data: UpdateProdukDto) {
    return await prisma.produkBLUD.update({
        where: { id },
        data
    });
}

export async function deleteProdukBlud(id: string) {
    await prisma.produkBLUD.delete({
        where: { id }
    });
}
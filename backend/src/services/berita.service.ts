import { prisma } from "../lib/prisma.js"
import type { Berita } from "@prisma/client"

export class BeritaService {
    async getLatest(limit: number): Promise<Berita[]> {
        return prisma.berita.findMany({
            where: { isPublished: true },
            orderBy: { publishedAt: "desc" },
            take: limit,
        })
    }
}

export const beritaService: BeritaService = new BeritaService()

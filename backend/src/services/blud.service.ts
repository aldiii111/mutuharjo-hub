import { prisma } from "../lib/prisma.js"
import type { ProdukBLUD } from "@prisma/client"

export class BludService {
  async getAll(jurusan?: string): Promise<ProdukBLUD[]> {
    return prisma.produkBLUD.findMany({
      where: {
        isActive: true,
        ...(jurusan ? { jurusan } : {}),
      },
      orderBy: { createdAt: "desc" },
    })
  }
  
  async getById(id: string): Promise<ProdukBLUD | null> {
    return prisma.produkBLUD.findUnique({
      where: { id },
    })
  }
}
export const bludService: BludService = new BludService()

import { prisma } from "../lib/prisma.js"
import type { UploadedFile } from "@prisma/client"
export class UploadService {
  async saveUploadRecord(
    filename: string,
    url: string,
    category: string,
    entityId?: string
  ): Promise<UploadedFile> {
    return prisma.uploadedFile.create({
      data: {
        filename,
        url,
        category,
        entityId: entityId ?? null
      }
    })
  }
}
export const uploadService: UploadService = new UploadService()

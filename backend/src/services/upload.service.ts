import { prisma } from "../lib/prisma.js"
import type { UploadedFile } from "@prisma/client"
import sharp from "sharp"
import fs from "fs/promises"
import path from "path"

export class UploadService {
  async compressToWebP(filePath: string): Promise<string> {
    const parsed = path.parse(filePath)
    const webpFilename: string = `${parsed.name}.webp`
    const webpPath: string = path.join(parsed.dir, webpFilename)
    await sharp(filePath)
      .webp({ quality: 80 })
      .toFile(webpPath)

    if (parsed.ext.toLowerCase() !== ".webp") {
      await fs.unlink(filePath)
    }

    return webpFilename
  }

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
        entityId: entityId ?? null,
      },
    })
  }
}

export const uploadService: UploadService = new UploadService()

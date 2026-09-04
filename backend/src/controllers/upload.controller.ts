import type { Request, Response } from "express"
import { uploadService } from "../services/upload.service.js"
import type { ApiResponse } from "@mutuharjo/shared"
import type { UploadedFile } from "@prisma/client"

export class UploadController {
  async uploadMedia(
    req: Request,
    res: Response<ApiResponse<UploadedFile>>
  ): Promise<Response<ApiResponse<UploadedFile>>> {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: "File media wajib diunggah",
        })
      }
      const webpFilename: string = await uploadService.compressToWebP(req.file.path)
      const fileUrl: string = `/uploads/${webpFilename}`
      const category: string = typeof req.body.category === "string" ? req.body.category : "general"
      const entityId: string | undefined = typeof req.body.entityId === "string" ? req.body.entityId : undefined
      const record: UploadedFile = await uploadService.saveUploadRecord(
        webpFilename,
        fileUrl,
        category,
        entityId
      )
      return res.status(201).json({
        success: true,
        data: record,
        message: "Berhasil mengunggah media",
      })
    } catch (error: unknown) {
      const errorMessage: string = error instanceof Error ? error.message : "Terjadi kesalahan server"
      return res.status(500).json({
        success: false,
        error: errorMessage,
      })
    }
  }
}

export const uploadController: UploadController = new UploadController()


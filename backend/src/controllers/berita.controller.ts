import type { Request, Response } from "express"
import { beritaService } from "../services/berita.service.js"
import type { ApiResponse } from "@mutuharjo/shared"
import type { Berita } from "@prisma/client"

export class BeritaController {
    async getLatest(
        req: Request,
        res: Response<ApiResponse<Berita[]>>
    ): Promise<Response<ApiResponse<Berita[]>>> {
        try {
            const limit: number = Number(req.query.limit) || 3

            const articles: Berita[] = await beritaService.getLatest(limit)

            return res.status(200).json({
                success: true,
                data: articles,
                message: "Berhasil mengambil berita terbaru",
            })
        } catch (error: unknown) {
            const errorMessage: string =
                error instanceof Error ? error.message : "Terjadi kesalahan server"
            return res.status(500).json({
                success: false,
                error: errorMessage,
            })
        }
    }
}

export const beritaController: BeritaController = new BeritaController()

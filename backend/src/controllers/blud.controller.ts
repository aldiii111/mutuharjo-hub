import type { Request, Response } from "express"
import { bludService } from "../services/blud.service.js"
import type { ApiResponse } from "@mutuharjo/shared"
import type { ProdukBLUD } from "@prisma/client"


export class BludController {
  async getAll(
    req: Request,
    res: Response<ApiResponse<ProdukBLUD[]>>
  ): Promise<Response<ApiResponse<ProdukBLUD[]>>> {
    try {
      const jurusan: string | undefined =
        typeof req.query.jurusan === "string" ? req.query.jurusan : undefined

      const products: ProdukBLUD[] = await bludService.getAll(jurusan)

      return res.status(200).json({
        success: true,
        data: products,
        message: "Berhasil mengambil data produk BLUD",
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

  async getById(
    req: Request,
    res: Response<ApiResponse<ProdukBLUD>>
  ): Promise<Response<ApiResponse<ProdukBLUD>>> {
    try {
      const id :string | undefined = typeof req.params.id === "string" ? req.params.id : undefined

      if (!id) {
        return res.status(404).json({
          success: false,
          error: "ID product tidak ditemukan",
        })
      }
      const product : ProdukBLUD | null = await bludService.getById(id)
      if(!product){
        return res.status(404).json({
          success:false,
          error:"produk blud tidak di temukan"
        })
      }

      return res.status(200).json({
        success: true,
        data: product,
        message: "Berhasil mengambil detail produk BLUD",
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

export const bludController: BludController = new BludController()

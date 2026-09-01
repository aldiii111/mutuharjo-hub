import { Request, Response, NextFunction } from "express"
import { ApiResponse } from "@mutuharjo/shared"
import { createPendaftar, checkNisnExists } from "../services/ppdb-service.js"

export async function createPendaftarController(request: Request, response: Response<ApiResponse<{ nomorPendaftaran: string }>>, next: NextFunction) {
    try {
        const nisn = request.body.nisn
        const isExists = await checkNisnExists(nisn)
        if (isExists) {
            return response.status(400).json({
                success: false,
                error: "NISN ini sudah terdaftar disistem"
            })
        }
        const pendaftarBaru = await createPendaftar(request.body)
        response.status(201).json({
            success: true,
            data: { nomorPendaftaran: pendaftarBaru },
            message: "Pendaftaran berhasil dibuat"
        })
    } catch (err) {
        next(err)
    }
}
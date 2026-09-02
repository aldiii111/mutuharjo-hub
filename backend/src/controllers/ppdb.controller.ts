import { Request, Response, NextFunction } from "express"
import { ApiResponse } from "@mutuharjo/shared"
import { createPendaftar, checkNisnExists, getPendaftarByNomorPendaftaran } from "../services/ppdb.service.js"
import { PendaftarPPDB, KonfirmasiBayar } from "@prisma/client"

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

export async function getPendaftarController(request: Request, response: Response<ApiResponse<PendaftarPPDB & { pembayaran: KonfirmasiBayar | null } | null>>, next: NextFunction) {
    try {
        const nomorPendaftaran = typeof request.params.nomorPendaftaran === "string" ? request.params.nomorPendaftaran : undefined
        if (!nomorPendaftaran) {
            return response.status(404).json({
                success: false,
                error: "Pendaftar tidak ditemukan",
            })
        }
        const pendaftar = await getPendaftarByNomorPendaftaran(nomorPendaftaran)
        if (!pendaftar) {
            return response.status(404).json({
                success: false,
                error: "pendaftar tidak ditemukan",
            })
        }
        response.status(200).json({
            success: true,
            data: pendaftar,
            message: "Pendaftar ditemukan",
        })
    } catch (err) {
        next(err)
    }
}
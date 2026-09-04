import type { Request, Response, NextFunction } from "express"
import type { ApiResponse } from "@mutuharjo/shared"
import { Prisma } from "@prisma/client"
import { updatePpdbStatus, updatePembayaranStatus } from "../services/admin.service.js"
import { PendaftarPPDB, KonfirmasiBayar } from "@prisma/client"

export async function updatePpdbStatusController(request: Request<{ id: string }>, response: Response<ApiResponse<PendaftarPPDB>>, next: NextFunction) {
    try {
        const id = request.params.id
        const data = request.body

        const hasil = await updatePpdbStatus(id, data.status)
        return response.status(200).json({
            success: true,
            data: hasil,
            message: "Status PPDB berhasil diperbarui"
        })
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
            return response.status(404).json({
                success: false,
                error: "Data pendaftar PPDB tidak ditemukan"
            })
        }
        next(error)
    }
}

export async function updatePembayaranStatusController(request: Request<{ id: string }>, response: Response<ApiResponse<KonfirmasiBayar>>, next: NextFunction) {
    try {
        const id = request.params.id
        const data = request.body

        const hasil = await updatePembayaranStatus(id, data);
        return response.status(200).json({
            success: true,
            data: hasil,
            message: "Status pembayaran berhasil diperbarui"
        })
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
            return response.status(404).json({
                success: false,
                error: "Data pembayaran tidak ditemukan"
            })
        }
        next(error)
    }
}
import type { Request, Response, NextFunction } from "express"
import type { ApiResponse } from "@mutuharjo/shared"
import { Prisma, PendaftarPPDB, KonfirmasiBayar, Berita, ProdukBLUD } from "@prisma/client"
import { updatePpdbStatus, updatePembayaranStatus, createBerita, updateBerita, deleteBerita, createProdukBlud, updateProdukBlud, deleteProdukBlud } from "../services/admin.service.js"

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

export async function createBeritaController(request: Request, response: Response<ApiResponse<Berita>>, next: NextFunction) {
    try {
        const data = request.body
        const hasil = await createBerita(data)
        return response.status(201).json({
            success: true,
            data: hasil,
            message: "Berita berhasil dibuat"
        })

    } catch (error) {
        if (error instanceof Error && error.message === "Judul artikel ini sudah pernah ada") {
            return response.status(400).json({ success: false, error: error.message });
        }
        next(error)
    }
}

export async function updateBeritaController(request: Request<{ id: string }>, response: Response<ApiResponse<Berita>>, next: NextFunction) {
    try {
        const id = request.params.id
        const data = request.body
        const hasil = await updateBerita(id, data)
        return response.status(200).json({
            success: true,
            data: hasil,
            message: "Berita berhasil diperbarui"
        })
    } catch (error) {
        if (error instanceof Error && error.message === "Judul artikel ini sudah pernah ada") {
            return response.status(400).json({ success: false, error: error.message });
        }
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
            return response.status(404).json({ success: false, error: "Data berita tidak ditemukan" });
        }
        next(error)
    }

}

export async function deleteBeritaController(request: Request<{ id: string }>, response: Response<ApiResponse<null>>, next: NextFunction) {
    try {
        const id = request.params.id
        await deleteBerita(id)
        return response.status(200).json({
            success: true,
            data: null,
            message: "Berita berhasil dihapus"
        })
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
            return response.status(404).json({ success: false, error: "Data berita tidak ditemukan" });
        }
        next(error)
    }
}

export async function createProdukController(request: Request, response: Response<ApiResponse<ProdukBLUD>>, next: NextFunction) {
    try {
        const data = request.body
        const hasil = await createProdukBlud(data)
        return response.status(201).json({
            success: true,
            data: hasil,
            message: "Produk berhasil dibuat"
        })
    } catch (error) {
        next(error)
    }
}

export async function updateProdukController(request: Request<{ id: string }>, response: Response<ApiResponse<ProdukBLUD>>, next: NextFunction) {
    try {
        const id = request.params.id
        const data = request.body
        const hasil = await updateProdukBlud(id, data)
        return response.status(200).json({
            success: true,
            data: hasil,
            message: "Produk berhasil diperbarui"
        })
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
            return response.status(404).json({ success: false, error: "Data produk tidak ditemukan" });
        }
        next(error)
    }
}

export async function deleteProdukController(request: Request<{ id: string }>, response: Response<ApiResponse<null>>, next: NextFunction) {
    try {
        const id = request.params.id
        await deleteProdukBlud(id)
        return response.status(200).json({
            success: true,
            data: null,
            message: "Produk berhasil dihapus"
        })
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
            return response.status(404).json({ success: false, error: "Data produk tidak ditemukan" });
        }
        next(error)
    }
}
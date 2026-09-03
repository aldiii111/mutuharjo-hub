import { Request, Response, NextFunction } from "express";
import { KonfirmasiBayar } from "@prisma/client";
import { ApiResponse } from "@mutuharjo/shared";
import { findPendaftarByNomor, upsertKonfirmasiBayar, getKonfirmasiBayarByNomor } from "../services/pembayaran.service.js";

export async function submitKonfirmasiBayarController(request: Request, response: Response<ApiResponse<KonfirmasiBayar>>, next: NextFunction) {
    try {
        const data = request.body
        const pendaftar = await findPendaftarByNomor(data.nomorPendaftaran)

        if (!pendaftar) {
            return response.status(404).json({
                success: false,
                error: "Nomor pendaftaran tidak ditemukan."
            })
        }
        const hasil = await upsertKonfirmasiBayar(pendaftar.id, data);
        return response.status(201).json({
            success: true,
            data: hasil,
            message: "Konfirmasi pembayaran berhasil disimpan."
        })
    } catch (error) {
        next(error)
    }
}

export async function getStatusPembayaranController(request: Request, response: Response<ApiResponse<KonfirmasiBayar>>, next: NextFunction) {
    try {
        const nomorPendaftaran = request.params.nomorPendaftaran as string;
        const hasil = await getKonfirmasiBayarByNomor(nomorPendaftaran)

        if (!hasil) {
            return response.status(404).json({
                success: false,
                error: "Data pembayaran tidak ditemukan"
            });
        }
        return response.status(200).json({
            success: true,
            data: hasil
        });

    } catch (error) {
        next(error)
    }
}
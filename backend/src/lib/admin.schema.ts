import { z } from "zod"
import { JurusanEnum } from "./ppdb.schema.js";

export const updatePpdbStatusSchema = z.object({ status: z.enum(["baru", "terverifikasi", "diterima", "ditolak"]), });

export type UpdatePpdbStatusDto = z.infer<typeof updatePpdbStatusSchema>;

export const updatePembayaranStatusSchema = z.object({ status: z.enum(["menunggu", "terverifikasi", "ditolak"]), catatanAdmin: z.string().optional(), });

export type UpdatePembayaranStatusDto = z.infer<typeof updatePembayaranStatusSchema>;

export const createBeritaSchema = z.object({
    judul: z.string().min(5),
    ringkasan: z.string().min(10),
    konten: z.string().min(10),
    gambarUrl: z.string().url().optional(),
    isPublished: z.boolean().optional().default(false)
})

export type CreateBeritaDto = z.infer<typeof createBeritaSchema>;

export const updateBeritaSchema = createBeritaSchema.partial();

export type UpdateBeritaDto = z.infer<typeof updateBeritaSchema>;

export const createProdukSchema = z.object({
    nama: z.string().min(3),
    deskripsi: z.string().min(10),
    jurusan: JurusanEnum,
    gambarUrl: z.string().url(),
    estimasiHarga: z.string().optional()
})

export type CreateProdukDto = z.infer<typeof createProdukSchema>;

export const updateProdukSchema = createProdukSchema.partial();

export type UpdateProdukDto = z.infer<typeof updateProdukSchema>;
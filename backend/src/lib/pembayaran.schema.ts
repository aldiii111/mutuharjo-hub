import { z } from "zod"

export const createPembayaranSchema = z.object({
    nomorPendaftaran: z.string().trim().min(1, "Nomor pendaftaran tidak boleh kosong"),
    namaPengirim: z.string().trim().min(3, "Minimal 3 karakter"),
    nominal: z.number().positive("Nominal harus berupa angka positif"),
    buktiUrl: z.string().url().or(z.literal("")).optional()
})

export type CreatePembayaranDto = z.infer<typeof createPembayaranSchema>
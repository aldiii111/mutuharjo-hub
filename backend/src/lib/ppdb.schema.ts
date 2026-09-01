import { z } from "zod"

export const JurusanEnum = z.enum(["TSM", "TJKT", "PPLG", "TP", "TKR", "TE"])
export const JenisKelaminEnum = z.enum(["L", "P"])
export const createPpdbSchema = z.object({
    namaLengkap: z.string({ required_error: "Nama lengkap wajib diisi" }).min(3, "Nama lengkap tidak boleh kosong").trim(),
    nisn: z.string({ required_error: "NISN wajib diisi" }).regex(/^\d{10}$/, "NISN harus berupa 10 digit angka"),
    tempatLahir: z.string({ required_error: "Tempat lahir wajib diisi" }).min(1, "Tempat lahir tidak boleh kosong").trim(),
    tanggalLahir: z.coerce.date({ required_error: "Tanggal lahir wajib diisi", invalid_type_error: "Format tanggal lahir tidak valid" }),
    jenisKelamin: JenisKelaminEnum,
    asalSekolah: z.string({ required_error: "Asal sekolah wajib diisi" }).min(1, "Asal sekolah tidak boleh kosong").trim(),
    alamat: z.string({ required_error: "Alamat wajib diisi" }).min(1, "Alamat tidak boleh kosong").trim(),
    namaOrtuWali: z.string({ required_error: "Nama ortu/wali wajib diisi" }).min(1, "Nama ortu/wali tidak boleh kosong").trim(),
    noHpOrtuWali: z.string({ required_error: "Nomor HP orang tua/wali wajib diisi" }).regex(/^08\d{8,11}$/, "Nomor HP harus berformat Indonesia (contoh: 08123456789)"),
    pekerjaanOrtu: z.string().trim().optional(),
    pilihanJurusan1: JurusanEnum,
    pilihanJurusan2: JurusanEnum.optional()
}).refine(
    (data) => !data.pilihanJurusan2 || data.pilihanJurusan2 !== data.pilihanJurusan1,
    { message: "Jurusan cadangan tidak boleh sama dengan jurusan utama(1)", path: ["pilihanJurusan2"] }
)

export type CreatePpdbDto = z.infer<typeof createPpdbSchema>
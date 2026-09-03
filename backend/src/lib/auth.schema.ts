import { z } from "zod"

export const loginSchema = z.object({
    username: z.string().trim().min(1, "Username wajib diisi"),
    password: z.string().min(1, "Password wajib diisi")
})

export type LoginDto = z.infer<typeof loginSchema>
import { prisma } from "../lib/prisma.js"
import type { Admin } from "@prisma/client"

export async function findAdminByUsername(username: string): Promise<Admin | null> {
    const admin = await prisma.admin.findUnique({
        where: { username }
    })
    return admin
}
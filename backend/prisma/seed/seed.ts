import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  const passwordHash = await bcrypt.hash("admin123", 12)

  const admin = await prisma.admin.upsert({
    where: { username: "admin" },
    update: { passwordHash },
    create: {
      username: "admin",
      passwordHash,
    },
  })

  console.log("SUCCESS: Akun admin (username: admin, password: admin123) berhasil dibuat/diperbarui!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

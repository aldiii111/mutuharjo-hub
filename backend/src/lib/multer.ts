import multer, { type StorageEngine, type FileFilterCallback } from "multer"
import path from "path"
import type { Request } from "express"

const ALLOWED_MIMES: string[] = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]

const MAX_FILE_SIZE: number = 5 * 1024 * 1024

const storage: StorageEngine = multer.diskStorage({
  destination(_req: Request, _file: Express.Multer.File, cb) {
    cb(null, path.resolve("uploads"))
  },
  filename(_req: Request, file: Express.Multer.File, cb) {
    const uniqueSuffix: string = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    const ext: string = path.extname(file.originalname)
    cb(null, `${uniqueSuffix}${ext}`)
  },
})

function fileFilter(_req: Request, file: Express.Multer.File, cb: FileFilterCallback): void {
  if (ALLOWED_MIMES.includes(file.mimetype)) {
    cb(null, true)
    return
  }
  cb(new Error("Format file tidak didukung. Gunakan JPEG, PNG, WebP, atau GIF"))
}

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_FILE_SIZE },
})

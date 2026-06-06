import multer from 'multer'
import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

const uploadDir = path.resolve(process.env.UPLOAD_DIR ?? './uploads')
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const safeName = file.originalname
      .toLowerCase()
      .replace(/[^a-z0-9.\-_]/g, '-')
      .replace(/-+/g, '-')
    cb(null, safeName)
  },
})

const maxSizeMB = Number(process.env.MAX_FILE_SIZE_MB ?? 10)

export const upload = multer({
  storage,
  limits: { fileSize: maxSizeMB * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp|svg|pdf/
    if (allowed.test(file.mimetype)) cb(null, true)
    else cb(new Error('Tipo de ficheiro não suportado'))
  },
})

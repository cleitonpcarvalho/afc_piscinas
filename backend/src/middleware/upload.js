import multer from 'multer'

const maxSizeMB = Number(process.env.MAX_FILE_SIZE_MB ?? 10)

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: maxSizeMB * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp|svg|pdf/
    if (allowed.test(file.mimetype)) cb(null, true)
    else cb(new Error('Tipo de ficheiro não suportado'))
  },
})

import { Router } from 'express'
import { pool } from '../db/connection.js'
import { requireAuth } from '../middleware/auth.js'
import { upload } from '../middleware/upload.js'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

const router = Router()

// GET /api/media
router.get('/', async (req, res) => {
  const { category, search } = req.query
  let sql    = 'SELECT * FROM media'
  const vals = []
  const conds = []

  if (category) { vals.push(category); conds.push(`category = $${vals.length}`) }
  if (search)   { vals.push(`%${search}%`); conds.push(`(filename ILIKE $${vals.length} OR alt_text ILIKE $${vals.length} OR original_name ILIKE $${vals.length})`) }

  if (conds.length) sql += ' WHERE ' + conds.join(' AND ')
  sql += ' ORDER BY created_at DESC'

  const { rows } = await pool.query(sql, vals)
  res.json(rows)
})

// POST /api/media/upload
router.post('/upload', requireAuth, upload.single('file'), async (req, res) => {
  const file = req.file
  if (!file) return res.status(400).json({ error: 'Nenhum ficheiro recebido' })

  const url = process.env.PUBLIC_URL + '/uploads/' + file.filename
  const { alt_text = '', category = 'general', tags = '' } = req.body ?? {}
  const tagsArr = tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : []

  const { rows } = await pool.query(
    `INSERT INTO media (filename, original_name, mime_type, size_bytes, url, alt_text, category, tags)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [file.filename, file.originalname, file.mimetype, file.size, url, alt_text, category, tagsArr]
  )
  res.status(201).json(rows[0])
})

// DELETE /api/media/:id
router.delete('/:id', requireAuth, async (req, res) => {
  const { rows } = await pool.query(
    'DELETE FROM media WHERE id = $1 RETURNING *',
    [req.params.id]
  )
  if (!rows.length) return res.status(404).json({ error: 'Ficheiro não encontrado' })

  const filepath = path.resolve(
    process.env.UPLOAD_DIR ?? './uploads',
    rows[0].filename
  )
  if (fs.existsSync(filepath)) fs.unlinkSync(filepath)

  res.json({ message: 'Eliminado com sucesso', file: rows[0] })
})

export default router

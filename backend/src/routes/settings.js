import { Router } from 'express'
import { pool } from '../db/connection.js'
import { requireAuth } from '../middleware/auth.js'
import { runSeed } from '../db/seed.js'
import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

const router = Router()

// GET /api/settings — todas as settings
router.get('/', async (_req, res) => {
  const { rows } = await pool.query(
    'SELECT key, value, label, type, group_name FROM site_settings ORDER BY group_name, key'
  )
  // Retorna como objecto chave→valor para facilitar o consumo no frontend
  const map = {}
  for (const row of rows) map[row.key] = row
  res.json(map)
})

// GET /api/settings/grouped — agrupadas por group_name
router.get('/grouped', async (_req, res) => {
  const { rows } = await pool.query(
    'SELECT key, value, label, type, group_name FROM site_settings ORDER BY group_name, key'
  )
  const grouped = {}
  for (const row of rows) {
    if (!grouped[row.group_name]) grouped[row.group_name] = []
    grouped[row.group_name].push(row)
  }
  res.json(grouped)
})

// PUT /api/settings/:key — actualiza uma setting
router.put('/:key', requireAuth, async (req, res) => {
  const { key } = req.params
  const { value } = req.body ?? {}
  if (value === undefined) return res.status(400).json({ error: 'value obrigatório' })

  const { rows } = await pool.query(
    'UPDATE site_settings SET value = $1 WHERE key = $2 RETURNING *',
    [value, key]
  )
  if (!rows.length) return res.status(404).json({ error: 'Setting não encontrada' })
  res.json(rows[0])
})

// PUT /api/settings — actualiza várias settings de uma vez { key: value, ... }
router.put('/', requireAuth, async (req, res) => {
  const updates = req.body ?? {}
  const results = []
  for (const [key, value] of Object.entries(updates)) {
    const { rows } = await pool.query(
      'UPDATE site_settings SET value = $1 WHERE key = $2 RETURNING key, value',
      [String(value), key]
    )
    if (rows.length) results.push(rows[0])
  }
  res.json({ updated: results.length, results })
})

// POST /api/settings/publish — placeholder para publicação futura
router.post('/publish', requireAuth, async (_req, res) => {
  res.json({ message: 'Publicado com sucesso (sem-op nesta etapa)' })
})

// POST /api/settings/run-seeds — re-executa o seed sem truncar
router.post('/run-seeds', requireAuth, async (_req, res) => {
  try {
    await runSeed()
    res.json({ message: 'Seed executado com sucesso' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /api/settings/fix-media-urls — corrige URLs da media que ficaram erradas
router.post('/fix-media-urls', requireAuth, async (req, res) => {
  const base = process.env.PUBLIC_URL + '/uploads/'
  const { rows } = await pool.query('SELECT id, filename FROM media')
  let fixed = 0
  for (const row of rows) {
    const url = base + row.filename
    await pool.query('UPDATE media SET url = $1 WHERE id = $2', [url, row.id])
    fixed++
  }
  res.json({ fixed })
})

// GET /api/settings/debug-uploads — lista ficheiros físicos vs. registos
router.get('/debug-uploads', requireAuth, async (_req, res) => {
  const uploadDir = path.resolve(process.env.UPLOAD_DIR ?? './uploads')
  const physical  = fs.existsSync(uploadDir) ? fs.readdirSync(uploadDir) : []
  const { rows }  = await pool.query('SELECT id, filename, url FROM media ORDER BY id')
  res.json({ physical_files: physical, db_records: rows })
})

export default router

import { Router } from 'express'
import { pool } from '../db/connection.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// GET /api/content/pages
router.get('/pages', async (_req, res) => {
  const { rows } = await pool.query(
    `SELECT p.*,
       COALESCE(
         json_agg(s ORDER BY s.order_num) FILTER (WHERE s.id IS NOT NULL),
         '[]'
       ) AS sections
     FROM pages p
     LEFT JOIN sections s ON s.page_id = p.id AND s.is_active = TRUE
     GROUP BY p.id
     ORDER BY p.id`
  )
  res.json(rows)
})

// GET /api/content/pages/:slug
router.get('/pages/:slug', async (req, res) => {
  const { rows: pages } = await pool.query(
    'SELECT * FROM pages WHERE slug = $1',
    [req.params.slug]
  )
  if (!pages.length) return res.status(404).json({ error: 'Página não encontrada' })

  const page = pages[0]
  const { rows: sections } = await pool.query(
    'SELECT * FROM sections WHERE page_id = $1 AND is_active = TRUE ORDER BY order_num',
    [page.id]
  )
  res.json({ ...page, sections })
})

// PUT /api/content/sections/:id
router.put('/sections/:id', requireAuth, async (req, res) => {
  const { id } = req.params
  const { title, content, order_num, is_active } = req.body ?? {}

  const fields = []
  const values = []
  let i = 1

  if (title      !== undefined) { fields.push(`title = $${i++}`);      values.push(title) }
  if (content    !== undefined) { fields.push(`content = $${i++}`);    values.push(JSON.stringify(content)) }
  if (order_num  !== undefined) { fields.push(`order_num = $${i++}`);  values.push(order_num) }
  if (is_active  !== undefined) { fields.push(`is_active = $${i++}`);  values.push(is_active) }

  if (!fields.length) return res.status(400).json({ error: 'Nenhum campo para actualizar' })

  values.push(id)
  const { rows } = await pool.query(
    `UPDATE sections SET ${fields.join(', ')} WHERE id = $${i} RETURNING *`,
    values
  )
  if (!rows.length) return res.status(404).json({ error: 'Secção não encontrada' })
  res.json(rows[0])
})

export default router

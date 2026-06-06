import { Router } from 'express'
import { pool } from '../db/connection.js'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const { rows } = await pool.query('SELECT NOW() AS db_time')
    res.json({
      status: 'ok',
      db:     'connected',
      db_time: rows[0].db_time,
      uptime: process.uptime(),
    })
  } catch (err) {
    res.status(500).json({ status: 'error', detail: err.message })
  }
})

export default router

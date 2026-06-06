import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { pool } from '../db/connection.js'

const router = Router()

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body ?? {}
  if (!email || !password) {
    return res.status(400).json({ error: 'Email e password obrigatórios' })
  }

  const { rows } = await pool.query(
    'SELECT * FROM admin_users WHERE email = $1',
    [email]
  )
  const user = rows[0]
  if (!user) return res.status(401).json({ error: 'Credenciais inválidas' })

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) return res.status(401).json({ error: 'Credenciais inválidas' })

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN ?? '7d' }
  )

  res.json({ token, user: { id: user.id, email: user.email, name: user.name } })
})

// POST /api/auth/setup — cria o primeiro admin se não existir
router.post('/setup', async (req, res) => {
  const { rows } = await pool.query('SELECT id FROM admin_users LIMIT 1')
  if (rows.length > 0) {
    return res.status(409).json({ error: 'Admin já existe' })
  }

  const email    = process.env.ADMIN_EMAIL    || 'geral@afcpiscinas.pt'
  const password = process.env.ADMIN_PASSWORD || '123AfcPiscinas2026@'
  const hashed   = await bcrypt.hash(password, 12)

  await pool.query(
    'INSERT INTO admin_users (email, password, name) VALUES ($1, $2, $3)',
    [email, hashed, 'Administrador AFC']
  )

  res.status(201).json({ message: 'Admin criado com sucesso', email })
})

export default router

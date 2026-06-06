import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

import { runMigrations } from './src/db/connection.js'
import { runSeed }       from './src/db/seed.js'

import healthRouter   from './src/routes/health.js'
import authRouter     from './src/routes/auth.js'
import settingsRouter from './src/routes/settings.js'
import contentRouter  from './src/routes/content.js'
import mediaRouter    from './src/routes/media.js'
import contactRouter  from './src/routes/contact.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app  = express()
const PORT = Number(process.env.PORT) || 3001

// ─── CORS ────────────────────────────────────────────────────────────────────
const allowedOrigins = (process.env.CORS_ORIGIN ?? '').split(',').map(o => o.trim())

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) callback(null, true)
    else callback(new Error('CORS não permitido: ' + origin))
  },
  credentials: true,
}))

// ─── Body parsers ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: '20mb' }))
app.use(express.urlencoded({ extended: true }))

// ─── Ficheiros estáticos (uploads) ───────────────────────────────────────────
const uploadDir = path.resolve(process.env.UPLOAD_DIR ?? './uploads')
app.use('/uploads', express.static(uploadDir))

// ─── Rotas ───────────────────────────────────────────────────────────────────
app.use('/api/health',   healthRouter)
app.use('/api/auth',     authRouter)
app.use('/api/settings', settingsRouter)
app.use('/api/content',  contentRouter)
app.use('/api/media',    mediaRouter)
app.use('/api/contact',  contactRouter)

// Rota raiz
app.get('/', (_req, res) => {
  res.json({ service: 'AFC Piscinas API', version: '1.0.0', status: 'running' })
})

// ─── 404 catch-all ───────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' })
})

// ─── Error handler ───────────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('[ERROR]', err.message)
  res.status(err.status || 500).json({ error: err.message || 'Erro interno' })
})

// ─── Boot ────────────────────────────────────────────────────────────────────
async function boot() {
  try {
    await runMigrations()
    await runSeed()
    app.listen(PORT, () => {
      console.log(`\n🚀 AFC Piscinas API`)
      console.log(`   Porta  : ${PORT}`)
      console.log(`   Env    : ${process.env.NODE_ENV}`)
      console.log(`   Health : http://localhost:${PORT}/api/health\n`)
    })
  } catch (err) {
    console.error('Falha ao arrancar:', err)
    process.exit(1)
  }
}

boot()

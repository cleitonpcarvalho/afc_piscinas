import pg from 'pg'
import dotenv from 'dotenv'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

dotenv.config()

const { Pool } = pg
const __dirname = dirname(fileURLToPath(import.meta.url))

export const pool = new Pool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME     || 'afc_piscinas',
  user:     process.env.DB_USER     || 'postgres',
  password: process.env.DB_PASSWORD || '',
})

export async function runMigrations() {
  const sql = readFileSync(
    join(__dirname, 'migrations', '001_initial.sql'),
    'utf8'
  )
  await pool.query(sql)
  console.log('✓ Migrations aplicadas')
}

export async function query(text, params) {
  return pool.query(text, params)
}

import pg from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const { Pool } = pg

export const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      }
    : {
        host:     process.env.DB_HOST,
        port:     parseInt(process.env.DB_PORT || '5432'),
        database: process.env.DB_NAME,
        user:     process.env.DB_USER,
        password: process.env.DB_PASSWORD,
      }
)

export async function runMigrations() {
  try {
    await pool.query('SELECT 1')
    console.log('Ligacao ao banco OK')
  } catch (e) {
    console.error('Erro ao ligar ao banco:', e.message)
    throw e
  }
}

export async function query(text, params) {
  return pool.query(text, params)
}

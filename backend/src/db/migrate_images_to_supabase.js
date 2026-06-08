import fs from 'fs'
import path from 'path'
import { createClient } from '@supabase/supabase-js'
import pg from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE)
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } })
const BUCKET = 'afc-piscinas'

const SEARCH_DIRS = [
  '/Users/cleitonpcarvalho/Documents/Sites Effect Idea/ afc_piscinas/backend/uploads',
  '/Users/cleitonpcarvalho/Documents/Sites Effect Idea/ afc_piscinas/afc_assets/inicio',
  '/Users/cleitonpcarvalho/Documents/Sites Effect Idea/ afc_piscinas/afc_assets/piscinas',
  '/Users/cleitonpcarvalho/Documents/Sites Effect Idea/ afc_piscinas/afc_assets/saunas',
  '/Users/cleitonpcarvalho/Documents/Sites Effect Idea/ afc_piscinas/afc_assets/turcos',
  '/Users/cleitonpcarvalho/Documents/Sites Effect Idea/ afc_piscinas/afc_assets/spas',
  '/Users/cleitonpcarvalho/Documents/Sites Effect Idea/ afc_piscinas/afc_assets/complementos',
  '/Users/cleitonpcarvalho/Documents/Sites Effect Idea/ afc_piscinas/site/src/assets/pexels',
]

async function run() {
  const { rows: mediaRows } = await pool.query('SELECT id, filename, url FROM media')
  console.log(mediaRows.length + ' imagens no banco')
  let ok = 0, erros = 0

  for (const row of mediaRows) {
    let filePath = null
    for (const dir of SEARCH_DIRS) {
      const p = path.join(dir, row.filename)
      if (fs.existsSync(p)) { filePath = p; break }
    }

    if (!filePath) {
      console.log('  NAO ENCONTRADO: ' + row.filename)
      erros++; continue
    }

    const buffer = fs.readFileSync(filePath)
    const ext = path.extname(row.filename).toLowerCase()
    const mime = ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg'

    const { error } = await supabase.storage.from(BUCKET).upload(row.filename, buffer, { contentType: mime, upsert: true })
    if (error && !error.message.includes('already exists')) {
      console.log('  ERRO: ' + row.filename + ' -> ' + error.message)
      erros++; continue
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(row.filename)
    const publicUrl = data.publicUrl

    await pool.query('UPDATE media SET url = $1 WHERE id = $2', [publicUrl, row.id])
    await pool.query(
      "UPDATE sections SET content = replace(content::text, $1, $2)::jsonb WHERE content::text LIKE '%' || $3 || '%'",
      [row.url, publicUrl, row.filename]
    )

    console.log('  OK: ' + row.filename)
    ok++
  }

  console.log('\nConcluido: ' + ok + ' OK, ' + erros + ' erros')
  await pool.end()
}
run().catch(e => { console.error(e); process.exit(1) })

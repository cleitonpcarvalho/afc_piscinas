import { pool } from './connection.js'
import dotenv from 'dotenv'
dotenv.config()

async function run() {
  // 1. Buscar todas as imagens do banco
  const { rows: mediaRows } = await pool.query('SELECT filename, url FROM media')
  const mediaMap = {}
  for (const m of mediaRows) {
    mediaMap[m.filename] = m.url
    // indexar pelo nome sem prefixo numérico e sem extensão
    const base = m.filename.replace(/^img_\d+_/, '').replace(/\.[^.]+$/, '')
    mediaMap[base] = m.url
  }
  console.log(`Media no banco: ${mediaRows.length} imagens`)

  // 2. Buscar todas as secções
  const { rows: sections } = await pool.query('SELECT id, slug, content FROM sections')

  let updated = 0
  for (const sec of sections) {
    const content = sec.content || {}
    let changed = false

    for (const [key, value] of Object.entries(content)) {
      if (typeof value !== 'string') continue
      if (!value.includes('../assets') && !value.includes('/assets')) continue

      // Extrair nome do ficheiro do caminho relativo
      const parts = value.split('/')
      const filename = parts[parts.length - 1]

      let newUrl = mediaMap[filename]
      if (!newUrl) {
        const nameNoExt = filename.replace(/\.[^.]+$/, '')
        newUrl = mediaMap[nameNoExt]
      }
      if (!newUrl) {
        const nameClean = filename.replace(/^img_\d+_/, '').replace(/\.[^.]+$/, '')
        newUrl = mediaMap[nameClean]
      }

      if (newUrl) {
        content[key] = newUrl
        changed = true
        console.log(`  [${sec.slug}] ${key}: ${filename} -> ${newUrl}`)
      } else {
        console.log(`  [${sec.slug}] ${key}: NAO ENCONTRADO para ${filename}`)
      }
    }

    if (changed) {
      await pool.query('UPDATE sections SET content = $1 WHERE id = $2', [JSON.stringify(content), sec.id])
      updated++
    }
  }

  console.log(`\nSeccoes actualizadas: ${updated}`)
  await pool.end()
}

run().catch(e => { console.error(e); process.exit(1) })

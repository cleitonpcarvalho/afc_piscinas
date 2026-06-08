import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const API     = 'http://localhost:3001'
const EMAIL   = 'geral@afcpiscinas.pt'
const PASS    = '123AfcPiscinas2026@'

const ASSET_FOLDERS = [
  '/Users/cleitonpcarvalho/Documents/Sites Effect Idea/ afc_piscinas/afc_assets/inicio',
  '/Users/cleitonpcarvalho/Documents/Sites Effect Idea/ afc_piscinas/afc_assets/piscinas',
  '/Users/cleitonpcarvalho/Documents/Sites Effect Idea/ afc_piscinas/afc_assets/saunas',
  '/Users/cleitonpcarvalho/Documents/Sites Effect Idea/ afc_piscinas/afc_assets/turcos',
  '/Users/cleitonpcarvalho/Documents/Sites Effect Idea/ afc_piscinas/afc_assets/spas',
  '/Users/cleitonpcarvalho/Documents/Sites Effect Idea/ afc_piscinas/afc_assets/complementos',
]

function sanitizeName(original) {
  return original
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]/g, '-')
    .replace(/-+/g, '-')
}

async function login() {
  const res = await fetch(`${API}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASS }),
  })
  if (!res.ok) throw new Error(`Login falhou: ${res.status} ${await res.text()}`)
  const data = await res.json()
  return data.token
}

async function getExistingFilenames(token) {
  const res = await fetch(`${API}/api/media`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error(`Erro ao listar media: ${res.status}`)
  const rows = await res.json()
  return new Set(rows.map(r => r.filename))
}

async function uploadFile(token, filePath, category) {
  const filename = path.basename(filePath)
  const buffer   = fs.readFileSync(filePath)
  const ext      = path.extname(filename).slice(1).toLowerCase()
  const mime     = ext === 'png' ? 'image/png' : 'image/jpeg'

  const form = new FormData()
  form.append('file', new Blob([buffer], { type: mime }), filename)
  form.append('category', category)
  form.append('alt_text', filename.replace(/[-_]/g, ' ').replace(/\.[^.]+$/, ''))

  const res = await fetch(`${API}/api/media/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  })

  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`${res.status} ${txt}`)
  }
  return await res.json()
}

async function main() {
  console.log('→ A fazer login…')
  const token = await login()
  console.log('  ✓ Token obtido')

  console.log('→ A carregar lista de ficheiros existentes…')
  const existing = await getExistingFilenames(token)
  console.log(`  ✓ ${existing.size} ficheiros já no banco`)

  let uploaded = 0
  let skipped  = 0
  let errors   = 0

  for (const folder of ASSET_FOLDERS) {
    const category = path.basename(folder)

    if (!fs.existsSync(folder)) {
      console.log(`  ⚠ Pasta não encontrada: ${folder}`)
      continue
    }

    const files = fs.readdirSync(folder).filter(f => /\.(jpg|jpeg|png)$/i.test(f))
    console.log(`\n→ ${category} (${files.length} ficheiros)`)

    for (const file of files) {
      const safeName = sanitizeName(file)

      if (existing.has(safeName)) {
        console.log(`  ↷  ${file} (já existe)`)
        skipped++
        continue
      }

      try {
        await uploadFile(token, path.join(folder, file), category)
        console.log(`  ✓  ${file}`)
        uploaded++
        existing.add(safeName)
      } catch (err) {
        console.log(`  ✗  ${file} — ${err.message}`)
        errors++
      }
    }
  }

  console.log(`\n═══════════════════════════════`)
  console.log(`  Carregados : ${uploaded}`)
  console.log(`  Ignorados  : ${skipped} (já existiam)`)
  console.log(`  Erros      : ${errors}`)
  console.log(`═══════════════════════════════`)
}

main().catch(err => { console.error('Erro fatal:', err.message); process.exit(1) })

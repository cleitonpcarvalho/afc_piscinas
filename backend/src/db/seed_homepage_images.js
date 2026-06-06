import { pool } from './connection.js'
import dotenv from 'dotenv'
dotenv.config()

async function run() {
  // 1. Carregar mapa filename → url
  const { rows: media } = await pool.query('SELECT filename, url FROM media')
  const m = {}
  for (const r of media) m[r.filename] = r.url
  console.log(`Media carregada: ${media.length} imagens`)

  const url = (f) => m[f] || null

  // 2. Obter page_id da inicio
  const { rows: pages } = await pool.query(`SELECT id FROM pages WHERE slug = 'inicio'`)
  if (!pages.length) throw new Error("Página 'inicio' não encontrada")
  const pageId = pages[0].id
  console.log(`→ Página 'inicio' (id=${pageId})`)

  // ─── HELPER: merge image fields into existing section ──────────────────────
  async function mergeImages(sectionSlug, images) {
    const { rows } = await pool.query(
      'SELECT id, content FROM sections WHERE page_id = $1 AND slug = $2',
      [pageId, sectionSlug]
    )
    if (!rows.length) {
      console.log(`  ⚠ Secção '${sectionSlug}' não encontrada`)
      return 0
    }
    const content = { ...(rows[0].content || {}) }
    let added = 0
    for (const [key, imgUrl] of Object.entries(images)) {
      if (imgUrl === undefined) continue
      content[key] = imgUrl ?? ''
      added++
    }
    await pool.query('UPDATE sections SET content = $1 WHERE id = $2',
      [JSON.stringify(content), rows[0].id])
    console.log(`  ✓ ${sectionSlug}: +${added} campos de imagem`)
    return added
  }

  // ─── HELPER: insert or update section with full content ────────────────────
  async function upsertSection(slug, title, order_num, content) {
    await pool.query(
      `INSERT INTO sections (page_id, slug, title, order_num, content)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (page_id, slug) DO UPDATE
         SET title     = EXCLUDED.title,
             order_num = EXCLUDED.order_num,
             content   = sections.content || EXCLUDED.content`,
      [pageId, slug, title, order_num, JSON.stringify(content)]
    )
    console.log(`  ✓ ${slug}: upserted`)
  }

  let total = 0

  // ─── HERO — bg_image já existe, confirmar ──────────────────────────────────
  total += await mergeImages('hero', {
    bg_image: url('img_05_42-768x576.jpg'),
  })

  // ─── SOBRE NÓS — nova secção (order_num=15) ────────────────────────────────
  await upsertSection('sobre_nos', 'Sobre Nós', 15, {
    eyebrow:  'Sobre nós',
    heading:  'Venha Mergulhar no nosso mundo',
    text_1:   'AFC Piscinas, é uma empresa reconhecida na sua área, como sendo uma aposta na qualidade. Tanto no sector comercial, como na construção e na própria instalação, orgulhamo-nos de trabalhar com os melhores profissionais.',
    text_2:   'A qualidade e a fiabilidade são as nossas maiores preocupações. Garantimos um serviço pós-venda eficaz, para a manutenção da sua piscina.',
    imagem_1: url('img_02_42-1024x768.jpg'),
    imagem_2: url('img_06_38.jpg'),
    imagem_3: url('img_07_7.jpg'),
  })

  // ─── BEFORE / AFTER — nova secção (order_num=16) ──────────────────────────
  await upsertSection('before_after', 'Antes & Depois', 16, {
    eyebrow:       'Transformação',
    heading:       'Do Sonho à Realidade',
    subheading:    'Arraste o divisor para ver a diferença antes e depois da renovação.',
    imagem_antes:  '',   // pexels — seleccionar via admin
    imagem_depois: '',   // pexels — seleccionar via admin
  })

  // ─── SERVICES — 6 imagens de separadores ──────────────────────────────────
  total += await mergeImages('services', {
    imagem_piscinas:     url('img_02_46-768x576.jpg'),
    imagem_saunas:       url('img_02_sauna2-768x576.jpg'),
    imagem_turcos:       url('img_02_turco1.jpg'),
    imagem_spas:         url('img_02_spas-0039-spa3-768x768.jpg'),
    imagem_complementos: url('img_02_entrada-telescopicas.jpg'),
    imagem_manutencao:   url('img_10_38-1-768x576.jpg'),
  })

  // ─── PROJECTS — 6 fotos de projecto ───────────────────────────────────────
  total += await mergeImages('projects', {
    imagem_1: url('img_02_42-1024x768.jpg'),
    imagem_2: url('img_06_38.jpg'),
    imagem_3: url('img_07_7.jpg'),
    imagem_4: url('img_03_45-1-768x576.jpg'),
    imagem_5: url('img_04_44-768x576.jpg'),
    imagem_6: url('img_05_43-768x576.jpg'),
  })

  // ─── CTA BANNER — bg_image ────────────────────────────────────────────────
  total += await mergeImages('cta_banner', {
    bg_image: '',   // pexels — seleccionar via admin
  })

  // ─── TESTIMONIALS — fotos dos clientes ────────────────────────────────────
  total += await mergeImages('testimonials', {
    foto_1: '',   // pexels — seleccionar via admin
    foto_2: '',   // pexels — seleccionar via admin
    foto_3: '',   // pexels — seleccionar via admin
  })

  console.log(`\n═══════════════════════════════════`)
  console.log(`  Campos de imagem actualizados: ${total}`)
  console.log(`  Secções novas: sobre_nos, before_after`)
  console.log(`═══════════════════════════════════`)
  await pool.end()
}

run().catch(e => { console.error('Erro:', e.message); process.exit(1) })

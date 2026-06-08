import { pool } from './connection.js'
import dotenv from 'dotenv'
dotenv.config()

async function run() {
  // 1. Carregar mapa filename -> url do banco
  const { rows: media } = await pool.query('SELECT filename, url FROM media')
  const m = {}
  for (const r of media) m[r.filename] = r.url
  console.log(`Media carregada: ${media.length} imagens`)

  // Helper: buscar URL por filename exacto
  const url = (f) => m[f] || null

  // 2. Definir mapeamentos por página/secção
  const UPDATES = [

    // ─── INICIO ───────────────────────────────────────────────────────────────
    {
      pageSlug: 'inicio', sectionSlug: 'hero',
      images: {
        bg_image: url('img_05_42-768x576.jpg'),
      },
    },
    // Secção sobre_nos não existe no banco — não faz nada

    // ─── PISCINAS ─────────────────────────────────────────────────────────────
    {
      pageSlug: 'piscinas', sectionSlug: 'hero',
      images: {
        bg_image: url('img_02_46-768x576.jpg'),
      },
    },
    {
      pageSlug: 'piscinas', sectionSlug: 'betao',
      images: {
        imagem_1: url('img_02_46-768x576.jpg'),
        imagem_2: url('img_03_45-1-768x576.jpg'),
        imagem_3: url('img_04_44-768x576.jpg'),
        imagem_4: url('img_05_43-768x576.jpg'),
      },
    },
    {
      pageSlug: 'piscinas', sectionSlug: 'fibra',
      images: {
        imagem_1: url('img_60_1-2.jpg'),
        imagem_2: url('img_61_2-2.jpg'),
        imagem_3: url('img_62_3-2.jpg'),
      },
    },
    {
      pageSlug: 'piscinas', sectionSlug: 'aco',
      images: {
        imagem_1: url('img_70_1-3.jpg'),
        imagem_2: url('img_71_2-3.jpg'),
        imagem_3: url('img_72_3-3.jpg'),
      },
    },
    {
      pageSlug: 'piscinas', sectionSlug: 'polimeros',
      images: {
        imagem_1: url('img_69_polimero4.jpg'),
        imagem_2: url('img_75_polimero2.jpg'),
        imagem_3: url('img_76_polimero1.jpg'),
        imagem_4: url('img_77_polimero3.jpg'),
      },
    },
    {
      pageSlug: 'piscinas', sectionSlug: 'tela',
      images: {
        imagem_1: url('img_78_1-4-768x576.jpg'),
        imagem_2: url('img_79_2-4-768x576.jpg'),
        imagem_3: url('img_80_3-4-768x576.jpg'),
      },
    },

    // ─── COMPLEMENTOS ─────────────────────────────────────────────────────────
    {
      pageSlug: 'complementos', sectionSlug: 'hero',
      images: {
        bg_image: url('img_02_entrada-telescopicas.jpg'),
      },
    },
    {
      pageSlug: 'complementos', sectionSlug: 'piscinas_cobertas',
      images: {
        bg_image: url('img_02_entrada-telescopicas.jpg'),
      },
    },
    {
      pageSlug: 'complementos', sectionSlug: 'telescopicas',
      images: {
        imagem_1:  url('img_03_coberturas-telescopicas-02-768x576.jpg'),
        imagem_2:  url('img_04_coberturas-telescopicas-03-768x576.jpg'),
        imagem_3:  url('img_05_coberturas-telescopicas-04-768x576.jpg'),
        imagem_4:  url('img_06_coberturas-telescopicas-05-768x576.jpg'),
        imagem_5:  url('img_07_coberturas-telescopicas-06-768x576.jpg'),
        imagem_6:  url('img_08_coberturas-telescopicas-07-768x576.jpg'),
        imagem_7:  url('img_09_coberturas-telescopicas-08-768x512.jpg'),
        imagem_8:  url('img_10_coberturas-telescopicas-09-768x512.jpg'),
        imagem_9:  url('img_11_coberturas-telescopicas-10-768x576.jpg'),
      },
    },
    {
      pageSlug: 'complementos', sectionSlug: 'aquecimento',
      images: {
        bg_image: url('img_12_aquecimento.jpg'),
      },
    },

    // ─── SAUNAS ───────────────────────────────────────────────────────────────
    {
      pageSlug: 'saunas', sectionSlug: 'hero',
      images: {
        bg_image: url('img_02_sauna2-768x576.jpg'),
      },
    },
    {
      pageSlug: 'saunas', sectionSlug: 'intro',
      images: {
        imagem_1: url('img_02_sauna2-768x576.jpg'),
        imagem_2: url('img_05_sauna5-768x512.jpg'),
        imagem_3: url('img_08_sauna10-768x512.jpg'),
        imagem_4: url('img_11_sauna13-768x576.jpg'),
      },
    },

    // ─── TURCOS ───────────────────────────────────────────────────────────────
    {
      pageSlug: 'turcos', sectionSlug: 'hero',
      images: {
        bg_image: url('img_02_turco1.jpg'),
      },
    },
    {
      pageSlug: 'turcos', sectionSlug: 'intro',
      images: {
        imagem_principal: url('img_02_turco1.jpg'),
        imagem_2:         url('img_03_turco2.jpg'),
        imagem_3:         url('img_04_turco3.jpg'),
      },
    },

    // ─── SPAS ─────────────────────────────────────────────────────────────────
    {
      pageSlug: 'spas', sectionSlug: 'hero',
      images: {
        bg_image: url('img_02_spas-0039-spa3-768x768.jpg'),
      },
    },
    {
      pageSlug: 'spas', sectionSlug: 'intro',
      images: {
        imagem_principal: url('img_02_spas-0039-spa3-768x768.jpg'),
      },
    },
    {
      pageSlug: 'spas', sectionSlug: 'objectivo',
      images: {
        imagem_exterior: url('img_02_spas-0039-spa3-768x768.jpg'),
        imagem_interior: url('img_03_spas-0040-camada-0-768x768.jpg'),
        imagem_jacuzzi:  url('img_04_spas-0036-spa7-768x768.jpg'),
      },
    },
  ]

  // 3. Aplicar cada update
  let totalUpdated = 0
  let totalFields  = 0

  for (const upd of UPDATES) {
    // Encontrar page_id
    const { rows: pages } = await pool.query(
      'SELECT id FROM pages WHERE slug = $1', [upd.pageSlug]
    )
    if (!pages.length) {
      console.log(`  ⚠ Página '${upd.pageSlug}' não encontrada`)
      continue
    }
    const pageId = pages[0].id

    // Encontrar secção
    const { rows: secs } = await pool.query(
      'SELECT id, content FROM sections WHERE page_id = $1 AND slug = $2',
      [pageId, upd.sectionSlug]
    )
    if (!secs.length) {
      console.log(`  ⚠ Secção '${upd.sectionSlug}' em '${upd.pageSlug}' não encontrada`)
      continue
    }

    const sec     = secs[0]
    const content = { ...(sec.content || {}) }
    let added = 0

    for (const [key, imgUrl] of Object.entries(upd.images)) {
      if (!imgUrl) { console.log(`    ↷ ${key}: imagem não encontrada no banco`); continue }
      content[key] = imgUrl
      added++
    }

    await pool.query(
      'UPDATE sections SET content = $1 WHERE id = $2',
      [JSON.stringify(content), sec.id]
    )
    console.log(`  ✓ ${upd.pageSlug}/${upd.sectionSlug}: +${added} imagens`)
    totalUpdated++
    totalFields += added
  }

  console.log(`\n═══════════════════════════════════`)
  console.log(`  Secções actualizadas : ${totalUpdated}`)
  console.log(`  Campos de imagem     : ${totalFields}`)
  console.log(`═══════════════════════════════════`)
  await pool.end()
}

run().catch(e => { console.error('Erro:', e.message); process.exit(1) })

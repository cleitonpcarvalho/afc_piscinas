/**
 * fix_inicio_completo.js
 * 1) Faz upload das imagens pexels para o backend
 * 2) Atualiza TODAS as secções "inicio" com texto exacto das JSX + imagens correctas
 */
import fs   from 'fs'
import path from 'path'
import { pool } from './connection.js'
import dotenv from 'dotenv'
dotenv.config()

const API   = 'http://localhost:3001'
const EMAIL = 'geral@afcpiscinas.pt'
const PASS  = '123AfcPiscinas2026@'

const PEXELS_DIR = '/Users/cleitonpcarvalho/Documents/Sites Effect Idea/ afc_piscinas/site/src/assets/pexels'

// ─── AUTENTICAÇÃO ──────────────────────────────────────────────────────────────
async function login() {
  const res = await fetch(`${API}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASS }),
  })
  if (!res.ok) throw new Error(`Login falhou: ${await res.text()}`)
  return (await res.json()).token
}

// ─── UPLOAD ────────────────────────────────────────────────────────────────────
function sanitize(name) {
  return name.toLowerCase().replace(/[^a-z0-9.\-_]/g, '-').replace(/-+/g, '-')
}

async function uploadPexels(token) {
  const existing = await fetch(`${API}/api/media`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then(r => r.json()).then(rows => new Set(rows.map(r => r.filename)))

  const files = fs.readdirSync(PEXELS_DIR).filter(f => /\.(jpg|jpeg|png)$/i.test(f))
  const uploaded = {}

  for (const file of files) {
    const safe = sanitize(file)
    if (existing.has(safe)) {
      console.log(`  ↷  ${file} (já existe)`)
      uploaded[safe] = `${API}/uploads/${safe}`
      continue
    }
    const buffer = fs.readFileSync(path.join(PEXELS_DIR, file))
    const ext    = path.extname(file).slice(1).toLowerCase()
    const mime   = ext === 'png' ? 'image/png' : 'image/jpeg'
    const form   = new FormData()
    form.append('file', new Blob([buffer], { type: mime }), file)
    form.append('category', 'pexels')
    form.append('alt_text', file.replace(/[-_]/g, ' ').replace(/\.[^.]+$/, ''))

    const res = await fetch(`${API}/api/media/upload`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    })
    if (!res.ok) { console.log(`  ✗  ${file} — ${await res.text()}`); continue }
    const data = await res.json()
    uploaded[safe] = data.url || `${API}/uploads/${safe}`
    console.log(`  ✓  ${file} → ${uploaded[safe]}`)
  }
  return uploaded
}

// ─── MEDIA MAP ─────────────────────────────────────────────────────────────────
async function loadMedia() {
  const { rows } = await pool.query('SELECT filename, url FROM media')
  const m = {}
  for (const r of rows) m[r.filename] = r.url
  return m
}

// ─── UPSERT SECTION ────────────────────────────────────────────────────────────
async function upsert(pageId, slug, title, order_num, content) {
  await pool.query(
    `INSERT INTO sections (page_id, slug, title, order_num, content)
     VALUES ($1,$2,$3,$4,$5)
     ON CONFLICT (page_id, slug) DO UPDATE
       SET title=EXCLUDED.title, order_num=EXCLUDED.order_num, content=EXCLUDED.content`,
    [pageId, slug, title, order_num, JSON.stringify(content)]
  )
  console.log(`  ✓ ${slug}`)
}

// ─── MAIN ──────────────────────────────────────────────────────────────────────
async function run() {
  console.log('→ Login…')
  const token = await login()

  console.log('\n→ Upload imagens pexels…')
  const pexels = await uploadPexels(token)

  console.log('\n→ Carregar mapa de media…')
  const m = await loadMedia()
  const u = (f) => m[f] || null
  const P = (f) => pexels[sanitize(f)] || pexels[f] || null

  console.log('\n→ Página inicio…')
  const { rows } = await pool.query(`SELECT id FROM pages WHERE slug='inicio'`)
  if (!rows.length) throw new Error("Página 'inicio' não encontrada")
  const pid = rows[0].id

  // ── hero ─────────────────────────────────────────────────────────────────────
  await upsert(pid, 'hero', 'Hero Principal', 1, {
    eyebrow:            'Construção · Renovação · Manutenção',
    heading:            'Projetamos e Construímos Piscinas',
    subheading:         'AFC Piscinas — empresa reconhecida e especializada em construção, renovação e manutenção de piscinas, saunas, spas e banhos turcos em Portugal.',
    badge_1:            'Licenciados e Segurados',
    badge_2:            'Garantia de Qualidade',
    badge_3:            'Inspecção Gratuita',
    cta_primary_text:   'Pedir Orçamento Grátis',
    cta_secondary_text: 'Ver os Nossos Projetos',
    bg_image:           P('hero_bg.jpg'),
  })

  // ── stats ────────────────────────────────────────────────────────────────────
  await upsert(pid, 'stats', 'Estatísticas', 2, {
    stat_1_value: 20,  stat_1_suffix: '+', stat_1_label: 'Anos de Experiência',
    stat_2_value: 500, stat_2_suffix: '+', stat_2_label: 'Piscinas Construídas',
    stat_3_value: 98,  stat_3_suffix: '%', stat_3_label: 'Clientes Satisfeitos',
    stat_4_value: 12,  stat_4_suffix: '',  stat_4_label: 'Técnicos Certificados',
  })

  // ── sobre_nos ────────────────────────────────────────────────────────────────
  await upsert(pid, 'sobre_nos', 'Sobre Nós', 3, {
    eyebrow:  'Sobre nós',
    heading:  'Venha Mergulhar no nosso mundo',
    texto_1:  'AFC Piscinas, é uma empresa reconhecida na sua área, como sendo uma aposta na qualidade. Tanto no sector comercial, como na construção e na própria instalação, orgulhamo-nos de trabalhar com os melhores profissionais.',
    texto_2:  'A qualidade e a fiabilidade são as nossas maiores preocupações. Garantimos um serviço pós-venda eficaz, para a manutenção da sua piscina.',
    imagem_1: u('img_02_42-1024x768.jpg'),
    imagem_2: u('img_06_38.jpg'),
    imagem_3: u('img_07_7.jpg'),
  })

  // ── before_after ─────────────────────────────────────────────────────────────
  await upsert(pid, 'before_after', 'Antes & Depois', 4, {
    eyebrow:       'Transformação',
    heading:       'Do Sonho à Realidade',
    subheading:    'Arraste o divisor para ver a diferença antes e depois da renovação.',
    imagem_antes:  P('before_pool.jpg'),
    imagem_depois: P('after_pool.jpg'),
  })

  // ── services ─────────────────────────────────────────────────────────────────
  await upsert(pid, 'services', 'Serviços', 5, {
    eyebrow:              'O que fazemos',
    heading:              'Os Nossos Serviços',
    subheading:           'Do projeto à entrega, cobrimos todas as fases com a mesma dedicação e rigor.',
    imagem_piscinas:      u('img_02_46-768x576.jpg'),
    imagem_saunas:        u('img_02_sauna2-768x576.jpg'),
    imagem_turcos:        u('img_02_turco1.jpg'),
    imagem_spas:          u('img_02_spas-0039-spa3-768x768.jpg'),
    imagem_complementos:  u('img_02_entrada-telescopicas.jpg'),
    imagem_manutencao:    u('img_10_38-1-768x576.jpg'),
  })

  // ── why_us ───────────────────────────────────────────────────────────────────
  await upsert(pid, 'why_us', 'Porquê AFC Piscinas', 6, {
    eyebrow:    'Porquê nós',
    heading:    'Razões para Nos Escolher',
    subheading: 'Mais de 20 anos de experiência e centenas de clientes satisfeitos falam por si.',
    razao_1:    'Técnicos Certificados — Equipa qualificada com formação contínua nas melhores práticas do sector.',
    razao_2:    'Serviço Rápido — Cumprimos os prazos acordados e minimizamos o tempo de obra na sua propriedade.',
    razao_3:    'Preços Transparentes — Orçamentos detalhados e sem surpresas. O preço apresentado é o que paga.',
    razao_4:    'Materiais Premium — Utilizamos apenas materiais de alta qualidade para garantir durabilidade e beleza.',
    razao_5:    'Soluções Completas — Da concepção ao acabamento, gerimos todo o processo com total tranquilidade.',
    razao_6:    'Garantia de Satisfação — Todos os trabalhos têm garantia. A sua satisfação é a nossa prioridade.',
  })

  // ── projects ─────────────────────────────────────────────────────────────────
  await upsert(pid, 'projects', 'Projetos em Destaque', 7, {
    eyebrow:  'Portfólio',
    heading:  'Os Nossos Projetos',
    titulo_1: 'Piscina Residencial',
    titulo_2: 'Piscina Infinity',
    titulo_3: 'Renovação Completa',
    titulo_4: 'Piscina de Lazer',
    titulo_5: 'Piscina Familiar',
    titulo_6: 'Projecto Exclusivo',
    imagem_1: u('img_02_42-1024x768.jpg'),
    imagem_2: u('img_06_38.jpg'),
    imagem_3: u('img_07_7.jpg'),
    imagem_4: u('img_03_45-1-768x576.jpg'),
    imagem_5: u('img_04_44-768x576.jpg'),
    imagem_6: u('img_05_43-768x576.jpg'),
  })

  // ── cta_banner ───────────────────────────────────────────────────────────────
  await upsert(pid, 'cta_banner', 'Banner CTA', 8, {
    eyebrow:    'Comece hoje',
    heading:    'Pronto para Ter a Piscina dos Seus Sonhos?',
    subheading: 'Entre em contacto hoje mesmo e receba um orçamento gratuito e sem compromisso.',
    cta_text:   'Pedir Orçamento Agora',
    bg_image:   P('cta_banner.jpg'),
  })

  // ── process ──────────────────────────────────────────────────────────────────
  await upsert(pid, 'process', 'Processo de Trabalho', 9, {
    eyebrow:       'Como trabalhamos',
    heading:       'O Nosso Processo',
    subheading:    'Simples, transparente e focado em si.',
    passo_1_titulo:    'Consulta Inicial',
    passo_1_descricao: 'Contacte-nos e explicamos as soluções mais adequadas ao seu espaço e orçamento.',
    passo_2_titulo:    'Projecto',
    passo_2_descricao: 'A nossa equipa elabora o projecto detalhado com materiais, prazos e custo final.',
    passo_3_titulo:    'Construção',
    passo_3_descricao: 'Iniciamos a obra com técnicos especializados e acompanhamento permanente.',
    passo_4_titulo:    'Entrega',
    passo_4_descricao: 'Entregamos a sua piscina pronta a utilizar, com garantia e manual de uso.',
  })

  // ── testimonials ─────────────────────────────────────────────────────────────
  await upsert(pid, 'testimonials', 'Testemunhos', 10, {
    eyebrow: 'Testemunhos',
    heading: 'O que Dizem os Nossos Clientes',
    nome_1:  'Carlos Ferreira', local_1: 'Porto',
    texto_1: 'Excelente equipa! Construíram a nossa piscina em tempo recorde e com qualidade impressionante. Muito profissionais e transparentes no orçamento.',
    foto_1:  P('testimonial_1.jpg'),
    nome_2:  'Ana Rodrigues', local_2: 'Lisboa',
    texto_2: 'Renovámos a nossa piscina antiga com a AFC e ficou completamente nova. O acompanhamento foi constante e o resultado superou as expectativas.',
    foto_2:  P('testimonial_2.jpg'),
    nome_3:  'João Martins', local_3: 'Braga',
    texto_3: 'Serviço 5 estrelas. Instalámos uma sauna finlandesa e um spa. Equipa incansável e acabamento de alta qualidade. Recomendo vivamente!',
    foto_3:  P('testimonial_3.jpg'),
  })

  // ── faq ──────────────────────────────────────────────────────────────────────
  await upsert(pid, 'faq', 'Perguntas Frequentes', 11, {
    eyebrow:     'FAQ',
    heading:     'Perguntas Frequentes',
    pergunta_1:  'Que tipos de piscinas a AFC Piscinas constrói?',
    resposta_1:  'Construímos piscinas de betão armado (gunite), poliéster, painéis de aço e polímeros, tanto residenciais como comerciais. Cada projecto é desenvolvido de acordo com as necessidades e espaço do cliente.',
    pergunta_2:  'Quanto tempo demora a construção de uma piscina?',
    resposta_2:  'O tempo varia consoante o tipo e dimensão da piscina. Uma piscina de poliéster pode ser instalada em 1–2 semanas, enquanto uma de betão pode demorar 4–8 semanas. Fornecemos sempre um cronograma detalhado antes do início da obra.',
    pergunta_3:  'Fazem manutenção de piscinas que não construíram?',
    resposta_3:  'Sim, prestamos serviços de manutenção e assistência técnica a qualquer tipo de piscina, independentemente de quem a construiu. Tratamos da água, limpeza, reparações e substituição de equipamentos.',
    pergunta_4:  'Como posso obter um orçamento?',
    resposta_4:  'O orçamento é gratuito e sem compromisso. Pode contactar-nos por telefone, email ou WhatsApp. Deslocamo-nos ao local para fazer uma avaliação e enviamos uma proposta detalhada no prazo de 48 horas.',
    pergunta_5:  'Têm cobertura em todo o território nacional?',
    resposta_5:  'Sim, prestamos serviços em todo o Portugal continental e ilhas. A nossa sede localiza-se em Arcozelo, mas trabalhamos em qualquer ponto do país.',
  })

  console.log('\n═══════════════════════════════════')
  console.log('  Todas as secções actualizadas!')
  console.log('═══════════════════════════════════')
  await pool.end()
}

run().catch(e => { console.error('Erro:', e.message); process.exit(1) })

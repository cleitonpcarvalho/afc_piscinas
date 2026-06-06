import { pool } from './connection.js'
import dotenv from 'dotenv'
dotenv.config()

const API = process.env.PUBLIC_URL || 'http://localhost:3001'

const SECTIONS = [
  {
    slug: 'hero',
    title: 'Hero Principal',
    order_num: 1,
    content: {
      heading: 'Piscinas, Saunas & Spas em Portugal',
      subheading: 'Construção, renovação e manutenção — mais de 30 anos a transformar jardins em paraísos de bem-estar.',
      cta_primary_text: 'Pedir Orçamento Grátis',
      cta_primary_url: 'https://wa.me/351967335707?text=Ol%C3%A1%2C+gostaria+de+um+or%C3%A7amento',
      cta_secondary_text: 'Ver os nossos trabalhos',
      cta_secondary_url: '/piscinas',
      badge_1: '+500 Obras Concluídas',
      badge_2: '+30 Anos de Experiência',
      badge_3: 'Garantia de Qualidade',
      bg_image: `${API}/uploads/img_05_42-768x576.jpg`,
    },
  },
  {
    slug: 'stats',
    title: 'Estatísticas',
    order_num: 2,
    content: {
      stat_1_value: 500,
      stat_1_label: 'Obras Concluídas',
      stat_1_suffix: '+',
      stat_2_value: 30,
      stat_2_label: 'Anos de Experiência',
      stat_2_suffix: '+',
      stat_3_value: 98,
      stat_3_label: 'Clientes Satisfeitos',
      stat_3_suffix: '%',
      stat_4_value: 12,
      stat_4_label: 'Regiões Servidas',
      stat_4_suffix: '',
    },
  },
  {
    slug: 'services',
    title: 'Serviços',
    order_num: 3,
    content: {
      eyebrow: 'O que fazemos',
      heading: 'Soluções Completas para o seu Bem-Estar',
    },
  },
  {
    slug: 'why_us',
    title: 'Porquê AFC Piscinas',
    order_num: 4,
    content: {
      eyebrow: 'Porquê escolher-nos',
      heading: 'A Nossa Diferença',
    },
  },
  {
    slug: 'projects',
    title: 'Projetos em Destaque',
    order_num: 5,
    content: {
      eyebrow: 'Portfólio',
      heading: 'Projetos que Realizámos',
      subheading: 'Uma amostra do nosso trabalho — cada piscina conta uma história.',
    },
  },
  {
    slug: 'cta_banner',
    title: 'Banner CTA',
    order_num: 6,
    content: {
      heading: 'Pronto para Transformar o seu Espaço?',
      subheading: 'Contacte-nos hoje e receba um orçamento personalizado e sem compromisso.',
      cta_text: 'Pedir Orçamento Gratuito',
      cta_wa_msg: 'Ol%C3%A1%2C+gostaria+de+um+or%C3%A7amento+para+uma+piscina',
    },
  },
  {
    slug: 'process',
    title: 'Processo de Trabalho',
    order_num: 7,
    content: {
      eyebrow: 'Como trabalhamos',
      heading: 'Do Sonho à Realidade',
    },
  },
  {
    slug: 'testimonials',
    title: 'Testemunhos',
    order_num: 8,
    content: {
      eyebrow: 'Clientes satisfeitos',
      heading: 'O que dizem de nós',
    },
  },
  {
    slug: 'faq',
    title: 'FAQ',
    order_num: 9,
    content: {
      eyebrow: 'Dúvidas frequentes',
      heading: 'Perguntas Frequentes',
    },
  },
]

async function seedSections() {
  console.log('→ A popular secções da página de início...')

  const res = await pool.query(`SELECT id FROM pages WHERE slug = 'inicio'`)
  if (res.rows.length === 0) {
    throw new Error("Página 'inicio' não encontrada — execute o seed principal primeiro.")
  }
  const pageId = res.rows[0].id

  for (const s of SECTIONS) {
    await pool.query(
      `INSERT INTO sections (page_id, slug, title, order_num, content)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (page_id, slug) DO UPDATE
         SET title     = EXCLUDED.title,
             order_num = EXCLUDED.order_num,
             content   = EXCLUDED.content`,
      [pageId, s.slug, s.title, s.order_num, JSON.stringify(s.content)]
    )
    console.log(`  ✓ Secção '${s.slug}' inserida/actualizada`)
  }

  console.log('Seed das secções completo.')
}

seedSections()
  .then(() => process.exit(0))
  .catch(err => { console.error('Erro:', err.message); process.exit(1) })

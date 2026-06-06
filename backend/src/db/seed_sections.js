import { pool } from './connection.js'
import dotenv from 'dotenv'
dotenv.config()

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
      services: [
        { title: 'Piscinas', text: 'Construção, renovação e manutenção de piscinas residenciais e comerciais.', url: '/piscinas' },
        { title: 'Saunas', text: 'Saunas finlandesas secas, húmidas e de infravermelhos para interior e exterior.', url: '/saunas' },
        { title: 'Spas & Jacuzzi', text: 'Banheiras de hidromassagem e spas de luxo para o seu estilo de vida.', url: '/spas' },
        { title: 'Banhos Turcos', text: 'Hammam tradicional ou moderno — bem-estar através do vapor e calor húmido.', url: '/turcos' },
        { title: 'Complementos', text: 'Coberturas, aquecimento, robôs de limpeza e barreiras de segurança.', url: '/complementos' },
        { title: 'Manutenção', text: 'Serviço pós-venda com manutenção periódica e assistência técnica especializada.', url: '/contactos' },
      ],
    },
  },
  {
    slug: 'why_us',
    title: 'Porquê AFC Piscinas',
    order_num: 4,
    content: {
      eyebrow: 'Porquê escolher-nos',
      heading: 'A Nossa Diferença',
      reasons: [
        { title: 'Experiência Comprovada', text: 'Mais de 30 anos no mercado com centenas de projetos realizados em Portugal.' },
        { title: 'Equipa Especializada', text: 'Técnicos certificados e parceiros de confiança em todas as etapas da obra.' },
        { title: 'Materiais Premium', text: 'Utilizamos exclusivamente materiais de alta qualidade com garantia alargada.' },
        { title: 'Orçamento Sem Compromisso', text: 'Análise gratuita do projeto e orçamento detalhado sem custos adicionais.' },
        { title: 'Serviço Pós-Venda', text: 'Acompanhamento e manutenção continuados para que usufrua sempre ao máximo.' },
        { title: 'Soluções Personalizadas', text: 'Cada projeto é único — adaptamos a solução às suas necessidades e espaço.' },
      ],
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
      steps: [
        { num: '01', title: 'Consulta Inicial', text: 'Reunião gratuita para perceber as suas necessidades, espaço disponível e orçamento.' },
        { num: '02', title: 'Projeto e Orçamento', text: 'Elaboração do projeto técnico e apresentação de orçamento detalhado e transparente.' },
        { num: '03', title: 'Construção', text: 'Execução da obra com materiais certificados e acompanhamento técnico permanente.' },
        { num: '04', title: 'Entrega e Formação', text: 'Entrega da obra concluída com demonstração do funcionamento de todos os equipamentos.' },
      ],
    },
  },
  {
    slug: 'testimonials',
    title: 'Testemunhos',
    order_num: 8,
    content: {
      eyebrow: 'Clientes satisfeitos',
      heading: 'O que dizem de nós',
      testimonials: [
        { name: 'Ricardo Ferreira', location: 'Porto', rating: 5, text: 'Excelente trabalho! A piscina ficou exactamente como imaginámos. Profissionalismo e qualidade em cada detalhe. Recomendo vivamente a AFC Piscinas.' },
        { name: 'Ana Santos', location: 'Vila Nova de Gaia', rating: 5, text: 'Serviço impecável do início ao fim. A equipa foi sempre muito prestável e o resultado final superou as nossas expectativas. O jardim ficou completamente transformado.' },
        { name: 'Carlos Oliveira', location: 'Braga', rating: 5, text: 'Instalámos uma sauna e um spa. O processo foi simples, os prazos foram cumpridos e a qualidade dos materiais é evidente. Muito satisfeito com o investimento.' },
      ],
    },
  },
  {
    slug: 'faq',
    title: 'FAQ',
    order_num: 9,
    content: {
      eyebrow: 'Dúvidas frequentes',
      heading: 'Perguntas Frequentes',
      faqs: [
        { q: 'Quanto tempo demora a construção de uma piscina?', a: 'O prazo varia conforme o tipo e dimensão. Uma piscina de fibra pode ficar pronta em 3-4 semanas; uma piscina de betão armado demora tipicamente 6-10 semanas. Fornecemos sempre um calendário detalhado antes de iniciar a obra.' },
        { q: 'Qual é o custo de uma piscina residencial?', a: 'O investimento depende do tipo de construção, dimensões e equipamentos escolhidos. Piscinas de fibra de vidro são as mais económicas; piscinas de betão armado com equipamentos premium são o segmento mais elevado. Solicite um orçamento sem compromisso para o seu projeto específico.' },
        { q: 'Precisam de manutenção regular?', a: 'Sim. Recomendamos uma manutenção periódica para garantir a qualidade da água, o bom funcionamento dos equipamentos e prolongar a vida útil da piscina. Oferecemos contratos de manutenção anuais adaptados a cada cliente.' },
        { q: 'A AFC Piscinas trabalha fora do distrito do Porto?', a: 'Sim, trabalhamos em todo o norte de Portugal e, mediante consulta, em outras regiões do país. Contacte-nos para avaliar a viabilidade do seu projeto.' },
        { q: 'Que garantias oferecem nas obras?', a: 'Oferecemos garantia estrutural de 5 anos e garantia nos equipamentos conforme o fabricante (habitualmente 2 a 3 anos). Todos os trabalhos são realizados por técnicos certificados com materiais homologados.' },
      ],
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

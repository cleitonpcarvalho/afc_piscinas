import { pool } from './connection.js'
import dotenv from 'dotenv'
dotenv.config()

const PAGE_SECTIONS = {
  piscinas: [
    {
      slug: 'hero', title: 'Hero', order_num: 1,
      content: {
        eyebrow: 'DESDE BETÃO A FIBRA TEMOS TODOS OS',
        heading: 'Tipos de Piscina',
        subheading: 'Construímos todo o tipo de piscinas — desde betão armado a fibra de vidro.',
      },
    },
    {
      slug: 'intro', title: 'Introdução', order_num: 2,
      content: {
        eyebrow: 'Montamos, reparamos…',
        heading: 'Projetamos e Construímos todo o Tipo de Piscinas',
        text: 'AFC Piscinas, empresa reconhecida na sua área, apostando sempre na qualidade tanto no sector comercial como na construção e instalação. Trabalhamos com os melhores profissionais, garantindo um serviço pós-venda eficaz para a manutenção da sua piscina.',
      },
    },
    {
      slug: 'betao', title: 'Betão Armado', order_num: 3,
      content: {
        heading: 'Betão Armado',
        text: 'A técnica de construção tradicional, em betão armado, permite à AFC-PISCINAS propor-lhe uma forma clássica retangular ou uma forma livre direita ou curva; frequentemente a AFC-PISCINAS complementará o seu projeto, com uma escada, que facilitará a entrada e saída da sua piscina, e que lhe confere uma estética topo de gama.',
      },
    },
    {
      slug: 'fibra', title: 'Fibra de Vidro', order_num: 4,
      content: {
        heading: 'Fibra de Vidro',
        text: 'Este tipo de piscina, pré-fabricada, apresenta a vantagem de rápida instalação e fácil manutenção, ou seja, uma piscina de porte médio estaria pronta em vinte dias. Muito mais económica quando comparada com a de betão armado.',
      },
    },
    {
      slug: 'aco', title: 'Painéis de Aço', order_num: 5,
      content: {
        heading: 'Painéis de Aço',
        text: 'As piscinas em kit de painéis em aço devem o seu êxito à qualidade e robustez dos componentes e à rapidez de execução do projeto. Uma tecnologia avançada que lhe garante a ausência de fissuras ao longo dos anos.',
      },
    },
    {
      slug: 'polimeros', title: 'Painéis de Polímeros', order_num: 6,
      content: {
        heading: 'Painéis de Polímeros',
        text: 'Os Painéis de resina são uma descoberta americana. A fiabilidade do sistema tem uma garantia de 50 anos. A conceção elaborada dos painéis e a sua montagem simplificada permitem a realização de formas inéditas.',
      },
    },
    {
      slug: 'tela', title: 'Tela Armada', order_num: 7,
      content: {
        heading: 'Tela Armada',
        text: 'Permite uma construção tradicional em alvenaria com revestimento em Tela Armada de PVC 0,75 mm ou 1,5 mm ou em Fibra de Vidro. O cuidado e boa execução do projeto garante altíssimos níveis de estanquicidade.',
      },
    },
    {
      slug: 'cta', title: 'CTA', order_num: 8,
      content: {
        text: 'Quer uma piscina assim? Peça o seu orçamento gratuito.',
        wa_msg: 'Ol%C3%A1%2C+gostaria+de+pedir+um+or%C3%A7amento+para+uma+piscina',
      },
    },
  ],

  saunas: [
    {
      slug: 'hero', title: 'Hero', order_num: 1,
      content: {
        eyebrow: 'CONSTRUÍMOS QUALQUER TIPO DE',
        heading: 'Saunas',
        subheading: 'O limite será a sua imaginação.',
      },
    },
    {
      slug: 'intro', title: 'Introdução', order_num: 2,
      content: {
        heading: 'O Poder da Sauna',
        text_1: 'A sauna húmida raramente ultrapassa os 60 °C enquanto na sauna seca o corpo humano tolera facilmente temperaturas superiores a 80 °C durante curtos períodos de tempo.',
        text_2: 'A sauna seca é de origem finlandesa (2 milhões de saunas para 5,2 milhões de habitantes) e a prática de saunas é habitual na Escandinávia, onde a temperatura no interior pode chegar a 100 °C.',
        text_3: 'Alegadamente, entre os benefícios da sauna estão o alívio de dores de coluna, o aumento da circulação sanguínea, a hidratação da pele e desobstrução dos poros, o combate ao stress e à hipertensão.',
      },
    },
    {
      slug: 'nota_saude', title: 'Nota de Saúde', order_num: 3,
      content: {
        text: 'A frequência habitual ou prolongada de saunas deve ser autorizada por um médico, pois certas patologias respiratórias e circulatórias não beneficiam com a permanência no ambiente quente das saunas, com uma frequência superior a uma vez por semana.',
      },
    },
    {
      slug: 'cta', title: 'CTA', order_num: 4,
      content: {
        text: 'Interessado em instalar uma sauna? Fale connosco.',
        wa_msg: 'Ol%C3%A1%2C+tenho+interesse+em+instalar+uma+sauna',
      },
    },
  ],

  turcos: [
    {
      slug: 'hero', title: 'Hero', order_num: 1,
      content: {
        eyebrow: 'RELAXE, DESCONTRAIA E REVITALIZE',
        heading: 'Faça do banho turco uma rotina',
        subheading: 'Terapia ancestral para o bem-estar do corpo e da mente.',
      },
    },
    {
      slug: 'intro', title: 'O Banho Turco', order_num: 2,
      content: {
        heading: 'O Banho Turco',
        text_1: 'O banho turco desintoxica o organismo, contribuindo para a redução das gorduras e toxinas. Sem esforço físico, descarrega a electricidade do corpo e relaxa os músculos, reduz o stress e elimina as dores musculares.',
        text_2: 'É indicado em casos de alergias, bronquites, sinusites, obesidade, reumatismo, esgotamento físico e mental, alcoolismo e tabagismo. Adultos, idosos e, até mesmo, crianças, podem desfrutar desta terapia.',
      },
    },
    {
      slug: 'turco_vs_sauna', title: 'Turco vs Sauna', order_num: 3,
      content: {
        heading: 'Turco vs Sauna',
        text: 'Muitas vezes confunde-se banho turco com sauna, mas a realidade é que são terapias bem diferentes. O banho turco consiste em permanecer numa atmosfera saturada de vapor de água, com uma temperatura de cerca de 40–45 graus, no máximo. Por sua vez, a sauna faz-se numa atmosfera seca e pode atingir temperaturas mais elevadas.',
      },
    },
    {
      slug: 'cta', title: 'CTA', order_num: 4,
      content: {
        text: 'Interessado em instalar um banho turco? Fale connosco.',
        wa_msg: 'Ol%C3%A1%2C+tenho+interesse+em+instalar+um+banho+turco',
      },
    },
  ],

  spas: [
    {
      slug: 'hero', title: 'Hero', order_num: 1,
      content: {
        eyebrow: 'ALIVIE O STRESS DO DIA-A-DIA COM OS',
        heading: 'Nossos Spas',
        subheading: 'Banheiras de hidromassagem e spas de luxo para o seu estilo de vida.',
      },
    },
    {
      slug: 'intro', title: 'Um Santuário Privado', order_num: 2,
      content: {
        heading: 'Um Santuário Privado',
        text_1: 'As banheiras de hidromassagem e spas de luxo, ideais para um rejuvenescimento através da hidroterapia, destinam-se a complementar o seu estilo de vida, como num "Home Resort", com um valor notável.',
        text_2: 'Se está à procura de uma banheira íntima de água quente para dois, ou de um grande spa para festas, a AFC-Piscinas, tem o modelo para acomodar as suas necessidades e orçamento.',
      },
    },
    {
      slug: 'objectivo', title: 'Nosso Objectivo', order_num: 3,
      content: {
        heading: 'Nosso Objectivo',
        text: 'Criar uma constante fonte de entretenimento, que poderá desfrutar com a sua família, ouvir música, assistir aos seus programas de televisão favoritos, ou compartilhar a companhia um do outro, no lugar mais relaxante do mundo: a sua casa.',
      },
    },
    {
      slug: 'cta', title: 'CTA', order_num: 4,
      content: {
        text: 'Quer o spa dos seus sonhos? Peça o seu orçamento gratuito.',
        wa_msg: 'Ol%C3%A1%2C+tenho+interesse+em+instalar+um+spa',
      },
    },
  ],

  complementos: [
    {
      slug: 'hero', title: 'Hero', order_num: 1,
      content: {
        eyebrow: 'CONHEÇA TODOS OS NOSSOS',
        heading: 'Complementos',
        subheading: 'Equipamentos e acessórios para maximizar o conforto e segurança da sua piscina.',
      },
    },
    {
      slug: 'piscinas_cobertas', title: 'Piscinas Cobertas', order_num: 2,
      content: {
        heading: 'Piscinas Cobertas',
        text: 'O ambiente ideal, todo o ano! As coberturas exercem um papel muito importante na manutenção e preservação de limpeza na sua piscina, e em alguns modelos são bastante seguras, pois através deste método a piscina não fica exposta a eventuais visitas sem vigilância das suas crianças ou dos seus animais.',
      },
    },
    {
      slug: 'telescopicas', title: 'Coberturas Telescópicas', order_num: 3,
      content: {
        heading: 'Coberturas Telescópicas',
        text: 'Altamente competitivas, pela sua qualidade, garantia e versatilidade. A ampla diversidade dos modelos existentes é a mais adequada às necessidades e estética do seu jardim.',
      },
    },
    {
      slug: 'aquecimento', title: 'Aquecimento', order_num: 4,
      content: {
        heading: 'Aquecimento',
        text: 'A sua água sempre à temperatura desejada. O ambiente ideal, todo o ano! Bombas de Calor, Caldeira, Resistência.',
      },
    },
    {
      slug: 'cta', title: 'CTA', order_num: 5,
      content: {
        text: 'Interessado em complementos para a sua piscina? Fale connosco.',
        wa_msg: 'Ol%C3%A1%2C+tenho+interesse+em+complementos+para+piscina',
      },
    },
  ],

  contactos: [
    {
      slug: 'hero', title: 'Hero', order_num: 1,
      content: {
        heading: 'Fale Connosco',
        subheading: 'Estamos aqui para responder a todas as suas questões.',
      },
    },
    {
      slug: 'formulario', title: 'Formulário de Contacto', order_num: 2,
      content: {
        heading: 'Envie-nos uma Mensagem',
        subheading: 'Respondemos em menos de 24 horas.',
      },
    },
    {
      slug: 'info', title: 'Informações de Contacto', order_num: 3,
      content: {
        heading: 'Tem uma Dúvida?',
        subheading: 'Entre em contacto connosco por qualquer um dos meios abaixo.',
        address: 'Aguda Parque – Edifício J, Largo de Arcozelo, 76, 4405-021 Arcozelo, Portugal',
        phone: '(+351) 96 733 57 07',
        email: 'geral@afcpiscinas.pt',
      },
    },
  ],
}

async function seedAllSections() {
  for (const [pageSlug, sections] of Object.entries(PAGE_SECTIONS)) {
    const res = await pool.query(`SELECT id FROM pages WHERE slug = $1`, [pageSlug])
    if (res.rows.length === 0) {
      console.log(`  ⚠ Página '${pageSlug}' não encontrada, a ignorar`)
      continue
    }
    const pageId = res.rows[0].id
    console.log(`→ Página '${pageSlug}' (id=${pageId}): ${sections.length} secções`)

    for (const s of sections) {
      await pool.query(
        `INSERT INTO sections (page_id, slug, title, order_num, content)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (page_id, slug) DO UPDATE
           SET title     = EXCLUDED.title,
               order_num = EXCLUDED.order_num,
               content   = EXCLUDED.content`,
        [pageId, s.slug, s.title, s.order_num, JSON.stringify(s.content)]
      )
      console.log(`  ✓ ${s.slug}`)
    }
  }
  console.log('\nSeed completo.')
}

seedAllSections()
  .then(() => process.exit(0))
  .catch(err => { console.error('Erro:', err.message); process.exit(1) })

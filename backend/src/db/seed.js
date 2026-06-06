import bcrypt from 'bcryptjs'
import { pool } from './connection.js'
import dotenv from 'dotenv'
dotenv.config()

const SETTINGS = [
  { key: 'site_name',       value: 'AFC Piscinas',                                                                          label: 'Nome do site',         type: 'text',  group: 'contact' },
  { key: 'site_tagline',    value: 'Venha mergulhar connosco',                                                               label: 'Tagline',              type: 'text',  group: 'contact' },
  { key: 'contact_phone',   value: '351 96 733 57 07',                                                                       label: 'Telefone',             type: 'text',  group: 'contact' },
  { key: 'contact_email',   value: 'geral@afcpiscinas.pt',                                                                   label: 'Email de contacto',    type: 'text',  group: 'contact' },
  { key: 'contact_address', value: 'Aguda Parque - Edificio J, Largo de Arcozelo, 76, 4405-021 Arcozelo, Portugal',          label: 'Morada',               type: 'textarea', group: 'contact' },
  { key: 'contact_maps',    value: 'https://maps.app.goo.gl/qF3mxfXTS8EeAK4c7',                                             label: 'Link Google Maps',     type: 'text',  group: 'contact' },
  { key: 'whatsapp_number', value: '351967335707',                                                                           label: 'Número WhatsApp',      type: 'text',  group: 'contact' },
  { key: 'resend_to_email', value: 'geral@afcpiscinas.pt',                                                                   label: 'Email destino formulário', type: 'text', group: 'email' },
  { key: 'social_instagram',value: '',                                                                                        label: 'Instagram URL',        type: 'text',  group: 'social'  },
  { key: 'social_facebook', value: '',                                                                                        label: 'Facebook URL',         type: 'text',  group: 'social'  },
  { key: 'social_youtube',  value: '',                                                                                        label: 'YouTube URL',          type: 'text',  group: 'social'  },
]

const PAGES = [
  { slug: 'inicio',        title: 'Início',        description: 'Página principal' },
  { slug: 'piscinas',      title: 'Piscinas',      description: 'Catálogo de piscinas' },
  { slug: 'complementos',  title: 'Complementos',  description: 'Complementos para piscinas' },
  { slug: 'saunas',        title: 'Saunas',        description: 'Catálogo de saunas' },
  { slug: 'turcos',        title: 'Turcos',        description: 'Banhos turcos' },
  { slug: 'spas',          title: 'Spas',          description: 'Catálogo de spas' },
  { slug: 'contactos',     title: 'Contactos',     description: 'Página de contactos' },
]

export async function runSeed() {
  console.log('→ A executar seed...')

  // Settings
  for (const s of SETTINGS) {
    await pool.query(
      `INSERT INTO site_settings (key, value, label, type, group_name)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (key) DO UPDATE
         SET label = EXCLUDED.label,
             type  = EXCLUDED.type,
             group_name = EXCLUDED.group_name`,
      [s.key, s.value, s.label, s.type, s.group]
    )
  }
  console.log('  ✓ site_settings populado')

  // Pages
  for (const p of PAGES) {
    await pool.query(
      `INSERT INTO pages (slug, title, description)
       VALUES ($1, $2, $3)
       ON CONFLICT (slug) DO NOTHING`,
      [p.slug, p.title, p.description]
    )
  }
  console.log('  ✓ pages populadas')

  // Admin user
  const email    = process.env.ADMIN_EMAIL    || 'geral@afcpiscinas.pt'
  const password = process.env.ADMIN_PASSWORD || '123AfcPiscinas2026@'
  const hashed   = await bcrypt.hash(password, 12)

  await pool.query(
    `INSERT INTO admin_users (email, password, name)
     VALUES ($1, $2, $3)
     ON CONFLICT (email) DO NOTHING`,
    [email, hashed, 'Administrador AFC']
  )
  console.log('  ✓ Admin criado:', email)
}

// Execução directa: node src/db/seed.js
if (process.argv[1].endsWith('seed.js')) {
  runSeed()
    .then(() => { console.log('Seed completo.'); process.exit(0) })
    .catch(err => { console.error('Seed falhou:', err); process.exit(1) })
}

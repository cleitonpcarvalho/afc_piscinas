import { Link } from 'react-router-dom'
import { ShieldCheck, Award, Wrench, Phone } from 'lucide-react'
import heroBg from '../assets/pexels/hero_bg.jpg'
import { useSettings } from '../hooks/useSettings'
import { useSection } from '../contexts/ContentContext'

const WA_URL    = 'https://wa.me/351967335707?text=Ol%C3%A1%2C+gostaria+de+pedir+um+or%C3%A7amento+gratuito'
const BADGE_ICONS = [ShieldCheck, Award, Wrench]

export default function HeroSection() {
  const s   = useSettings()
  const cms = useSection('hero')

  const bgSrc      = cms.bg_image           || heroBg
  const eyebrow    = cms.eyebrow            || 'Construção · Renovação · Manutenção'
  const heading    = cms.heading            || 'Projetamos e Construímos Piscinas'
  const subheading = cms.subheading         || 'AFC Piscinas — empresa reconhecida e especializada em construção, renovação e manutenção de piscinas, saunas, spas e banhos turcos em Portugal.'
  const ctaP       = cms.cta_primary_text   || 'Pedir Orçamento Grátis'
  const ctaS       = cms.cta_secondary_text || 'Ver os Nossos Projetos'
  const badges     = [
    cms.badge_1 || 'Licenciados e Segurados',
    cms.badge_2 || 'Garantia de Qualidade',
    cms.badge_3 || 'Inspecção Gratuita',
  ]

  return (
    <section
      className="relative min-h-screen flex items-center justify-center"
      style={{
        backgroundImage:      `url(${bgSrc})`,
        backgroundSize:       'cover',
        backgroundPosition:   'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.55)' }} />

      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 text-center pt-24 pb-20">
        <span className="section-eyebrow">{eyebrow}</span>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 text-white">
          {heading}
        </h1>

        <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto">
          {subheading}
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary text-base px-8 py-4">
            {ctaP}
          </a>
          <Link to="/piscinas" className="btn-outline-white text-base px-8 py-4">
            {ctaS}
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {badges.map((label, i) => {
            const Icon = BADGE_ICONS[i]
            return (
              <div key={i} className="flex items-center gap-2 text-white/80 text-sm">
                <Icon size={15} className="text-accent" />
                {label}
              </div>
            )
          })}
        </div>
      </div>

      <a
        href={`tel:+${s.whatsapp_number}`}
        className="absolute bottom-8 right-8 hidden md:flex items-center gap-3 px-5 py-3.5 rounded-xl z-20 transition-all hover:scale-105"
        style={{
          background:     'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(12px)',
          border:         '1px solid rgba(255,255,255,0.25)',
        }}
      >
        <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
          <Phone size={16} className="text-white" />
        </div>
        <div>
          <p className="text-white/70 text-xs">Ligue agora</p>
          <p className="text-white font-bold text-sm">
            +{s.whatsapp_number?.replace(/(\d{3})(\d{2})(\d{3})(\d{3})(\d{2})/, '$1 $2 $3 $4 $5') || '351 96 733 57 07'}
          </p>
        </div>
      </a>
    </section>
  )
}

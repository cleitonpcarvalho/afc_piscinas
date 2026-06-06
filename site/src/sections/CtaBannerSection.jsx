import { Phone } from 'lucide-react'
import ctaBg from '../assets/pexels/cta_banner.jpg'

const WA  = 'https://wa.me/351967335707?text=Ol%C3%A1%2C+gostaria+de+pedir+um+or%C3%A7amento+agora'

export default function CtaBannerSection() {
  return (
    <section
      className="relative py-28 flex items-center justify-center text-center"
      style={{
        backgroundImage:    `url(${ctaBg})`,
        backgroundSize:     'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.70)' }} />
      <div className="relative z-10 max-w-2xl mx-auto px-4">
        <p className="section-eyebrow">Comece hoje</p>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
          Pronto para Ter a Piscina<br />dos Seus Sonhos?
        </h2>
        <p className="text-white/70 text-lg mb-10">
          Entre em contacto hoje mesmo e receba um orçamento gratuito e sem compromisso.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-primary text-base px-8 py-4">
            Pedir Orçamento Agora
          </a>
          <a href="tel:+351967335707" className="btn-outline text-base px-8 py-4">
            <Phone size={18} /> Ligar Agora
          </a>
        </div>
      </div>
    </section>
  )
}

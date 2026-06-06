import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'

import imgPiscina     from '../assets/client/piscinas/img_02_46-768x576.jpg'
import imgSauna       from '../assets/client/saunas/img_02_sauna2-768x576.jpg'
import imgTurco       from '../assets/client/turcos/img_02_turco1.jpg'
import imgSpa         from '../assets/client/spas/img_02_spas-0039-spa3-768x768.jpg'
import imgComplemento from '../assets/client/complementos/img_02_entrada-telescopicas.jpg'
import imgManutencao  from '../assets/client/piscinas/img_10_38-1-768x576.jpg'

const WA = 'https://wa.me/351967335707?text=Ol%C3%A1%2C+gostaria+de+pedir+um+or%C3%A7amento'

const TABS = [
  { id: 'piscinas', label: 'Piscinas', img: imgPiscina,
    desc: 'Construção e renovação de piscinas de betão, poliéster e inox, personalizadas ao gosto do cliente.',
    bullets: ['Piscinas de betão armado', 'Piscinas de poliéster', 'Piscinas de painéis de aço', 'Renovação completa'] },
  { id: 'saunas', label: 'Saunas', img: imgSauna,
    desc: 'Saunas finlandesas com design exclusivo, materiais premium e instalação profissional.',
    bullets: ['Saunas finlandesas secas', 'Cabines de infravermelhos', 'Acessórios e pedras vulcânicas', 'Instalação e manutenção'] },
  { id: 'turcos', label: 'Turcos', img: imgTurco,
    desc: 'Banhos turcos (hammam) com materiais resistentes e sistemas de vapor eficientes.',
    bullets: ['Hammam tradicional', 'Geradores de vapor', 'Revestimentos cerâmicos', 'Aromaterapia integrada'] },
  { id: 'spas', label: 'Spas', img: imgSpa,
    desc: 'Spas e jacuzzis de exterior e interior com massagem por jatos e aquecimento eficiente.',
    bullets: ['Spas de exterior premium', 'Spas de interior', 'Sistemas de hidromassagem', 'Aquecimento e filtragem'] },
  { id: 'complementos', label: 'Complementos', img: imgComplemento,
    desc: 'Coberturas telescópicas, aquecimento solar, iluminação e equipamentos de filtragem.',
    bullets: ['Coberturas telescópicas', 'Painéis solares térmicos', 'Iluminação LED subaquática', 'Robôs de limpeza'] },
  { id: 'manutencao', label: 'Manutenção', img: imgManutencao,
    desc: 'Manutenção periódica, tratamento de água, limpeza e assistência técnica especializada.',
    bullets: ['Tratamento de água', 'Limpeza periódica', 'Reparações e assistência', 'Contratos anuais'] },
]

export default function ServicesSection() {
  const [active, setActive] = useState('piscinas')
  const tab = TABS.find(t => t.id === active) || TABS[0]

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12">
          <span className="section-eyebrow">O que fazemos</span>
          <h2 className="section-title">Os Nossos Serviços</h2>
          <p className="text-textmuted mt-3 max-w-xl mx-auto text-sm">
            Do projeto à entrega, cobrimos todas as fases com a mesma dedicação e rigor.
          </p>
        </ScrollReveal>

        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setActive(t.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer
                ${active === t.id
                  ? 'bg-accent text-white shadow-md'
                  : 'bg-white border border-borderlight text-textmuted hover:border-accent hover:text-accent'}`}>
              {t.label}
            </button>
          ))}
        </div>

        <div key={active} className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
             style={{ animation: 'fadeInUp 0.35s ease-out' }}>
          <div>
            <h3 className="text-2xl font-bold text-textprimary mb-3">{tab.label}</h3>
            <p className="text-textmuted leading-relaxed mb-6">{tab.desc}</p>
            <ul className="space-y-3 mb-8">
              {tab.bullets.map(b => (
                <li key={b} className="flex items-center gap-3 text-textprimary text-sm">
                  <CheckCircle2 size={16} className="text-accent flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Pedir Orçamento
            </a>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img src={tab.img} alt={tab.label} className="w-full h-80 lg:h-96 object-cover" />
          </div>
        </div>
      </div>
      <style>{`@keyframes fadeInUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </section>
  )
}

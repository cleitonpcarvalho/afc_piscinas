import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import { useSection } from '../contexts/ContentContext'

const FALLBACK_FAQS = [
  { q: 'Que tipos de piscinas a AFC Piscinas constrói?',
    a: 'Construímos piscinas de betão armado (gunite), poliéster, painéis de aço e polímeros, tanto residenciais como comerciais. Cada projecto é desenvolvido de acordo com as necessidades e espaço do cliente.' },
  { q: 'Quanto tempo demora a construção de uma piscina?',
    a: 'O tempo varia consoante o tipo e dimensão da piscina. Uma piscina de poliéster pode ser instalada em 1–2 semanas, enquanto uma de betão pode demorar 4–8 semanas. Fornecemos sempre um cronograma detalhado antes do início da obra.' },
  { q: 'Fazem manutenção de piscinas que não construíram?',
    a: 'Sim, prestamos serviços de manutenção e assistência técnica a qualquer tipo de piscina, independentemente de quem a construiu. Tratamos da água, limpeza, reparações e substituição de equipamentos.' },
  { q: 'Como posso obter um orçamento?',
    a: 'O orçamento é gratuito e sem compromisso. Pode contactar-nos por telefone, email ou WhatsApp. Deslocamo-nos ao local para fazer uma avaliação e enviamos uma proposta detalhada no prazo de 48 horas.' },
  { q: 'Têm cobertura em todo o território nacional?',
    a: 'Sim, prestamos serviços em todo o Portugal continental e ilhas. A nossa sede localiza-se em Arcozelo, mas trabalhamos em qualquer ponto do país.' },
]

function Item({ faq, open, toggle }) {
  return (
    <div className="card-light overflow-hidden">
      <button onClick={toggle} className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer">
        <span className="text-textprimary font-medium text-sm pr-4">{faq.q}</span>
        <ChevronDown size={18} className={`text-accent flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div style={{ maxHeight: open ? '200px' : '0', overflow: 'hidden', transition: 'max-height 0.35s ease' }}>
        <p className="text-textmuted text-sm leading-relaxed px-5 pb-5">{faq.a}</p>
      </div>
    </div>
  )
}

export default function FaqSection() {
  const cms = useSection('faq')
  const [openIdx, setOpenIdx] = useState(0)

  const eyebrow = cms.eyebrow || 'FAQ'
  const heading = cms.heading || 'Perguntas Frequentes'

  const faqs = FALLBACK_FAQS.map((fb, i) => ({
    q: cms[`pergunta_${i + 1}`] || fb.q,
    a: cms[`resposta_${i + 1}`] || fb.a,
  }))

  return (
    <section className="py-20 bg-primary">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12">
          <span className="section-eyebrow">{eyebrow}</span>
          <h2 className="section-title">{heading}</h2>
        </ScrollReveal>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 60}>
              <Item faq={faq} open={openIdx === i} toggle={() => setOpenIdx(openIdx === i ? -1 : i)} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

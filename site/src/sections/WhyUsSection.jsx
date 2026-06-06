import { ShieldCheck, Zap, DollarSign, Gem, Layers, ThumbsUp } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import { useSection } from '../contexts/ContentContext'

const ICONS = [ShieldCheck, Zap, DollarSign, Gem, Layers, ThumbsUp]

const FALLBACK_REASONS = [
  { title: 'Técnicos Certificados',  desc: 'Equipa qualificada com formação contínua nas melhores práticas do sector.' },
  { title: 'Serviço Rápido',         desc: 'Cumprimos os prazos acordados e minimizamos o tempo de obra na sua propriedade.' },
  { title: 'Preços Transparentes',   desc: 'Orçamentos detalhados e sem surpresas. O preço apresentado é o que paga.' },
  { title: 'Materiais Premium',      desc: 'Utilizamos apenas materiais de alta qualidade para garantir durabilidade e beleza.' },
  { title: 'Soluções Completas',     desc: 'Da concepção ao acabamento, gerimos todo o processo com total tranquilidade.' },
  { title: 'Garantia de Satisfação', desc: 'Todos os trabalhos têm garantia. A sua satisfação é a nossa prioridade.' },
]

function parseRazao(str, fallback) {
  if (!str) return fallback
  const sep = str.indexOf(' — ')
  if (sep === -1) return { title: str, desc: fallback.desc }
  return { title: str.slice(0, sep).trim(), desc: str.slice(sep + 3).trim() }
}

export default function WhyUsSection() {
  const cms = useSection('why_us')

  const eyebrow    = cms.eyebrow    || 'Porquê nós'
  const heading    = cms.heading    || 'Razões para Nos Escolher'
  const subheading = cms.subheading || 'Mais de 20 anos de experiência e centenas de clientes satisfeitos falam por si.'

  const reasons = FALLBACK_REASONS.map((fb, i) => ({
    num:  String(i + 1).padStart(2, '0'),
    icon: ICONS[i],
    ...parseRazao(cms[`razao_${i + 1}`], fb),
  }))

  return (
    <section id="why-us" className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-14">
          <span className="section-eyebrow">{eyebrow}</span>
          <h2 className="section-title">{heading}</h2>
          <p className="text-textmuted mt-4 max-w-xl mx-auto text-sm">
            {subheading}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((r, i) => (
            <ScrollReveal key={r.num} delay={i * 80}>
              <div className="group card-light p-6 hover:border-accent hover:shadow-md transition-all duration-300 h-full">
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-accent text-2xl font-extrabold leading-none">{r.num}</span>
                  <r.icon size={20} className="text-accent mt-1 flex-shrink-0" />
                </div>
                <h3 className="text-textprimary font-semibold text-base mb-2">{r.title}</h3>
                <p className="text-textmuted text-sm leading-relaxed">{r.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

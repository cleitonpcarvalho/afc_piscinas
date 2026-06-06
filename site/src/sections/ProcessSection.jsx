import { MessageSquare, Ruler, HardHat, CheckCircle } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'

const STEPS = [
  { icon: MessageSquare, title: 'Consulta Inicial', desc: 'Contacte-nos e explicamos as soluções mais adequadas ao seu espaço e orçamento.' },
  { icon: Ruler,         title: 'Projecto',         desc: 'A nossa equipa elabora o projecto detalhado com materiais, prazos e custo final.' },
  { icon: HardHat,       title: 'Construção',       desc: 'Iniciamos a obra com técnicos especializados e acompanhamento permanente.' },
  { icon: CheckCircle,   title: 'Entrega',          desc: 'Entregamos a sua piscina pronta a utilizar, com garantia e manual de uso.' },
]

export default function ProcessSection() {
  return (
    <section className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-14">
          <span className="section-eyebrow">Como trabalhamos</span>
          <h2 className="section-title">O Nosso Processo</h2>
          <p className="text-textmuted mt-3 max-w-xl mx-auto text-sm">
            Simples, transparente e focado em si.
          </p>
        </ScrollReveal>

        <div className="relative">
          <div className="hidden lg:block absolute top-7 left-[12.5%] right-[12.5%] h-px bg-borderlight" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 120}>
                <div className="text-center">
                  <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 border-2 border-accent mb-5 z-10">
                    <s.icon size={22} className="text-accent" />
                    <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="text-textprimary font-semibold mb-2">{s.title}</h3>
                  <p className="text-textmuted text-sm leading-relaxed">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

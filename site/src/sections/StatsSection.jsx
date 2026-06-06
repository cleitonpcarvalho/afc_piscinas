import { Waves, Award, ThumbsUp, HardHat } from 'lucide-react'
import CountUp from '../components/CountUp'
import ScrollReveal from '../components/ScrollReveal'

const STATS = [
  { value: 20,  suffix: '+', label: 'Anos de Experiência',   icon: Award },
  { value: 500, suffix: '+', label: 'Piscinas Construídas',  icon: Waves },
  { value: 98,  suffix: '%', label: 'Clientes Satisfeitos',  icon: ThumbsUp },
  { value: 12,  suffix: '',  label: 'Técnicos Certificados', icon: HardHat },
]

export default function StatsSection() {
  return (
    <section className="py-16" style={{ background: '#0f172a' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 100} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/20 mb-4">
                <s.icon size={22} className="text-accent" />
              </div>
              <p className="text-4xl font-extrabold text-accent mb-1">
                <CountUp end={s.value} suffix={s.suffix} />
              </p>
              <p className="text-slate-300 text-sm">{s.label}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

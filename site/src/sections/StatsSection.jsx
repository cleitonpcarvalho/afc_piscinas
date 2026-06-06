import { Waves, Award, ThumbsUp, HardHat } from 'lucide-react'
import CountUp from '../components/CountUp'
import ScrollReveal from '../components/ScrollReveal'
import { useSection } from '../contexts/ContentContext'

const ICONS = [Award, Waves, ThumbsUp, HardHat]

export default function StatsSection() {
  const cms = useSection('stats')

  const stats = [
    {
      value:  Number(cms.stat_1_value)  || 20,
      suffix: cms.stat_1_suffix != null ? String(cms.stat_1_suffix) : '+',
      label:  cms.stat_1_label          || 'Anos de Experiência',
      icon:   ICONS[0],
    },
    {
      value:  Number(cms.stat_2_value)  || 500,
      suffix: cms.stat_2_suffix != null ? String(cms.stat_2_suffix) : '+',
      label:  cms.stat_2_label          || 'Piscinas Construídas',
      icon:   ICONS[1],
    },
    {
      value:  Number(cms.stat_3_value)  || 98,
      suffix: cms.stat_3_suffix != null ? String(cms.stat_3_suffix) : '%',
      label:  cms.stat_3_label          || 'Clientes Satisfeitos',
      icon:   ICONS[2],
    },
    {
      value:  Number(cms.stat_4_value)  || 12,
      suffix: cms.stat_4_suffix != null ? String(cms.stat_4_suffix) : '',
      label:  cms.stat_4_label          || 'Técnicos Certificados',
      icon:   ICONS[3],
    },
  ]

  return (
    <section className="py-16" style={{ background: '#0f172a' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
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

import { Link } from 'react-router-dom'
import { ArrowRight, Eye } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import { useSection } from '../contexts/ContentContext'

import p1 from '../assets/client/inicio/img_02_42-1024x768.jpg'
import p2 from '../assets/client/inicio/img_06_38.jpg'
import p3 from '../assets/client/inicio/img_07_7.jpg'
import p4 from '../assets/client/piscinas/img_03_45-1-768x576.jpg'
import p5 from '../assets/client/piscinas/img_04_44-768x576.jpg'
import p6 from '../assets/client/piscinas/img_05_43-768x576.jpg'

const FALLBACK = [
  { img: p1, title: 'Piscina Residencial' },
  { img: p2, title: 'Piscina Infinity' },
  { img: p3, title: 'Renovação Completa' },
  { img: p4, title: 'Piscina de Lazer' },
  { img: p5, title: 'Piscina Familiar' },
  { img: p6, title: 'Projecto Exclusivo' },
]

export default function ProjectsSection() {
  const cms = useSection('projects')

  const eyebrow = cms.eyebrow || 'Portfólio'
  const heading = cms.heading || 'Os Nossos Projetos'

  const projects = FALLBACK.map((fb, i) => ({
    img:   cms[`imagem_${i + 1}`] || fb.img,
    title: cms[`titulo_${i + 1}`] || fb.title,
  }))

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
          <div>
            <span className="section-eyebrow">{eyebrow}</span>
            <h2 className="section-title">{heading}</h2>
          </div>
          <Link to="/piscinas" className="btn-outline shrink-0">
            Ver Todos <ArrowRight size={16} />
          </Link>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div className="group relative overflow-hidden rounded-2xl aspect-[4/3] shadow-md">
                <img src={p.img} alt={p.title}
                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2">
                    <Eye size={28} className="text-white" />
                    <p className="text-white font-semibold text-sm">{p.title}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

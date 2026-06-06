import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'
import { useSettings } from '../hooks/useSettings'
import { useSection } from '../contexts/ContentContext'

const allMods = import.meta.glob(
  '../assets/client/inicio/img_*[0-9][0-9]_*.{jpg,jpeg,png}',
  { eager: true }
)

const entries = Object.entries(allMods)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, mod]) => {
    const n = parseInt(path.match(/img_(\d+)_/)?.[1] ?? 0)
    return { n, src: mod.default }
  })
  .filter(e => !e.src.includes('logo'))

const byN = (n) => entries.find(e => e.n === n)?.src

const WA_MSG = 'Ol%C3%A1%2C+gostaria+de+pedir+um+or%C3%A7amento+gratuito'

export default function SobreNosSection() {
  const s   = useSettings()
  const cms = useSection('sobre_nos')

  const eyebrow = cms.eyebrow || 'Sobre nós'
  const heading = cms.heading || 'Venha Mergulhar no nosso mundo'
  const texto1  = cms.texto_1 || 'AFC Piscinas, é uma empresa reconhecida na sua área, como sendo uma aposta na qualidade. Tanto no sector comercial, como na construção e na própria instalação, orgulhamo-nos de trabalhar com os melhores profissionais.'
  const texto2  = cms.texto_2 || 'A qualidade e a fiabilidade são as nossas maiores preocupações. Garantimos um serviço pós-venda eficaz, para a manutenção da sua piscina.'

  const img1 = cms.imagem_1 || byN(2)
  const img2 = cms.imagem_2 || byN(6)
  const img3 = cms.imagem_3 || byN(7)
  const sobreImgs = [img1, img2, img3].filter(Boolean)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

          <ScrollReveal>
            <p className="section-eyebrow">{eyebrow}</p>
            <h2 className="section-title mb-6">{heading}</h2>
            <p className="text-textmuted leading-relaxed mb-4">{texto1}</p>
            <p className="text-textmuted leading-relaxed mb-8">{texto2}</p>
            <div className="flex flex-wrap gap-4">
              <a
                href={`https://wa.me/${s.whatsapp_number || '351967335707'}?text=${WA_MSG}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Pedir Orçamento
              </a>
              <Link to="/piscinas" className="btn-outline">
                Ver Piscinas
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            {sobreImgs.length > 0 ? (
              <div className="grid grid-cols-3 gap-3">
                {sobreImgs.map((src, i) => (
                  <div key={i} className="rounded-xl overflow-hidden aspect-[4/3]">
                    <img
                      src={src}
                      alt={`AFC Piscinas ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl bg-surface2 h-[280px] flex items-center justify-center">
                <span className="text-textmuted text-sm">Imagem em breve</span>
              </div>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

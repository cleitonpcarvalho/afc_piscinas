import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'
import { useSettings } from '../hooks/useSettings'

const allImages = import.meta.glob(
  '../assets/client/inicio/img_0[2-9]_*.{jpg,jpeg,png}',
  { eager: true }
)
const imgs = Object.values(allImages).map(m => m.default)

const WA_MSG = 'Ol%C3%A1%2C+gostaria+de+pedir+um+or%C3%A7amento+gratuito'

export default function SobreNosSection() {
  const s   = useSettings()
  const img = imgs[0]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Texto */}
          <ScrollReveal>
            <p className="section-eyebrow">Sobre nós</p>
            <h2 className="section-title mb-6">Venha Mergulhar no nosso mundo</h2>
            <p className="text-textmuted leading-relaxed mb-4">
              AFC Piscinas, é uma empresa reconhecida na sua área, como sendo uma aposta na qualidade.
              Tanto no sector comercial, como na construção e na própria instalação, orgulhamo-nos de
              trabalhar com os melhores profissionais.
            </p>
            <p className="text-textmuted leading-relaxed mb-8">
              A qualidade e a fiabilidade são as nossas maiores preocupações. Garantimos um serviço
              pós-venda eficaz, para a manutenção da sua piscina.
            </p>
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

          {/* Imagem */}
          <ScrollReveal delay={150}>
            {img
              ? <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={img}
                    alt="AFC Piscinas — sobre nós"
                    className="w-full h-[420px] object-cover"
                  />
                </div>
              : <div className="rounded-2xl bg-surface2 h-[420px] flex items-center justify-center">
                  <span className="text-textmuted text-sm">Imagem em breve</span>
                </div>
            }
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

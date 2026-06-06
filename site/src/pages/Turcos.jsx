import PageHero    from '../components/PageHero'
import GalleryGrid from '../components/GalleryGrid'
import PageCTA     from '../components/PageCTA'
import ScrollReveal from '../components/ScrollReveal'

const allImages = import.meta.glob(
  '../assets/client/turcos/img_*[0-9][0-9]_*.{jpg,jpeg,png}',
  { eager: true }
)
const images = Object.values(allImages).map(m => m.default).filter(s => !s.includes('logo'))
const heroBg = images[0]

export default function Turcos() {
  return (
    <>
      <PageHero
        eyebrow="RELAXE, DESCONTRAIA E REVITALIZE"
        title="Faça do banho turco uma rotina"
        subtitle="Terapia ancestral para o bem-estar do corpo e da mente."
        bgImage={heroBg}
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-14">
            <ScrollReveal>
              <p className="section-eyebrow">Terapia ancestral</p>
              <h2 className="section-title mb-4">O Banho Turco</h2>
              <p className="text-textmuted leading-relaxed mb-4">
                O banho turco desintoxica o organismo, contribuindo para a redução das gorduras e toxinas. Sem esforço
                físico, descarrega a electricidade do corpo e relaxa os músculos, reduz o stress e elimina as dores musculares.
              </p>
              <p className="text-textmuted leading-relaxed mb-4">
                É indicado em casos de alergias, bronquites, sinusites, obesidade, reumatismo, esgotamento físico e mental,
                alcoolismo e tabagismo. Entre tantas indicações é apontada como uma das causas da longevidade em alguns países
                da Europa, onde é feita com rotina e simplicidade.
              </p>
              <p className="text-textmuted leading-relaxed">
                Adultos, idosos e, até mesmo, crianças, podem desfrutar desta terapia. Recomenda-se apenas que pessoas com
                problemas cardíacos, hipertensas e gestantes consultem um especialista antes de experimentarem.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="rounded-2xl overflow-hidden mb-5">
                <img src={images[1] || heroBg} alt="Banho Turco" className="w-full h-80 object-cover" />
              </div>
              <div className="bg-surface2 border border-borderlight rounded-2xl p-5">
                <h3 className="text-textprimary font-semibold mb-2">Turco vs Sauna</h3>
                <p className="text-textmuted text-sm leading-relaxed">
                  Muitas vezes confunde-se banho turco com sauna, mas a realidade é que são terapias bem diferentes.
                  O banho turco consiste em permanecer numa atmosfera saturada de vapor de água, com uma temperatura de
                  cerca de 40–45 graus, no máximo. Por sua vez, a sauna faz-se numa atmosfera seca e pode atingir
                  temperaturas mais elevadas.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {images.length > 0 && (
        <section className="py-16 bg-surface2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="mb-10">
              <p className="section-eyebrow">Portfólio</p>
              <h2 className="section-title">Galeria de Banhos Turcos</h2>
            </ScrollReveal>
            <GalleryGrid images={images} />
          </div>
        </section>
      )}

      <PageCTA
        text="Interessado em instalar um banho turco? Fale connosco."
        waMsg="Ol%C3%A1%2C+tenho+interesse+em+instalar+um+banho+turco"
      />
    </>
  )
}

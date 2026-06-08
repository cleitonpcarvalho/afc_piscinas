import PageHero  from '../components/PageHero'
import PageCTA   from '../components/PageCTA'
import ScrollReveal from '../components/ScrollReveal'

const allMods = import.meta.glob(
  '../assets/client/turcos/img_*[0-9][0-9]_*.{jpg,jpeg,png}',
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

const heroBg = entries[0]?.src
const img1   = byN(2)
const img2   = byN(3)
const img3   = byN(4)

export default function Turcos() {
  return (
    <>
      <PageHero
        eyebrow="RELAXE, DESCONTRAIA E REVITALIZE"
        title="Faça do banho turco uma rotina"
        subtitle="Terapia ancestral para o bem-estar do corpo e da mente."
        bgImage={heroBg}
      />

      {/* Intro — texto esquerda, imagem direita */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
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
              {img1 && (
                <div className="rounded-xl overflow-hidden">
                  <img src={img1} alt="Banho Turco" className="w-full h-80 object-cover" />
                </div>
              )}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Galeria + Card Turco vs Sauna */}
      <section className="py-16 bg-surface2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

            {/* Card Turco vs Sauna com segunda imagem */}
            <ScrollReveal>
              {img2 && (
                <div className="rounded-xl overflow-hidden mb-6">
                  <img src={img2} alt="Banho Turco interior" className="w-full h-64 object-cover" />
                </div>
              )}
              <div className="bg-white border border-borderlight rounded-2xl p-6">
                <h3 className="text-textprimary font-semibold text-lg mb-3">Turco vs Sauna</h3>
                <p className="text-textmuted text-sm leading-relaxed">
                  Muitas vezes confunde-se banho turco com sauna, mas a realidade é que são terapias bem diferentes.
                  O banho turco consiste em permanecer numa atmosfera saturada de vapor de água, com uma temperatura de
                  cerca de 40–45 graus, no máximo. Por sua vez, a sauna faz-se numa atmosfera seca e pode atingir
                  temperaturas mais elevadas.
                </p>
              </div>
            </ScrollReveal>

            {/* Terceira imagem */}
            {img3 && (
              <ScrollReveal delay={120}>
                <div className="rounded-xl overflow-hidden">
                  <img src={img3} alt="Banho Turco detalhe" className="w-full h-full min-h-[300px] object-cover" />
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </section>

      <PageCTA
        text="Interessado em instalar um banho turco? Fale connosco."
        waMsg="Ol%C3%A1%2C+tenho+interesse+em+instalar+um+banho+turco"
      />
    </>
  )
}

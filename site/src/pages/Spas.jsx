import PageHero    from '../components/PageHero'
import PageCTA     from '../components/PageCTA'
import ScrollReveal from '../components/ScrollReveal'
import ImageGroup  from '../components/ImageGroup'

const allMods = import.meta.glob(
  '../assets/client/spas/img_*[0-9][0-9]_*.{jpg,jpeg,png}',
  { eager: true }
)

const entries = Object.entries(allMods)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, mod]) => {
    const n = parseInt(path.match(/img_(\d+)_/)?.[1] ?? 0)
    return { n, src: mod.default }
  })
  .filter(e => !e.src.includes('logo'))

const byRange = (from, to) =>
  entries.filter(e => e.n >= from && e.n <= to).map(e => e.src)

const heroBg   = entries[0]?.src
const introImg = entries[0]?.src

// 41 imagens (img_02–img_42) distribuídas em 3 grupos sequenciais
const exteriorImgs = byRange(2, 15)
const interiorImgs = byRange(16, 29)
const jacuzziImgs  = byRange(30, 42)

const SECOES = [
  {
    title: 'Spas de Exterior',
    text: 'Projectados para resistir às condições climatéricas, com isolamento térmico de alta eficiência e acabamentos premium. Desfrute da hidroterapia ao ar livre em qualquer estação do ano.',
    images: exteriorImgs,
    bg: 'bg-white',
  },
  {
    title: 'Spas de Interior',
    text: 'Integração perfeita em casa de banho, suite ou zona de lazer interior, com múltiplos sistemas de massagem. O spa do hotel, na comodidade da sua casa.',
    images: interiorImgs,
    bg: 'bg-surface2',
  },
  {
    title: 'Banheiras Jacuzzi',
    text: 'Da banheira íntima para dois ao grande spa para festas — temos o modelo para acomodar as suas necessidades e orçamento. Selecção de jacuzzis das melhores marcas mundiais.',
    images: jacuzziImgs,
    bg: 'bg-white',
  },
]

export default function Spas() {
  return (
    <>
      <PageHero
        eyebrow="ALIVIE O STRESS DO DIA-A-DIA COM OS"
        title="Nossos Spas"
        subtitle="Banheiras de hidromassagem e spas de luxo para o seu estilo de vida."
        bgImage={heroBg}
      />

      {/* Intro — texto esquerda, imagem direita */}
      <section className="py-16 bg-surface2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <p className="section-eyebrow">Home Resort</p>
              <h2 className="section-title mb-4">Um Santuário Privado</h2>
              <p className="text-textmuted leading-relaxed mb-4">
                As banheiras de hidromassagem e spas de luxo, ideais para um rejuvenescimento através da hidroterapia,
                destinam-se a complementar o seu estilo de vida, como num "Home Resort", com um valor notável.
              </p>
              <p className="text-textmuted leading-relaxed mb-4">
                Se está à procura de uma banheira íntima de água quente para dois, ou de um grande spa para festas,
                a AFC-Piscinas, tem o modelo para acomodar as suas necessidades e orçamento.
              </p>
              <p className="text-textmuted leading-relaxed">
                Aproveite esta oportunidade para procurar na nossa ampla selecção de hidroterapia e banheiras de
                hidromassagem, spas com características únicas e robustos acessórios.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              {introImg && (
                <div className="rounded-xl overflow-hidden">
                  <img src={introImg} alt="Spa AFC Piscinas" className="w-full h-72 object-cover" />
                </div>
              )}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 3 secções com ImageGroup */}
      {SECOES.map((s) => (
        <section key={s.title} className={`py-16 ${s.bg}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="mb-8">
              <h2 className="section-title">{s.title}</h2>
              <p className="text-textmuted leading-relaxed max-w-3xl mt-4">{s.text}</p>
            </ScrollReveal>
            {s.images.length > 0 && (
              <ScrollReveal delay={80}>
                <ImageGroup images={s.images} title={s.title} />
              </ScrollReveal>
            )}
          </div>
        </section>
      ))}

      <PageCTA
        text="Quer o spa dos seus sonhos? Peça o seu orçamento gratuito."
        waMsg="Ol%C3%A1%2C+tenho+interesse+em+instalar+um+spa"
      />
    </>
  )
}

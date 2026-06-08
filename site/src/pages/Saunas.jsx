import PageHero  from '../components/PageHero'
import PageCTA   from '../components/PageCTA'
import ScrollReveal from '../components/ScrollReveal'

const allMods = import.meta.glob(
  '../assets/client/saunas/img_*[0-9][0-9]_*.{jpg,jpeg,png}',
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

const TIPOS = [
  {
    title: 'Sauna Seca',
    text: 'Temperatura entre 80 °C e 100 °C, com baixa humidade. Ideal para relaxamento profundo e desintoxicação. De origem finlandesa, é a forma mais tradicional de sauna — dois milhões de saunas para 5,2 milhões de habitantes em território finlandês.',
    img: byN(2),
  },
  {
    title: 'Sauna Húmida',
    text: 'Raramente ultrapassa os 60 °C, com humidade elevada. Excelente para as vias respiratórias, hidratação da pele e desobstrução dos poros. O corpo humano tolera facilmente curtos períodos nestas condições.',
    img: byN(5),
  },
  {
    title: 'Infravermelhos',
    text: 'Penetração profunda nos tecidos com temperaturas mais baixas (40–60 °C). Ideal para reabilitação muscular e alívio de dores crónicas. A radiação infravermelha aquece directamente o corpo sem necessidade de aquecer todo o ar ambiente.',
    img: byN(8),
  },
  {
    title: 'Exterior / Interior',
    text: 'Projectamos saunas de interior e exterior em madeira nórdica premium, com design personalizado e integrado no seu espaço. O limite será a sua imaginação — desde cabines compactas a espaços de bem-estar completos.',
    img: byN(11),
  },
]

export default function Saunas() {
  return (
    <>
      <PageHero
        eyebrow="CONSTRUÍMOS QUALQUER TIPO DE"
        title="Saunas"
        subtitle="O limite será a sua imaginação."
        bgImage={heroBg}
      />

      {/* Intro */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-12">
            <p className="section-eyebrow">Bem-estar e saúde</p>
            <h2 className="section-title mb-4">O Poder da Sauna</h2>
            <p className="text-textmuted leading-relaxed max-w-3xl">
              A sauna húmida raramente ultrapassa os 60 °C enquanto na sauna seca o corpo humano tolera facilmente
              temperaturas superiores a 80 °C durante curtos períodos de tempo. Alegadamente, entre os benefícios
              da sauna estão o alívio de dores de coluna, o aumento da circulação sanguínea, a hidratação da pele,
              o combate ao stress e à hipertensão, e a desintoxicação do organismo.
            </p>
          </ScrollReveal>

          {/* 4 tipos em grid 2 colunas com imagem e texto alternados */}
          <div className="space-y-12">
            {TIPOS.map((t, i) => {
              const reversed = i % 2 !== 0
              return (
                <ScrollReveal key={t.title} delay={80}>
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${reversed ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                    <div className="rounded-xl overflow-hidden">
                      {t.img
                        ? <img src={t.img} alt={t.title} className="w-full h-64 object-cover" />
                        : <div className="w-full h-64 bg-surface2 rounded-xl" />
                      }
                    </div>
                    <div>
                      <h2 className="section-title mb-4">{t.title}</h2>
                      <p className="text-textmuted leading-relaxed">{t.text}</p>
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>

          <ScrollReveal delay={120} className="mt-12">
            <div className="bg-surface2 border border-borderlight rounded-2xl p-5">
              <p className="text-textmuted text-sm leading-relaxed">
                <strong className="text-textprimary">Nota de saúde:</strong> A frequência habitual ou prolongada de saunas deve ser
                autorizada por um médico, pois certas patologias respiratórias e circulatórias não beneficiam com
                a permanência no ambiente quente das saunas, com uma frequência superior a uma vez por semana.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <PageCTA
        text="Interessado em instalar uma sauna? Fale connosco."
        waMsg="Ol%C3%A1%2C+tenho+interesse+em+instalar+uma+sauna"
      />
    </>
  )
}

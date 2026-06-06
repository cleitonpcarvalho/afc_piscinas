import PageHero    from '../components/PageHero'
import GalleryGrid from '../components/GalleryGrid'
import PageCTA     from '../components/PageCTA'
import ScrollReveal from '../components/ScrollReveal'

const allImages = import.meta.glob(
  '../assets/client/saunas/img_*[0-9][0-9]_*.{jpg,jpeg,png}',
  { eager: true }
)
const images = Object.values(allImages).map(m => m.default).filter(s => !s.includes('logo'))
const heroBg = images[0]

export default function Saunas() {
  return (
    <>
      <PageHero
        eyebrow="CONSTRUÍMOS QUALQUER TIPO DE"
        title="Saunas"
        subtitle="O limite será a sua imaginação."
        bgImage={heroBg}
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-14">
            <ScrollReveal>
              <p className="section-eyebrow">Bem-estar e saúde</p>
              <h2 className="section-title mb-4">O Poder da Sauna</h2>
              <p className="text-textmuted leading-relaxed mb-4">
                A sauna húmida raramente ultrapassa os 60 °C enquanto na sauna seca o corpo humano tolera facilmente
                temperaturas superiores a 80 °C durante curtos períodos de tempo.
              </p>
              <p className="text-textmuted leading-relaxed mb-4">
                A sauna seca é de origem finlandesa (2 milhões de saunas para 5,2 milhões de habitantes) e a prática
                de saunas é habitual na Escandinávia, onde a temperatura no interior pode chegar a 100 °C.
              </p>
              <p className="text-textmuted leading-relaxed">
                Alegadamente, entre os benefícios da sauna estão o alívio de dores de coluna, o aumento da circulação
                sanguínea, a hidratação da pele e desobstrução dos poros, o combate ao stress e à hipertensão. Além
                disso, relaxa a musculatura, limpa e desobstruí as vias respiratórias, desintoxica e expulsa as
                impurezas do organismo e combate doenças do sistema respiratório.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <div className="rounded-2xl overflow-hidden">
                <img src={images[1] || heroBg} alt="Sauna" className="w-full h-72 object-cover" />
              </div>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Sauna Seca', text: 'Temperatura entre 80 °C e 100 °C, com baixa humidade. Ideal para relaxamento profundo e desintoxicação. Origem finlandesa — a mais tradicional.' },
              { title: 'Sauna Húmida', text: 'Raramente ultrapassa os 60 °C, com humidade elevada. Excelente para as vias respiratórias, hidratação da pele e desobstrução dos poros.' },
              { title: 'Infravermelhos', text: 'Penetração profunda nos tecidos com temperaturas mais baixas (40–60 °C). Ideal para reabilitação muscular e alívio de dores crónicas.' },
              { title: 'Exterior / Interior', text: 'Projectamos saunas de interior e exterior em madeira nórdica premium, com design personalizado e integrado no seu espaço.' },
            ].map((c, i) => (
              <ScrollReveal key={c.title} delay={i * 80}>
                <div className="bg-white border border-borderlight rounded-2xl shadow-sm p-6">
                  <h3 className="text-accent font-semibold mb-2">{c.title}</h3>
                  <p className="text-textmuted text-sm leading-relaxed">{c.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={200} className="mt-8">
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

      <section className="py-16 bg-surface2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-10">
            <p className="section-eyebrow">Portfólio</p>
            <h2 className="section-title">Galeria de Saunas</h2>
          </ScrollReveal>
          <GalleryGrid images={images} />
        </div>
      </section>

      <PageCTA
        text="Interessado em instalar uma sauna? Fale connosco."
        waMsg="Ol%C3%A1%2C+tenho+interesse+em+instalar+uma+sauna"
      />
    </>
  )
}

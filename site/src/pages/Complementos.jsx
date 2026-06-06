import PageHero    from '../components/PageHero'
import GalleryGrid from '../components/GalleryGrid'
import PageCTA     from '../components/PageCTA'
import ScrollReveal from '../components/ScrollReveal'

const allImages = import.meta.glob(
  '../assets/client/complementos/img_*[0-9][0-9]_*.{jpg,jpeg,png}',
  { eager: true }
)
const images = Object.values(allImages).map(m => m.default).filter(s => !s.includes('logo'))
const heroBg = images[0]

const CATS = [
  {
    title: 'Piscinas Cobertas',
    text:  'O ambiente ideal, todo o ano! As coberturas exercem um papel muito importante na manutenção e preservação de limpeza na sua piscina, e em alguns modelos são bastante seguras, pois através deste método a piscina não fica exposta a eventuais visitas sem vigilância das suas crianças ou dos seus animais.',
  },
  {
    title: 'Coberturas Telescópicas',
    text:  'Altamente competitivas, pela sua qualidade, garantia e versatilidade. A ampla diversidade dos modelos existentes é a mais adequada às necessidades e estética do seu jardim. Os modelos são desenhados em função da forma e da situação da sua piscina, com a possibilidade de escolha numa ampla gama de modelos e cores.',
  },
  {
    title: 'Coberturas Insufláveis e Lâminas',
    text:  'Soluções económicas e práticas para proteger a sua piscina ao longo do ano, mantendo a água limpa e reduzindo custos de manutenção.',
  },
  {
    title: 'Aquecimento',
    text:  'A sua água sempre à temperatura desejada. O ambiente ideal, todo o ano! Bombas de calor, caldeiras e resistências eléctricas para que possa desfrutar da piscina em qualquer estação.',
  },
  {
    title: 'Barreiras de Protecção e Aspiradores',
    text:  'As ajudas sempre preciosas. Mantenha a sua piscina nas melhores condições com barreiras de segurança homologadas e equipamentos de aspiração eficientes.',
  },
  {
    title: 'Painéis Solares e Diversos',
    text:  'Aproveitamento da energia solar para aquecimento gratuito e sustentável da água da sua piscina. Reduz significativamente os custos energéticos e contribui para um ambiente mais sustentável.',
  },
]

export default function Complementos() {
  return (
    <>
      <PageHero
        eyebrow="CONHEÇA TODOS OS NOSSOS"
        title="Complementos"
        subtitle="Equipamentos e acessórios para maximizar o conforto e segurança da sua piscina."
        bgImage={heroBg}
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-12">
            <p className="section-eyebrow">Completamos o seu projecto</p>
            <h2 className="section-title">Conheça Todos os Nossos Complementos</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATS.map((c, i) => (
              <ScrollReveal key={c.title} delay={i * 80}>
                <div className="bg-white border border-borderlight rounded-2xl shadow-sm p-6 h-full hover:border-accent transition-colors duration-300">
                  <h3 className="text-accent font-semibold mb-3">{c.title}</h3>
                  <p className="text-textmuted text-sm leading-relaxed">{c.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-surface2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-10">
            <p className="section-eyebrow">Portfólio</p>
            <h2 className="section-title">Galeria de Complementos</h2>
          </ScrollReveal>
          <GalleryGrid images={images} />
        </div>
      </section>

      <PageCTA
        text="Interessado em complementos para a sua piscina? Fale connosco."
        waMsg="Ol%C3%A1%2C+tenho+interesse+em+complementos+para+piscina"
      />
    </>
  )
}

import PageHero    from '../components/PageHero'
import GalleryGrid from '../components/GalleryGrid'
import PageCTA     from '../components/PageCTA'
import ScrollReveal from '../components/ScrollReveal'

const allImages = import.meta.glob(
  '../assets/client/spas/img_*[0-9][0-9]_*.{jpg,jpeg,png}',
  { eager: true }
)
const images = Object.values(allImages).map(m => m.default).filter(s => !s.includes('logo'))
const heroBg = images[0]

export default function Spas() {
  return (
    <>
      <PageHero
        eyebrow="ALIVIE O STRESS DO DIA-A-DIA COM OS"
        title="Nossos Spas"
        subtitle="Banheiras de hidromassagem e spas de luxo para o seu estilo de vida."
        bgImage={heroBg}
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-14">
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
              <div className="rounded-2xl overflow-hidden">
                <img src={images[1] || heroBg} alt="Spa" className="w-full h-72 object-cover" />
              </div>
            </ScrollReveal>
          </div>

          {/* Objectivo */}
          <ScrollReveal>
            <div className="bg-surface2 border border-borderlight rounded-2xl p-8 mb-8">
              <h3 className="text-accent font-semibold text-lg mb-3">Nosso Objectivo</h3>
              <p className="text-textmuted leading-relaxed">
                Criar uma constante fonte de entretenimento, que poderá desfrutar com a sua família, ouvir música,
                assistir aos seus programas de televisão favoritos, ou compartilhar a companhia um do outro, no lugar
                mais relaxante do mundo: a sua casa.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Spas de Exterior', text: 'Projectados para resistir às condições climatéricas, com isolamento térmico de alta eficiência e acabamentos premium.' },
              { title: 'Spas de Interior', text: 'Integração perfeita em casa de banho, suite ou zona de lazer interior, com múltiplos sistemas de massagem.' },
              { title: 'Banheiras Jacuzzi', text: 'Da banheira íntima para dois ao grande spa para festas — temos o modelo para acomodar as suas necessidades e orçamento.' },
            ].map((c, i) => (
              <ScrollReveal key={c.title} delay={i * 80}>
                <div className="bg-white border border-borderlight rounded-2xl shadow-sm p-6 h-full">
                  <h3 className="text-accent font-semibold mb-2">{c.title}</h3>
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
            <h2 className="section-title">Galeria de Spas</h2>
          </ScrollReveal>
          <GalleryGrid images={images} />
        </div>
      </section>

      <PageCTA
        text="Quer o spa dos seus sonhos? Peça o seu orçamento gratuito."
        waMsg="Ol%C3%A1%2C+tenho+interesse+em+instalar+um+spa"
      />
    </>
  )
}

import PageHero    from '../components/PageHero'
import GalleryGrid from '../components/GalleryGrid'
import PageCTA     from '../components/PageCTA'
import ScrollReveal from '../components/ScrollReveal'

const allImages = import.meta.glob(
  '../assets/client/piscinas/img_*[0-9][0-9]_*.{jpg,jpeg,png}',
  { eager: true }
)
const images = Object.values(allImages)
  .map(m => m.default)
  .filter(src => !src.includes('logo'))

const heroBg = images[0]

const TIPOS = [
  {
    title: 'Betão Armado',
    text:  'A técnica de construção tradicional, em betão armado, permite à AFC-PISCINAS propor-lhe uma forma clássica retangular ou uma forma livre direita ou curva; frequentemente a AFC-PISCINAS complementará o seu projeto, com uma escada, que facilitará a entrada e saída da sua piscina, e que lhe confere uma estética topo de gama. Este método, permite igualmente, integrar a maior parte dos equipamentos existentes numa piscina dos nossos dias: cobertura automática de lâminas, tipo estore, sistemas de aquecimento, sistema de natação contra a corrente, etc…',
  },
  {
    title: 'Fibra de Vidro',
    text:  'Este tipo de piscina, pré-fabricada, apresenta a vantagem de rápida instalação e fácil manutenção, ou seja, uma piscina de porte médio estaria pronta em vinte dias. Muito mais económica quando comparada com a de betão armado. Na maioria das vezes a sua instalação está vinculada ao revendedor, que pode adotar vários sistemas construtivos durante a implantação.',
  },
  {
    title: 'Painéis de Aço',
    text:  'As piscinas em kit de painéis em aço devem o seu êxito à qualidade e robustez dos componentes e à rapidez de execução do projeto. Uma tecnologia avançada que lhe garante a ausência de fissuras ao longo dos anos. Uma robustez superior ao betão — cada painel oferece resistência de cerca de 20.000 kg/m², com zincagem a quente que garante proteção máxima.',
  },
  {
    title: 'Painéis de Polímeros',
    text:  'Os Painéis de resina são uma descoberta americana. Com a integração de paredes de "alta resistência" e o emprego de um composto poliamida graphite, estes painéis atingem um nível de performance e qualidade que ultrapassam os materiais tradicionais como a madeira, aço, alumínio e mesmo o betão. A fiabilidade do sistema tem uma garantia de 50 anos.',
  },
  {
    title: 'Tela Armada',
    text:  'Permite uma construção tradicional em alvenaria com revestimento em Tela Armada de PVC 0,75 mm ou 1,5 mm ou em Fibra de Vidro. Esta forma de construção permite alargar a sua imaginação quanto à forma e idealização da Sua Piscina. O cuidado e boa execução do projeto garante altíssimos níveis de estanquicidade.',
  },
]

export default function Piscinas() {
  return (
    <>
      <PageHero
        eyebrow="DESDE BETÃO A FIBRA TEMOS TODOS OS"
        title="Tipos de Piscina"
        subtitle="Construímos todo o tipo de piscinas — desde betão armado a fibra de vidro."
        bgImage={heroBg}
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <p className="section-eyebrow">Montamos, reparamos…</p>
                <h2 className="section-title mb-4">Projetamos e Construímos todo o Tipo de Piscinas</h2>
                <p className="text-textmuted leading-relaxed">
                  AFC Piscinas, empresa reconhecida na sua área, apostando sempre na qualidade tanto no sector
                  comercial como na construção e instalação. Trabalhamos com os melhores profissionais, garantindo
                  um serviço pós-venda eficaz para a manutenção da sua piscina.
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden">
                <img src={images[1] || heroBg} alt="Piscina AFC" className="w-full h-72 object-cover" />
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TIPOS.map((t, i) => (
              <ScrollReveal key={t.title} delay={i * 80}>
                <div className="bg-white border border-borderlight rounded-2xl shadow-sm p-6 h-full">
                  <h3 className="text-accent font-semibold text-lg mb-3">{t.title}</h3>
                  <p className="text-textmuted text-sm leading-relaxed">{t.text}</p>
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
            <h2 className="section-title">Galeria de Piscinas</h2>
          </ScrollReveal>
          <GalleryGrid images={images} />
        </div>
      </section>

      <PageCTA
        text="Quer uma piscina assim? Peça o seu orçamento gratuito."
        waMsg="Ol%C3%A1%2C+gostaria+de+pedir+um+or%C3%A7amento+para+uma+piscina"
      />
    </>
  )
}

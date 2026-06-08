import PageHero    from '../components/PageHero'
import PageCTA     from '../components/PageCTA'
import ScrollReveal from '../components/ScrollReveal'
import ImageGroup  from '../components/ImageGroup'

const allMods = import.meta.glob(
  '../assets/client/piscinas/img_*[0-9][0-9]_*.{jpg,jpeg,png}',
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

const heroBg        = entries[0]?.src
const betaoImgs     = byRange(2, 59)
const fibraImgs     = byRange(60, 68)
const acoImgs       = byRange(70, 74)
const polimerosImgs = [...byRange(69, 69), ...byRange(75, 77)]
const telaImgs      = byRange(78, 84)

const SECOES = [
  {
    title: 'Betão Armado',
    text: 'A técnica de construção tradicional, em betão armado, permite à AFC-PISCINAS propor-lhe uma forma clássica retangular ou uma forma livre direita ou curva; frequentemente a AFC-PISCINAS complementará o seu projeto, com uma escada, que facilitará a entrada e saída da sua piscina, e que lhe confere uma estética topo de gama. Este método, permite igualmente, integrar a maior parte dos equipamentos existentes numa piscina dos nossos dias: cobertura automática de lâminas, tipo estore, sistemas de aquecimento, sistema de natação contra a corrente, etc…',
    images: betaoImgs,
    bg: 'bg-white',
  },
  {
    title: 'Fibra de Vidro',
    text: 'Este tipo de piscina, pré-fabricada, apresenta a vantagem de rápida instalação e fácil manutenção, ou seja, uma piscina de porte médio estaria pronta em vinte dias. Muito mais económica quando comparada com a de betão armado. Na maioria das vezes a sua instalação está vinculada ao revendedor, que pode adotar vários sistemas construtivos durante a implantação.',
    images: fibraImgs,
    bg: 'bg-surface2',
  },
  {
    title: 'Painéis de Aço',
    text: 'As piscinas em kit de painéis em aço devem o seu êxito à qualidade e robustez dos componentes e à rapidez de execução do projeto. Uma tecnologia avançada que lhe garante a ausência de fissuras ao longo dos anos. Uma robustez superior ao betão — cada painel oferece resistência de cerca de 20.000 kg/m², com zincagem a quente que garante proteção máxima.',
    images: acoImgs,
    bg: 'bg-white',
  },
  {
    title: 'Painéis de Polímeros',
    text: 'Os Painéis de resina são uma descoberta americana. Com a integração de paredes de "alta resistência" e o emprego de um composto poliamida graphite, estes painéis atingem um nível de performance e qualidade que ultrapassam os materiais tradicionais como a madeira, aço, alumínio e mesmo o betão. A fiabilidade do sistema tem uma garantia de 50 anos.',
    images: polimerosImgs,
    bg: 'bg-surface2',
  },
  {
    title: 'Tela Armada',
    text: 'Permite uma construção tradicional em alvenaria com revestimento em Tela Armada de PVC 0,75 mm ou 1,5 mm ou em Fibra de Vidro. Esta forma de construção permite alargar a sua imaginação quanto à forma e idealização da Sua Piscina. O cuidado e boa execução do projeto garante altíssimos níveis de estanquicidade.',
    images: telaImgs,
    bg: 'bg-white',
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

      {/* Secções por tipo — cada uma com ImageGroup */}
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
        text="Quer uma piscina assim? Peça o seu orçamento gratuito."
        waMsg="Ol%C3%A1%2C+gostaria+de+pedir+um+or%C3%A7amento+para+uma+piscina"
      />
    </>
  )
}

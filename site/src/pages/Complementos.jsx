import PageHero  from '../components/PageHero'
import PageCTA   from '../components/PageCTA'
import ScrollReveal from '../components/ScrollReveal'

const allMods = import.meta.glob(
  '../assets/client/complementos/img_*[0-9][0-9]_*.{jpg,jpeg,png}',
  { eager: true }
)

const entries = Object.entries(allMods)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, mod]) => {
    const n = parseInt(path.match(/img_(\d+)_/)?.[1] ?? 0)
    return { n, src: mod.default }
  })
  .filter(e => !e.src.includes('logo'))

const byN   = (n)       => entries.find(e => e.n === n)?.src
const byRange = (from, to) => entries.filter(e => e.n >= from && e.n <= to).map(e => e.src)

const heroBg        = byN(2)
const imgTelescop   = byN(2)
const telescGrid    = byRange(3, 11)
const imgAquec      = byN(12)
const imgEquip      = byN(14)

export default function Complementos() {
  return (
    <>
      <PageHero
        eyebrow="CONHEÇA TODOS OS NOSSOS"
        title="Complementos"
        subtitle="Equipamentos e acessórios para maximizar o conforto e segurança da sua piscina."
        bgImage={heroBg}
      />

      {/* Piscinas Cobertas — imagem esquerda, texto direita */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              {imgTelescop && (
                <div className="rounded-xl overflow-hidden">
                  <img src={imgTelescop} alt="Piscinas Cobertas" className="w-full h-64 object-cover" />
                </div>
              )}
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <h2 className="section-title mb-4">Piscinas Cobertas</h2>
              <p className="text-textmuted leading-relaxed">
                O ambiente ideal, todo o ano! As coberturas exercem um papel muito importante na manutenção e
                preservação de limpeza na sua piscina, e em alguns modelos são bastante seguras, pois através
                deste método a piscina não fica exposta a eventuais visitas sem vigilância das suas crianças
                ou dos seus animais.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Coberturas Telescópicas — texto + grid 3 colunas */}
      <section className="py-16 bg-surface2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-8">
            <h2 className="section-title">Coberturas Telescópicas</h2>
            <p className="text-textmuted leading-relaxed max-w-3xl mt-4">
              Altamente competitivas, pela sua qualidade, garantia e versatilidade. A ampla diversidade
              dos modelos existentes é a mais adequada às necessidades e estética do seu jardim. Os modelos
              são desenhados em função da forma e da situação da sua piscina, com a possibilidade de escolha
              numa ampla gama de modelos e cores.
            </p>
          </ScrollReveal>
          {telescGrid.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {telescGrid.map((src, i) => (
                <ScrollReveal key={i} delay={i * 60}>
                  <div className="rounded-xl overflow-hidden">
                    <img src={src} alt={`Cobertura telescópica ${i + 2}`} className="w-full h-52 object-cover" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Coberturas Insufláveis e Lâminas — apenas texto */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="section-title mb-4">Coberturas Insufláveis e Lâminas</h2>
            <p className="text-textmuted leading-relaxed max-w-3xl">
              Soluções económicas e práticas para proteger a sua piscina ao longo do ano, mantendo a água
              limpa e reduzindo custos de manutenção. As coberturas insufláveis permitem prolongar a época
              balnear, enquanto as coberturas de lâminas oferecem segurança e eficiência energética com
              elegância integrada na arquitectura da piscina.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Aquecimento — texto esquerda, imagem direita */}
      <section className="py-16 bg-surface2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <h2 className="section-title mb-4">Aquecimento</h2>
              <p className="text-textmuted leading-relaxed mb-6">
                A sua água sempre à temperatura desejada. O ambiente ideal, todo o ano! Bombas de calor,
                caldeiras e resistências eléctricas para que possa desfrutar da piscina em qualquer estação.
              </p>
              <ul className="space-y-2">
                {['Bombas de Calor', 'Caldeira', 'Resistência'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-textmuted">
                    <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              {imgAquec && (
                <div className="rounded-xl overflow-hidden">
                  <img src={imgAquec} alt="Aquecimento de piscina" className="w-full h-64 object-cover" />
                </div>
              )}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Equipamentos — imagem esquerda, texto direita */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              {imgEquip && (
                <div className="rounded-xl overflow-hidden">
                  <img src={imgEquip} alt="Equipamentos de piscina" className="w-full h-64 object-cover" />
                </div>
              )}
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <h2 className="section-title mb-4">Equipamentos</h2>
              <p className="text-textmuted leading-relaxed mb-6">
                As ajudas sempre preciosas. Mantenha a sua piscina nas melhores condições com equipamentos
                de qualidade — barreiras de segurança homologadas, aspiradores eficientes e uma vasta gama
                de acessórios para tornar a sua piscina num espaço seguro e impecável.
              </p>
              <ul className="space-y-2">
                {['Barreiras de Protecção', 'Aspiradores', 'Diversos'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-textmuted">
                    <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <PageCTA
        text="Interessado em complementos para a sua piscina? Fale connosco."
        waMsg="Ol%C3%A1%2C+tenho+interesse+em+complementos+para+piscina"
      />
    </>
  )
}

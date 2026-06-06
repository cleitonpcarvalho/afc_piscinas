import ScrollReveal from '../components/ScrollReveal'
import logo1 from '../assets/client/inicio/img_01_logo.png'
import logo2 from '../assets/client/inicio/img_08_logot6.jpg'

const LOGOS = [logo1, logo2, logo1, logo2, logo1, logo2]
const LABELS = ['AFC Piscinas', 'Parceiro Técnico', 'Fornecedor', 'Parceiro', 'Certificação', 'Garantia']

export default function BrandsSection() {
  return (
    <section className="py-14 bg-surface border-t border-borderlight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-8">
          <p className="text-xs uppercase tracking-widest font-medium text-textmuted">
            Parceiros e Marcas Certificadas
          </p>
        </ScrollReveal>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14">
          {LOGOS.map((src, i) => (
            <ScrollReveal key={i} delay={i * 60}>
              <div className="flex items-center justify-center h-12 opacity-40 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0">
                <img src={src} alt={LABELS[i]} className="h-10 w-auto max-w-[120px] object-contain" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

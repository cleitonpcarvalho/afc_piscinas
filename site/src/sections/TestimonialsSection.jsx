import ScrollReveal from '../components/ScrollReveal'
import t1 from '../assets/pexels/testimonial_1.jpg'
import t2 from '../assets/pexels/testimonial_2.jpg'
import t3 from '../assets/pexels/testimonial_3.jpg'

const TESTIMONIALS = [
  { name: 'Carlos Ferreira', location: 'Porto',   photo: t1, text: 'Excelente equipa! Construíram a nossa piscina em tempo recorde e com qualidade impressionante. Muito profissionais e transparentes no orçamento.' },
  { name: 'Ana Rodrigues',   location: 'Lisboa',  photo: t2, text: 'Renovámos a nossa piscina antiga com a AFC e ficou completamente nova. O acompanhamento foi constante e o resultado superou as expectativas.' },
  { name: 'João Martins',    location: 'Braga',   photo: t3, text: 'Serviço 5 estrelas. Instalámos uma sauna finlandesa e um spa. Equipa incansável e acabamento de alta qualidade. Recomendo vivamente!' },
]

function Stars() {
  return (
    <div className="flex gap-0.5 mb-3">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  )
}

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-14">
          <span className="section-eyebrow">Testemunhos</span>
          <h2 className="section-title">O que Dizem os Nossos Clientes</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 100}>
              <div className="card-light p-6 h-full flex flex-col hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <Stars />
                  <GoogleIcon />
                </div>
                <p className="text-textmuted text-sm leading-relaxed flex-1 mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.photo} alt={t.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                  <div>
                    <p className="text-textprimary font-semibold text-sm">{t.name}</p>
                    <p className="text-textmuted text-xs">{t.location}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, Loader2 } from 'lucide-react'
import PageHero from '../components/PageHero'
import ScrollReveal from '../components/ScrollReveal'
import api from '../services/api'
import { useSettings } from '../hooks/useSettings'

const MAPS_EMBED = 'https://maps.google.com/maps?q=Aguda+Parque,+Largo+de+Arcozelo,+76,+4405-021+Arcozelo&output=embed'

export default function Contactos() {
  const s = useSettings()
  const [form, setForm]       = useState({ nome: '', email: '', assunto: '', mensagem: '' })
  const [loading, setLoading] = useState(false)
  const [status,  setStatus]  = useState(null)

  function setField(k, v) { setForm(f => ({ ...f, [k]: v })) }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    try {
      const { data } = await api.post('/api/contact', form)
      setStatus({ ok: true, msg: data.message || 'Mensagem enviada com sucesso!' })
      setForm({ nome: '', email: '', assunto: '', mensagem: '' })
    } catch (err) {
      setStatus({ ok: false, msg: err.response?.data?.error || 'Erro ao enviar. Tente novamente.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <PageHero
        eyebrow="CONTACTOS"
        title="Fale Connosco"
        subtitle="Estamos aqui para responder a todas as suas questões."
      />

      {/* Mapa */}
      <section className="bg-surface2">
        <iframe
          src={MAPS_EMBED}
          title="Localização AFC Piscinas"
          width="100%"
          height="450"
          style={{ border: 'none', display: 'block' }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </section>

      {/* Formulário + Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Formulário */}
            <ScrollReveal>
              <h2 className="section-title mb-2">Envie-nos uma Mensagem</h2>
              <p className="text-textmuted text-sm mb-8">Respondemos em menos de 24 horas.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-textmuted text-xs font-medium mb-1.5">Nome *</label>
                    <input
                      className="input-light"
                      placeholder="O seu nome"
                      value={form.nome}
                      onChange={e => setField('nome', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-textmuted text-xs font-medium mb-1.5">Email *</label>
                    <input
                      type="email"
                      className="input-light"
                      placeholder="email@exemplo.com"
                      value={form.email}
                      onChange={e => setField('email', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-textmuted text-xs font-medium mb-1.5">Assunto *</label>
                  <input
                    className="input-light"
                    placeholder="Ex: Orçamento para piscina"
                    value={form.assunto}
                    onChange={e => setField('assunto', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-textmuted text-xs font-medium mb-1.5">Mensagem *</label>
                  <textarea
                    rows={6}
                    className="input-light resize-y"
                    placeholder="Descreva o seu projeto ou questão…"
                    value={form.mensagem}
                    onChange={e => setField('mensagem', e.target.value)}
                    required
                  />
                </div>

                {status && (
                  <div className={`px-4 py-3 rounded-lg text-sm ${
                    status.ok
                      ? 'bg-green-50 border border-green-300 text-green-700'
                      : 'bg-red-50 border border-red-300 text-red-700'
                  }`}>
                    {status.msg}
                  </div>
                )}

                <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5">
                  {loading
                    ? <><Loader2 size={16} className="animate-spin" /> A enviar…</>
                    : <><Send size={16} /> Enviar Mensagem</>
                  }
                </button>
              </form>
            </ScrollReveal>

            {/* Info contacto */}
            <ScrollReveal delay={200}>
              <h2 className="section-title mb-2">Tem uma Dúvida?</h2>
              <p className="text-textmuted text-sm mb-8">Entre em contacto connosco por qualquer um dos meios abaixo.</p>

              <div className="space-y-5 mb-8">
                <a
                  href={s.contact_maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-4 items-start group"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    <MapPin size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-textprimary font-medium text-sm mb-0.5">Morada</p>
                    <p className="text-textmuted text-sm leading-relaxed">{s.contact_address}</p>
                  </div>
                </a>

                <a href={`tel:+${s.whatsapp_number}`} className="flex gap-4 items-center group">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Phone size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-textprimary font-medium text-sm mb-0.5">Telefone / Telemóvel</p>
                    <p className="text-textmuted text-sm">{s.contact_phone}</p>
                  </div>
                </a>

                <a href={`mailto:${s.contact_email}`} className="flex gap-4 items-center group">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Mail size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-textprimary font-medium text-sm mb-0.5">Email</p>
                    <p className="text-textmuted text-sm">{s.contact_email}</p>
                  </div>
                </a>

                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Clock size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-textprimary font-medium text-sm mb-0.5">Horário</p>
                    <p className="text-textmuted text-sm">Segunda a Sexta: 09:00 – 18:00</p>
                    <p className="text-textmuted text-sm">Sábado: 09:00 – 13:00</p>
                  </div>
                </div>
              </div>

              <a
                href={`https://wa.me/${s.whatsapp_number}?text=Ol%C3%A1%2C+gostaria+de+mais+informa%C3%A7%C3%B5es`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#25d366] hover:bg-[#1ebe5d] text-white font-semibold px-6 py-3.5 rounded-xl transition-colors w-full justify-center"
              >
                <svg width="20" height="20" viewBox="0 0 32 32" fill="white">
                  <path d="M16 2C8.268 2 2 8.268 2 16c0 2.483.683 4.808 1.872 6.8L2 30l7.41-1.848A13.93 13.93 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm6.332 19.336c-.348-.176-2.056-1.016-2.376-1.132-.32-.112-.552-.172-.784.172-.232.344-.9 1.132-1.104 1.368-.2.232-.404.26-.752.084-.348-.176-1.468-.54-2.796-1.724-1.032-.92-1.728-2.056-1.932-2.404-.2-.344-.02-.532.152-.704.156-.156.348-.404.52-.608.176-.2.232-.344.348-.576.116-.232.06-.436-.028-.612-.088-.172-.784-1.888-1.076-2.584-.284-.68-.572-.588-.784-.6-.2-.008-.432-.012-.664-.012s-.608.088-.924.432c-.32.348-1.208 1.18-1.208 2.876s1.236 3.336 1.408 3.568c.172.228 2.432 3.712 5.892 5.208.824.356 1.468.568 1.968.728.828.264 1.58.228 2.176.14.664-.1 2.056-.84 2.348-1.652.292-.812.292-1.508.204-1.652-.084-.148-.316-.232-.664-.408z"/>
                </svg>
                Enviar WhatsApp
              </a>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}

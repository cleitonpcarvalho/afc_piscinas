import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import logo           from '../assets/client/inicio/img_01_logo.png'
import effectIdeaLogo from '../assets/effect_idea_logo.png'
import { useSettings } from '../hooks/useSettings'

const SERVICES = ['Piscinas', 'Saunas', 'Turcos', 'Spas', 'Complementos', 'Manutenção']
const LINKS    = [
  { label: 'Início',       href: '/' },
  { label: 'Piscinas',     href: '/piscinas' },
  { label: 'Sobre Nós',    href: '/#why-us' },
  { label: 'Contactos',    href: '/contactos' },
]

export default function Footer() {
  const s = useSettings()

  return (
    <footer style={{ background: '#0f172a' }} className="border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1 — Brand */}
          <div>
            <img src={logo} alt="AFC Piscinas" className="h-10 w-auto mb-4" />
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              Especialistas em construção, renovação e manutenção de piscinas, saunas, spas e turcos em Portugal.
            </p>
            <div className="flex gap-4">
              {s.social_instagram && (
                <a href={s.social_instagram} target="_blank" rel="noopener noreferrer"
                   className="text-slate-400 hover:text-accent transition-colors" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
              )}
              {s.social_facebook && (
                <a href={s.social_facebook} target="_blank" rel="noopener noreferrer"
                   className="text-slate-400 hover:text-accent transition-colors" aria-label="Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              )}
              {s.social_youtube && (
                <a href={s.social_youtube} target="_blank" rel="noopener noreferrer"
                   className="text-slate-400 hover:text-accent transition-colors" aria-label="YouTube">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              )}
            </div>
          </div>

          {/* Col 2 — Links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              {LINKS.map(l => (
                <li key={l.href}>
                  <Link to={l.href} className="text-slate-400 hover:text-accent text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Serviços */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Serviços</h3>
            <ul className="space-y-2">
              {SERVICES.map(sv => (
                <li key={sv}><span className="text-slate-400 text-sm">{sv}</span></li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contacto */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li>
                <a href={s.contact_maps} target="_blank" rel="noopener noreferrer"
                   className="flex gap-2.5 text-slate-400 hover:text-accent text-sm transition-colors">
                  <MapPin size={15} className="flex-shrink-0 mt-0.5" />
                  <span>{s.contact_address}</span>
                </a>
              </li>
              <li>
                <a href={`tel:+${s.whatsapp_number}`}
                   className="flex gap-2.5 text-slate-400 hover:text-accent text-sm transition-colors">
                  <Phone size={15} className="flex-shrink-0" />
                  {s.contact_phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${s.contact_email}`}
                   className="flex gap-2.5 text-slate-400 hover:text-accent text-sm transition-colors">
                  <Mail size={15} className="flex-shrink-0" />
                  {s.contact_email}
                </a>
              </li>
              <li className="flex gap-2.5 text-slate-400 text-sm">
                <Clock size={15} className="flex-shrink-0 mt-0.5" />
                <span>Seg–Sex: 09:00–18:00</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar — 3 colunas */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3 text-xs text-slate-400">
            {/* Esquerda */}
            <p className="text-center sm:text-left">
              © {new Date().getFullYear()} AFC Piscinas. Todos os direitos reservados.
            </p>

            {/* Centro — Feito com ❤️ */}
            <div className="flex items-center justify-center gap-1.5 flex-wrap">
              <span>Feito com</span>
              <span className="text-red-500 text-base">❤️</span>
              <span>por</span>
              <a
                href="https://site.effectidea.com/#portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center hover:opacity-100 opacity-70 transition-opacity"
              >
                <img
                  src={effectIdeaLogo}
                  alt="Effect Idea"
                  style={{ height: '24px', width: 'auto', objectFit: 'contain' }}
                />
              </a>
            </div>

            {/* Direita */}
            <div className="flex items-center justify-center sm:justify-end gap-4">
              <Link to="/privacidade" className="hover:text-accent transition-colors">Política de Privacidade</Link>
              <Link to="/termos"      className="hover:text-accent transition-colors">Termos de Uso</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

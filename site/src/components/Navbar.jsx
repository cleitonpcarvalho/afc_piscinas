import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import logo from '../assets/client/inicio/img_01_logo.png'
import { useSettings } from '../hooks/useSettings'

const LINKS = [
  { label: 'Início',       href: '/' },
  { label: 'Piscinas',     href: '/piscinas' },
  { label: 'Complementos', href: '/complementos' },
  { label: 'Saunas',       href: '/saunas' },
  { label: 'Turcos',       href: '/turcos' },
  { label: 'Spas',         href: '/spas' },
  { label: 'Contactos',    href: '/contactos' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)
  const { pathname } = useLocation()
  const s = useSettings()

  // Hero é escuro nas páginas com hero de fundo (todas excepto privacidade/termos)
  const isHeroPage   = ['/', '/piscinas', '/saunas', '/turcos', '/spas', '/complementos', '/contactos'].includes(pathname)
  const transparentBg = isHeroPage && !scrolled

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  const WA_URL = `https://wa.me/${s.whatsapp_number || '351967335707'}?text=Ol%C3%A1%2C+gostaria+de+pedir+um+or%C3%A7amento`

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 h-[70px] flex items-center transition-all duration-300"
      style={{
        background:   scrolled ? '#ffffff' : 'transparent',
        boxShadow:    scrolled ? '0 1px 20px rgba(0,0,0,0.08)' : 'none',
        borderBottom: scrolled ? '1px solid #e2e8f0' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="AFC Piscinas" className="h-11 w-auto object-contain" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {LINKS.map(l => (
            <Link
              key={l.href}
              to={l.href}
              className={`text-sm font-medium transition-colors
                ${pathname === l.href
                  ? 'text-accent'
                  : transparentBg
                    ? 'text-white/90 hover:text-white'
                    : 'text-textmuted hover:text-accent'
                }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:inline-flex btn-primary text-sm py-2 px-5"
        >
          Pedir Orçamento
        </a>

        {/* Mobile hamburger */}
        <button
          className={`lg:hidden p-2 ${transparentBg ? 'text-white' : 'text-textprimary'}`}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 top-[70px] bg-white z-40 flex flex-col p-6 gap-1 lg:hidden shadow-xl">
          {LINKS.map(l => (
            <Link
              key={l.href}
              to={l.href}
              className={`text-sm font-medium py-3 border-b border-borderlight transition-colors
                ${pathname === l.href ? 'text-accent' : 'text-textprimary hover:text-accent'}`}
            >
              {l.label}
            </Link>
          ))}
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary justify-center mt-5">
            Pedir Orçamento
          </a>
        </div>
      )}
    </header>
  )
}

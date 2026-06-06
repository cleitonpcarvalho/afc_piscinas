import { useLocation } from 'react-router-dom'
import { ExternalLink, Send } from 'lucide-react'
import api from '../services/api'
import { useState } from 'react'

const TITLES = {
  '/admin/dashboard': 'Dashboard',
  '/admin/content':   'Conteúdo',
  '/admin/media':     'Média',
  '/admin/settings':  'Configurações',
}

export default function Topbar() {
  const { pathname } = useLocation()
  const [publishing, setPublishing] = useState(false)
  const [msg, setMsg] = useState('')

  async function handlePublish() {
    setPublishing(true)
    try {
      await api.post('/api/settings/publish')
      setMsg('Publicado!')
      setTimeout(() => setMsg(''), 3000)
    } catch {
      setMsg('Erro')
      setTimeout(() => setMsg(''), 3000)
    } finally {
      setPublishing(false)
    }
  }

  return (
    <header className="h-14 bg-surface border-b border-border flex items-center justify-between px-6 flex-shrink-0">
      <h1 className="text-text font-semibold text-base">
        {TITLES[pathname] || 'Painel Admin'}
      </h1>
      <div className="flex items-center gap-3">
        {msg && <span className="text-xs text-accent">{msg}</span>}
        <a
          href={import.meta.env.VITE_SITE_URL || 'http://localhost:5174'}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost flex items-center gap-2"
        >
          <ExternalLink size={14} /> Ver Site
        </a>
        <button onClick={handlePublish} disabled={publishing} className="btn-primary flex items-center gap-2">
          <Send size={14} /> {publishing ? 'A publicar…' : 'Publicar Alterações'}
        </button>
      </div>
    </header>
  )
}

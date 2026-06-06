import { useEffect, useState } from 'react'
import { FileText, Image, Mail, Server } from 'lucide-react'
import api from '../services/api'

export default function Dashboard() {
  const [pages,    setPages]    = useState([])
  const [media,    setMedia]    = useState([])
  const [settings, setSettings] = useState({})
  const [health,   setHealth]   = useState(null)

  useEffect(() => {
    api.get('/api/content/pages').then(r => setPages(r.data)).catch(() => {})
    api.get('/api/media').then(r => setMedia(r.data)).catch(() => {})
    api.get('/api/settings').then(r => setSettings(r.data)).catch(() => {})
    api.get('/api/health').then(r => setHealth(r.data)).catch(() => {})
  }, [])

  const activePages = pages.filter(p => p.is_active).length

  const METRICS = [
    {
      label: 'Páginas activas',
      value: activePages,
      icon: FileText,
      color: 'text-accent',
      bg: 'bg-accent/10',
    },
    {
      label: 'Ficheiros de média',
      value: media.length,
      icon: Image,
      color: 'text-purple-400',
      bg: 'bg-purple-400/10',
    },
    {
      label: 'Email de contacto',
      value: settings.contact_email?.value || '—',
      icon: Mail,
      color: 'text-green-400',
      bg: 'bg-green-400/10',
      small: true,
    },
    {
      label: 'Estado do servidor',
      value: health?.status === 'ok' ? 'Online' : 'Offline',
      icon: Server,
      color: health?.status === 'ok' ? 'text-green-400' : 'text-red-400',
      bg: health?.status === 'ok' ? 'bg-green-400/10' : 'bg-red-400/10',
    },
  ]

  const recentMedia = media.slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4">
        {METRICS.map(m => (
          <div key={m.label} className="card flex items-center gap-4">
            <div className={`${m.bg} ${m.color} p-3 rounded-xl flex-shrink-0`}>
              <m.icon size={20} />
            </div>
            <div className="min-w-0">
              <p className="text-muted text-xs mb-0.5">{m.label}</p>
              <p className={`font-semibold ${m.small ? 'text-sm' : 'text-2xl'} ${m.color} truncate`}>
                {m.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent media */}
      <div className="card">
        <h2 className="text-text font-semibold text-sm mb-4">Últimas imagens carregadas</h2>
        {recentMedia.length === 0 ? (
          <p className="text-muted text-sm">Ainda sem imagens.</p>
        ) : (
          <div className="flex gap-3 overflow-x-auto pb-1">
            {recentMedia.map(m => (
              <div key={m.id} className="flex-shrink-0 w-32">
                <div className="aspect-square rounded-lg bg-bg border border-border overflow-hidden mb-1.5">
                  <img
                    src={m.url}
                    alt={m.alt_text || m.filename}
                    className="w-full h-full object-cover"
                    onError={e => { e.target.style.display = 'none' }}
                  />
                </div>
                <p className="text-muted text-xs truncate">{m.filename}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick stats */}
      {health && (
        <div className="card">
          <h2 className="text-text font-semibold text-sm mb-3">Info do servidor</h2>
          <div className="space-y-1.5 text-xs text-muted">
            <div className="flex justify-between">
              <span>Base de dados</span>
              <span className="text-green-400">{health.db}</span>
            </div>
            <div className="flex justify-between">
              <span>Uptime</span>
              <span className="text-text">{Math.floor(health.uptime)}s</span>
            </div>
            <div className="flex justify-between">
              <span>Hora BD</span>
              <span className="text-text">{new Date(health.db_time).toLocaleTimeString('pt-PT')}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

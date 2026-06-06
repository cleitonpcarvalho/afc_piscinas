import { useEffect, useState } from 'react'
import { Save, Image as ImageIcon } from 'lucide-react'
import api from '../services/api'
import MediaPicker from '../components/MediaPicker'

const PAGE_LABELS = {
  inicio:       'Início',
  piscinas:     'Piscinas',
  complementos: 'Complementos',
  saunas:       'Saunas',
  turcos:       'Turcos',
  spas:         'Spas',
  contactos:    'Contactos',
}

function safeVal(v) {
  if (v === null || v === undefined) return ''
  if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') return String(v)
  return JSON.stringify(v)
}

function isValidUrl(val) {
  return val && typeof val === 'string' && (val.startsWith('http://') || val.startsWith('https://'))
}

function SectionCard({ section, onSaved }) {
  const [fields, setFields] = useState(section.content || {})
  const [title,  setTitle]  = useState(section.title || '')
  const [saving, setSaving] = useState(false)
  const [msg,    setMsg]    = useState('')
  const [picker, setPicker] = useState(null) // key do campo imagem a substituir

  async function save() {
    setSaving(true)
    try {
      await api.put(`/api/content/sections/${section.id}`, {
        title,
        content: fields,
      })
      setMsg('Guardado!')
      onSaved?.()
    } catch {
      setMsg('Erro ao guardar')
    } finally {
      setSaving(false)
      setTimeout(() => setMsg(''), 3000)
    }
  }

  function setField(key, val) {
    setFields(prev => ({ ...prev, [key]: val }))
  }

  function handleImageSelect(key, url) {
    setField(key, url)
    setPicker(null)
  }

  let entries = []
  try { entries = Object.entries(fields || {}) } catch { entries = [] }

  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-text font-semibold text-sm">
          {title || section.slug}
        </h3>
        <div className="flex items-center gap-2">
          {msg && <span className="text-xs text-accent">{msg}</span>}
          <button onClick={save} disabled={saving} className="btn-primary flex items-center gap-2">
            <Save size={13} /> {saving ? 'A guardar…' : 'Guardar'}
          </button>
        </div>
      </div>

      {/* Title field */}
      <div>
        <label className="block text-muted text-xs mb-1">Título da secção</label>
        <input
          className="input"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>

      {/* Content fields */}
      {entries.length === 0 && (
        <p className="text-muted text-xs">Esta secção ainda não tem campos de conteúdo definidos.</p>
      )}

      {entries.map(([key, value]) => {
        const isImage = key.toLowerCase().includes('image') ||
                        key.toLowerCase().includes('imagem') ||
                        key.toLowerCase().includes('foto') ||
                        key.toLowerCase().includes('bg') ||
                        isValidUrl(value)

        if (isImage) {
          return (
            <div key={key}>
              <label className="block text-muted text-xs mb-1 capitalize">{key.replace(/_/g, ' ')}</label>
              <div className="flex gap-3 items-start">
                <div className="w-24 h-20 rounded-lg border border-border bg-bg overflow-hidden flex-shrink-0 flex items-center justify-center">
                  {isValidUrl(value)
                    ? <img
                        src={safeVal(value)}
                        alt={key}
                        className="w-full h-full object-cover"
                        onError={e => { e.target.style.display = 'none' }}
                      />
                    : <ImageIcon size={20} className="text-muted" />
                  }
                </div>
                <div className="flex-1 space-y-2">
                  <input
                    className="input text-xs"
                    value={safeVal(value)}
                    onChange={e => setField(key, e.target.value)}
                    placeholder="URL da imagem"
                  />
                  <button
                    onClick={() => setPicker(key)}
                    className="btn-ghost text-xs flex items-center gap-1.5"
                  >
                    <ImageIcon size={12} /> Substituir Imagem
                  </button>
                </div>
              </div>
            </div>
          )
        }

        const displayVal = safeVal(value)
        const isLong = displayVal.length > 80
        return (
          <div key={key}>
            <label className="block text-muted text-xs mb-1 capitalize">{key.replace(/_/g, ' ')}</label>
            {isLong
              ? <textarea
                  className="input resize-y"
                  rows={3}
                  value={displayVal}
                  onChange={e => setField(key, e.target.value)}
                />
              : <input
                  className="input"
                  value={displayVal}
                  onChange={e => setField(key, e.target.value)}
                />
            }
          </div>
        )
      })}

      {picker && (
        <MediaPicker
          onSelect={url => handleImageSelect(picker, url)}
          onClose={() => setPicker(null)}
        />
      )}
    </div>
  )
}

export default function Content() {
  const [pages,       setPages]       = useState([])
  const [activePage,  setActivePage]  = useState(null)
  const [sections,    setSections]    = useState([])
  const [loading,     setLoading]     = useState(false)

  useEffect(() => {
    api.get('/api/content/pages').then(r => {
      setPages(r.data)
      if (r.data.length) setActivePage(r.data[0].slug)
    })
  }, [])

  useEffect(() => {
    if (!activePage) return
    setLoading(true)
    api.get(`/api/content/pages/${activePage}`)
      .then(r => setSections(r.data.sections || []))
      .catch(() => setSections([]))
      .finally(() => setLoading(false))
  }, [activePage])

  return (
    <div className="flex gap-5 h-full">
      {/* Page list */}
      <aside className="w-52 flex-shrink-0">
        <h2 className="text-muted text-xs font-medium uppercase tracking-wider mb-3">Páginas</h2>
        <div className="space-y-1">
          {pages.map(p => (
            <button
              key={p.slug}
              onClick={() => setActivePage(p.slug)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all
                ${activePage === p.slug
                  ? 'bg-surface border-l-[3px] border-accent text-text font-medium pl-[calc(0.75rem-3px)]'
                  : 'text-muted hover:text-text hover:bg-surface/50'
                }`}
            >
              {PAGE_LABELS[p.slug] || p.title}
            </button>
          ))}
        </div>
      </aside>

      {/* Sections */}
      <div className="flex-1 space-y-4">
        {loading && <p className="text-muted text-sm">A carregar secções…</p>}

        {!loading && sections.length === 0 && (
          <div className="card text-center py-12">
            <p className="text-muted text-sm">Esta página ainda não tem secções de conteúdo.</p>
          </div>
        )}

        {!loading && sections.map(s => (
          <SectionCard
            key={s.id}
            section={s}
            onSaved={() => {}}
          />
        ))}
      </div>
    </div>
  )
}

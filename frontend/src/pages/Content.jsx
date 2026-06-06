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

function isImageField(key, value) {
  const v = String(value || '')
  if (v.includes('/uploads/') || v.includes('localhost:3001')) return true
  const k = key.toLowerCase()
  return (
    k.startsWith('imagem') ||
    k.startsWith('foto') ||
    k === 'bg_image' ||
    k.endsWith('_image') ||
    k.endsWith('_img')
  )
}

function SectionCard({ section, onSaved }) {
  const [fields, setFields] = useState(section.content || {})
  const [title,  setTitle]  = useState(section.title || '')
  const [saving, setSaving] = useState(false)
  const [msg,    setMsg]    = useState('')
  const [picker, setPicker] = useState(null) // key do campo a substituir

  async function save() {
    setSaving(true)
    try {
      await api.put(`/api/content/sections/${section.id}`, { title, content: fields })
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

  function renderField(key, value) {
    // Arrays e objectos são estruturais
    if (Array.isArray(value) || (typeof value === 'object' && value !== null)) {
      return (
        <div key={key}>
          <p style={{ color: '#64748b', fontSize: '11px', fontStyle: 'italic' }}>
            {key.replace(/_/g, ' ')} — campo estrutural gerido automaticamente.
          </p>
        </div>
      )
    }

    const strVal = String(value ?? '')

    // Campo de imagem — thumbnail + botão Substituir
    if (isImageField(key, strVal)) {
      const hasUrl = strVal.includes('/uploads/')
      return (
        <div key={key} className="space-y-2">
          <label className="block text-muted text-xs capitalize">{key.replace(/_/g, ' ')}</label>

          {/* Thumbnail */}
          <div className="w-[200px] h-[130px] rounded-xl overflow-hidden border border-border bg-bg flex items-center justify-center">
            {hasUrl
              ? <img
                  src={strVal}
                  alt={key}
                  className="w-full h-full object-cover"
                  onError={e => { e.currentTarget.style.display = 'none' }}
                />
              : <div className="flex flex-col items-center gap-1 text-muted">
                  <ImageIcon size={22} />
                  <span className="text-[10px]">Sem imagem</span>
                </div>
            }
          </div>

          {/* Nome do ficheiro */}
          {hasUrl && (
            <p className="text-[10px] text-muted truncate max-w-[160px]">
              {strVal.split('/').pop()}
            </p>
          )}

          {/* Botão substituir */}
          <button
            onClick={() => setPicker(key)}
            className="btn-ghost text-xs flex items-center gap-1.5"
          >
            <ImageIcon size={12} />
            {hasUrl ? 'Substituir Imagem' : 'Seleccionar Imagem'}
          </button>
        </div>
      )
    }

    // Ocultar URLs externas (wa.me, http sem /uploads/, caminhos relativos)
    if (
      strVal.startsWith('http') ||
      strVal.startsWith('../') ||
      strVal.includes('/assets/') ||
      strVal.includes('wa.me')
    ) {
      return null
    }

    // Campo de texto simples
    const isLong = strVal.length > 80
    return (
      <div key={key}>
        <label className="block text-muted text-xs mb-1 capitalize">{key.replace(/_/g, ' ')}</label>
        {isLong
          ? <textarea
              className="input resize-y"
              rows={3}
              value={strVal}
              onChange={e => setField(key, e.target.value)}
            />
          : <input
              className="input"
              value={strVal}
              onChange={e => setField(key, e.target.value)}
            />
        }
      </div>
    )
  }

  const visibleFields = entries.map(([key, value]) => renderField(key, value)).filter(Boolean)
  if (visibleFields.length === 0) return null

  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-text font-semibold text-sm">{title || section.slug}</h3>
        <div className="flex items-center gap-2">
          {msg && <span className="text-xs text-accent">{msg}</span>}
          <button onClick={save} disabled={saving} className="btn-primary flex items-center gap-2">
            <Save size={13} /> {saving ? 'A guardar…' : 'Guardar'}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-muted text-xs mb-1">Título da secção</label>
        <input className="input" value={title} onChange={e => setTitle(e.target.value)} />
      </div>

      {visibleFields}

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
  const [pages,      setPages]      = useState([])
  const [activePage, setActivePage] = useState(null)
  const [sections,   setSections]   = useState([])
  const [loading,    setLoading]    = useState(false)

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

      <div className="flex-1 space-y-4 overflow-y-auto">
        {loading && <p className="text-muted text-sm">A carregar secções…</p>}

        {!loading && sections.length === 0 && (
          <div className="card text-center py-12">
            <p className="text-muted text-sm">Esta página ainda não tem secções de conteúdo.</p>
          </div>
        )}

        {!loading && sections.map(s => (
          <SectionCard key={s.id} section={s} onSaved={() => {}} />
        ))}
      </div>
    </div>
  )
}

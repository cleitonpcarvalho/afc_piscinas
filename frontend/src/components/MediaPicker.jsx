import { useState, useEffect, useRef } from 'react'
import { X, Upload, Search, Check } from 'lucide-react'
import api from '../services/api'

export default function MediaPicker({ onSelect, onClose }) {
  const [media, setMedia]       = useState([])
  const [search, setSearch]     = useState('')
  const [selected, setSelected] = useState(null)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef()

  useEffect(() => {
    api.get('/api/media').then(r => setMedia(r.data)).catch(() => {})
  }, [])

  const filtered = media.filter(m =>
    m.filename.toLowerCase().includes(search.toLowerCase()) ||
    m.alt_text.toLowerCase().includes(search.toLowerCase())
  )

  async function handleUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    try {
      const { data } = await api.post('/api/media/upload', fd)
      setMedia(prev => [data, ...prev])
      setSelected(data)
    } catch {}
    setUploading(false)
  }

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-surface border border-border rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-text font-semibold">Seleccionar Imagem</h2>
          <button onClick={onClose} className="text-muted hover:text-text transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-3 px-5 py-3 border-b border-border">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              className="input pl-8"
              placeholder="Pesquisar imagens…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="btn-primary flex items-center gap-2 whitespace-nowrap"
          >
            <Upload size={14} /> {uploading ? 'A carregar…' : 'Carregar Nova'}
          </button>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-4 gap-3">
          {filtered.map(m => (
            <button
              key={m.id}
              onClick={() => setSelected(m)}
              className={`relative rounded-lg overflow-hidden border-2 transition-all aspect-square bg-bg
                ${selected?.id === m.id ? 'border-accent' : 'border-transparent hover:border-border'}`}
            >
              <img
                src={m.url}
                alt={m.alt_text || m.filename}
                className="w-full h-full object-cover"
                onError={e => { e.target.style.display = 'none' }}
              />
              {selected?.id === m.id && (
                <div className="absolute top-1.5 right-1.5 bg-accent rounded-full p-0.5">
                  <Check size={12} className="text-white" />
                </div>
              )}
              <div className="absolute bottom-0 inset-x-0 bg-black/60 px-1.5 py-1">
                <p className="text-white text-[10px] truncate">{m.filename}</p>
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-4 text-center text-muted py-12 text-sm">
              Nenhuma imagem encontrada
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-border">
          <p className="text-muted text-xs">
            {selected ? selected.filename : 'Nenhuma seleccionada'}
          </p>
          <div className="flex gap-3">
            <button onClick={onClose} className="btn-ghost">Cancelar</button>
            <button
              onClick={() => { if (selected) { onSelect(selected.url); onClose() } }}
              disabled={!selected}
              className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Usar esta Imagem
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

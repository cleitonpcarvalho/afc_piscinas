import { useEffect, useState, useRef, useCallback } from 'react'
import { Trash2, Upload, Search, Image as ImageIcon } from 'lucide-react'
import api from '../services/api'

function formatBytes(bytes) {
  if (!bytes) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`
}

export default function Media() {
  const [media,     setMedia]     = useState([])
  const [search,    setSearch]    = useState('')
  const [category,  setCategory]  = useState('')
  const [uploading, setUploading] = useState(false)
  const [dragging,  setDragging]  = useState(false)
  const fileRef = useRef()

  const load = useCallback(() => {
    const params = {}
    if (category) params.category = category
    if (search)   params.search   = search
    api.get('/api/media', { params }).then(r => setMedia(r.data)).catch(() => {})
  }, [category, search])

  useEffect(() => { load() }, [load])

  async function uploadFile(file) {
    if (!file) return
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    try {
      await api.post('/api/media/upload', fd)
      load()
    } catch (err) {
      alert(err.response?.data?.error || 'Erro no upload')
    }
    setUploading(false)
  }

  async function deleteMedia(id) {
    if (!confirm('Eliminar este ficheiro?')) return
    try {
      await api.delete(`/api/media/${id}`)
      setMedia(prev => prev.filter(m => m.id !== id))
    } catch {
      alert('Erro ao eliminar')
    }
  }

  function onDrop(e) {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) uploadFile(file)
  }

  const displayed = media.filter(m => m.category !== 'sistema')

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex gap-3 items-center">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            className="input pl-8"
            placeholder="Pesquisar…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select
          className="input w-40"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="">Todas as categorias</option>
          <option value="general">Geral</option>
          <option value="piscinas">Piscinas</option>
          <option value="saunas">Saunas</option>
          <option value="spas">Spas</option>
        </select>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => uploadFile(e.target.files?.[0])} />
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="btn-primary flex items-center gap-2"
        >
          <Upload size={14} /> {uploading ? 'A carregar…' : 'Carregar'}
        </button>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => fileRef.current?.click()}
        className={`border-2 border-dashed rounded-xl py-8 text-center cursor-pointer transition-colors
          ${dragging ? 'border-accent bg-accent/5 text-accent' : 'border-border text-muted hover:border-accent/50'}`}
      >
        <Upload size={22} className="mx-auto mb-2" />
        <p className="text-sm">Arraste imagens aqui ou clique para seleccionar</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 gap-4">
        {displayed.map(m => (
          <div key={m.id} className="card p-0 overflow-hidden group">
            <div className="aspect-square bg-bg relative overflow-hidden">
              <img
                src={m.url}
                alt={m.alt_text || m.filename}
                className="w-full h-full object-cover"
                onError={e => {
                  e.target.style.display = 'none'
                  e.target.parentElement.classList.add('flex','items-center','justify-center')
                }}
              />
              <button
                onClick={() => deleteMedia(m.id)}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-lg
                           opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={13} />
              </button>
            </div>
            <div className="p-3">
              <p className="text-text text-xs font-medium truncate">{m.filename}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-muted text-[10px]">{m.category}</span>
                <span className="text-muted text-[10px]">{formatBytes(m.size_bytes)}</span>
              </div>
            </div>
          </div>
        ))}
        {displayed.length === 0 && !uploading && (
          <div className="col-span-4 py-16 text-center">
            <ImageIcon size={36} className="text-muted mx-auto mb-3" />
            <p className="text-muted text-sm">Nenhuma imagem encontrada</p>
          </div>
        )}
      </div>
    </div>
  )
}

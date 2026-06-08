import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function ImageGroup({ images = [], title = '' }) {
  const [mainIdx, setMainIdx] = useState(0)
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => { setMainIdx(0) }, [images])

  if (!images.length) return null

  const thumbs = images.slice(0, 4)

  function prev() { setLightbox(i => (i - 1 + images.length) % images.length) }
  function next() { setLightbox(i => (i + 1) % images.length) }

  function onKey(e) {
    if (e.key === 'ArrowLeft')  prev()
    if (e.key === 'ArrowRight') next()
    if (e.key === 'Escape')     setLightbox(null)
  }

  return (
    <>
      {/* Imagem principal */}
      <button
        onClick={() => setLightbox(mainIdx)}
        className="w-full block rounded-xl overflow-hidden mb-3 focus:outline-none focus:ring-2 focus:ring-accent"
        aria-label={`Abrir galeria ${title}`}
      >
        <img
          src={images[mainIdx]}
          alt={`${title} — principal`}
          className="w-full h-72 object-cover transition-transform duration-500 hover:scale-[1.02]"
        />
      </button>

      {/* Miniaturas */}
      <div className="flex gap-2">
        {thumbs.map((src, i) => (
          <button
            key={i}
            onClick={() => setMainIdx(i)}
            aria-label={`Ver imagem ${i + 1} de ${title}`}
            className={`flex-1 rounded-lg overflow-hidden focus:outline-none transition-all duration-200
              ${mainIdx === i
                ? 'ring-2 ring-accent ring-offset-2'
                : 'opacity-60 hover:opacity-100'
              }`}
          >
            <img src={src} alt={`${title} ${i + 1}`} className="w-full h-20 object-cover" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={() => setLightbox(null)}
          onKeyDown={onKey}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={e => { e.stopPropagation(); setLightbox(null) }}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2 z-10"
            aria-label="Fechar"
          >
            <X size={28} />
          </button>
          <button
            onClick={e => { e.stopPropagation(); prev() }}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 z-10"
            aria-label="Anterior"
          >
            <ChevronLeft size={36} />
          </button>
          <button
            onClick={e => { e.stopPropagation(); next() }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 z-10"
            aria-label="Seguinte"
          >
            <ChevronRight size={36} />
          </button>
          <img
            src={images[lightbox]}
            alt={`${title} ${lightbox + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
          <p className="absolute bottom-4 text-white/50 text-sm">
            {lightbox + 1} / {images.length}
          </p>
        </div>
      )}
    </>
  )
}

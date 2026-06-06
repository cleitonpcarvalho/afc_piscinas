import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

export default function GalleryGrid({ images }) {
  const [lightbox, setLightbox] = useState(null)

  function prev() { setLightbox(i => (i - 1 + images.length) % images.length) }
  function next() { setLightbox(i => (i + 1) % images.length) }

  function onKey(e) {
    if (e.key === 'ArrowLeft')  prev()
    if (e.key === 'ArrowRight') next()
    if (e.key === 'Escape')     setLightbox(null)
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map((src, i) => (
          <ScrollReveal key={i} delay={(i % 8) * 50}>
            <button
              onClick={() => setLightbox(i)}
              className="group relative overflow-hidden rounded-xl aspect-[4/3] w-full block
                         bg-surface border border-borderlight hover:shadow-md focus:outline-none focus:ring-2 focus:ring-accent transition-all"
            >
              <img src={src} alt={`Imagem ${i + 1}`}
                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
            </button>
          </ScrollReveal>
        ))}
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={() => setLightbox(null)}
          onKeyDown={onKey}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
        >
          <button onClick={e => { e.stopPropagation(); setLightbox(null) }}
                  className="absolute top-4 right-4 text-white/70 hover:text-white p-2 z-10">
            <X size={28} />
          </button>
          <button onClick={e => { e.stopPropagation(); prev() }}
                  className="absolute left-3 text-white/70 hover:text-white p-3 z-10">
            <ChevronLeft size={36} />
          </button>
          <button onClick={e => { e.stopPropagation(); next() }}
                  className="absolute right-3 text-white/70 hover:text-white p-3 z-10">
            <ChevronRight size={36} />
          </button>
          <img src={images[lightbox]} alt={`Imagem ${lightbox + 1}`}
               className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
               onClick={e => e.stopPropagation()} />
          <p className="absolute bottom-4 text-white/50 text-sm">{lightbox + 1} / {images.length}</p>
        </div>
      )}
    </>
  )
}

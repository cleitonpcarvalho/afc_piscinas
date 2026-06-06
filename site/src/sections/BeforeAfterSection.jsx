import { useRef, useState, useCallback } from 'react'
import ScrollReveal from '../components/ScrollReveal'
import before from '../assets/pexels/before_pool.jpg'
import after  from '../assets/pexels/after_pool.jpg'

export default function BeforeAfterSection() {
  const [pos, setPos]       = useState(50)
  const [dragging, setDrag] = useState(false)
  const containerRef        = useRef(null)

  const move = useCallback((clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setPos(Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 2), 98))
  }, [])

  return (
    <section className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12">
          <span className="section-eyebrow">Transformação</span>
          <h2 className="section-title">Do Sonho à Realidade</h2>
          <p className="text-textmuted mt-3 max-w-xl mx-auto text-sm">
            Arraste o divisor para ver a diferença antes e depois da renovação.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div
            ref={containerRef}
            className="relative overflow-hidden rounded-2xl cursor-ew-resize select-none shadow-xl border border-borderlight"
            style={{ height: '500px' }}
            onMouseDown={() => setDrag(true)}
            onMouseUp={() => setDrag(false)}
            onMouseLeave={() => setDrag(false)}
            onMouseMove={e => { if (dragging) move(e.clientX) }}
            onTouchStart={() => setDrag(true)}
            onTouchEnd={() => setDrag(false)}
            onTouchMove={e => move(e.touches[0].clientX)}
          >
            <img src={after}  alt="Depois" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
              <img src={before} alt="Antes" className="absolute inset-0 h-full object-cover"
                   style={{ width: containerRef.current?.offsetWidth + 'px' }} />
              <div className="absolute top-4 left-4 bg-dark/70 text-white text-xs font-bold px-3 py-1.5 rounded-full tracking-widest">ANTES</div>
            </div>
            <div className="absolute top-4 right-4 bg-accent/90 text-white text-xs font-bold px-3 py-1.5 rounded-full tracking-widest">DEPOIS</div>
            <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg" style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-accent border-2 border-white flex items-center justify-center shadow-lg">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M8 5l-7 7 7 7M16 5l7 7-7 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
